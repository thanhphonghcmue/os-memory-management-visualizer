import React from 'react';
import { X, HelpCircle, Play, SkipForward, SkipBack, RotateCcw, CheckCircle } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#164A73] px-5 py-3.5 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-sky-300" />
            <h3 className="text-sm md:text-base font-bold uppercase tracking-wider">
              Hướng dẫn sử dụng Web Demo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs md:text-sm text-slate-700">
          <div>
            <h4 className="font-bold text-[#164A73] text-sm mb-1">
              1. Bố cục màn hình 4 khu vực chuẩn hóa
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mỗi bài demo được thiết kế đồng nhất theo bố cục 4 vùng: Khu vực nhập liệu & nạp preset ở trên cùng, Sơ đồ bộ nhớ trực quan ở giữa, Giải thích từng bước ở bên dưới và Bảng thông số kỹ thuật thời gian thực ở cột bên phải.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <h4 className="font-bold text-[#164A73] text-sm mb-2">
              2. Các nút điều khiển mô phỏng
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-2 p-2 bg-slate-50 border border-slate-200 rounded">
                <SkipBack className="w-4 h-4 text-slate-700 shrink-0" />
                <span><strong>Bước trước:</strong> Lùi lại 1 trạng thái trước đó.</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-slate-50 border border-slate-200 rounded">
                <SkipForward className="w-4 h-4 text-slate-700 shrink-0" />
                <span><strong>Bước tiếp:</strong> Tiến tới bước kiểm tra tiếp theo.</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-slate-50 border border-slate-200 rounded">
                <Play className="w-4 h-4 text-[#005AA8] shrink-0" />
                <span><strong>Tự động chạy:</strong> Thuật toán tự chạy theo tốc độ chọn.</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-slate-50 border border-slate-200 rounded">
                <RotateCcw className="w-4 h-4 text-rose-600 shrink-0" />
                <span><strong>Đặt lại:</strong> Trở về trạng thái ban đầu của RAM.</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <h4 className="font-bold text-[#164A73] text-sm mb-2">
              3. Hệ thống mã màu nhận diện
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded bg-blue-500 shrink-0" />
                <span><strong>Xanh dương:</strong> Vùng nhớ đang được con trỏ duyệt qua và kiểm tra kích thước.</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500 shrink-0" />
                <span><strong>Xanh lá:</strong> Cấp phát thành công, tiến trình đã được nạp vào dải địa chỉ vật lý.</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-300 border border-amber-500 border-dashed shrink-0" />
                <span><strong>Vàng cam:</strong> Phần dung lượng còn dư sau khi cấp phát tạo thành lỗ trống mới.</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded bg-rose-400 shrink-0" />
                <span><strong>Đỏ nhạt:</strong> Vùng nhớ không đủ dung lượng để chứa tiến trình.</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <h4 className="font-bold text-[#164A73] text-sm mb-1">
              4. Nút Dữ liệu mẫu (Textbook Presets)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bấm vào nút <strong>"Mẫu Giáo trình 2.2.5"</strong> để tự động điền bộ dữ liệu chuẩn gồm 5 vùng trống [120, 350, 180, 240, 500 KB] và yêu cầu 200 KB để đối chiếu kết quả chuẩn xác khi thuyết trình.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-[#164A73] hover:bg-[#113857] text-white font-semibold text-xs transition-colors"
          >
            Đã hiểu, đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
