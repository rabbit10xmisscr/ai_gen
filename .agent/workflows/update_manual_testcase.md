---
description: update kbkt
---

# Workflow: Cập nhật Manual Test Cases từ KBKT hiện có theo AI-RBT Framework (FULL RBT Mode)

> **MANDATORY SKILL**
>
> Trước khi thực hiện bất kỳ tác vụ nào, Agent PHẢI:
>
> 1. Nạp và đọc toàn bộ nội dung:
>
>    * `.agent/skills/testcase_update_agent/SKILL.md`
> 2. Sử dụng:
>
>    * FULL RBT MODE
> 3. Nếu được cung cấp tài liệu thiết kế:
>
>    * TKCT
>    * SRS
>    * BRD
>    * Use Case
>    * User Story
>    * Mockup/UI Design
>    * API Spec
>    * Release Note
>    * Change Request
>
> Agent PHẢI sử dụng thêm skill:
>
> * `requirements_analyzer`

---

# Mục tiêu

Workflow này được sử dụng để:

* Phân tích sự thay đổi của hệ thống
* So sánh với KBKT hiện hữu
* Xác định tác động kiểm thử
* Cập nhật KBKT hiện có
* Bổ sung KBKT còn thiếu
* Loại bỏ KBKT không còn hiệu lực
* Đảm bảo độ bao phủ kiểm thử theo AI-RBT Framework

---

# Nguyên tắc bắt buộc

## Tuyệt đối không

❌ Không sinh lại toàn bộ KBKT nếu đã có KBKT hiện hữu

❌ Không thay đổi mã KBKT khi testcase vẫn cùng mục đích

❌ Không xoá testcase nếu chưa đánh giá tác động

❌ Không bỏ qua bước Gap Analysis

❌ Không bỏ qua bước Traceability

---

## Luôn ưu tiên

1. Cập nhật testcase hiện có
2. Tái sử dụng testcase hiện có
3. Bổ sung testcase thiếu
4. Đánh dấu testcase obsolete

---

## Ngôn ngữ

Toàn bộ output phải bằng Tiếng Việt.

---

# INPUT BẮT BUỘC

## 1. KBKT hiện có

Các định dạng được chấp nhận:

* Excel (.xlsx)
* CSV
* Markdown Table

---

## 2. Tài liệu thay đổi

Có thể gồm:

* BRD
* SRS
* Use Case
* User Story
* TKCT
* UI Design
* API Document
* Release Note
* Change Request

---

## 3. Phạm vi cập nhật

Ví dụ:

* Module Người dùng
* Module Vai trò
* Dashboard
* Báo cáo
* API

---

# BƯỚC 1: PHÂN TÍCH KBKT HIỆN HỮU

## Thực hiện

Agent phải đọc toàn bộ KBKT hiện có.

---

## Phân loại từng KBKT

### Nhóm A - Có khả năng giữ nguyên

Không liên quan thay đổi.

### Nhóm B - Có khả năng cập nhật

Liên quan requirement thay đổi.

### Nhóm C - Có khả năng loại bỏ

Requirement không còn tồn tại.

### Nhóm D - Thiếu bao phủ

Requirement có nhưng chưa có testcase.

---

## Output

| Mã KBKT | Module | Phân loại sơ bộ |
| ------- | ------ | --------------- |
| TC001   | User   | Update          |
| TC002   | User   | Keep            |
| TC003   | User   | Remove          |

---

# BƯỚC 2: PHÂN TÍCH REQUIREMENT & TKCT

## Đọc toàn bộ tài liệu

Agent phải đọc:

### Requirement Level

* BRD
* SRS
* User Story
* Use Case

### Design Level

* TKCT
* UI Design
* API Design
* Sequence Diagram
* DB Design

---

## Trích xuất

### Chức năng mới

NEW

### Chức năng sửa

MODIFIED

### Chức năng xoá

REMOVED

---

## Đối với TKCT

Agent bắt buộc phân tích:

### Màn hình

* Tên màn hình
* Chức năng

### Field

* Tên field
* Kiểu dữ liệu
* Bắt buộc
* Validation
* Max Length
* Min Length
* Format

### Button

* Action
* Điều kiện enable

### API

* Request
* Response
* Error Code

### Rule nghiệp vụ

* Business Rule
* Workflow
* State Transition

---

# BƯỚC 3: IMPACT ANALYSIS

## Mapping

Requirement → TKCT → KBKT

---

## Đánh giá mức độ ảnh hưởng

### LOW

Không ảnh hưởng testcase.

### MEDIUM

Sửa bước thực hiện.

### HIGH

Sửa logic kiểm thử.

### CRITICAL

Sinh testcase mới.

---

## Output

| Requirement | Module    | Impact Level |
| ----------- | --------- | ------------ |
| REQ-01      | User      | HIGH         |
| REQ-02      | Dashboard | CRITICAL     |

---

## DỪNG

Yêu cầu user xác nhận Impact Analysis.

---

# BƯỚC 4: GAP ANALYSIS

## Mapping

Requirement ↔ KBKT

---

## Phân loại

### KEEP

Không đổi.

### MODIFY

Cần sửa.

### ADD

Thiếu testcase.

### REMOVE

Không còn áp dụng.

---

## Output

### Danh sách MODIFY

| KBKT  | Lý do               |
| ----- | ------------------- |
| TC001 | Validation thay đổi |

---

### Danh sách ADD

| Requirement | Lý do            |
| ----------- | ---------------- |
| REQ-15      | Chưa có testcase |

---

### Danh sách REMOVE

| KBKT  |
| ----- |
| TC089 |

---

### Ambiguity List

Q1...

Q2...

---

## DỪNG

Chờ user trả lời.

---

# BƯỚC 5: RÀ SOÁT ĐỘ BAO PHỦ

## Mapping Matrix

Requirement → Scenario → KBKT

---

## Kiểm tra đầy đủ

### Functional

* Happy Path
* Alternate Flow
* Exception Flow

### Validation

* Mandatory
* Format
* Length
* Duplicate

### Security

* Authentication
* Authorization

### Integration

* API
* DB
* External System

### Data

* CRUD
* Integrity

### Edge Cases

* Boundary
* Negative
* Null
* Special Character

---

## Output

Traceability Matrix

| Requirement | KBKT  | Coverage |
| ----------- | ----- | -------- |
| REQ-01      | TC001 | Covered  |
| REQ-02      | -     | Missing  |

---

# BƯỚC 6: CẬP NHẬT KBKT CHI TIẾT

## Nếu testcase tồn tại

Giữ nguyên mã KBKT.

Chỉ cập nhật:

* Mục đích kiểm thử
* Bước thực hiện
* Kết quả mong muốn

---

## Nếu testcase mới

Sinh mã mới.

---

# QUY TẮC SINH TESTCASE

## Bắt buộc áp dụng

### Risk-Based Testing

* High Risk
* Medium Risk
* Low Risk

### Equivalence Partitioning

### Boundary Value Analysis

### Decision Table

### State Transition

### Pairwise (nếu cần)

---

# QUY TẮC VALIDATION FIELD

Đối với mỗi field trên màn hình:

Agent phải tạo testcase riêng cho:

### Mandatory

### Min Length

### Max Length

### Boundary

### Invalid Format

### Special Character

### SQL Injection

### XSS

### Duplicate

### Permission

KHÔNG được gộp nhiều validation field vào cùng một testcase.

---

# BƯỚC 7: REVIEW CHẤT LƯỢNG TESTCASE

Đối với từng testcase:

Kiểm tra:

□ Có requirement tham chiếu

□ Có mục đích rõ ràng

□ Có bước thực hiện chi tiết

□ Có dữ liệu kiểm thử

□ Có expected result đo được

□ Không trùng testcase khác

□ Có thể thực thi độc lập

□ Có khả năng truy vết

Nếu không đạt -> sửa trước khi xuất.

---

# BƯỚC 8: XUẤT KBKT

## Định dạng bắt buộc

| Mã trường hợp kiểm thử | Mục đích kiểm thử | Các bước thực hiện | Kết quả mong muốn | Kết quả hiện tại | Mã lỗi | Ghi chú |
| ---------------------- | ----------------- | ------------------ | ----------------- | ---------------- | ------ | ------- |

---

# TÀI LIỆU ĐẦU RA BẮT BUỘC

## 1. KBKT đã cập nhật

Toàn bộ testcase sau khi cập nhật.

--

## 2. Xuất file (.md hoặc .xlxs)

---

# TIÊU CHÍ HOÀN THÀNH

Chỉ được coi là hoàn thành khi:

✓ Đã phân tích toàn bộ tài liệu

✓ Đã mapping Requirement → TKCT → KBKT

✓ Đã thực hiện Gap Analysis

✓ Đã review độ bao phủ

✓ Đã cập nhật testcase hiện có

✓ Đã bổ sung testcase thiếu

✓ Đã tạo Traceability Matrix

✓ Đã xuất đầy đủ báo cáo Impact Analysis

✓ Không còn Requirement ở trạng thái Uncovered