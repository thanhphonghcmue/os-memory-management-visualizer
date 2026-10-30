# Web Demo Quản Lý Bộ Nhớ Hệ Điều Hành
### Operating System Memory Management Visualizer

Dự án mô phỏng và trực quan hóa các cơ chế, thuật toán quản lý bộ nhớ trong hệ điều hành (Bộ môn Hệ điều hành - Trường Đại học Sư phạm TP.HCM / HCMUE), dựa trên giáo trình chuẩn **Operating System Concepts (10th Edition, Silberschatz, Galvin & Gagne, 2018)**.

---

## 🌟 Mục tiêu dự án

Xây dựng công cụ web đào tạo và trực quan hóa trực quan, chuẩn xác về mặt học thuật và sư phạm:
1. **Trực quan hóa sinh động**: Mô phỏng sơ đồ luồng phần cứng (CPU, MMU, TLB, Page Table, RAM, Backing Store) và các khối nhớ.
2. **Chạy từng bước (Step-by-step)**: Hỗ trợ Next / Prev / Auto-play / Pause / Reset với tốc độ điều chỉnh được, có thể quay lui (deterministic time-travel).
3. **Thuyết minh chi tiết (Live Step Narrator)**: Giải thích rõ ràng nguyên nhân, phép tính toán và kết quả ở mỗi bước chuyển trạng thái.
4. **Bộ số liệu mẫu chuẩn (Textbook Presets)**: Cung cấp sẵn các bộ dữ liệu từ giáo trình giúp thử nghiệm ngay lập tức.
5. **Thông số kỹ thuật thời gian thực (Hardware & OS Telemetry)**: Phân tách rõ ràng giữa thông số mô phỏng (Simulated MMU/OS) và thông số máy thật (Browser / Host OS).

---

## 🧭 Kiến trúc 5 Phân hệ cốt lõi

1. **Nhóm 1 — Nền tảng (Foundations)**
   - Kiểm tra địa chỉ & Bảo vệ bộ nhớ (Base & Limit Register / Relocation Register).
   - Gắn kết địa chỉ (Address Binding: Compile, Load, Execution time).
   - Nạp động & Liên kết động (Dynamic Loading & Dynamic Linking).
   - Hoán đổi & Nén bộ nhớ (Swapping & Memory Compression).

2. **Nhóm 2 — Cấp phát bộ nhớ (Memory Allocation — Bãi đỗ xe)**
   - Cấp phát liên tục: First-fit, Best-fit, Worst-fit.
   - Hiện tượng phân mảnh nội vi/ngoại vi (Fragmentation) & Dồn nén bộ nhớ (Compaction).
   - Hệ thống Buddy (Buddy System Allocation).
   - Cấp phát Slab (Slab Allocation: Full, Partial, Empty caches).

3. **Nhóm 3 — Phân trang (Paging — Tìm địa chỉ thật)**
   - Dịch địa chỉ phân trang cơ bản: Logical Address $(p, d) \to$ Physical Address $(f, d)$.
   - Bộ đệm chuyển đổi nhanh TLB: TLB Hit / Miss & Tính toán thời gian truy cập hiệu dụng (EAT).
   - Bảo vệ trang (Valid/Invalid, Read/Write) & Chia sẻ trang (Shared Pages).
   - Cấu trúc bảng trang nâng cao: Phân cấp (Hierarchical / Multilevel), Băm (Hashed), Đảo ngược (Inverted) & Kiến trúc thực tế (x86-64, ARMv8).

4. **Nhóm 4 — Bộ nhớ ảo (Virtual Memory)**
   - Phân trang theo yêu cầu (Demand Paging) & Quy trình xử lý lỗi trang 6 bước chuẩn OS Concepts.
   - Danh sách khung trống (Free-frame list) & Phân tích tác động hiệu năng I/O đĩa.
   - Cơ chế Sao chép khi ghi (Copy-on-Write — COW).
   - Cấp phát khung trang cho tiến trình (Equal vs. Proportional Allocation) & NUMA.
   - Hiện tượng Trì trệ hệ thống (Thrashing), Mô hình Tập làm việc (Working-Set Model) và Tần suất lỗi trang (PFF).

5. **Nhóm 5 — Thay thế trang (Page Replacement — Bàn đầy, cất trang nào)**
   - Thuật toán FIFO (First-In, First-Out).
   - Thuật toán Tối ưu (Optimal / OPT / MIN).
   - Thuật toán Dùng gần đây nhất (LRU — Least Recently Used) & Xếp hạng Stack.
   - Thuật toán Cơ hội thứ hai (Clock / Second-Chance) & Enhanced Second-Chance (Bit R & M).
   - Thuật toán dựa trên đếm (LFU / MFU).
   - Kiểm chứng Nghịch lý Belady (Belady's Anomaly) & Kỹ thuật đệm trang (Page Buffering).

---

## 🖥️ Bố cục Giao diện Chuẩn (Standard 4-Zone Layout)

- **Vùng 1 (Top/Left)**: Thanh Điều khiển & Nhập liệu (Control & Input Bar) với tính năng kiểm tra hợp lệ dữ liệu chặt chẽ và nút bấm nạp dữ liệu mẫu giáo trình.
- **Vùng 2 (Center)**: Sơ đồ Luồng & Khung mô phỏng tương tác (Interactive Visual Canvas) vẽ bằng SVG động và CSS Grid với bảng mã màu trực quan chuẩn hóa.
- **Vùng 3 (Bottom/Drawer)**: Thuyết minh từng bước & Thẻ lý thuyết thu gọn (Step Narrator & Collapsible Theory).
- **Vùng 4 (Right)**: Bảng Thông số Kỹ thuật Thời gian thực (Telemetry Panel) ghi nhận chi tiết trạng thái thanh ghi mô phỏng và tài nguyên trình duyệt/máy tính.

---

## 📚 Tài liệu tham chiếu trong kho lưu trữ

- `Bản thiết kế tổng thể dưới đây chuẩn hóa toàn bộ ngôn ngữ.docx`: Bản thiết kế tổng thể chuẩn hóa ngôn ngữ, giao diện, bảng thông số và kịch bản từng bước.
- `BAN_DAC_TA_CHI_TIET_WEB_DEMO_QUAN_LY_BO_NHO.docx`: Bản đặc tả kỹ thuật chi tiết (Software Design Specification v1.0).
- `Tính năng cơ bản của web demo.docx`: Yêu cầu các tính năng cơ bản cần có.
- `Tài liệu không có tiêu đề.pdf`: Báo cáo nghiên cứu học thuật nền tảng 5 phần về Quản lý bộ nhớ hệ điều hành.

---

## 🛠️ Công nghệ đề xuất triển khai

- **Ngôn ngữ**: TypeScript
- **Frontend Framework**: React 18+ / Vite
- **Styling**: Tailwind CSS (chủ đạo nền trắng - clean modern white UI)
- **Đồ họa trực quan**: Scalable Vector Graphics (SVG) kết hợp CSS Grid
- **State Management / Simulation Engine**: Pure TypeScript engine tách biệt logic tính toán (computation) khỏi hiển thị (rendering).
