import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { HomeView } from './components/home/HomeView';
import { FirstFitDemo } from './components/demo/first-fit/FirstFitDemo';
import { GuideModal } from './components/modals/GuideModal';
import { DocsModal } from './components/modals/DocsModal';
import { ArrowLeft, Presentation, Info, Menu, PanelLeftOpen, Sparkles } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<string>('home'); // 'home' or 'alloc-first-fit'
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Start collapsed so page has full space!
  const [isSidebarPinned, setIsSidebarPinned] = useState<boolean>(false);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectDemo = (demoId: string) => {
    if (demoId === 'alloc-first-fit') {
      setCurrentView('alloc-first-fit');
    } else {
      setToastMessage(`Thuật toán đang được hoàn thiện theo Lộ trình Triển khai Giai đoạn 2.`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col antialiased">
      {/* 1. TOP HEADER (HCMUE Dark Blue #164A73) */}
      <Header
        currentView={currentView}
        onNavigateHome={() => setCurrentView('home')}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        isPresentationMode={isPresentationMode}
        onTogglePresentation={() => setIsPresentationMode(!isPresentationMode)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
      />

      {/* Presentation Mode Alert Banner */}
      {isPresentationMode && (
        <div className="bg-amber-400 text-slate-900 px-4 py-1.5 text-xs font-bold flex items-center justify-between select-none shadow-xs">
          <div className="flex items-center space-x-2">
            <Presentation className="w-4 h-4" />
            <span>Đang ở Chế độ Trình chiếu (Presentation Mode) — Tối ưu tỷ lệ trên máy chiếu giảng đường</span>
          </div>
          <button
            onClick={() => setIsPresentationMode(false)}
            className="px-2.5 py-0.5 bg-slate-900 text-white rounded text-[11px] hover:bg-slate-800 font-semibold transition-colors"
          >
            Thoát chế độ trình chiếu
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex w-full relative">
        {/* 2. SIDEBAR (Collapsible Drawer / Pinned, 280px width, never takes full screen) */}
        {!isPresentationMode && (
          <Sidebar
            currentDemoId={currentView}
            onSelectDemo={handleSelectDemo}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isPinned={isSidebarPinned}
            onTogglePin={() => setIsSidebarPinned(!isSidebarPinned)}
          />
        )}

        {/* 3. MAIN CONTENT AREA (Takes 100% full width when sidebar is hidden) */}
        <main
          className={`flex-1 min-w-0 bg-white p-4 md:p-6 lg:p-8 transition-all duration-300 overflow-x-hidden ${
            isPresentationMode ? 'max-w-7xl mx-auto' : ''
          }`}
        >
          {/* Top Navigation Row: Floating Menu Pill & Back to Home */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              {/* Floating Menu Pill Button (when sidebar is hidden) */}
              {!isSidebarOpen && !isPresentationMode && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-300 text-[#005AA8] font-bold text-xs shadow-2xs transition-all hover:scale-[1.02]"
                  title="Mở danh mục chọn chức năng (không che toàn màn hình)"
                >
                  <PanelLeftOpen className="w-4 h-4 text-[#005AA8]" />
                  <span>Danh mục Demo (5 Phân hệ)</span>
                </button>
              )}

              {/* Back to Home Button when in Demo */}
              {currentView !== 'home' && (
                <button
                  onClick={() => setCurrentView('home')}
                  className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs font-semibold text-slate-500 hover:text-[#005AA8] hover:bg-slate-100 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Về Trang chủ</span>
                </button>
              )}
            </div>

            {/* Quick Status Tag */}
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Giao diện toàn màn hình trực quan</span>
            </div>
          </div>

          {/* View Routing */}
          {currentView === 'home' ? (
            <HomeView onStartDemo={handleSelectDemo} />
          ) : (
            <FirstFitDemo onSelectOtherAlgo={handleSelectDemo} />
          )}
        </main>
      </div>

      {/* Informative Toast for Upcoming Features */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 px-4 py-2.5 bg-slate-900 text-white text-xs rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-4 border border-slate-700">
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </div>
  );
}

export default App;
