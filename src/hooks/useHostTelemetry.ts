import { useState, useEffect } from 'react';
import { HostTelemetry } from '../types';

export function useHostTelemetry(): HostTelemetry {
  const [telemetry, setTelemetry] = useState<HostTelemetry>({
    cpuCores: navigator.hardwareConcurrency || 4,
    jsHeapUsedMB: null,
    jsHeapTotalMB: null,
    stepExecutionMs: 0.15,
    fps: 60,
    browserUserAgent: navigator.userAgent,
    connectionType: (navigator as any).connection?.effectiveType || 'online',
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const calculatedFps = Math.round((frameCount * 1000) / (now - lastTime));
        frameCount = 0;
        lastTime = now;

        // Read performance.memory if supported in Chrome/Edge
        const perfMemory = (performance as any).memory;
        const usedMB = perfMemory ? Number((perfMemory.usedJSHeapSize / (1024 * 1024)).toFixed(2)) : null;
        const totalMB = perfMemory ? Number((perfMemory.totalJSHeapSize / (1024 * 1024)).toFixed(2)) : null;

        setTelemetry((prev) => ({
          ...prev,
          fps: Math.min(calculatedFps, 60),
          jsHeapUsedMB: usedMB,
          jsHeapTotalMB: totalMB,
        }));
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);

    return () => cancelAnimationFrame(animId);
  }, []);

  return telemetry;
}
