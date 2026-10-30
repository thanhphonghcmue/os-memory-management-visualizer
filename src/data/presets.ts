import { TextbookPreset } from '../types';

export const FIRST_FIT_PRESETS: TextbookPreset[] = [
  {
    id: 'preset-silberschatz-2.2.5',
    name: 'Mẫu Giáo trình 2.2.5 (5 Vùng trống Silberschatz)',
    source: 'Operating System Concepts, 10th Ed, Mục 9.2',
    description: 'Bộ 5 vùng trống kinh điển: 120 KB, 350 KB, 180 KB, 240 KB, 500 KB. Yêu cầu cấp phát 200 KB.',
    holes: [120, 350, 180, 240, 500],
    processSize: 200,
    expectedSelectedHole: 'Vùng B (350 KB) -> Còn dư 150 KB',
  },
  {
    id: 'preset-multi-allocation',
    name: 'Mẫu Cấp phát liên tiếp (Đoạn 1000 KB)',
    source: 'Tài liệu nghiên cứu Phần 2 (Cấp phát liên tục)',
    description: 'RAM gồm các khối 150 KB, 400 KB, 120 KB, 600 KB. Yêu cầu cấp phát 300 KB.',
    holes: [150, 400, 120, 600],
    processSize: 300,
    expectedSelectedHole: 'Vùng 2 (400 KB) -> Còn dư 100 KB',
  },
  {
    id: 'preset-overflow-check',
    name: 'Mẫu Kiểm thử Thất bại (Không đủ dung lượng)',
    source: 'Phép thử biên hệ thống',
    description: 'Các vùng trống nhỏ: 80 KB, 120 KB, 90 KB, 150 KB. Yêu cầu cấp phát 250 KB vượt quá mọi vùng trống.',
    holes: [80, 120, 90, 150],
    processSize: 250,
    expectedSelectedHole: 'Thất bại: Không có vùng nhớ nào đủ điều kiện',
  },
];
