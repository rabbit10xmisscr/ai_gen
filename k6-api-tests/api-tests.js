import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { CONFIG } from './config.js';

// Khai báo options kiểm thử (vus, duration, thresholds) từ file config
export const options = CONFIG.options;

// Helper function để in log định dạng đẹp
function log(message, type = 'INFO') {
  console.log(`[${new Date().toISOString()}] [${type}] ${message}`);
}

export default function () {
  let token = '';

  // Nhóm 1: Kiểm thử API Đăng nhập (Authentication)
  group('1. API Authentication (POST /api/v1/auth/login)', function () {
    const url = `${CONFIG.domain}/api/v1/auth/login`;
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Case 1.1: Đăng nhập thành công với thông tin hợp lệ
    log('Gửi yêu cầu đăng nhập hợp lệ...');
    const payloadSuccess = JSON.stringify({
      username: CONFIG.credentials.username,
      password: CONFIG.credentials.password,
    });
    
    const resSuccess = http.post(url, payloadSuccess, params);
    
    const isLoginOk = check(resSuccess, {
      'Status code đăng nhập là 200': (r) => r.status === 200,
      'Response body chứa token': (r) => {
        try {
          const body = JSON.parse(r.body);
          const data = body.data || body;
          const extractedToken = data.token || data.accessToken || data.access_token || body.token;
          return !!extractedToken;
        } catch (e) {
          return false;
        }
      }
    });

    if (isLoginOk) {
      const body = JSON.parse(resSuccess.body);
      const data = body.data || body;
      token = data.token || data.accessToken || data.access_token || body.token;
      log('Đăng nhập thành công! Đã trích xuất token thành công.', 'SUCCESS');
    } else {
      log(`Đăng nhập thất bại. Status code: ${resSuccess.status}. Body: ${resSuccess.body}`, 'WARNING');
    }

    // Case 1.2 (Negative): Đăng nhập với mật khẩu sai
    log('Gửi yêu cầu đăng nhập với thông tin mật khẩu sai...');
    const payloadWrongPass = JSON.stringify({
      username: CONFIG.credentials.username,
      password: 'wrong_password_xyz_9999',
    });
    const resWrongPass = http.post(url, payloadWrongPass, params);
    check(resWrongPass, {
      'Mật khẩu sai trả về 401 hoặc 400': (r) => r.status === 401 || r.status === 400,
    });

    // Case 1.3 (Negative & Boundary): Đăng nhập với dữ liệu trống (Thiếu username/password)
    log('Gửi yêu cầu đăng nhập với dữ liệu trống...');
    const payloadEmpty = JSON.stringify({
      username: '',
      password: '',
    });
    const resEmpty = http.post(url, payloadEmpty, params);
    check(resEmpty, {
      'Dữ liệu trống trả về 400 hoặc 401': (r) => r.status === 400 || r.status === 401,
    });
  });

  sleep(1);

  // Nhóm 2: Kiểm thử API Tổng quan (Đơn vị hoặc Toàn hệ thống)
  group('2. API Tổng quan dự án BĐS N3', function () {
    const url = `${CONFIG.domain}/report_api_v2/api/v1/public/bds/n3/tong-quan-du-an`;

    // Case 2.1 (Positive - Có Token): Lọc theo đơn vị hiện tại
    if (token) {
      group('2.1. Lấy tổng quan dự án theo Đơn vị (Có token)', function () {
        log('Gửi yêu cầu lấy tổng quan dự án kèm JWT Token hợp lệ...');
        const params = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        };
        const res = http.get(url, params);

        check(res, {
          'Status code lấy tổng quan có token là 200': (r) => r.status === 200,
          'Response chứa đầy đủ 6 chỉ tiêu tổng quan': (r) => {
            try {
              const body = JSON.parse(r.body);
              const data = body.data || body;
              
              // Validate 6 chỉ tiêu N3 có mặt trong response
              const fields = [
                'chap_thuan_chu_truong',
                'cap_phep_xay_dung',
                'dang_trien_khai',
                'da_hoan_thanh',
                'chuyen_nhuong',
                'bds_du_dieu_kien_kd'
              ];
              
              return fields.every(field => field in data);
            } catch (e) {
              return false;
            }
          },
          'Kiểu dữ liệu chỉ tiêu là hợp lệ': (r) => {
            try {
              const body = JSON.parse(r.body);
              const data = body.data || body;
              
              // Các chỉ tiêu chap_thuan_chu_truong, cap_phep_xay_dung v.v. phải là số nguyên (Number) hoặc Object chứa dữ liệu số
              const ct1 = data.chap_thuan_chu_truong;
              const ct2 = data.cap_phep_xay_dung;
              
              return (typeof ct1 === 'number' || typeof ct1 === 'object') && 
                     (typeof ct2 === 'number' || typeof ct2 === 'object');
            } catch (e) {
              return false;
            }
          }
        });
      });
    } else {
      log('Bỏ qua test case 2.1 (Yêu cầu token) do Login thất bại.', 'WARNING');
    }

    sleep(1);

    // Case 2.2 (Positive - Không Token): Lấy số liệu toàn hệ thống (Public)
    group('2.2. Lấy tổng quan dự án Toàn hệ thống (Public - Không token)', function () {
      log('Gửi yêu cầu lấy tổng quan dự án không kèm token (Cổng công khai)...');
      const params = {
        headers: {
          'Accept': 'application/json',
        },
      };
      const res = http.get(url, params);

      check(res, {
        'Status code lấy tổng quan công khai là 200': (r) => r.status === 200,
        'Response chứa các trường dữ liệu tổng quan': (r) => {
          try {
            const body = JSON.parse(r.body);
            const data = body.data || body;
            return typeof data === 'object' && data !== null;
          } catch (e) {
            return false;
          }
        }
      });
    });

    sleep(1);

    // Case 2.3 (Security - Token sai/hết hạn)
    group('2.3. Kiểm thử Bảo mật - Token không hợp lệ (Bypass Authentication)', function () {
      log('Gửi yêu cầu lấy tổng quan dự án với Token giả mạo...');
      const params = {
        headers: {
          'Authorization': 'Bearer invalid_jwt_token_format_mock_123456',
          'Accept': 'application/json',
        },
      };
      const res = http.get(url, params);

      check(res, {
        'Token sai trả về 401 Unauthorized hoặc 403 Forbidden': (r) => r.status === 401 || r.status === 403,
      });
    });
  });
}
