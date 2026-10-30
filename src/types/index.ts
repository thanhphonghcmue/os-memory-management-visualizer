export interface NavItem {
  id: string;
  name: string;
  nameEn: string;
  groupId: string;
  iconName?: string;
  isAvailable?: boolean;
}

export interface NavGroup {
  id: string;
  title: string;
  titleEn: string;
  items: NavItem[];
}

export interface MemoryHole {
  id: string;
  label: string;
  start: number;
  size: number;
  end: number;
  state: 'idle' | 'checking' | 'rejected' | 'allocated' | 'remaining' | 'occupied';
  processName?: string;
  allocatedSize?: number;
}

export interface StepRecord {
  stepNumber: number;
  title: string;
  detail: string;
  calculation?: string;
  holeId?: string;
  status: 'info' | 'checking' | 'success' | 'danger' | 'warning';
  holesSnapshot: MemoryHole[];
  simulatedStats: {
    totalRam: number;
    usedRam: number;
    freeRam: number;
    maxHole: number;
    externalFragCount: number;
    checksCount: number;
  };
}

export interface HostTelemetry {
  cpuCores: number;
  jsHeapUsedMB: number | null;
  jsHeapTotalMB: number | null;
  stepExecutionMs: number;
  fps: number;
  browserUserAgent: string;
  connectionType: string;
}

export interface TextbookPreset {
  id: string;
  name: string;
  source: string;
  description: string;
  holes: number[];
  processSize: number;
  expectedSelectedHole: string;
}
