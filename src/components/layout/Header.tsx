import React from 'react';
import { Home, HelpCircle, BookOpen, Tv, Maximize2, Minimize2, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigateHome: () => void;
  onOpenGuide: () => void;
  onOpenDocs: () => void;
  isPresentationMode: boolean;
  onTogglePresentation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  onOpenGuide,
  onOpenDocs,
  isPresentationMode,
  onTogglePresentation,
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
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 bg-[#164A73] text-white shadow-md select-none border-b border-[#0d3454]">
      {/* Brand & Academic Identity */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateHome}>
        {/* Custom Stylized Academic Chip/Book Logo */}
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 text-[#164A73] shadow-inner font-black text-lg">
          <svg className="w-6 h-6 text-[#164A73]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M7 7h10" />
            <path d="M7 12h10" />
            <path d="M7 17h6" />
            <circle cx="17" cy="17" r="1.5" fill="currentColor" />
          </svg>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="text-base md:text-lg font-bold tracking-tight text-white uppercase">
              Web Demo Quản Lý Bộ Nhớ
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-sky-500/30 text-sky-200 rounded border border-sky-400/30">
              HCMUE OS Concepts
            </span>
          </div>
          <span className="text-xs text-sky-100/80 hidden sm:inline">
            Mô phỏng trực quan thuật toán Hệ điều hành • Khoa CNTT - Trường ĐH Sư phạm TP.HCM
          </span>
        </div>
      </div>

      {/* Top Action Buttons (HCMUE Style) */}
      <div className="flex items-center space-x-1 md:space-x-2 text-sm">
        <button
          onClick={onNavigateHome}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded text-xs md:text-sm font-medium transition-colors ${
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
          className="flex items-center space-x-1 px-3 py-1.5 rounded text-xs md:text-sm font-medium hover:bg-white/10 text-white/90 transition-colors"
          title="Hướng dẫn sử dụng"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden md:inline">Hướng dẫn</span>
        </button>

        <button
          onClick={onOpenDocs}
          className="flex items-center space-x-1 px-3 py-1.5 rounded text-xs md:text-sm font-medium hover:bg-white/10 text-white/90 transition-colors"
          title="Tài liệu tham khảo"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden md:inline">Tài liệu</span>
        </button>

        <button
          onClick={onTogglePresentation}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded text-xs md:text-sm font-medium transition-colors ${
            isPresentationMode
              ? 'bg-amber-500 text-slate-900 font-bold'
              : 'hover:bg-white/10 text-white/90'
          }`}
          title="Chế độ thuyết trình"
        >
          <Tv className="w-4 h-4" />
          <span className="hidden lg:inline">Trình chiếu</span>
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
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded bg-white/15 hover:bg-white/25 text-xs text-white transition-colors"
          title="Mở kho lưu trữ GitHub"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <ExternalLink className="w-3 h-3 hidden sm:inline" />
        </a>
      </div>
    </header>
  );
};
