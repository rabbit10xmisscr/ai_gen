/**
 * Cấu hình môi trường và tham số kiểm thử cho k6.
 * Thay đổi thông tin credentials thực tế để chạy kiểm thử thành công.
 */
export const CONFIG = {
  // Domain mặc định lấy từ Postman collection
  domain: "https://dmp357.moc.gov.vn",
  
  // Tài khoản đăng nhập (Cần được cập nhật bởi Tester)
  credentials: {
    username: "test_user_n3",
    password: "secure_password_123"
  },

  // Cấu hình k6 Options để kiểm thử tải & ngưỡng đánh giá (Thresholds)
  options: {
    // 1. Ngưỡng đánh giá chất lượng dịch vụ (SLA)
    thresholds: {
      // Tỷ lệ request bị lỗi phải dưới 1%
      http_req_failed: ['rate<0.01'],
      // 95% request phải hoàn thành trong vòng 2000ms (2 giây)
      http_req_duration: ['p(95)<2000'],
    },

    // 2. Kịch bản chạy (Chạy verify chức năng mặc định với 1 VU, 1 Iteration)
    scenarios: {
      functional_test: {
        executor: 'shared-iterations',
        vus: 1,
        iterations: 1,
        maxDuration: '30s',
      },
      // Có thể kích hoạt kịch bản Load Test bằng cách đổi cấu hình chạy trong tương lai
      /*
      load_test: {
        executor: 'ramping-vus',
        startVUs: 0,
        stages: [
          { duration: '30s', target: 5 }, // Ramp up lên 5 users
          { duration: '1m', target: 5 },  // Giữ tải ở 5 users
          { duration: '15s', target: 0 }, // Ramp down xuống 0
        ],
        gracefulRampDown: '30s',
      }
      */
    }
  }
};
