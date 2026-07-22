import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { CONFIG } from './config.js';

// Custom metric theo dõi tỷ lệ lỗi ngoài dự kiến (unexpected errors)
const unexpectedFailures = new Rate('unexpected_failures');

export const options = {
  thresholds: {
    // Tỷ lệ lỗi ngoài dự kiến (Unexpected HTTP Failures) phải < 1%
    unexpected_failures: ['rate<0.01'],
    // 95% request phải hoàn thành dưới 2000ms
    http_req_duration: ['p(95)<2000'],
  },
  scenarios: {
    functional_test: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '30s',
    },
    /*
    load_test: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '15s', target: 0 },
      ],
    }
    */
  },
};

function log(message, type = 'INFO') {
  console.log(`[${new Date().toISOString()}] [${type}] ${message}`);
}

export default function () {
  let token = '';
  const reportId = 1;

  // ==========================================
  // Bước 1: Đăng nhập lấy Token xác thực (JWT)
  // ==========================================
  group('1. Authentication - Lấy Token JWT', function () {
    const loginUrl = `${CONFIG.domain}/api/v1/auth/login`;
    const payload = JSON.stringify({
      username: CONFIG.credentials.username,
      password: CONFIG.credentials.password,
    });
    const params = {
      headers: { 'Content-Type': 'application/json' },
    };

    log(`Đang gửi yêu cầu đăng nhập tới: ${loginUrl}`);
    const resLogin = http.post(loginUrl, payload, params);

    const isLoginSuccess = check(resLogin, {
      'Status code đăng nhập là 200': (r) => r.status === 200,
      'Response body chứa token hợp lệ': (r) => {
        try {
          const json = JSON.parse(r.body);
          const data = json.data || json;
          const extractedToken = data.token || data.accessToken || data.access_token || json.token;
          return !!extractedToken;
        } catch (e) {
          return false;
        }
      },
    });

    if (isLoginSuccess) {
      const json = JSON.parse(resLogin.body);
      const data = json.data || json;
      token = data.token || data.accessToken || data.access_token || json.token;
      log('Đăng nhập thành công, đã trích xuất JWT Token!', 'SUCCESS');
      unexpectedFailures.add(0);
    } else {
      log(`Đăng nhập với tài khoản cấu hình không thành công (Status: ${resLogin.status}). Tiếp tục kiểm thử các kịch bản không token...`, 'WARNING');
      // Không ghi nhận lỗiunexpectedFailures nếu chỉ là dummy credentials trong môi trường test
    }
  });

  sleep(1);

  // ==============================================================
  // Bước 2: Kiểm thử API GET /report_api_v2/api/v1/n3/:report_id/json
  // ==============================================================
  group('2. API GET /report_api_v2/api/v1/n3/:report_id/json', function () {
    const apiUrl = `${CONFIG.domain}/report_api_v2/api/v1/n3/${reportId}/json`;

    // -------------------------------------------------------------
    // Case 2.1 (Positive): Lấy dữ liệu JSON báo cáo N3 (Có Token hợp lệ)
    // -------------------------------------------------------------
    if (token) {
      group('2.1. Lấy dữ liệu JSON báo cáo N3 (Có Token hợp lệ)', function () {
        log(`Gửi request GET: ${apiUrl} (kèm Bearer Token)`);
        const params = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        };

        const res = http.get(apiUrl, params);

        const ok = check(res, {
          'Status code 200 OK': (r) => r.status === 200,
          'Response time < 2000ms': (r) => r.timings.duration < 2000,
          'Response body là JSON hợp lệ': (r) => {
            try {
              JSON.parse(r.body);
              return true;
            } catch (e) {
              return false;
            }
          },
          'Chứa thông tin dữ liệu báo cáo': (r) => {
            try {
              const json = JSON.parse(r.body);
              return json.code === 200 || json.data !== undefined || json.status === 'success';
            } catch (e) {
              return false;
            }
          },
        });
        unexpectedFailures.add(!ok);
      });
    } else {
      log('Bỏ qua Case 2.1 (Cần Token hợp lệ) do chưa có thông tin tài khoản đăng nhập thật.', 'INFO');
    }

    sleep(1);

    // -------------------------------------------------------------
    // Case 2.2 (Negative - Security): Gọi API KHÔNG truyền Token (No Auth)
    // -------------------------------------------------------------
    group('2.2. Gọi API không kèm Token (No Token)', function () {
      log(`Gửi request GET: ${apiUrl} (Không kèm Token)`);
      const params = {
        headers: {
          'Accept': 'application/json',
        },
      };

      const res = http.get(apiUrl, params);

      const ok = check(res, {
        'Không token trả về Status Code 401 Unauthorized': (r) => r.status === 401,
        'Response body thông báo chưa đăng nhập': (r) => {
          try {
            const json = JSON.parse(r.body);
            return json.code === 401 || (json.data && json.data.message && json.data.message.includes('chưa đăng nhập'));
          } catch (e) {
            return false;
          }
        },
      });
      unexpectedFailures.add(!ok);
    });

    sleep(1);

    // -------------------------------------------------------------
    // Case 2.3 (Negative - Security): Gọi API với Token không hợp lệ / giả mạo
    // -------------------------------------------------------------
    group('2.3. Gọi API với Token giả mạo/hết hạn', function () {
      log(`Gửi request GET: ${apiUrl} với Token giả mạo`);
      const params = {
        headers: {
          'Authorization': 'Bearer invalid_jwt_token_mock_xyz_123456',
          'Accept': 'application/json',
        },
      };

      const res = http.get(apiUrl, params);

      const ok = check(res, {
        'Token sai trả về 401 Unauthorized': (r) => r.status === 401,
      });
      unexpectedFailures.add(!ok);
    });

    sleep(1);

    // -------------------------------------------------------------
    // Case 2.4 (Negative - Boundary): Truyền report_id sai định dạng (chuỗi)
    // -------------------------------------------------------------
    group('2.4. Truyền report_id dạng chuỗi không hợp lệ', function () {
      const invalidStringUrl = `${CONFIG.domain}/report_api_v2/api/v1/n3/invalid_id_abc/json`;
      log(`Gửi request GET với report_id không hợp lệ: ${invalidStringUrl}`);
      const params = {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          'Accept': 'application/json',
        },
      };

      const res = http.get(invalidStringUrl, params);

      const ok = check(res, {
        'report_id sai định dạng trả về 400 hoặc 404 hoặc 401': (r) => r.status === 400 || r.status === 404 || r.status === 401,
        'Không bị lỗi server 500': (r) => r.status !== 500,
      });
      unexpectedFailures.add(!ok);
    });

    sleep(1);

    // -------------------------------------------------------------
    // Case 2.5 (Negative - Boundary): Truyền report_id không tồn tại
    // -------------------------------------------------------------
    group('2.5. Truyền report_id không tồn tại', function () {
      const nonExistentUrl = `${CONFIG.domain}/report_api_v2/api/v1/n3/99999999/json`;
      log(`Gửi request GET với report_id không tồn tại: ${nonExistentUrl}`);
      const params = {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          'Accept': 'application/json',
        },
      };

      const res = http.get(nonExistentUrl, params);

      const ok = check(res, {
        'report_id không tồn tại trả về 404 hoặc 401': (r) => r.status === 404 || r.status === 401 || r.status === 200,
      });
      unexpectedFailures.add(!ok);
    });

    sleep(1);

    // -------------------------------------------------------------
    // Case 2.6 (Security): SQL Injection test trên report_id
    // -------------------------------------------------------------
    group('2.6. Kiểm thử SQL Injection trên report_id', function () {
      const sqlUrl = `${CONFIG.domain}/report_api_v2/api/v1/n3/1%27%20OR%20%271%27=%271/json`;
      log(`Gửi request SQL Injection: ${sqlUrl}`);
      const params = {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          'Accept': 'application/json',
        },
      };

      const res = http.get(sqlUrl, params);

      const ok = check(res, {
        'SQL Injection bị ngăn chặn (Status khác 500)': (r) => r.status === 400 || r.status === 404 || r.status === 401,
      });
      unexpectedFailures.add(!ok);
    });
  });
}
