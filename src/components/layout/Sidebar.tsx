import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Layers,
  Box,
  Grid,
  HardDrive,
  RefreshCw,
  User,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { NAVIGATION_GROUPS } from '../../data/navigation';

interface SidebarProps {
  currentDemoId: string;
  onSelectDemo: (demoId: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentDemoId,
  onSelectDemo,
  isOpenMobile,
  onCloseMobile,
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
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed md:sticky top-16 left-0 z-40 w-[270px] h-[calc(100vh-4rem)] bg-[#F8FAFC] border-r border-[#E2E8F0] flex flex-col transition-transform duration-200 select-none ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* User Academic Profile Card (HCMUE Portal Style) */}
        <div className="p-3 border-b border-[#E2E8F0] bg-white">
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-full bg-[#164A73] flex items-center justify-center text-white font-bold text-sm shadow-xs">
              <User className="w-5 h-5 text-sky-100" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#1E293B] truncate">Lâm Thanh Phong</span>
              <span className="text-[11px] font-medium text-slate-500">50.01.103.057</span>
              <span className="text-[10px] text-[#005AA8] font-semibold truncate">
                Sinh viên Sư phạm Tin học
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Header Title */}
        <div className="px-4 py-2.5 bg-[#F1F5F9] border-b border-[#E2E8F0] flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#174B75]">
            Danh mục Demo
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
                      ? 'text-[#164A73] bg-sky-50/80 font-bold'
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
                  <div className="mt-1 ml-3 pl-3 border-l-2 border-slate-200 space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = item.id === currentDemoId;

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onSelectDemo(item.id);
                            onCloseMobile();
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
        <div className="p-3 border-t border-[#E2E8F0] bg-white text-[10px] text-slate-500">
          <div className="flex items-center space-x-1 text-slate-600 font-medium mb-1">
            <Clock className="w-3 h-3 text-[#164A73]" />
            <span>Operating System Concepts 10th</span>
          </div>
          <p className="text-[9px] text-slate-400 leading-tight">
            Khoa CNTT - ĐH Sư phạm TP.HCM. Bản quyền mô phỏng học thuật 2026.
          </p>
        </div>
      </aside>
    </>
  );
};
