import React from 'react';
import {
  Layers,
  Box,
  Grid,
  HardDrive,
  RefreshCw,
  ArrowRight,
  BookOpen,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

interface HomeViewProps {
  onStartDemo: (demoId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartDemo }) => {
  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Hero Banner (HCMUE Portal Banner Style) */}
      <div className="rounded-xl bg-gradient-to-r from-[#164A73] via-[#1a5585] to-[#123d60] text-white p-6 md:p-8 shadow-md border border-[#113857] relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute right-24 bottom-0 translate-y-16 w-80 h-80 rounded-full bg-sky-400/10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-xs text-sky-200 text-xs font-semibold mb-3 border border-white/10">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Môn học: Hệ Điều Hành (Operating Systems) • ĐH Sư phạm TP.HCM</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white">
            HỆ THỐNG MÔ PHỎNG TRỰC QUAN THUẬT TOÁN QUẢN LÝ BỘ NHỚ
          </h1>

          <p className="text-sm md:text-base text-sky-100/90 font-normal mt-2 leading-relaxed">
            Công cụ hỗ trợ giảng dạy và học tập trực quan chuẩn hóa toàn bộ 5 phân hệ quản lý bộ nhớ:
            từ Nền tảng, Cấp phát liên tục, Phân trang & TLB, Bộ nhớ ảo cho đến Thuật toán Thay thế trang.
            Dựa trên giáo trình chuẩn quốc tế <strong>Operating System Concepts (10th Edition)</strong>.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartDemo('alloc-first-fit')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs md:text-sm shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <span>Trải nghiệm ngay: Mô phỏng First-Fit</span>
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </button>

            <a
              href="https://github.com/thanhphonghcmue/os-memory-management-visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs md:text-sm border border-white/20 transition-all"
            >
              <span>Xem mã nguồn GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 5 Core Modules Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#164A73] uppercase tracking-wide">
              5 Phân hệ Quản lý Bộ nhớ Cốt lõi
            </h2>
            <p className="text-xs text-slate-500">
              Kiến trúc chuẩn hóa theo tài liệu nghiên cứu và bản thiết kế tổng thể
            </p>
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-sky-100 text-[#005AA8] rounded">
            Silberschatz 2018
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Group 1 */}
          <div className="p-5 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#005AA8] hover:shadow-md transition-all group">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#164A73] flex items-center justify-center group-hover:bg-[#164A73] group-hover:text-white transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Phân hệ 1
                </span>
                <h3 className="font-bold text-sm text-[#164A73]">
                  Nền tảng Quản lý Bộ nhớ
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
              Kiểm tra địa chỉ với Base & Limit, cơ chế tái định vị động MMU, gắn kết địa chỉ (Address Binding), nạp/liên kết động và hoán đổi bộ nhớ.
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">4 chức năng</span>
              <span className="text-[10px] text-slate-400 italic">Đang hoàn thiện</span>
            </div>
          </div>

          {/* Group 2 - Active! */}
          <div className="p-5 rounded-lg border-2 border-[#005AA8] bg-sky-50/30 shadow-xs relative group">
            <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#005AA8] text-white px-2 py-0.5 rounded-full">
              Sẵn sàng chạy
            </span>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#005AA8] text-white flex items-center justify-center">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#005AA8] uppercase tracking-wider block">
                  Phân hệ 2 • Trọng tâm
                </span>
                <h3 className="font-bold text-sm text-[#164A73]">
                  Cấp phát Bộ nhớ liên tục
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-700 line-clamp-3 mb-4 leading-relaxed">
              Mô phỏng <strong>First-fit</strong>, Best-fit, Worst-fit, phân tích phân mảnh nội vi/ngoại vi, dồn nén bộ nhớ (Compaction), Buddy System và Slab Allocation.
            </p>
            <div className="pt-3 border-t border-sky-200 flex items-center justify-between text-xs">
              <button
                onClick={() => onStartDemo('alloc-first-fit')}
                className="font-bold text-[#005AA8] hover:text-[#164A73] flex items-center space-x-1"
              >
                <span>Chạy Demo First-fit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                7 thuật toán
              </span>
            </div>
          </div>

          {/* Group 3 */}
          <div className="p-5 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#005AA8] hover:shadow-md transition-all group">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#164A73] flex items-center justify-center group-hover:bg-[#164A73] group-hover:text-white transition-colors">
                <Grid className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Phân hệ 3
                </span>
                <h3 className="font-bold text-sm text-[#164A73]">
                  Phân trang & Phần cứng TLB
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
              Dịch địa chỉ logic (p, d) sang vật lý (f, d), cơ chế tra cứu song song trong TLB, tính thời gian truy cập hiệu dụng EAT và các dạng bảng trang đa cấp.
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">6 chức năng</span>
              <span className="text-[10px] text-slate-400 italic">Đang hoàn thiện</span>
            </div>
          </div>

          {/* Group 4 */}
          <div className="p-5 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#005AA8] hover:shadow-md transition-all group">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#164A73] flex items-center justify-center group-hover:bg-[#164A73] group-hover:text-white transition-colors">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Phân hệ 4
                </span>
                <h3 className="font-bold text-sm text-[#164A73]">
                  Bộ nhớ ảo & Trì trệ (Thrashing)
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
              Demand Paging 6 bước, danh sách khung trống (Free-frame list), cơ chế Copy-on-Write (COW), mô hình Working-Set và giải thuật chống Thrashing.
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">7 chức năng</span>
              <span className="text-[10px] text-slate-400 italic">Đang hoàn thiện</span>
            </div>
          </div>

          {/* Group 5 */}
          <div className="p-5 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#005AA8] hover:shadow-md transition-all group">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#164A73] flex items-center justify-center group-hover:bg-[#164A73] group-hover:text-white transition-colors">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Phân hệ 5
                </span>
                <h3 className="font-bold text-sm text-[#164A73]">
                  Thay thế Trang & Nghịch lý Belady
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
              Mô phỏng FIFO, OPT, LRU, Clock, Enhanced Clock (R, M bits), so sánh số lỗi trang và kiểm chứng Nghịch lý Belady (tăng khung nhớ nhưng tăng lỗi).
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">8 chức năng</span>
              <span className="text-[10px] text-slate-400 italic">Đang hoàn thiện</span>
            </div>
          </div>

          {/* Summary / Credentials Card */}
          <div className="p-5 rounded-lg border border-[#E2E8F0] bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-[#164A73] font-bold text-sm mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Tiêu chuẩn Đào tạo ĐH</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Giao diện nền trắng nghiêm túc, tối ưu thuyết trình.</li>
                <li>Chạy từng bước có thể lùi (Time-Travel Debugging).</li>
                <li>Tách bạch thông số mô phỏng và máy thật.</li>
                <li>Dữ liệu mẫu từ giáo trình Silberschatz.</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500">
              HCMUE IT Department • 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
