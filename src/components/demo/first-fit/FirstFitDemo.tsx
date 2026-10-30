import React, { useState, useEffect, useRef } from 'react';
import { InputControlCard } from './InputControlCard';
import { PlaybackControls } from './PlaybackControls';
import { VisualMemoryCanvas } from './VisualMemoryCanvas';
import { StepNarrator } from './StepNarrator';
import { TelemetryPanel } from './TelemetryPanel';
import { TheoryDrawer } from './TheoryDrawer';
import { generateFirstFitSteps } from '../../../engine/firstFitEngine';
import { StepRecord } from '../../../types';
import { useHostTelemetry } from '../../../hooks/useHostTelemetry';
import { Layers } from 'lucide-react';

interface FirstFitDemoProps {
  onSelectOtherAlgo?: (algo: string) => void;
}

export const FirstFitDemo: React.FC<FirstFitDemoProps> = ({ onSelectOtherAlgo }) => {
  // Initial state matches Textbook Preset 2.2.5 (Silberschatz)
  const [holesInput, setHolesInput] = useState<number[]>([120, 350, 180, 240, 500]);
  const [processSize, setProcessSize] = useState<number>(200);
  const [processName, setProcessName] = useState<string>('P1');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('first-fit');

  // Generated steps
  const [steps, setSteps] = useState<StepRecord[]>(() =>
    generateFirstFitSteps([120, 350, 180, 240, 500], 200, 'P1')
  );

  // Playback state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Real host telemetry
  const hostTelemetry = useHostTelemetry();

  // Ref for timer
  const timerRef = useRef<number | null>(null);

  // Handle configuration changes
  const handleApplyConfig = (newHoles: number[], newSize: number, newName: string) => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    setHolesInput(newHoles);
    setProcessSize(newSize);
    setProcessName(newName);

    const newSteps = generateFirstFitSteps(newHoles, newSize, newName);
    setSteps(newSteps);
    setCurrentStepIndex(0);
  };

  // Playback handlers
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleTogglePlay = () => {
    if (currentStepIndex >= steps.length - 1) {
      // Loop or restart if at end
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentStepIndex(0);
  };

  // Auto-play timer effect
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(1800 / playbackSpeed);
      timerRef.current = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, steps.length]);

  const activeStep = steps[currentStepIndex] || steps[0];

  return (
    <div className="space-y-6">
      {/* KHU VỰC A: TIÊU ĐỀ THUẬT TOÁN (HCMUE Banner Style) */}
      <div className="bg-white border-b border-[#E2E8F0] pb-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#005AA8] mb-1">
          <Layers className="w-4 h-4" />
          <span>PHÂN HỆ 2: CẤP PHÁT BỘ NHỚ LIÊN TỤC</span>
        </div>

        <h1 className="text-xl md:text-2xl font-black text-[#164A73] tracking-tight">
          CẤP PHÁT BỘ NHỚ — FIRST-FIT
        </h1>

        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono mt-0.5">
          <span>First-Fit Contiguous Memory Allocation</span>
          <span>•</span>
          <span className="text-emerald-700 font-sans font-semibold">
            Operating System Concepts (Mục 9.2)
          </span>
        </div>

        <p className="mt-2 text-xs md:text-sm text-slate-700 leading-relaxed max-w-4xl">
          Thuật toán First-Fit cấp phát vùng nhớ liên tục bằng cách tìm kiếm từ đầu bộ nhớ và chọn vùng trống (hole) đầu tiên có kích thước đủ lớn để thỏa mãn yêu cầu của tiến trình. Nếu vùng trống lớn hơn yêu cầu, phần dư sẽ được tách thành một vùng trống mới.
        </p>
      </div>

      {/* KHU VỰC B: NHẬP DỮ LIỆU ĐẦU VÀO */}
      <InputControlCard
        holesInputStr={holesInput.join(', ')}
        processSize={processSize}
        processName={processName}
        onApplyConfig={handleApplyConfig}
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={(algo) => {
          setSelectedAlgorithm(algo);
          if (algo !== 'first-fit' && onSelectOtherAlgo) {
            onSelectOtherAlgo(algo);
          }
        }}
      />

      {/* KHU VỰC C: THANH ĐIỀU KHIỂN DEMO */}
      <PlaybackControls
        currentStep={currentStepIndex + 1}
        totalSteps={steps.length}
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        onPrev={handlePrev}
        onNext={handleNext}
        onTogglePlay={handleTogglePlay}
        onReset={handleReset}
        onChangeSpeed={setPlaybackSpeed}
      />

      {/* KHU VỰC D & F: SƠ ĐỒ MÔ PHỎNG VÀ BẢNG THÔNG SỐ (2 Cột Responsive) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Canvas & Step Narrator): 8 Cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* KHU VỰC D: MÔ PHỎNG TRỰC QUAN */}
          <VisualMemoryCanvas
            holes={activeStep.holesSnapshot}
            currentHoleId={activeStep.holeId}
            totalRam={activeStep.simulatedStats.totalRam}
            processSize={processSize}
            processName={processName}
          />

          {/* KHU VỰC E: GIẢI THÍCH TỪNG BƯỚC */}
          <StepNarrator
            currentStepIndex={currentStepIndex}
            steps={steps}
          />
        </div>

        {/* Right Column (Telemetry Panel): 4 Cols */}
        <div className="lg:col-span-4 space-y-6">
          {/* KHU VỰC F: BẢNG THÔNG SỐ KỸ THUẬT */}
          <TelemetryPanel
            simulatedStats={activeStep.simulatedStats}
            hostTelemetry={hostTelemetry}
            algorithmName="First-Fit"
          />
        </div>
      </div>

      {/* KHU VỰC KIẾN THỨC LÝ THUYẾT (Theory Drawer) */}
      <TheoryDrawer />
    </div>
  );
};
