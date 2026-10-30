import React, { useState } from 'react';
import { MemoryHole } from '../../../types';
import { HardDrive, ArrowDown, ZoomIn, ZoomOut, Check, X, Cpu, Sparkles, Layers } from 'lucide-react';

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
  const [isZoomed, setIsZoomed] = useState(false);
  const [hoveredHoleId, setHoveredHoleId] = useState<string | null>(null);

  // Calculate allocated and free RAM
  const allocatedRam = holes
    .filter((h) => h.state === 'allocated')
    .reduce((sum, h) => sum + h.size, 0);
  const allocatedPct = totalRam > 0 ? ((allocatedRam / totalRam) * 100).toFixed(1) : '0';

  // Find currently active hole
  const activeCheckingHole = holes.find((h) => h.state === 'checking');
  const isSatisfied = activeCheckingHole ? activeCheckingHole.size >= processSize : false;

  const getBlockStyle = (hole: MemoryHole) => {
    switch (hole.state) {
      case 'checking':
        return {
          bg: 'bg-gradient-to-b from-blue-100 to-sky-100',
          border: 'border-blue-600 ring-4 ring-blue-400/40 shadow-lg scale-[1.01]',
          text: 'text-blue-950 font-bold',
          badge: 'bg-blue-600 text-white',
          statusText: 'ĐANG DUYỆT XÉT',
          glow: 'after:absolute after:inset-0 after:bg-blue-400/10 after:animate-pulse',
        };
      case 'allocated':
        return {
          bg: 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white',
          border: 'border-emerald-700 shadow-md ring-2 ring-emerald-400/30',
          text: 'text-white font-extrabold',
          badge: 'bg-emerald-900/80 text-emerald-100',
          statusText: 'ĐÃ NẠP RAM',
          glow: '',
        };
      case 'remaining':
        return {
          bg: 'bg-gradient-to-b from-amber-50 to-amber-100',
          border: 'border-amber-400 border-dashed border-2',
          text: 'text-amber-900 font-bold',
          badge: 'bg-amber-500 text-white',
          statusText: 'PHẦN DƯ MỚI',
          glow: '',
        };
      case 'rejected':
        return {
          bg: 'bg-gradient-to-b from-rose-50 to-rose-100/60',
          border: 'border-rose-300',
          text: 'text-rose-900 font-medium',
          badge: 'bg-rose-500 text-white',
          statusText: 'KHÔNG ĐỦ',
          glow: '',
        };
      case 'idle':
      default:
        return {
          bg: 'bg-slate-100 hover:bg-slate-200/70',
          border: 'border-slate-300',
          text: 'text-slate-800 font-semibold',
          badge: 'bg-slate-300 text-slate-700',
          statusText: 'TRỐNG (FREE)',
          glow: '',
        };
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden select-none">
      {/* Top Header Bar */}
      <div className="bg-[#174B75] px-4 py-3 flex items-center justify-between text-white border-b border-[#123d60]">
        <div className="flex items-center space-x-2">
          <HardDrive className="w-4 h-4 text-sky-300" />
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">
            Sơ đồ mô phỏng bộ nhớ vật lý (RAM Layout & Address Flow)
          </h2>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="hidden sm:flex items-center space-x-1.5 bg-black/20 px-2.5 py-1 rounded text-sky-200 font-mono text-[11px]">
            <span>Tổng RAM:</span>
            <strong className="text-white font-bold">{totalRam.toLocaleString()} KB</strong>
          </div>
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center space-x-1"
            title={isZoomed ? 'Thu nhỏ kích thước' : 'Phóng to sơ đồ'}
          >
            {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
            <span className="text-[10px] hidden md:inline">{isZoomed ? 'Thu gọn' : 'Phóng to'}</span>
          </button>
        </div>
      </div>

      <div className={`p-4 md:p-6 transition-all ${isZoomed ? 'py-8' : ''}`}>
        {/* TOP STATUS BAR: CPU Request & Real-time Allocation Progress */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
          {/* Active Process Request Badge */}
          <div className="md:col-span-7 flex items-center justify-between p-3 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg shadow-2xs">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-[#005AA8] text-white flex items-center justify-center font-black text-sm shadow-xs">
                {processName}
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-[#164A73]">Yêu cầu cấp phát:</span>
                  <span className="text-xs font-mono font-black text-[#005AA8] px-2 py-0.5 bg-white rounded border border-sky-200">
                    {processSize} KB
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Duyệt First-Fit tuần tự từ địa chỉ thấp (0 KB) đến cao
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-1 rounded">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chế độ: Động</span>
            </div>
          </div>

          {/* Allocation Utilization Bar */}
          <div className="md:col-span-5 p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-600">Mức độ lấp đầy RAM:</span>
              <span className="font-mono font-bold text-[#164A73]">{allocatedPct}%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${allocatedPct}%` }}
                className="bg-emerald-500 transition-all duration-500 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
              <span>Đã dùng: {allocatedRam} KB</span>
              <span>Trống: {totalRam - allocatedRam} KB</span>
            </div>
          </div>
        </div>

        {/* COMPARISON CALLOUT (Live Decision Banner when inspecting a hole) */}
        {activeCheckingHole && (
          <div className="mb-4 p-3 rounded-lg border flex items-center justify-between transition-all animate-in fade-in slide-in-from-top-2 bg-gradient-to-r from-blue-50 to-indigo-50/60 border-blue-300">
            <div className="flex items-center space-x-2 text-xs">
              <Cpu className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-slate-700">Đang so sánh tại <strong>{activeCheckingHole.label}</strong>:</span>
              <span className="font-mono font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300">
                {activeCheckingHole.size} KB vs {processSize} KB
              </span>
            </div>

            <div className="flex items-center space-x-1.5 text-xs font-bold">
              {isSatisfied ? (
                <span className="flex items-center space-x-1 text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 animate-pulse">
                  <Check className="w-3.5 h-3.5" />
                  <span>{activeCheckingHole.size} ≥ {processSize} → THỎA MÃN (CHỌN)</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1 text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md border border-rose-300">
                  <X className="w-3.5 h-3.5" />
                  <span>{activeCheckingHole.size} &lt; {processSize} → KHÔNG ĐỦ (BỎ QUA)</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* PHYSICAL ADDRESS RULER */}
        <div className="w-full flex items-center justify-between text-[10px] font-mono font-semibold text-slate-500 px-1 mb-1.5 border-b border-slate-300 pb-1">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>0 KB (Base)</span>
          </div>
          <span className="text-slate-400 font-sans text-[11px]">
            Dải địa chỉ vật lý bộ nhớ chính (Physical RAM Blocks)
          </span>
          <div className="flex items-center space-x-1">
            <span>{totalRam.toLocaleString()} KB (Top)</span>
            <span className="w-2 h-2 rounded-full bg-slate-400" />
          </div>
        </div>

        {/* INTERACTIVE RAM STRIP CONTAINER */}
        <div className="w-full overflow-x-auto pb-3 pt-7">
          <div className="min-w-[700px] flex items-stretch border-2 border-slate-400 rounded-xl overflow-hidden bg-slate-100 shadow-md">
            {holes.map((hole) => {
              const style = getBlockStyle(hole);
              const widthPct = Math.max(14, (hole.size / totalRam) * 100);
              const isChecking = hole.state === 'checking';
              const isAllocated = hole.state === 'allocated';
              const isRemaining = hole.state === 'remaining';

              return (
                <div
                  key={hole.id}
                  style={{ width: `${widthPct}%` }}
                  onMouseEnter={() => setHoveredHoleId(hole.id)}
                  onMouseLeave={() => setHoveredHoleId(null)}
                  className={`relative flex flex-col justify-between p-3.5 border-r-2 last:border-r-0 transition-all duration-300 min-h-[155px] ${style.bg} ${style.border} ${style.glow}`}
                >
                  {/* Active Indicator Arrow pointing down */}
                  {isChecking && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-20">
                      <span className="text-[10px] font-extrabold bg-[#005AA8] text-white px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap border border-sky-300">
                        Con trỏ First-Fit
                      </span>
                      <ArrowDown className="w-4 h-4 text-[#005AA8] fill-current" />
                    </div>
                  )}

                  {/* Header info of Block */}
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`font-bold text-xs truncate ${style.text}`}>
                        {hole.label}
                      </span>
                      {isAllocated && (
                        <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {hole.state === 'rejected' && (
                        <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center shrink-0">
                          <X className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-mono font-bold tracking-tight">
                      {hole.size.toLocaleString()} KB
                    </div>
                  </div>

                  {/* Center / IC Chips Graphic for Allocated Block */}
                  {isAllocated ? (
                    <div className="my-1.5 py-1 px-2 rounded bg-emerald-700/60 border border-emerald-400/40 text-[10px] text-emerald-100 flex items-center justify-between font-mono">
                      <span>RAM CHIP #1</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                    </div>
                  ) : isRemaining ? (
                    <div className="my-1.5 py-1 px-1.5 rounded bg-amber-200/80 border border-amber-400/60 text-[9px] text-amber-900 font-semibold text-center">
                      Hole mới tách
                    </div>
                  ) : null}

                  {/* Status Badge */}
                  <div className="my-1">
                    <span
                      className={`inline-block text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider shadow-2xs ${style.badge}`}
                    >
                      {style.statusText}
                    </span>
                  </div>

                  {/* Address Boundaries at Bottom */}
                  <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-mono font-medium opacity-90">
                    <span>{hole.start} KB</span>
                    <span className="text-slate-400">→</span>
                    <span>{hole.end} KB</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend (Bảng chú thích mã màu theo quy chuẩn) */}
        <div className="mt-4 pt-3.5 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-700 font-medium">
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
