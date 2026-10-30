import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward } from 'lucide-react';

interface PlaybackControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onChangeSpeed: (speed: number) => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  playbackSpeed,
  onPrev,
  onNext,
  onTogglePlay,
  onReset,
  onChangeSpeed,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-xs select-none">
      {/* Control Buttons Group */}
      <div className="flex items-center space-x-2">
        {/* Prev Step */}
        <button
          onClick={onPrev}
          disabled={currentStep <= 1 || isPlaying}
          className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors"
          title="Bước trước"
        >
          <SkipBack className="w-3.5 h-3.5 text-slate-700" />
          <span className="hidden sm:inline">Bước trước</span>
        </button>

        {/* Play / Pause */}
        <button
          onClick={onTogglePlay}
          className={`flex items-center space-x-1.5 px-4 py-1.5 text-xs font-bold rounded-md shadow-xs transition-all ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-900'
              : 'bg-[#005AA8] hover:bg-[#004885] text-white'
          }`}
          title={isPlaying ? 'Tạm dừng mô phỏng' : 'Tự động chạy từng bước'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Tạm dừng</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Tự động chạy</span>
            </>
          )}
        </button>

        {/* Next Step */}
        <button
          onClick={onNext}
          disabled={currentStep >= totalSteps || isPlaying}
          className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors"
          title="Bước tiếp theo"
        >
          <span className="hidden sm:inline">Bước tiếp</span>
          <SkipForward className="w-3.5 h-3.5 text-slate-700" />
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors"
          title="Đặt lại trạng thái ban đầu"
        >
          <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
          <span className="hidden sm:inline">Đặt lại</span>
        </button>
      </div>

      {/* Step Indicator & Speed Control */}
      <div className="flex items-center space-x-4">
        {/* Step Progress Pill */}
        <div className="flex items-center space-x-1 text-xs">
          <span className="text-slate-500">Tiến trình:</span>
          <span className="px-2 py-0.5 font-bold rounded-full bg-[#164A73]/10 text-[#164A73] border border-[#164A73]/20">
            Bước {currentStep} / {totalSteps}
          </span>
        </div>

        {/* Speed Adjustment */}
        <div className="flex items-center space-x-1 text-xs">
          <FastForward className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-500 hidden sm:inline">Tốc độ:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-md border border-slate-200 text-[11px] font-medium">
            {[0.5, 1.0, 1.5, 2.0].map((s) => (
              <button
                key={s}
                onClick={() => onChangeSpeed(s)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  playbackSpeed === s
                    ? 'bg-[#005AA8] text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
