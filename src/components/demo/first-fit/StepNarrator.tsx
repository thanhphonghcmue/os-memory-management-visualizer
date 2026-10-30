import React from 'react';
import { StepRecord } from '../../../types';
import { MessageSquareText, CheckCircle2, AlertCircle, ArrowRight, Calculator } from 'lucide-react';

interface StepNarratorProps {
  currentStepIndex: number; // 0-based
  steps: StepRecord[];
}

export const StepNarrator: React.FC<StepNarratorProps> = ({ currentStepIndex, steps }) => {
  const activeStep = steps[currentStepIndex] || steps[0];

  const getStatusBadge = (status: StepRecord['status']) => {
    switch (status) {
      case 'success':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Thành công</span>
          </span>
        );
      case 'danger':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Thất bại / Bỏ qua</span>
          </span>
        );
      case 'warning':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Không đủ dung lượng</span>
          </span>
        );
      case 'info':
      default:
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
            <span>Thông tin khởi tạo</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-xs overflow-hidden">
      {/* Dark Blue Header */}
      <div className="bg-[#164A73] px-4 py-2.5 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <MessageSquareText className="w-4 h-4 text-sky-300" />
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">
            Giải thích quá trình thực thi (Live Step Narrator)
          </h2>
        </div>
        <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-sky-100 font-medium">
          Mục E
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Active Step Highlight Card */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-sky-50 to-indigo-50/50 border border-sky-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#005AA8] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {activeStep.stepNumber}
              </span>
              <h3 className="font-bold text-sm text-[#164A73]">
                {activeStep.title}
              </h3>
            </div>
            {getStatusBadge(activeStep.status)}
          </div>

          <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-normal">
            {activeStep.detail}
          </p>

          {/* Calculation Box */}
          {activeStep.calculation && (
            <div className="mt-3 flex items-start space-x-2 p-2.5 bg-white border border-slate-200 rounded-md font-mono text-xs text-slate-700 shadow-2xs">
              <Calculator className="w-4 h-4 text-[#005AA8] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-500 mr-2">Phép tính đối chiếu:</span>
                <span className="font-bold text-[#164A73]">{activeStep.calculation}</span>
              </div>
            </div>
          )}
        </div>

        {/* History of steps so far */}
        <div>
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center space-x-1">
            <span>Nhật ký các bước đã chạy:</span>
          </div>

          <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
            {steps.slice(0, currentStepIndex + 1).map((s, idx) => {
              const isCurrent = idx === currentStepIndex;
              return (
                <div
                  key={s.stepNumber}
                  className={`flex items-start space-x-2.5 p-2 rounded text-xs transition-colors ${
                    isCurrent
                      ? 'bg-sky-100/70 border-l-4 border-[#005AA8] font-medium text-slate-900'
                      : 'bg-slate-50 border-l-2 border-slate-300 text-slate-600'
                  }`}
                >
                  <span className="font-bold shrink-0 text-[#164A73]">
                    Bước {s.stepNumber}:
                  </span>
                  <div className="flex-1 truncate">
                    <span>{s.title}</span>
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] bg-[#005AA8] text-white px-1.5 py-0.2 rounded font-semibold shrink-0">
                      Hiện tại
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
