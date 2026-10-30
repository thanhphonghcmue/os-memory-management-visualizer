import React, { useState } from 'react';
import { BookMarked, CheckCircle, AlertTriangle, Layers, SlidersHorizontal } from 'lucide-react';
import { FIRST_FIT_PRESETS } from '../../../data/presets';
import { TextbookPreset } from '../../../types';

interface InputControlCardProps {
  holesInputStr: string;
  processSize: number;
  processName: string;
  onApplyConfig: (holes: number[], size: number, name: string) => void;
  selectedAlgorithm: string;
  onSelectAlgorithm: (algo: string) => void;
}

export const InputControlCard: React.FC<InputControlCardProps> = ({
  holesInputStr,
  processSize,
  processName,
  onApplyConfig,
  selectedAlgorithm,
  onSelectAlgorithm,
}) => {
  const [holesText, setHolesText] = useState(holesInputStr);
  const [sizeInput, setSizeInput] = useState(processSize.toString());
  const [nameInput, setNameInput] = useState(processName);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleValidateAndApply = () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validate holes
    const rawHoles = holesText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (rawHoles.length === 0) {
      setErrorMsg('Vui lòng nhập ít nhất một vùng trống (Hole) trong bộ nhớ.');
      return;
    }

    const holes: number[] = [];
    for (const item of rawHoles) {
      const val = Number(item);
      if (isNaN(val) || val <= 0) {
        setErrorMsg(`Kích thước vùng nhớ "${item}" không hợp lệ. Vui lòng nhập số nguyên dương.`);
        return;
      }
      holes.push(Math.round(val));
    }

    // Validate process size
    const size = Number(sizeInput);
    if (isNaN(size) || size <= 0) {
      setErrorMsg('Kích thước tiến trình yêu cầu phải là một số nguyên dương (> 0 KB).');
      return;
    }

    // Apply configuration
    onApplyConfig(holes, Math.round(size), nameInput.trim() || 'P1');
    setSuccessMsg('Cập nhật dữ liệu thành công! Bộ mô phỏng đã sẵn sàng.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const loadPreset = (preset: TextbookPreset) => {
    setHolesText(preset.holes.join(', '));
    setSizeInput(preset.processSize.toString());
    setNameInput('P1');
    setErrorMsg(null);
    setSuccessMsg(`Đã nạp: ${preset.name}`);
    onApplyConfig(preset.holes, preset.processSize, 'P1');
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-xs overflow-hidden">
      {/* Dark Blue Header Bar (HCMUE Card Style) */}
      <div className="bg-[#164A73] px-4 py-2.5 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-sky-300" />
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">
            Cấu hình dữ liệu đầu vào & Thuật toán
          </h2>
        </div>
        <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-sky-100 font-medium">
          Mục B
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Preset Selector Buttons */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
              <BookMarked className="w-3.5 h-3.5 text-[#005AA8]" />
              <span>Nạp bộ dữ liệu mẫu từ giáo trình:</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {FIRST_FIT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className="text-left px-3 py-2 rounded border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-[#005AA8] transition-all text-xs group"
              >
                <div className="font-bold text-[#164A73] group-hover:text-[#005AA8] truncate">
                  {preset.name}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  Holes: [{preset.holes.join(', ')}] KB • Req: {preset.processSize} KB
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          {/* Holes Input */}
          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Danh sách kích thước vùng trống (Holes):
            </label>
            <div className="relative">
              <input
                type="text"
                value={holesText}
                onChange={(e) => setHolesText(e.target.value)}
                placeholder="Ví dụ: 120, 350, 180, 240, 500"
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005AA8] focus:border-[#005AA8]"
              />
              <span className="absolute right-2.5 top-2 text-[11px] font-semibold text-slate-400">
                KB
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Các số cách nhau bằng dấu phẩy. Đơn vị: KiloBytes (KB).
            </p>
          </div>

          {/* Process Size Input */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Dung lượng yêu cầu (Request):
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                placeholder="200"
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005AA8] focus:border-[#005AA8]"
              />
              <span className="absolute right-2.5 top-2 text-[11px] font-semibold text-slate-400">
                KB
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">Tiến trình cần cấp phát</p>
          </div>

          {/* Process Name Input */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tên tiến trình:
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="P1"
              maxLength={8}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005AA8] focus:border-[#005AA8]"
            />
            <p className="text-[10px] text-slate-500 mt-0.5">Ký hiệu tiến trình</p>
          </div>
        </div>

        {/* Algorithm Modes & Apply Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Thuật toán cấp phát:</span>
            </span>

            <div className="inline-flex rounded-md shadow-xs border border-slate-200 p-0.5 bg-slate-100 text-xs">
              <button
                onClick={() => onSelectAlgorithm('first-fit')}
                className={`px-3 py-1 font-bold rounded transition-colors ${
                  selectedAlgorithm === 'first-fit'
                    ? 'bg-[#005AA8] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                First-fit
              </button>
              <button
                onClick={() => onSelectAlgorithm('best-fit')}
                className={`px-3 py-1 font-medium rounded transition-colors ${
                  selectedAlgorithm === 'best-fit'
                    ? 'bg-[#005AA8] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Sắp ra mắt ở bước kế tiếp"
              >
                Best-fit
              </button>
              <button
                onClick={() => onSelectAlgorithm('worst-fit')}
                className={`px-3 py-1 font-medium rounded transition-colors ${
                  selectedAlgorithm === 'worst-fit'
                    ? 'bg-[#005AA8] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Sắp ra mắt ở bước kế tiếp"
              >
                Worst-fit
              </button>
            </div>
          </div>

          <button
            onClick={handleValidateAndApply}
            className="flex items-center space-x-1.5 px-4 py-2 bg-[#164A73] hover:bg-[#113857] text-white text-xs font-bold rounded-md shadow-xs transition-colors"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Kiểm tra & Nạp dữ liệu mô phỏng</span>
          </button>
        </div>

        {/* Validation / Alert Message */}
        {errorMsg && (
          <div className="flex items-center space-x-2 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-md text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="flex items-center space-x-2 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};
