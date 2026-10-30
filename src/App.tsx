import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { HomeView } from './components/home/HomeView';
import { FirstFitDemo } from './components/demo/first-fit/FirstFitDemo';
import { GuideModal } from './components/modals/GuideModal';
import { DocsModal } from './components/modals/DocsModal';
import { Menu, ArrowLeft, Presentation, Info } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<string>('home'); // 'home' or 'alloc-first-fit'
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState<boolean>(false);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectDemo = (demoId: string) => {
    if (demoId === 'alloc-first-fit') {
      setCurrentView('alloc-first-fit');
    } else {
      // In this initial version, show informative toast that this demo is scheduled for the next phase
      setToastMessage(`Thuật toán đang được hoàn thiện theo Lộ trình Triển khai Giai đoạn 2.`);
      setTimeout(() => setToastMessage(null), 3500);
    }
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
      />

      {/* Presentation Mode Alert Banner */}
      {isPresentationMode && (
        <div className="bg-amber-500 text-slate-900 px-4 py-1.5 text-xs font-bold flex items-center justify-between select-none shadow-xs">
          <div className="flex items-center space-x-2">
            <Presentation className="w-4 h-4" />
            <span>Đang ở Chế độ Trình chiếu (Presentation Mode) — Giao diện được tối ưu hiển thị trên màn chiếu máy chiếu</span>
          </div>
          <button
            onClick={() => setIsPresentationMode(false)}
            className="px-2 py-0.5 bg-slate-900 text-white rounded text-[11px] hover:bg-slate-800"
          >
            Thoát chế độ trình chiếu
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex w-full relative">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setIsOpenMobileSidebar(true)}
          className="md:hidden fixed bottom-4 right-4 z-30 p-3 bg-[#164A73] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#113857]"
          title="Mở danh mục demo"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* 2. LEFT SIDEBAR (HCMUE light-grey #F8FAFC) */}
        {!isPresentationMode && (
          <Sidebar
            currentDemoId={currentView}
            onSelectDemo={handleSelectDemo}
            isOpenMobile={isOpenMobileSidebar}
            onCloseMobile={() => setIsOpenMobileSidebar(false)}
          />
        )}

        {/* 3. MAIN CONTENT AREA (White #FFFFFF) */}
        <main
          className={`flex-1 min-w-0 bg-white p-4 md:p-6 lg:p-8 transition-all overflow-x-hidden ${
            isPresentationMode ? 'max-w-7xl mx-auto' : ''
          }`}
        >
          {/* Back to Home Button when in Demo */}
          {currentView !== 'home' && (
            <div className="mb-4">
              <button
                onClick={() => setCurrentView('home')}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-[#005AA8] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại Trang chủ</span>
              </button>
            </div>
          )}

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
