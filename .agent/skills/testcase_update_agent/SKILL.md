---

name: KBKT Update Agent
description: Skill chuyên cập nhật, refactor và chuẩn hóa KBKT hiện có dựa trên TKCT, BRD, Use Case, Requirement hoặc Change Request mới.

execution_mode: full_auto
approval_mode: never
temporary_file_policy: minimize
excel_update_mode: direct_edit
------------------------------

# KBKT Update Agent

## Description

Skill dùng để cập nhật, chuẩn hóa, mở rộng hoặc sửa đổi bộ KBKT (Kịch bản kiểm thử) đã tồn tại.

Mục tiêu:

* Không sinh mới toàn bộ KBKT nếu đã tồn tại.
* Tái sử dụng tối đa testcase hiện có.
* Phát hiện testcase thiếu.
* Cập nhật testcase không còn phù hợp.
* Chuẩn hóa toàn bộ KBKT theo format chuẩn.

---

## When To Use

Sử dụng khi:

* User cung cấp KBKT hiện có và yêu cầu cập nhật.
* Requirement thay đổi.
* Có tài liệu TKCT mới.
* Có Change Request (CR).
* Cần review chất lượng KBKT.
* Cần chuẩn hóa format KBKT.

Không sử dụng khi:

* Chưa có KBKT gốc.
* Cần sinh testcase hoàn toàn mới.

---

## Execution Policy (MANDATORY)

### FULL AUTO MODE

BẮT BUỘC thực hiện toàn bộ quá trình cập nhật KBKT theo chế độ tự động.

Agent phải:

* Tự động đọc toàn bộ tài liệu đầu vào.
* Tự động phân tích sự khác biệt giữa KBKT và tài liệu mới.
* Tự động thực hiện Impact Analysis.
* Tự động thực hiện Gap Analysis.
* Tự động thực hiện Refactor Testcases.
* Tự động thực hiện Generate Missing Testcases.
* Tự động cập nhật KBKT.
* Tự động sinh báo cáo tổng hợp.
* Tự động hoàn tất workflow.

Không được:

* Dừng để yêu cầu xác nhận từng bước.
* Dừng để yêu cầu Submit thủ công.
* Dừng để yêu cầu Approve thủ công.
* Hỏi lại các thông tin đã tồn tại trong tài liệu đầu vào.
* Yêu cầu người dùng xác nhận sau mỗi Use Case.
* Chia nhỏ công việc thành nhiều phiên làm việc không cần thiết.

Chỉ được phép dừng khi:

* Thiếu tài liệu đầu vào bắt buộc.
* File bị lỗi hoặc không thể đọc.
* Không xác định được phạm vi cập nhật.
* Tài liệu tham chiếu không đầy đủ để truy vết.

---

### File Processing Policy

Ưu tiên:

* Đọc trực tiếp file nguồn.
* Xử lý dữ liệu trong bộ nhớ (in-memory).
* Tái sử dụng dữ liệu đã đọc.
* Tái sử dụng kết quả phân tích đã có.

Không được:

* Sinh nhiều file Python trung gian (*.py).
* Sinh script riêng cho từng Use Case.
* Sinh file debug.
* Sinh file log phân tích.
* Sinh file tạm cho từng bước xử lý.
* Sinh file kết quả trung gian không phục vụ đầu ra cuối cùng.

Nếu bắt buộc phải tạo file tạm:

* Chỉ tạo tối đa một file tạm.
* Tự động xóa sau khi hoàn thành.
* Không đưa file tạm vào kết quả bàn giao.

---

### Excel Update Policy

Khi cập nhật KBKT:

* Chỉnh sửa trực tiếp trên file KBKT hiện có.
* Giữ nguyên định dạng Excel.
* Giữ nguyên style.
* Giữ nguyên màu sắc.
* Giữ nguyên merge cell.
* Giữ nguyên công thức hiện có.
* Giữ nguyên cấu trúc sheet.

Không được:

* Tạo một file Excel mới để thay thế toàn bộ.
* Ghi đè testcase hiện có nếu không thuộc phạm vi cập nhật.
* Thay đổi format chuẩn của KBKT.

---

### Output Policy

Chỉ tạo:

* KBKT đã cập nhật.
* Impact Analysis.
* Keep / Update / Remove / Add Mapping.
* Gap Analysis Summary.
* Test Coverage Summary.
* Traceability Summary.

Không tạo:

* File Python trung gian.
* File backup.
* File debug.
* File log.
* File export tạm.
* File phân tích trung gian.

---

### Completion Policy

Chỉ được coi là hoàn thành khi:

* Đã thực hiện Impact Analysis.
* Đã thực hiện Gap Analysis.
* Đã xác định Keep / Update / Remove / Add.
* Đã cập nhật toàn bộ testcase bị ảnh hưởng.
* Đã bổ sung toàn bộ testcase còn thiếu.
* Đã xuất báo cáo tổng hợp.
* Đã kiểm tra Traceability.
* Đã dọn dẹp toàn bộ file tạm phát sinh.

---

## Workflow

### Bước 1 – Impact Analysis

Đọc:

* KBKT hiện tại
* TKCT
* Use Case
* BRD/SRS
* Requirement mới

Xác định:

* Module bị ảnh hưởng
* Business Rule bị ảnh hưởng
* Trường dữ liệu mới
* Luồng mới
* Quyền mới

Output:

| Hạng mục      | Ảnh hưởng |
| ------------- | --------- |
| Module        | Impact    |
| Function      | Impact    |
| Business Rule | Impact    |

---

### Bước 2 – Mapping KBKT Hiện Tại

Phân loại testcase:

#### Keep

Requirement không thay đổi.

#### Update

Requirement thay đổi.

#### Remove

Chức năng bị loại bỏ.

#### Add

Requirement mới chưa có testcase.

Output:

| TC ID         | Action |
| ------------- | ------ |
| LOGIN_001     | Keep   |
| LOGIN_005     | Update |
| LOGIN_007     | Remove |
| LOGIN_NEW_001 | Add    |

---

### Bước 3 – Gap Analysis

Đối chiếu:

KBKT ↔ TKCT ↔ Requirement

Kiểm tra thiếu:

* Happy Path
* Negative
* Boundary
* Permission
* Security
* Validation
* Business Rule

Output:

### Missing Testcases

### Missing Validations

### Missing Business Rules

---

### Bước 4 – Refactor Testcases

Cập nhật:

* Mục đích kiểm thử
* Bước thực hiện
* Kết quả mong muốn
* Test Data
* Priority
* Risk Level

Quy tắc:

* Giữ nguyên TC ID nếu không cần đổi.
* Không tạo TC mới nếu chỉ sửa nội dung.
* Bảo toàn traceability.

---

### Bước 5 – Generate Missing Testcases

Sinh testcase cho:

* Requirement mới
* Validation mới
* Rule mới
* Permission mới
* Security mới

Áp dụng:

* Equivalence Partitioning
* Boundary Value Analysis
* Decision Table
* State Transition

---

### Bước 6 – Export KBKT

Format bắt buộc:

| Mã trường hợp kiểm thử | Mục đích kiểm thử | Các bước thực hiện | Kết quả mong muốn | Kết quả hiện tại | Mã lỗi | Ghi chú |
| ---------------------- | ----------------- | ------------------ | ----------------- | ---------------- | ------ | ------- |

Quy tắc:

* Kết quả hiện tại = P
* Mã lỗi để trống
* Ghi chú chứa:

  * Test Data
  * Preconditions
  * Priority
  * Risk Level

---

## Special Rules

### Bắt buộc

* So sánh KBKT cũ với tài liệu mới.
* Chỉ rõ testcase nào Keep / Update / Remove / Add.
* Xuất Impact Analysis trước khi cập nhật.
* Bảo toàn traceability.
* Không bỏ sót regression testcase.
* Không bỏ sót business rule.
* Không bỏ sót validation rule.

### Nghiêm cấm

* Sinh lại toàn bộ KBKT khi chỉ thay đổi nhỏ.
* Đổi TC ID tùy ý.
* Xóa testcase mà không nêu lý do.
* Bỏ qua regression testcase.
* Sinh hàng loạt file Python trung gian.
* Yêu cầu submit thủ công.
* Yêu cầu approve thủ công.

---

## Output

### 1. Impact Analysis

### 2. Danh sách TC Keep / Update / Remove / Add

### 3. KBKT sau cập nhật

| Mã trường hợp kiểm thử | Mục đích kiểm thử | Các bước thực hiện | Kết quả mong muốn | Kết quả hiện tại | Mã lỗi | Ghi chú |

### 4. Summary

* TC giữ nguyên
* TC cập nhật
* TC xóa
* TC bổ sung
* Tổng số testcase sau cập nhật
* Tổng số Business Rule được bao phủ
* Tổng số Validation Rule được bao phủ
* Tổng số Requirement được truy vết
