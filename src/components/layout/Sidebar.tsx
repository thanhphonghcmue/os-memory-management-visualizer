import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Layers,
  Box,
  Grid,
  HardDrive,
  RefreshCw,
  CheckCircle2,
  Clock,
  GraduationCap,
  PanelLeftClose,
  Pin,
  PinOff,
  X,
} from 'lucide-react';
import { NAVIGATION_GROUPS } from '../../data/navigation';
import fitLogo from '../../assets/logo-fit.jpg';

interface SidebarProps {
  currentDemoId: string;
  onSelectDemo: (demoId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentDemoId,
  onSelectDemo,
  isOpen,
  onClose,
  isPinned,
  onTogglePin,
}) => {
  // Keep Group 2 (Allocation) expanded by default
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'group-foundations': false,
    'group-allocation': true,
    'group-paging': false,
    'group-virtual-memory': false,
    'group-replacement': false,
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const getGroupIcon = (groupId: string) => {
    switch (groupId) {
      case 'group-foundations':
        return <Layers className="w-4 h-4 text-[#174B75]" />;
      case 'group-allocation':
        return <Box className="w-4 h-4 text-[#174B75]" />;
      case 'group-paging':
        return <Grid className="w-4 h-4 text-[#174B75]" />;
      case 'group-virtual-memory':
        return <HardDrive className="w-4 h-4 text-[#174B75]" />;
      case 'group-replacement':
        return <RefreshCw className="w-4 h-4 text-[#174B75]" />;
      default:
        return <Layers className="w-4 h-4 text-[#174B75]" />;
    }
  };

  return (
    <>
      {/* Dimmed backdrop when in Drawer / Overlay mode (click outside to dismiss) */}
      {isOpen && !isPinned && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-2xs transition-opacity"
          onClick={onClose}
          title="Bấm ra ngoài để giấu menu"
        />
      )}

      {/* Sidebar Container: Only 280px wide, NEVER covers full screen */}
      <aside
        className={`fixed top-16 left-0 z-40 w-[280px] h-[calc(100vh-4rem)] bg-[#F8FAFC] border-r border-[#E2E8F0] shadow-xl flex flex-col transition-all duration-300 ease-in-out select-none ${
          isPinned ? 'md:sticky md:shadow-none' : ''
        } ${
          isOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : '-translate-x-full opacity-0 pointer-events-none md:w-0 md:border-0'
        }`}
      >
        {/* FIT HCMUE Institutional Branding Card */}
        <div className="p-3 border-b border-[#E2E8F0] bg-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-[#164A73] shadow-xs shrink-0 overflow-hidden">
              <img
                src={fitLogo}
                alt="Logo FIT HCMUE"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black text-[#164A73] uppercase tracking-tight truncate">
                Khoa CNTT - HCMUE
              </span>
              <span className="inline-flex items-center space-x-1 text-[10px] text-[#005AA8] font-bold">
                <GraduationCap className="w-3 h-3 text-[#005AA8]" />
                <span>Mô phỏng Hệ điều hành</span>
              </span>
            </div>
          </div>

          {/* Action buttons on Sidebar Header: Pin & Close */}
          <div className="flex items-center space-x-1">
            <button
              onClick={onTogglePin}
              className={`p-1.5 rounded-md transition-colors hidden md:block ${
                isPinned
                  ? 'bg-sky-100 text-[#005AA8]'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title={isPinned ? 'Bỏ ghim (chuyển sang dạng trượt)' : 'Ghim thanh menu cố định bên trái'}
            >
              {isPinned ? <Pin className="w-3.5 h-3.5" /> : <PinOff className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              title="Giấu danh mục (Mở rộng toàn màn hình mô phỏng)"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sidebar Header Title with Pin status */}
        <div className="px-3.5 py-2 bg-[#F1F5F9] border-b border-[#E2E8F0] flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#174B75]">
            Danh mục Chức năng
          </span>
          <span className="text-[10px] bg-sky-100 text-[#005AA8] font-semibold px-1.5 py-0.5 rounded">
            5 Phân hệ
          </span>
        </div>

        {/* Navigation Tree */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {NAVIGATION_GROUPS.map((group) => {
            const isExpanded = expandedGroups[group.id];
            const hasActiveChild = group.items.some((item) => item.id === currentDemoId);

            return (
              <div key={group.id} className="mb-1">
                {/* Group Header Button */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-md transition-colors text-left ${
                    hasActiveChild
                      ? 'text-[#164A73] bg-sky-50 font-bold'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    {getGroupIcon(group.id)}
                    <span className="truncate">{group.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                </button>

                {/* Sub-items List */}
                {isExpanded && (
                  <div className="mt-1 ml-3 pl-2.5 border-l-2 border-slate-200 space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = item.id === currentDemoId;

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onSelectDemo(item.id);
                            if (!isPinned) {
                              onClose();
                            }
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md text-left transition-all ${
                            isActive
                              ? 'bg-[#005AA8] text-white font-semibold shadow-xs'
                              : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center space-x-1.5 truncate">
                            {isActive ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-200 shrink-0" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                            )}
                            <span className="truncate" title={item.name}>
                              {item.name}
                            </span>
                          </div>

                          {item.isAvailable ? (
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-semibold shrink-0 ml-1 ${
                                isActive
                                  ? 'bg-sky-400/30 text-white'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              Sẵn sàng
                            </span>
                          ) : (
                            <span className="text-[9px] text-slate-400 italic shrink-0 ml-1">
                              Giai đoạn 2
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Note */}
        <div className="p-2.5 border-t border-[#E2E8F0] bg-white text-[10px] text-slate-500">
          <div className="flex items-center justify-between text-slate-600 font-medium mb-0.5">
            <span className="truncate">Operating System Concepts</span>
            <span className="text-[9px] text-slate-400">10th Ed</span>
          </div>
          <p className="text-[9px] text-slate-400 leading-tight">
            Khoa CNTT - ĐH Sư phạm TP.HCM.
          </p>
        </div>
      </aside>
    </>
  );
};
