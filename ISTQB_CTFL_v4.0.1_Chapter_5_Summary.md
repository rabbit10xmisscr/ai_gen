# Tóm tắt Chương 5: Quản lý các hoạt động kiểm thử (Managing the Test Activities)
## Tài liệu: ISTQB Certified Tester Foundation Level (CTFL) Syllabus v4.0.1

Chương này tập trung vào khía cạnh quản lý kiểm thử, bao gồm lập kế hoạch kiểm thử, ước lượng công sức, quản lý rủi ro, giám sát và kiểm soát tiến độ, quản lý cấu hình và quản lý lỗi.

---

## 🔑 Từ khóa cốt lõi (Keywords)
* **Risk (Rủi ro):** Sự kiện tiềm ẩn có thể gây tác động tiêu cực đến mục tiêu dự án hoặc chất lượng sản phẩm.
* **Project Risk (Rủi ro dự án):** Rủi ro liên quan đến quản lý và kiểm soát dự án (tiến độ, ngân sách, nhân sự).
* **Product Risk (Rủi ro sản phẩm):** Rủi ro liên quan đến các đặc tính chất lượng của sản phẩm (chức năng, hiệu năng, bảo mật).
* **Risk-based Testing (Kiểm thử dựa trên rủi ro):** Hướng tiếp cận kiểm thử tập trung vào việc giảm thiểu mức độ rủi ro sản phẩm.
* **Entry Criteria (Tiêu chí bắt đầu):** Các điều kiện tiên quyết cần đạt để bắt đầu hoạt động kiểm thử.
* **Exit Criteria (Tiêu chí hoàn thành):** Các tiêu chuẩn cần đạt để tuyên bố hoạt động kiểm thử hoàn thành.
* **Configuration Management (Quản lý cấu hình):** Kỷ luật định danh, kiểm soát và theo dõi các phiên bản của các sản phẩm công việc (work products).
* **Defect Report (Báo cáo lỗi):** Tài liệu ghi lại bất thường (anomaly) phát hiện được để nhà phát triển có thể tái hiện và sửa chữa.

---

## 🎯 Mục tiêu học tập cốt lõi (Learning Objectives)
* **FL-5.1.1 (K2):** Hiểu rõ mục đích và nội dung của một Kế hoạch kiểm thử (Test Plan).
* **FL-5.1.3 (K2):** So sánh và phân biệt Entry Criteria và Exit Criteria.
* **FL-5.1.4 (K3):** Sử dụng các kỹ thuật ước lượng công sức kiểm thử.
* **FL-5.2.2 (K2):** Phân biệt Project Risks và Product Risks.
* **FL-5.2.3 (K2):** Hiểu cách phân tích rủi ro sản phẩm ảnh hưởng đến phạm vi kiểm thử.
* **FL-5.5.1 (K3):** Chuẩn bị một báo cáo lỗi (Defect Report) đầy đủ thông tin.

---

## 1. Kế hoạch kiểm thử (Test Planning)

### 📌 1.1. Mục đích và nội dung của Test Plan
Test Plan mô tả mục tiêu, nguồn lực và quy trình cho một dự án test. Nó giúp:
* Xác định phương thức và lịch trình đạt mục tiêu test.
* Đảm bảo các hoạt động test tuân thủ tiêu chí đã thiết lập.
* Làm phương tiện giao tiếp giữa các thành viên team và stakeholders.
* Chứng minh hoạt động kiểm thử tuân thủ test policy và test strategy.

#### 📁 Nội dung điển hình của Test Plan (theo ISO/IEC/IEEE 29119-3):
1. **Context of testing:** Phạm vi, mục tiêu, các tài liệu cơ sở (test basis).
2. **Assumptions and constraints:** Các giả định và ràng buộc của dự án.
3. **Stakeholders:** Vai trò, trách nhiệm, nhu cầu tuyển dụng và đào tạo nhân sự.
4. **Communication:** Hình thức, tần suất họp và mẫu báo cáo.
5. **Risk register:** Danh mục các rủi ro sản phẩm và rủi ro dự án.
6. **Test approach:** Test levels, test types, kỹ thuật test, entry/exit criteria, test data, test environment.
7. **Budget and schedule:** Ngân sách và lịch trình chi tiết.

### 👥 1.2. Đóng góp của Tester vào Iteration và Release Planning
* **Release Planning (Lập kế hoạch Release):** Định hướng dài hạn cho việc release sản phẩm. Tester tham gia:
  * Viết các User Story có khả năng kiểm thử được (testable user stories) và tiêu chí nghiệm thu (acceptance criteria).
  * Phân tích rủi ro chất lượng sản phẩm và rủi ro dự án.
  * Ước lượng công sức test cho các user stories.
  * Xác định hướng tiếp cận kiểm thử cho toàn bộ release.
* **Iteration Planning (Lập kế hoạch Sprint/Iteration):** Định hướng ngắn hạn cho một iteration. Tester tham gia:
  * Phân tích rủi ro chi tiết cho từng user story trong iteration backlog.
  * Đánh giá tính kiểm thử được (testability) của user stories.
  * Chia nhỏ user story thành các testing tasks và ước lượng công sức chi tiết cho từng task.
  * Làm mịn các khía cạnh kiểm thử chức năng và phi chức năng.

---

### 🚪 1.3. Tiêu chí bắt đầu và hoàn thành (Entry & Exit Criteria)

> [!IMPORTANT]
> Trong Agile, **Exit Criteria** thường được gọi là **Definition of Done (DoD)** cho một tính năng có thể release. **Entry Criteria** đối với một user story để bắt đầu phát triển/kiểm thử được gọi là **Definition of Ready (DoR)**.

| Tiêu chí | Định nghĩa | Ví dụ điển hình |
| :--- | :--- | :--- |
| **Entry Criteria (Bắt đầu)** | Các điều kiện tiên quyết để bắt đầu một hoạt động kiểm thử cụ thể. Nếu không đạt, việc test sẽ gặp khó khăn, tốn kém và rủi ro cao hơn. | - Sẵn sàng nguồn lực (con người, công cụ).<br>- Môi trường kiểm thử đã được thiết lập.<br>- Sẵn sàng dữ liệu kiểm thử (test data).<br>- Testware đã được phê duyệt.<br>- Mã nguồn vượt qua bài kiểm tra khói (smoke tests). |
| **Exit Criteria (Hoàn thành)** | Các tiêu chuẩn phải đạt được để tuyên bố một hoạt động kiểm thử hoàn thành (cho từng test level). | - Đạt độ bao phủ kiểm thử đã cam kết (coverage metrics).<br>- Số lượng lỗi chưa sửa nằm trong ngưỡng cho phép.<br>- Mật độ lỗi (defect density) thấp.<br>- Tất cả các bài kiểm tra theo kế hoạch đã chạy.<br>- Regression tests đã được tự động hóa. |

*Lưu ý:* Việc **hết thời gian hoặc cạn kiệt ngân sách** cũng có thể coi là Exit Criteria nếu stakeholders đã đánh giá và chấp nhận rủi ro để go-live mà không cần kiểm thử thêm.

---

### 🧮 1.4. Kỹ thuật ước lượng công sức kiểm thử (Estimation Techniques)
1. **Estimation based on ratios (Ước lượng dựa trên tỷ lệ):** Sử dụng các số liệu (metrics) lịch sử của tổ chức để đưa ra tỷ lệ cố định. Ví dụ, tỷ lệ công sức Dev : Test mặc định là `3 : 2`. Nếu Dev mất 600 ngày-công thì Test ước lượng mất 400 ngày-công.
2. **Extrapolation (Ngoại suy):** Thu thập dữ liệu thực tế ở giai đoạn đầu dự án, sau đó dùng mô hình toán học ngoại suy công sức cho phần việc còn lại. Rất thích hợp trong Agile (lấy công sức test trung bình của 3 iteration trước để ước lượng cho iteration sau).
3. **Wideband Delphi:** Kỹ thuật dựa trên ý kiến chuyên gia (expert-based) mang tính lặp lại. Các chuyên gia ước lượng độc lập, sau đó thảo luận về các ước lượng lệch chuẩn lớn, rồi ước lượng lại độc lập cho đến khi đạt đồng thuận. **Planning Poker** là một biến thể phổ biến của kỹ thuật này trong Agile.
4. **Three-point estimation (Ước lượng 3 điểm):** Chuyên gia ước lượng theo 3 kịch bản: Lạc quan ($a$), Khả thi nhất ($m$), và Bi quan ($b$).
   $$\text{Ước lượng cuối (E)} = \frac{a + 4m + b}{6}$$
   $$\text{Độ lệch chuẩn (SD)} = \frac{b - a}{6}$$
   *Ví dụ:* Nếu $a = 6$, $m = 9$, $b = 18$ giờ-công $\Rightarrow E = 10$ và $SD = 2$. Kết quả ước lượng là $10 \pm 2$ giờ-công (từ 8 đến 12 giờ-công).

---

### 📶 1.5. Phân loại ưu tiên chạy kiểm thử (Test Case Prioritization)
Sắp xếp thứ tự chạy test case để tối ưu hóa việc phát hiện lỗi sớm. Các chiến lược ưu tiên phổ biến bao gồm:
* **Risk-based prioritization (Ưu tiên theo rủi ro):** Chạy trước các bài test bao phủ các rủi ro có mức độ cao nhất.
* **Coverage-based prioritization (Ưu tiên theo độ bao phủ):** Chạy trước các test case đạt độ bao phủ mã nguồn lớn nhất.
* **Requirements-based prioritization (Ưu tiên theo yêu cầu):** Chạy trước các bài test liên quan đến tính năng được stakeholders ưu tiên cao nhất.

> [!CAUTION]
> **Tính phụ thuộc (Dependencies):** Nếu test case ưu tiên cao phụ thuộc vào dữ liệu hoặc kết quả của test case ưu tiên thấp, test case ưu tiên thấp bắt buộc phải được thực thi trước.

---

### 🔺 1.6. Kim tự tháp kiểm thử (Test Pyramid)
Mô hình thể hiện sự phân bổ số lượng và mức độ chi tiết của các bài kiểm thử:
* **Tầng đáy (Unit/Component tests):** Số lượng lớn nhất, cô lập, chạy cực nhanh, chi phí thấp. Tập trung kiểm thử các thành phần nhỏ nhất của hệ thống.
* **Tầng giữa (Integration/Service tests):** Số lượng vừa phải, kiểm thử sự giao tiếp và tích hợp giữa các component/API.
* **Tầng đỉnh (End-to-End/UI tests):** Số lượng ít nhất, chạy chậm, chi phí cao, mô phỏng luồng nghiệp vụ hoàn chỉnh của người dùng trên giao diện.

---

### 🧩 1.7. Bốn góc phần tư kiểm thử (Testing Quadrants)
Được sử dụng trong Agile để trực quan hóa các loại hình kiểm thử dựa trên hai trục: Hướng kỹ thuật/Hướng nghiệp vụ và Hỗ trợ đội nhóm/Phản biện sản phẩm.

```mermaid
grid-layout
| Q1 (Technology Facing - Support Team) <br> Component / Unit tests <br> Component Integration tests <br> (Thường tự động hóa trong CI) | Q2 (Business Facing - Support Team) <br> Functional tests <br> User Story tests <br> Prototypes, API testing <br> (Chạy manual hoặc automated) |
| Q3 (Business Facing - Critique Product) <br> Usability testing <br> User Acceptance testing (UAT) <br> Exploratory testing <br> (Thường chạy thủ công) | Q4 (Technology Facing - Critique Product) <br> Non-functional tests <br> Performance, Security <br> Smoke tests <br> (Thường tự động hóa) |
```

---

## 2. Quản lý rủi ro (Risk Management)

### 2.1. Định nghĩa và thuộc tính của rủi ro
Rủi ro là một sự kiện tiềm ẩn có thể gây hậu quả tiêu cực. Mức độ rủi ro (Risk Level) được xác định bởi hai thuộc tính:
1. **Risk likelihood (Khả năng xảy ra rủi ro):** Xác suất sự kiện đó xảy ra ($0 < P < 1$).
2. **Risk impact (Tác động rủi ro):** Mức độ thiệt hại nếu rủi ro xảy ra.
$$\text{Risk Level} = \text{Risk likelihood} \times \text{Risk impact}$$

### ⚖ 2.2. Phân loại Rủi ro: Dự án vs Sản phẩm
* **Project Risks (Rủi ro dự án):** Rủi ro ảnh hưởng đến khả năng quản lý, kiểm soát và hoàn thành dự án.
  * *Ví dụ:* Thiếu nhân sự, thiếu kỹ năng, ước lượng thời gian sai, trễ hạn bàn giao môi trường test, thay đổi phạm vi dự án vô tội vạ (scope creep), nhà cung cấp bên thứ ba phá sản.
* **Product Risks (Rủi ro sản phẩm):** Rủi ro ảnh hưởng đến chất lượng trực tiếp của phần mềm/sản phẩm bàn giao.
  * *Ví dụ:* Phần mềm tính toán sai, phản hồi quá chậm (performance tệ), dễ bị hack (lỗ hổng bảo mật), giao diện khó dùng (usability kém), lỗi runtime hệ thống.

### 🔍 2.3. Phân tích rủi ro sản phẩm (Product Risk Analysis)
Phân tích rủi ro sản phẩm được bắt đầu sớm nhất có thể trong SDLC nhằm:
* Xác định phạm vi kiểm thử (phần nào cần test kỹ, phần nào test lướt).
* Đề xuất các cấp độ kiểm thử (test levels) và loại hình kiểm thử (test types).
* Chọn lựa kỹ thuật kiểm thử và mức độ bao phủ cần đạt.
* Ưu tiên chạy các bài test tìm lỗi nghiêm trọng trước.

### 🛡 2.4. Kiểm soát rủi ro sản phẩm (Product Risk Control)
Gồm các biện pháp ứng phó rủi ro: giảm thiểu rủi ro (risk mitigation) và giám sát rủi ro (risk monitoring). Có các tùy chọn ứng phó như: giảm thiểu bằng kiểm thử, chấp nhận rủi ro, chuyển giao rủi ro, hoặc lập kế hoạch dự phòng.
Các hành động giảm thiểu rủi ro bằng kiểm thử:
* Chọn kiểm thử viên có kỹ năng và kinh nghiệm phù hợp với rủi ro.
* Đảm bảo tính độc lập kiểm thử (test independence) phù hợp.
* Tích cực thực hiện các buổi review tài liệu và phân tích tĩnh (static analysis).
* Áp dụng kiểm thử động và kiểm thử hồi quy (regression testing).

---

## 3. Giám sát, Kiểm soát và Hoàn thành kiểm thử (Test Monitoring, Control & Completion)

### 📈 3.1. Chỉ số kiểm thử phổ biến (Test Metrics)
* **Project progress metrics:** Mức độ hoàn thành task, công sức đã tiêu tốn.
* **Test progress metrics:** Tỷ lệ test case đã chạy/chưa chạy, pass/fail, tiến độ chuẩn bị môi trường.
* **Product quality metrics:** Thời gian phản hồi (response time), tính sẵn sàng (availability), thời gian trung bình giữa các lỗi (MTTF).
* **Defect metrics:** Số lượng lỗi phát hiện/đã sửa, mật độ lỗi (defect density), tỷ lệ phát hiện lỗi (Defect Detection Percentage - DDP).
* **Coverage metrics:** Độ bao phủ yêu cầu (requirements coverage), độ bao phủ mã nguồn (code coverage).

### 📝 3.2. Báo cáo kiểm thử (Test Reports)
* **Test Progress Report (Báo cáo tiến độ):** Được tạo định kỳ (hàng ngày, hàng tuần) trong quá trình test nhằm phục vụ cho hoạt động kiểm soát kiểm thử (Test Control).
  * *Nội dung:* Giai đoạn test, tiến độ so với kế hoạch, các trở ngại (impediments) và giải pháp tạm thời (workarounds), rủi ro mới xuất hiện, kế hoạch cho giai đoạn tiếp theo.
* **Test Completion Report (Báo cáo hoàn thành):** Được tạo khi kết thúc một giai đoạn test hoặc dự án kiểm thử hoàn thành (đạt exit criteria).
  * *Nội dung:* Tóm tắt quá trình kiểm thử, đánh giá chất lượng sản phẩm dựa trên mục tiêu ban đầu, các sai lệch lớn so với kế hoạch (lịch trình, chi phí), rủi ro còn lại chưa được xử lý, lỗi chưa sửa, và bài học kinh nghiệm (lessons learned).

---

## ⚙ 4. Quản lý cấu hình (Configuration Management)
Quản lý cấu hình (CM) đảm bảo tính nhất quán và toàn vẹn của tất cả các **Configuration Items (Mục cấu hình)** trong suốt quá trình kiểm thử:
* **Các mục cấu hình kiểm thử:** Test plans, test cases, test scripts, test data, test environments, test results, defect reports.
* **Đường cơ sở (Baseline):** Khi một mục cấu hình được phê duyệt cho kiểm thử, nó được đóng băng thành baseline. Mọi thay đổi sau đó phải đi qua quy trình kiểm soát thay đổi chính thức (formal change control).
* CM giúp thiết kế tính truy vết (traceability) hai chiều giữa yêu cầu, test cases, kết quả kiểm thử và lỗi; đồng thời cho phép khôi phục lại các baseline cũ để tái hiện lỗi.

---

## 🐞 5. Quản lý lỗi (Defect Management)
Hoạt động báo cáo và xử lý các bất thường (anomalies) từ khi phát hiện cho tới khi đóng lỗi.

### 📋 Nội dung tiêu chuẩn của một Báo cáo lỗi (Defect Report):
1. **Unique identifier:** Mã định danh duy nhất (ví dụ: BUG-001).
2. **Title:** Tiêu đề tóm tắt ngắn gọn, rõ ràng về lỗi.
3. **Date & Author:** Ngày phát hiện, người phát hiện lỗi và vai trò của họ.
4. **Environment & Test Object:** Phiên bản phần mềm, cấu hình thiết bị/OS của môi trường kiểm thử.
5. **Context of the defect:** Test case đang chạy, hoạt động kiểm thử đi kèm.
6. **Steps to reproduce:** Các bước chi tiết để tái hiện lỗi (rất quan trọng cho Developer).
7. **Expected vs Actual results:** Kết quả mong muốn đối chiếu với kết quả thực tế xảy ra.
8. **Severity (Độ nghiêm trọng):** Mức độ ảnh hưởng của lỗi đối với hệ thống (Blocker, Critical, Major, Minor).
9. **Priority (Mức độ ưu tiên):** Mức độ khẩn cấp cần sửa lỗi theo khía cạnh kinh doanh/dự án.
10. **Status (Trạng thái):** Trạng thái hiện tại của lỗi (New, Open, Fixed, Closed, Rejected, Deferred).
11. **Attachments:** Ảnh chụp màn hình (screenshots), video ghi hình, file log hệ thống, database dump.
