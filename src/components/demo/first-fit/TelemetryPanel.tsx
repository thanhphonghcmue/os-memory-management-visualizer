import React from 'react';
import { HostTelemetry } from '../../../types';
import { Activity, Cpu, Gauge, Server, ShieldCheck, HardDrive } from 'lucide-react';

interface TelemetryPanelProps {
  simulatedStats: {
    totalRam: number;
    usedRam: number;
    freeRam: number;
    maxHole: number;
    externalFragCount: number;
    checksCount: number;
  };
  hostTelemetry: HostTelemetry;
  algorithmName: string;
}

export const TelemetryPanel: React.FC<TelemetryPanelProps> = ({
  simulatedStats,
  hostTelemetry,
  algorithmName,
}) => {
  const utilization = simulatedStats.totalRam > 0
    ? ((simulatedStats.usedRam / simulatedStats.totalRam) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-xs overflow-hidden select-none">
      {/* Dark Blue Header */}
      <div className="bg-[#164A73] px-4 py-2.5 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-sky-300" />
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">
            Bảng thông số kỹ thuật (Live Telemetry)
          </h2>
        </div>
        <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-sky-100 font-medium">
          Mục F
        </span>
      </div>

      <div className="p-4 space-y-5">
        {/* SECTION 1: SIMULATED SYSTEM METRICS */}
        <div>
          <div className="flex items-center space-x-1.5 pb-2 mb-2 border-b border-slate-200">
            <HardDrive className="w-4 h-4 text-[#005AA8]" />
            <h3 className="text-xs font-bold text-[#164A73] uppercase tracking-wide">
              1. Hệ thống mô phỏng (Simulated OS / MMU)
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">
                Tổng RAM mô phỏng
              </span>
              <span className="text-sm font-bold font-mono text-slate-800">
                {simulatedStats.totalRam.toLocaleString()} KB
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">
                Hiệu suất sử dụng
              </span>
              <span className="text-sm font-bold font-mono text-[#005AA8]">
                {utilization}%
              </span>
            </div>

            <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-md">
              <span className="text-[10px] text-emerald-800 block uppercase font-medium">
                RAM đã cấp phát
              </span>
              <span className="text-sm font-bold font-mono text-emerald-700">
                {simulatedStats.usedRam.toLocaleString()} KB
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">
                RAM còn trống
              </span>
              <span className="text-sm font-bold font-mono text-slate-700">
                {simulatedStats.freeRam.toLocaleString()} KB
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">
                Vùng trống lớn nhất (Max Hole)
              </span>
              <span className="text-sm font-bold font-mono text-slate-800">
                {simulatedStats.maxHole.toLocaleString()} KB
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">
                Số vùng trống (Lỗ hổng)
              </span>
              <span className="text-sm font-bold font-mono text-amber-700">
                {simulatedStats.externalFragCount} vùng
              </span>
            </div>
          </div>

          <div className="mt-2 p-2 bg-blue-50/60 border border-blue-200 rounded-md flex items-center justify-between text-xs">
            <span className="text-blue-900 font-medium">Số phép kiểm tra đã thực hiện:</span>
            <span className="font-bold font-mono text-blue-700">
              {simulatedStats.checksCount} lần so sánh
            </span>
          </div>
        </div>

        {/* SECTION 2: REAL HOST TELEMETRY */}
        <div>
          <div className="flex items-center space-x-1.5 pb-2 mb-2 border-b border-slate-200">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              2. Máy tính thực tế (Real Host Telemetry)
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-slate-600">Số luồng CPU Logic:</span>
              <span className="font-mono font-bold text-slate-800">
                {hostTelemetry.cpuCores} Cores
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-slate-600">Trình duyệt JS Heap:</span>
              <span className="font-mono font-bold text-slate-800">
                {hostTelemetry.jsHeapUsedMB !== null
                  ? `${hostTelemetry.jsHeapUsedMB} MB / ${hostTelemetry.jsHeapTotalMB} MB`
                  : 'Bảo mật trình duyệt (Không khả dụng)'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-slate-600">Thời gian tính toán bước:</span>
              <span className="font-mono font-bold text-emerald-700">
                ~{hostTelemetry.stepExecutionMs} ms (performance.now)
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-slate-600">Tốc độ khung hình (Render FPS):</span>
              <span className="font-mono font-bold text-sky-700">
                {hostTelemetry.fps} FPS
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-slate-600">Agent giám sát OS thật:</span>
              <span className="text-[11px] font-medium text-slate-500 italic">
                Chưa kết nối (Web Client Demo)
              </span>
            </div>
          </div>
        </div>

        {/* Academic Rigor Notice */}
        <div className="p-2.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] text-slate-500 flex items-start space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-tight">
            <strong>Nguyên tắc học thuật:</strong> Thông số mô phỏng được tính toán tự động theo trạng thái thuật toán. Thông số máy thật đo trực tiếp qua Web API trình duyệt (không tạo số liệu giả).
          </p>
        </div>
      </div>
    </div>
  );
};
