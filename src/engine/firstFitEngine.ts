import { MemoryHole, StepRecord } from '../types';

export function generateFirstFitSteps(
  holesInput: number[],
  processSize: number,
  processName: string = 'P1'
): StepRecord[] {
  const steps: StepRecord[] = [];

  // Generate initial memory layout with contiguous addresses
  let currentAddress = 0;
  const initialHoles: MemoryHole[] = holesInput.map((size, index) => {
    const label = `Vùng ${String.fromCharCode(65 + index)} (${size} KB)`;
    const start = currentAddress;
    const end = currentAddress + size;
    currentAddress = end;
    return {
      id: `hole-${index}`,
      label,
      start,
      size,
      end,
      state: 'idle',
    };
  });

  const totalRam = currentAddress;

  // Step 1: Initial state
  steps.push({
    stepNumber: 1,
    title: `Khởi tạo: Yêu cầu cấp phát cho tiến trình ${processName}`,
    detail: `Tiến trình ${processName} gửi yêu cầu cấp phát bộ nhớ liên tục kích thước ${processSize} KB. Thuật toán First-Fit bắt đầu duyệt tuần tự danh sách các vùng trống từ đầu RAM (địa chỉ 0 KB).`,
    calculation: `Yêu cầu = ${processSize} KB | Tổng RAM = ${totalRam} KB (${holesInput.length} vùng trống)`,
    status: 'info',
    holesSnapshot: JSON.parse(JSON.stringify(initialHoles)),
    simulatedStats: {
      totalRam,
      usedRam: 0,
      freeRam: totalRam,
      maxHole: Math.max(...holesInput),
      externalFragCount: holesInput.length,
      checksCount: 0,
    },
  });

  let allocatedIndex = -1;
  const currentHoles: MemoryHole[] = JSON.parse(JSON.stringify(initialHoles));
  let stepCounter = 2;

  // Search sequentially for the first fit
  for (let i = 0; i < currentHoles.length; i++) {
    const hole = currentHoles[i];
    const holeLetter = String.fromCharCode(65 + i);

    // Snapshot: Marking this hole as currently checking
    const checkingSnapshot: MemoryHole[] = JSON.parse(JSON.stringify(currentHoles));
    checkingSnapshot[i].state = 'checking';

    if (hole.size < processSize) {
      // Step: Checking and rejected
      steps.push({
        stepNumber: stepCounter++,
        title: `Kiểm tra Vùng ${holeLetter}: Không đủ dung lượng`,
        detail: `Hệ thống kiểm tra Vùng ${holeLetter} tại dải địa chỉ [${hole.start} KB .. ${hole.end} KB] có kích thước ${hole.size} KB. Do ${hole.size} KB < ${processSize} KB, vùng này không đủ để chứa ${processName}. Bỏ qua và chuyển sang vùng tiếp theo.`,
        calculation: `So sánh: ${hole.size} KB < ${processSize} KB → Không thỏa mãn (Bỏ qua)`,
        holeId: hole.id,
        status: 'warning',
        holesSnapshot: checkingSnapshot.map((h, idx) =>
          idx === i ? { ...h, state: 'rejected' } : h
        ),
        simulatedStats: {
          totalRam,
          usedRam: 0,
          freeRam: totalRam,
          maxHole: Math.max(...currentHoles.map((h) => h.size)),
          externalFragCount: currentHoles.length,
          checksCount: i + 1,
        },
      });
      // Mark as rejected in working copy
      currentHoles[i].state = 'rejected';
    } else {
      // Match found!
      allocatedIndex = i;

      // Step: Found match
      steps.push({
        stepNumber: stepCounter++,
        title: `Kiểm tra Vùng ${holeLetter}: Tìm thấy vùng phù hợp!`,
        detail: `Hệ thống kiểm tra Vùng ${holeLetter} tại [${hole.start} KB .. ${hole.end} KB] có kích thước ${hole.size} KB. Do ${hole.size} KB ≥ ${processSize} KB, vùng này thỏa mãn điều kiện. Theo nguyên lý First-Fit, thuật toán dừng tìm kiếm ngay lập tức và quyết định cấp phát tại đây.`,
        calculation: `So sánh: ${hole.size} KB ≥ ${processSize} KB → Thỏa mãn! Chọn Vùng ${holeLetter}`,
        holeId: hole.id,
        status: 'success',
        holesSnapshot: checkingSnapshot.map((h, idx) =>
          idx === i ? { ...h, state: 'checking' } : h
        ),
        simulatedStats: {
          totalRam,
          usedRam: 0,
          freeRam: totalRam,
          maxHole: Math.max(...currentHoles.map((h) => h.size)),
          externalFragCount: currentHoles.length,
          checksCount: i + 1,
        },
      });

      // Step: Final Allocation execution
      const allocatedBlock: MemoryHole = {
        id: `alloc-${processName}`,
        label: `${processName} (${processSize} KB)`,
        start: hole.start,
        size: processSize,
        end: hole.start + processSize,
        state: 'allocated',
        processName,
        allocatedSize: processSize,
      };

      const finalHoles: MemoryHole[] = [];
      for (let j = 0; j < currentHoles.length; j++) {
        if (j === i) {
          finalHoles.push(allocatedBlock);
          const remainderSize = hole.size - processSize;
          if (remainderSize > 0) {
            finalHoles.push({
              id: `remainder-${j}`,
              label: `Dư ${String.fromCharCode(65 + j)} (${remainderSize} KB)`,
              start: hole.start + processSize,
              size: remainderSize,
              end: hole.end,
              state: 'remaining',
            });
          }
        } else {
          finalHoles.push({
            ...currentHoles[j],
            state: 'idle',
          });
        }
      }

      const remainder = hole.size - processSize;
      const newFreeRam = totalRam - processSize;

      steps.push({
        stepNumber: stepCounter++,
        title: `Cấp phát thành công cho tiến trình ${processName}`,
        detail: `Tiến trình ${processName} được cấp phát ${processSize} KB tại dải địa chỉ [${hole.start} KB .. ${hole.start + processSize} KB]. Phần bộ nhớ còn dư ${remainder} KB [${hole.start + processSize} KB .. ${hole.end} KB] trở thành một vùng trống mới sẵn sàng cho các yêu cầu tiếp theo.`,
        calculation: `Dung lượng còn dư = ${hole.size} KB - ${processSize} KB = ${remainder} KB | Hiệu suất sử dụng RAM = ${((processSize / totalRam) * 100).toFixed(1)}%`,
        holeId: hole.id,
        status: 'success',
        holesSnapshot: finalHoles,
        simulatedStats: {
          totalRam,
          usedRam: processSize,
          freeRam: newFreeRam,
          maxHole: Math.max(...finalHoles.filter((h) => h.state !== 'allocated').map((h) => h.size)),
          externalFragCount: finalHoles.filter((h) => h.state !== 'allocated').length,
          checksCount: i + 1,
        },
      });

      break;
    }
  }

  // If no hole matched
  if (allocatedIndex === -1) {
    steps.push({
      stepNumber: stepCounter++,
      title: `Thất bại: Không có vùng nhớ nào đủ kích thước`,
      detail: `Đã duyệt qua toàn bộ ${currentHoles.length} vùng trống trong danh sách nhưng không tìm thấy vùng nào có kích thước ≥ ${processSize} KB. Yêu cầu cấp phát của ${processName} bị từ chối do phân mảnh ngoại vi hoặc không đủ tổng RAM liên tục.`,
      calculation: `Max Hole = ${Math.max(...holesInput)} KB < Yêu cầu = ${processSize} KB → Cấp phát thất bại`,
      status: 'danger',
      holesSnapshot: currentHoles.map((h) => ({ ...h, state: 'rejected' })),
      simulatedStats: {
        totalRam,
        usedRam: 0,
        freeRam: totalRam,
        maxHole: Math.max(...holesInput),
        externalFragCount: currentHoles.length,
        checksCount: currentHoles.length,
      },
    });
  }

  return steps;
}
