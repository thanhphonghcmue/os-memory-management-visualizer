import React from 'react';
import { MemoryHole } from '../../../types';
import { HardDrive, ArrowDown, ZoomIn, ZoomOut, Check, X } from 'lucide-react';

interface VisualMemoryCanvasProps {
  holes: MemoryHole[];
  currentHoleId?: string;
  totalRam: number;
  processSize: number;
  processName: string;
}

export const VisualMemoryCanvas: React.FC<VisualMemoryCanvasProps> = ({
  holes,
  currentHoleId,
  totalRam,
  processSize,
  processName,
}) => {
  const [isZoomed, setIsZoomed] = React.useState(false);

  // Helper to get color classes based on state
  const getBlockStyle = (hole: MemoryHole) => {
    switch (hole.state) {
      case 'checking':
        return {
          bg: 'bg-blue-100/90',
          border: 'border-blue-600 ring-2 ring-blue-500/50',
          text: 'text-blue-900',
          badge: 'bg-blue-600 text-white',
          statusText: 'Đang kiểm tra...',
        };
      case 'allocated':
        return {
          bg: 'bg-emerald-500 text-white',
          border: 'border-emerald-600 shadow-md',
          text: 'text-white',
          badge: 'bg-emerald-700 text-white',
          statusText: 'Đã nạp vào RAM',
        };
      case 'remaining':
        return {
          bg: 'bg-amber-100',
          border: 'border-amber-400 border-dashed',
          text: 'text-amber-900',
          badge: 'bg-amber-500 text-white',
          statusText: 'Phần dư (Lỗ trống mới)',
        };
      case 'rejected':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-300',
          text: 'text-rose-800',
          badge: 'bg-rose-500 text-white',
          statusText: 'Không đủ dung lượng',
        };
      case 'idle':
      default:
        return {
          bg: 'bg-slate-100',
          border: 'border-slate-300',
          text: 'text-slate-700',
          badge: 'bg-slate-300 text-slate-700',
          statusText: 'Vùng trống (Free)',
        };
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-xs overflow-hidden">
      {/* Top Bar */}
      <div className="bg-[#174B75] px-4 py-2.5 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <HardDrive className="w-4 h-4 text-sky-300" />
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">
            Sơ đồ mô phỏng bộ nhớ vật lý (RAM Layout & Address Flow)
          </h2>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="hidden sm:inline text-sky-100 text-[11px]">
            Tổng RAM: <strong className="text-white font-mono">{totalRam} KB</strong>
          </span>
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={isZoomed ? 'Thu nhỏ kích thước' : 'Phóng to sơ đồ'}
          >
            {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className={`p-4 md:p-6 transition-all ${isZoomed ? 'py-8' : ''}`}>
        {/* Animated Process Request Banner */}
        <div className="mb-4 flex items-center justify-between p-2.5 bg-sky-50 border border-sky-200 rounded-md text-xs">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-[#005AA8] text-white font-bold rounded">
              Tiến trình {processName}
            </span>
            <span className="text-slate-700">
              Yêu cầu cấp phát liên tục: <strong className="font-mono text-[#164A73]">{processSize} KB</strong>
            </span>
          </div>
          <span className="text-[11px] text-slate-500 italic hidden sm:inline">
            Tìm kiếm từ đầu RAM theo nguyên tắc First-Fit
          </span>
        </div>

        {/* Address Ruler Bar */}
        <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 px-1 mb-1 border-b border-slate-200 pb-0.5">
          <span>0 KB</span>
          <span>Thước đo địa chỉ vật lý (Physical Address Ruler)</span>
          <span>{totalRam} KB</span>
        </div>

        {/* Memory Strip Container */}
        <div className="w-full overflow-x-auto pb-2 pt-6">
          <div className="min-w-[650px] flex items-stretch border-2 border-slate-400/80 rounded-lg overflow-hidden bg-slate-50 shadow-inner">
            {holes.map((hole) => {
              const style = getBlockStyle(hole);
              const widthPct = Math.max(14, (hole.size / totalRam) * 100);
              const isChecking = hole.state === 'checking';

              return (
                <div
                  key={hole.id}
                  style={{ width: `${widthPct}%` }}
                  className={`relative flex flex-col justify-between p-3 border-r-2 last:border-r-0 transition-all duration-300 min-h-[140px] ${style.bg} ${style.border}`}
                >
                  {/* Active Indicator Arrow pointing down */}
                  {isChecking && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                      <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                        Đang duyệt xét
                      </span>
                      <ArrowDown className="w-4 h-4 text-blue-600 fill-current" />
                    </div>
                  )}

                  {/* Header info of Block */}
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`font-bold text-xs truncate ${style.text}`}>
                        {hole.label}
                      </span>
                      {hole.state === 'allocated' && (
                        <Check className="w-4 h-4 text-white shrink-0" />
                      )}
                      {hole.state === 'rejected' && (
                        <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      )}
                    </div>

                    <div className="text-[11px] font-mono font-semibold">
                      {hole.size} KB
                    </div>
                  </div>

                  {/* Center / Status */}
                  <div className="my-2">
                    <span
                      className={`inline-block text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider ${style.badge}`}
                    >
                      {style.statusText}
                    </span>
                  </div>

                  {/* Address Boundaries at Bottom */}
                  <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-mono opacity-80">
                    <span>{hole.start}K</span>
                    <span>→</span>
                    <span>{hole.end}K</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend (Chú thích mã màu chuẩn hóa theo tài liệu) */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600">
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-blue-500 border border-blue-600 shadow-2xs" />
            <span>Đang kiểm tra (#2563EB)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500 border border-emerald-600 shadow-2xs" />
            <span>Đã cấp phát (#16A34A)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-200 border border-amber-400 border-dashed" />
            <span>Phần dư sau cấp (#D97706)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-rose-200 border border-rose-400" />
            <span>Không đủ dung lượng (#DC2626)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-slate-200 border border-slate-300" />
            <span>Vùng nhớ trống (#E5E7EB)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
