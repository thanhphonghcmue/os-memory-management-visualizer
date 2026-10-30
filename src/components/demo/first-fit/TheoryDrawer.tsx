import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, CheckCircle, ExternalLink } from 'lucide-react';

export const TheoryDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-xs overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#164A73] px-4 py-2.5 flex items-center justify-between text-white hover:bg-[#113857] transition-colors"
      >
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-sky-300" />
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">
            Kiến thức lý thuyết & Công thức chuẩn hóa (Theory Drawer)
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-sky-200 text-[11px] hidden sm:inline">
            {isOpen ? 'Thu gọn' : 'Mở rộng tài liệu'}
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-4 md:p-6 space-y-4 text-xs md:text-sm text-slate-700 bg-slate-50/50">
          {/* Definition */}
          <div>
            <h4 className="font-bold text-[#164A73] text-sm mb-1">
              1. Khái niệm & Tên chuẩn hóa
            </h4>
            <p className="leading-relaxed">
              <strong>Tên tiếng Việt:</strong> Cấp phát vùng nhớ liên tục — First-Fit.<br />
              <strong>Tên tiếng Anh:</strong> First-Fit Contiguous Memory Allocation.<br />
              <strong>Định nghĩa:</strong> Thuật toán cấp phát bộ nhớ liên tục bằng cách tìm kiếm từ đầu bộ nhớ (hoặc từ vị trí tìm kiếm trước đó) và chọn <em>vùng trống (hole) đầu tiên</em> có kích thước đủ lớn để thỏa mãn yêu cầu của tiến trình.
            </p>
          </div>

          {/* Principle & Flow */}
          <div className="pt-2 border-t border-slate-200">
            <h4 className="font-bold text-[#164A73] text-sm mb-1">
              2. Nguyên lý hoạt động
            </h4>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Duyệt danh sách các vùng trống liên tục theo thứ tự địa chỉ tăng dần.</li>
              <li>Tại mỗi vùng trống <span className="font-mono font-semibold">i</span> có kích thước <span className="font-mono">S(hole_i)</span>:
                kiểm tra điều kiện <span className="font-mono font-bold text-[#005AA8]">S(hole_i) ≥ S(request)</span>.
              </li>
              <li>Dừng tìm kiếm ngay khi gặp vùng đầu tiên thỏa mãn điều kiện.</li>
              <li>Chia vùng trống làm hai phần: một phần cấp cho tiến trình, phần còn lại trở thành một vùng trống mới (nếu kích thước còn dư &gt; 0).</li>
            </ul>
          </div>

          {/* Formula & Variables */}
          <div className="pt-2 border-t border-slate-200">
            <h4 className="font-bold text-[#164A73] text-sm mb-1">
              3. Điều kiện quyết định & Công thức phân mảnh
            </h4>
            <div className="p-3 bg-white border border-slate-200 rounded-md font-mono text-xs text-slate-800 space-y-1">
              <p>• <strong>Điều kiện chọn:</strong> index* = min &#123; i | S(hole_i) ≥ S(process) &#125;</p>
              <p>• <strong>Dung lượng dư thừa (Hole Remainder):</strong> S(new_hole) = S(hole_index*) - S(process)</p>
              <p>• <strong>Địa chỉ bắt đầu tiến trình:</strong> Base(process) = Base(hole_index*)</p>
            </div>
          </div>

          {/* Advantages & Disadvantages */}
          <div className="pt-2 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md">
              <h5 className="font-bold text-emerald-800 mb-1 flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ưu điểm</span>
              </h5>
              <ul className="list-disc list-inside space-y-0.5 text-emerald-900 text-xs">
                <li>Tốc độ tìm kiếm nhanh nhất trong 3 thuật toán liên tục.</li>
                <li>Không cần duyệt hết toàn bộ danh sách bộ nhớ nếu tìm thấy sớm.</li>
                <li>Dễ cài đặt và chi phí tính toán thấp.</li>
              </ul>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
              <h5 className="font-bold text-amber-800 mb-1">Hạn chế</h5>
              <ul className="list-disc list-inside space-y-0.5 text-amber-900 text-xs">
                <li>Dễ tạo ra hiện tượng phân mảnh ngoại vi (External Fragmentation) ở đầu bộ nhớ.</li>
                <li>Các vùng trống nhỏ tích tụ ở đầu RAM khiến các lần tìm kiếm sau phải duyệt qua nhiều khối không phù hợp.</li>
              </ul>
            </div>
          </div>

          {/* Academic Source Citation */}
          <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
            <strong>Tài liệu tham khảo học thuật:</strong> Silberschatz, A., Galvin, P. B., & Gagne, G. (2018). <em>Operating System Concepts</em> (10th ed.), Chapter 9: Main Memory, Section 9.2: Contiguous Memory Allocation.
          </div>
        </div>
      )}
    </div>
  );
};
