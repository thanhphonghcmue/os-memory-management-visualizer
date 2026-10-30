import React from 'react';
import { Home, HelpCircle, BookOpen, Tv, Maximize2, Minimize2, ExternalLink, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import fitLogo from '../../assets/logo-fit.jpg';

interface HeaderProps {
  currentView: string;
  onNavigateHome: () => void;
  onOpenGuide: () => void;
  onOpenDocs: () => void;
  isPresentationMode: boolean;
  onTogglePresentation: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  onOpenGuide,
  onOpenDocs,
  isPresentationMode,
  onTogglePresentation,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-3 md:px-5 bg-[#164A73] text-white shadow-md select-none border-b border-[#0d3454]">
      {/* Left: Sidebar Toggle + Brand Identity */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Toggle Sidebar Button (Giấu / Mở danh mục chức năng) */}
        {!isPresentationMode && (
          <button
            onClick={onToggleSidebar}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isSidebarOpen
                ? 'bg-white/15 hover:bg-white/25 text-white'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-sm'
            }`}
            title={isSidebarOpen ? 'Thu gọn danh mục chức năng' : 'Mở danh mục chức năng (5 Phân hệ)'}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4 text-slate-900" />
            )}
            <span className="hidden sm:inline">
              {isSidebarOpen ? 'Giấu Menu' : 'Mở Menu'}
            </span>
          </button>
        )}

        {/* Brand & FIT HCMUE Logo */}
        <div
          className="flex items-center space-x-2.5 cursor-pointer group"
          onClick={onNavigateHome}
        >
          {/* FIT Logo from user image */}
          <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-white to-sky-300 shadow-md shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
            <img
              src={fitLogo}
              alt="Logo FIT HCMUE"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-sm md:text-base font-black tracking-tight text-white uppercase group-hover:text-amber-300 transition-colors truncate">
                Web Demo Quản Lý Bộ Nhớ
              </span>
              <span className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-bold bg-amber-400/25 text-amber-200 rounded border border-amber-400/40 uppercase">
                FIT HCMUE
              </span>
            </div>
            <span className="text-[11px] text-sky-100/80 hidden md:inline truncate">
              Khoa Công nghệ Thông tin • Trường Đại học Sư phạm TP.HCM
            </span>
          </div>
        </div>
      </div>

      {/* Right: Action Buttons (HCMUE Portal Style) */}
      <div className="flex items-center space-x-1 md:space-x-2 text-sm">
        <button
          onClick={onNavigateHome}
          className={`flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs md:text-sm font-medium transition-colors ${
            currentView === 'home'
              ? 'bg-[#005AA8] text-white shadow-sm'
              : 'hover:bg-white/10 text-white/90'
          }`}
          title="Trang chủ"
        >
          <Home className="w-4 h-4" />
          <span className="hidden md:inline">Trang chủ</span>
        </button>

        <button
          onClick={onOpenGuide}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs md:text-sm font-medium hover:bg-white/10 text-white/90 transition-colors"
          title="Hướng dẫn sử dụng"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden md:inline">Hướng dẫn</span>
        </button>

        <button
          onClick={onOpenDocs}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs md:text-sm font-medium hover:bg-white/10 text-white/90 transition-colors"
          title="Tài liệu tham khảo"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden md:inline">Tài liệu</span>
        </button>

        <button
          onClick={onTogglePresentation}
          className={`flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs md:text-sm font-medium transition-colors ${
            isPresentationMode
              ? 'bg-amber-400 text-slate-900 font-bold shadow-xs'
              : 'hover:bg-white/10 text-white/90'
          }`}
          title="Chế độ trình chiếu màn hình lớn"
        >
          <Tv className="w-4 h-4" />
          <span className="hidden xl:inline">Trình chiếu</span>
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded hover:bg-white/10 text-white/90 transition-colors"
          title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* GitHub link */}
        <a
          href="https://github.com/thanhphonghcmue/os-memory-management-visualizer"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 px-2 py-1.5 rounded bg-white/15 hover:bg-white/25 text-xs text-white transition-colors"
          title="Mở kho lưu trữ GitHub"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <ExternalLink className="w-3 h-3 hidden md:inline" />
        </a>
      </div>
    </header>
  );
};
