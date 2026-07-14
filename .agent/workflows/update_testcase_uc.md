---
description: Cập nhật Kịch bản Kiểm thử Data Quality từ Use Case và Tài liệu Thiết kế Chi tiết uc
---

# THÔNG TIN ĐẦU VÀO (INPUT VARIABLES)
Hãy sử dụng các thông tin dưới đây để thực hiện nhiệm vụ:
- {{TEN_MODULE}}: [Điền tên module, VD: Data Quality / Ingestion]
- {{FILE_KBKT_HIEN_TAI}}: [Điền tên file KBKT gốc, VD: Ingestion.xlsx]
- {{FILE_TKCT_FE}}: [Điền tên file TKCT FE, VD: QT9.5.1.BM.04_Thiet ke chi tiet_Module chức năng Ingestion_FE.docx]
- {{FILE_TKCT_API}}: [Điền tên file API Spec, VD: QT9.5.1.BM.04_Thiet ke chi tiet_Module Tính năng Ingestion (API).docx]
- {{FILE_DANH_SACH_USE_CASE}}: [Điền tên file list Use Case, VD: ULNL License Nâng cấp DMP 2025 QLCL check.xlsx]
- {{FILE_KBKT_CAN_CAP_NHAT}}: [Điền tên file KBKT đích, VD: (UC347-560)DataQuality v1.0.xlsx]
- {{GIA_TRI_COT_LOAI}}: [Điền điều kiện lọc cột Loại, VD: Data Quality]
- {{GIA_TRI_COT_KBKT}}: [Điền điều kiện lọc cột KBKT, VD: Chưa có]

---

# WORKFLOW: Cập nhật Kịch bản Kiểm thử {{TEN_MODULE}} từ Use Case và Tài liệu Thiết kế Chi tiết

> **BẮT BUỘC (MANDATORY SKILL):**
>
> Trước khi thực hiện bất kỳ tác vụ nào, bạn PHẢI nạp và đọc kỹ nội dung của skill:
>
> * `testcase_update_agent` (tại `.agent/skills/testcase_update_agent/SKILL.md`)
>
> Skill này là nguồn hướng dẫn chính cho toàn bộ quá trình cập nhật KBKT.
>
> Ngoài ra, cần tham khảo thêm các skill sau (nếu có):
>
> * `requirements_analyzer`
> * `business_rule_analyzer`
> * `test_design_expert`
>
> Trong trường hợp có xung đột giữa các hướng dẫn:
>
> 1. Ưu tiên yêu cầu trong Workflow này.
> 2. Sau đó ưu tiên skill `testcase_update_agent`.
> 3. Cuối cùng mới tham khảo các skill hỗ trợ khác.
>
> **Chế độ thực hiện bắt buộc: FULL RBT (Risk-Based Testing) Mode**
>
> Mọi testcase được bổ sung phải tuân thủ nguyên tắc:
>
> * Risk Coverage
> * Business Rule Coverage
> * Functional Coverage
> * Validation Coverage
> * Negative Coverage
> * Boundary Coverage
> * Permission Coverage
> * API Coverage
>
> Không được tạo testcase theo cách liệt kê đơn thuần hoặc chỉ bao phủ Happy Path.

---

# Vai trò (Role)

Bạn là một **Senior Test Analyst / QA Lead** có kinh nghiệm phân tích yêu cầu nghiệp vụ, tài liệu thiết kế chi tiết và xây dựng bộ Kịch bản Kiểm thử (KBKT) theo chuẩn kiểm thử thủ công (Manual Testing).

---

# Tài liệu đầu vào

## 1. Kịch bản kiểm thử hiện có

**File:** `{{FILE_KBKT_HIEN_TAI}}`

Đây là bộ KBKT hiện tại của module {{TEN_MODULE}}.

## 2. Tài liệu thiết kế chi tiết

### Tài liệu chức năng

* `{{FILE_TKCT_FE}}`

### Tài liệu API

* `{{FILE_TKCT_API}}`

Sử dụng để phân tích:

* Chức năng màn hình
* Luồng xử lý
* Business Rule
* Điều kiện kiểm tra dữ liệu
* API Request/Response
* Validation
* Quy tắc phân quyền
* Điều kiện ngoại lệ
* Thông báo lỗi
* Các trường dữ liệu và ràng buộc

## 3. Danh sách Use Case

**File:** `{{FILE_DANH_SACH_USE_CASE}}`

---

# Mục tiêu

Rà soát danh sách Use Case trong file:

`{{FILE_DANH_SACH_USE_CASE}}`

và cập nhật KBKT cho các Use Case còn thiếu.

---

# Bước 1. Xác định Use Case cần bổ sung KBKT

Chỉ xử lý các Use Case thỏa mãn đồng thời:

* Cột **Loại** = `{{GIA_TRI_COT_LOAI}}`
* Cột **KBKT** = `{{GIA_TRI_COT_KBKT}}`

Danh sách này được coi là phạm vi chính thức cần bổ sung testcase.

---

# Bước 2. Phân tích yêu cầu

Đối với từng Use Case cần bổ sung:

1. Đọc và phân tích nội dung Use Case.
2. Đối chiếu với tài liệu thiết kế chức năng.
3. Đối chiếu với tài liệu thiết kế API.
4. Đối chiếu với KBKT hiện có.
5. Truy xuất toàn bộ Business Rule liên quan.

Xác định đầy đủ:

### Luồng nghiệp vụ

* Happy Path
* Alternative Flow
* Exception Flow

### Điều kiện kiểm tra

* Validation Rule
* Business Rule
* Permission Rule
* Search Rule
* Filter Rule
* Import Rule
* Export Rule
* Synchronization Rule

### Điều kiện dữ liệu

* Empty Data
* Null Data
* Invalid Data
* Duplicate Data
* Boundary Data
* Special Character Data
* Unicode Data

### Điều kiện API

* Valid Request
* Invalid Request
* Missing Required Field
* Wrong Data Type
* Invalid Format
* Unauthorized Request
* Response Validation
* HTTP Status Validation

---

# Bước 3. Đối chiếu KBKT hiện có

Đọc file:

`{{FILE_KBKT_HIEN_TAI}}`

Thực hiện:

* Kiểm tra testcase đã tồn tại.
* Không sinh testcase trùng lặp.
* Kế thừa quy tắc đặt mã testcase hiện hành.
* Kế thừa cấu trúc nhóm testcase hiện hành.
* Giữ nguyên format hiện tại.

---

# Bước 4. Thiết kế Test Case theo FULL RBT

## Functional Coverage

Bắt buộc bao phủ:

* Create
* View
* Edit
* Delete
* Search
* Filter
* Import
* Export
* Execute
* Approve
* Reject

(Nếu chức năng có hỗ trợ)

---

## Validation Coverage

Bao phủ:

* Mandatory Field
* Length Validation
* Format Validation
* Data Type Validation
* Range Validation
* Business Validation

---

## Business Rule Coverage

Bao phủ toàn bộ:

* Business Rule trong Use Case
* Business Rule trong TKCT
* Business Rule trong API Spec

---

## Negative Coverage

Bao phủ:

* Input không hợp lệ
* Thiếu dữ liệu
* Sai kiểu dữ liệu
* Sai định dạng
* Truy cập trái phép
* Điều kiện xử lý thất bại

---

## Boundary Coverage

Áp dụng:

* Min Value
* Max Value
* Min Length
* Max Length
* Ngưỡng biên nghiệp vụ

---

## Permission Coverage

Bao phủ:

* User có quyền
* User không có quyền
* User sai quyền
* User chưa đăng nhập

---

## API Coverage

Bao phủ:

* Success Response
* Error Response
* Validation Response
* Permission Response
* Exception Response

---

# Bước 5. Viết Test Case theo đúng format KBKT

Sử dụng chính xác format của file KBKT

|Mã trường hợp kiểm thử |Mục đích kiểm thử|Các bước thực hiện|Kết quả mong muốn|Kết quả lần 1| Kết quả lần 2|Kết quả lần 3|Kết quả hiện tại|Mã lỗi|	Ghi chú|
							

## Quy tắc viết

### Mục đích kiểm thử

* Mô tả rõ ràng mục tiêu xác minh.
* Liên kết với Use Case và Business Rule.

### Các bước thực hiện

* Viết chi tiết từng bước.
* Không gộp bước.
* Ghi rõ dữ liệu đầu vào.
* Bám sát giao diện hoặc API theo TKCT.

### Kết quả mong muốn

* Cụ thể.
* Có thể kiểm chứng.
* Thể hiện đúng Business Rule.
* Thể hiện đúng thông báo lỗi.

### Kết quả hiện tại

* Để trống.

### Mã lỗi

* Để trống.

---

# Bước 6. Cập nhật trực tiếp file KBKT

Bổ sung testcase mới vào:

`{{FILE_KBKT_CAN_CAP_NHAT}}`

Yêu cầu:

* Giữ nguyên format Excel.
* Không xóa các testcase đã có sẵn
* Giữ nguyên style.
* Giữ nguyên màu sắc.
* Giữ nguyên merge cell.
* Không chỉnh sửa testcase hiện có.
* Chỉ thêm testcase mới.
* Đánh số testcase liên tục.

---

# Quy tắc bắt buộc

## Traceability

Mỗi testcase phải truy vết được tới:

* Use Case
* Business Rule
* Màn hình chức năng
* API
* Thiết kế chi tiết

---

## Không được tự suy diễn

Không được tạo testcase nếu:

* Không có Use Case.
* Không có TKCT.
* Không có API Spec.
* Không xác định được Business Rule.

---

## Không bỏ sót

Bắt buộc kiểm tra:

* Happy Path
* Alternative Flow
* Exception Flow
* Validation
* Boundary
* Business Rule
* Permission
* API
* Duplicate Data
* Null Data
* Special Character
* Unicode
* Error Message

---

# Kết quả đầu ra

## 1. Tạo một sheet mới trong file KBKT ban đầu
Bổ sung toàn bộ testcase cho các Use Case:

* Loại = `{{GIA_TRI_COT_LOAI}}`
* KBKT = `{{GIA_TRI_COT_KBKT}}`

* Đã bổ sung đầy đủ testcase theo FULL RBT.

* Không có testcase trùng lặp với KBKT hiện tại.

* Đảm bảo đầy đủ các usecase có loại là `{{GIA_TRI_COT_LOAI}}` và Note ở cột KBKT là `{{GIA_TRI_COT_KBKT}}`

* Đảm bảo vẫn giữ nguyên và không thay đổi gì ở sheet hiện có trên file KBKT ban đầu

* Đảm bảo sử dụng đúng form và format của các cột có trong file KBKT ban đầu

* Đảm bảo độ bao phủ kiểm thử tối đa dựa trên:

  * Use Case
  * Thiết kế chức năng
  * Thiết kế API
  * Business Rule
  * Risk-Based Testing