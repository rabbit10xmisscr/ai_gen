# Hướng dẫn chạy Kiểm thử API tự động với k6

Thư mục này chứa kịch bản kiểm thử API tự động bằng **k6** (của Grafana) cho phân hệ BĐS N3 - Tổng quan về dự án. Kịch bản bao gồm kiểm thử chức năng, kiểm thử âm bản (negative), kiểm thử biên và kiểm thử bảo mật cơ bản.

---

## 1. Hướng dẫn cài đặt k6 trên Windows

Bạn có thể cài đặt k6 bằng một trong các phương pháp sau:

### Cách 1: Sử dụng Windows Package Manager (Khuyên dùng)
Mở PowerShell (với quyền Admin) và chạy lệnh:
```powershell
winget install gnu.k6
```
*Lưu ý: Sau khi cài đặt xong, hãy khởi động lại Terminal để PATH được cập nhật.*

### Cách 2: Sử dụng Chocolatey
```powershell
choco install k6
```

### Cách 3: Tải trực tiếp file Binary
1. Truy cập [trang release của k6 trên GitHub](https://github.com/grafana/k6/releases).
2. Tải về file zip phù hợp với Windows (ví dụ: `k6-vX.Y.Z-amd64.zip`).
3. Giải nén và thêm đường dẫn thư mục chứa file `k6.exe` vào biến môi trường `PATH` của hệ thống.

---

## 2. Cấu hình thông tin kiểm thử

Trước khi chạy kiểm thử, bạn cần mở file [config.js](file:///d:/Trainee/Trainee/Viettel_AI/AI_gen/k6-api-tests/config.js) và cập nhật thông tin đăng nhập thật tại mục `credentials`:

```javascript
  credentials: {
    username: "tài_khoản_đăng_nhập_thật_của_bạn",
    password: "mật_khẩu_thật_của_bạn"
  }
```

---

## 3. Thực thi kịch bản kiểm thử

Mở Terminal tại thư mục `k6-api-tests` (hoặc chạy trong PowerShell từ thư mục dự án):

### Chạy kiểm thử xác minh chức năng (Functional / Verification Mode)
Chạy mặc định kịch bản cấu hình trong `config.js` (1 User chạy 1 lần):
```powershell
k6 run api-tests.js
```

### Chạy kiểm thử tải (Load Testing) trực tiếp qua dòng lệnh
Nếu bạn muốn thử nghiệm tải với nhiều người dùng ảo (VUs) cùng lúc mà không thay đổi file cấu hình, bạn có thể override trực tiếp bằng các flag:

- Chạy với 5 Virtual Users song song trong 30 giây:
  ```powershell
  k6 run --vus 5 --duration 30s api-tests.js
  ```

---

## 4. Giải thích cấu trúc kịch bản kiểm thử (`api-tests.js`)

Kịch bản được thiết kế thành 2 nhóm kiểm thử chính:

1. **Nhóm 1: API Authentication (POST `/api/v1/auth/login`)**
   - **Case 1.1 (Positive)**: Đăng nhập thành công với tài khoản hợp lệ, kiểm tra HTTP status `200` và tự động trích xuất token JWT để sử dụng cho các request sau.
   - **Case 1.2 (Negative)**: Đăng nhập với mật khẩu sai. Hệ thống phải trả về status code `401` hoặc `400`.
   - **Case 1.3 (Negative)**: Đăng nhập với các trường trống. Hệ thống phải trả về status code `400` hoặc `401`.

2. **Nhóm 2: API Tổng quan dự án BĐS N3**
   - **Case 2.1 (Positive - Có Token)**: Gọi API tổng quan kèm Authorization Header chứa JWT Token vừa lấy được ở bước 1. Xác thực status code `200` và kiểm tra sự tồn tại của 6 chỉ tiêu N3 (`chap_thuan_chu_truong`, `cap_phep_xay_dung`, `dang_trien_khai`, `da_hoan_thanh`, `chuyen_nhuong`, `bds_du_dieu_kien_kd`).
   - **Case 2.2 (Positive - Không Token)**: Gọi API tổng quan nhưng không truyền Authorization Header. Xác thực status code `200` (đại diện cho API public xem toàn hệ thống).
   - **Case 2.3 (Security - Token sai)**: Gọi API tổng quan nhưng truyền kèm Token giả mạo. Xác thực hệ thống trả về `401` hoặc `403` để bảo vệ tài nguyên.
