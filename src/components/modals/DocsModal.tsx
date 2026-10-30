import React from 'react';
import { X, BookOpen, FileText, ExternalLink, Bookmark } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#164A73] px-5 py-3.5 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-sky-300" />
            <h3 className="text-sm md:text-base font-bold uppercase tracking-wider">
              Tài liệu tham khảo & Bối cảnh học thuật
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
              1. Giáo trình tham chiếu quốc tế
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs space-y-1">
              <p><strong>Silberschatz, A., Galvin, P. B., & Gagne, G. (2018).</strong> <em>Operating System Concepts</em> (10th ed.). John Wiley & Sons.</p>
              <p className="text-slate-500">
                • Chương 9: Bộ nhớ chính (Main Memory) — Address Binding, Contiguous Allocation, Paging, TLB.<br />
                • Chương 10: Bộ nhớ ảo (Virtual Memory) — Demand Paging, Page Faults, Page Replacement, Thrashing.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <h4 className="font-bold text-[#164A73] text-sm mb-2">
              2. Các tài liệu đặc tả đính kèm trong thư mục dự án
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md flex items-start space-x-2">
                <FileText className="w-4 h-4 text-[#005AA8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#164A73]">Bản thiết kế tổng thể dưới đây chuẩn hóa toàn bộ ngôn ngữ.docx</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Đặc tả 47 trang chuẩn hóa ngôn ngữ song ngữ Việt - Anh, bảng thông số kỹ thuật thời gian thực và kịch bản từng bước cho 5 phân hệ.
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md flex items-start space-x-2">
                <FileText className="w-4 h-4 text-[#005AA8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#164A73]">BAN_DAC_TA_CHI_TIET_WEB_DEMO_QUAN_LY_BO_NHO.docx</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Software Design Specification v1.0: Kiến trúc mã nguồn, hợp đồng StepEvent, ma trận kiểm thử vàng và nguyên tắc phân biệt telemetry.
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md flex items-start space-x-2">
                <FileText className="w-4 h-4 text-[#005AA8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#164A73]">Tính năng cơ bản của web demo.docx</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Danh mục yêu cầu tính năng cốt lõi cho sinh viên CNTT trường ĐH Sư phạm TP.HCM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <h4 className="font-bold text-[#164A73] text-sm mb-1">
              3. Liên kết kho lưu trữ GitHub
            </h4>
            <a
              href="https://github.com/thanhphonghcmue/os-memory-management-visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#005AA8] hover:underline"
            >
              <span>github.com/thanhphonghcmue/os-memory-management-visualizer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-[#164A73] hover:bg-[#113857] text-white font-semibold text-xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
