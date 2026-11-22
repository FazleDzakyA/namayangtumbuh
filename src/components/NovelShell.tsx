'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ListOrdered,
  Sparkles,
  BookmarkCheck,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import { NOVEL_CHAPTERS } from '@/data/novelData';
import { MemoryItem, ReadingProgressState } from '@/types/novel';
import OpeningScreen from './OpeningScreen';
import ReadingProgress from './ReadingProgress';
import ChapterContent from './ChapterContent';
import ChapterNavigation from './ChapterNavigation';
import ChapterIndexDrawer from './ChapterIndexDrawer';
import TimelineView from './TimelineView';
import PhotoLightbox from './PhotoLightbox';
import AmbientAudio from './AmbientAudio';

const STORAGE_KEY = 'fazaa_novel_bookmark';
const IMAGES_STORAGE_KEY = 'fazaa_custom_images';

export default function NovelShell() {
  const [hasStartedReading, setHasStartedReading] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [bookmarkedChapterId, setBookmarkedChapterId] = useState<string | null>(null);
  const [showSavedNotification, setShowSavedNotification] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Appearance controls
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [paperTone, setPaperTone] = useState<'ivory' | 'paper' | 'sepia' | 'dark'>('ivory');
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  // Modals & Panels
  const [isIndexDrawerOpen, setIsIndexDrawerOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);

  // Custom User Uploaded Photos preview state
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const currentChapter = NOVEL_CHAPTERS[currentChapterIndex] || NOVEL_CHAPTERS[0];

  // Load bookmark and custom images on mount
  useEffect(() => {
    try {
      const savedBookmark = localStorage.getItem(STORAGE_KEY);
      if (savedBookmark) {
        const parsed: ReadingProgressState = JSON.parse(savedBookmark);
        if (parsed.currentChapterId) {
          setBookmarkedChapterId(parsed.currentChapterId);
          if (parsed.fontSize) setFontSize(parsed.fontSize);
          if (parsed.paperTone) setPaperTone(parsed.paperTone);
        }
      }

      const savedImages = localStorage.getItem(IMAGES_STORAGE_KEY);
      if (savedImages) {
        setCustomImages(JSON.parse(savedImages));
      }
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  // Sync paper tone with document data attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', paperTone);
  }, [paperTone]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrolled = (totalScroll / windowHeight) * 100;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save Bookmark
  const handleToggleBookmark = () => {
    if (bookmarkedChapterId === currentChapter.id) {
      setBookmarkedChapterId(null);
      localStorage.removeItem(STORAGE_KEY);
    } else {
      setBookmarkedChapterId(currentChapter.id);
      const stateToSave: ReadingProgressState = {
        currentChapterId: currentChapter.id,
        scrollPercentage: scrollProgress,
        lastReadDate: new Date().toISOString(),
        fontSize,
        paperTone,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      setShowSavedNotification(true);
      setTimeout(() => setShowSavedNotification(false), 3000);
    }
  };

  // Jump to bookmarked position
  const handleContinueFromBookmark = () => {
    if (bookmarkedChapterId) {
      const idx = NOVEL_CHAPTERS.findIndex((c) => c.id === bookmarkedChapterId);
      if (idx !== -1) {
        setCurrentChapterIndex(idx);
        setHasStartedReading(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSelectChapter = (index: number) => {
    setCurrentChapterIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUploadCustomImage = (memoryId: string, dataUrl: string) => {
    const updated = { ...customImages, [memoryId]: dataUrl };
    setCustomImages(updated);
    try {
      localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage quota limit
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative flex flex-col justify-between selection:bg-[#A8B5A0] selection:text-[#F5F0E8]"
    >
      {/* 1. OPENING EXPERIENCE */}
      {!hasStartedReading ? (
        <div className="relative">
          <OpeningScreen
            onStartReading={() => {
              setHasStartedReading(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTimeline={() => setIsTimelineOpen(true)}
          />

          {/* Bookmark Continue Toast if exists */}
          {bookmarkedChapterId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-[#37332F] text-[#F5F0E8] px-5 py-3 rounded-full shadow-xl border border-[#DED2C2]/40 flex items-center gap-3 text-xs font-sans-ui"
            >
              <BookmarkCheck className="w-4 h-4 text-[#A8B5A0]" />
              <span>Ada penanda baca tersimpan sebelumnya.</span>
              <button
                onClick={handleContinueFromBookmark}
                className="font-medium underline hover:text-[#A8B5A0] ml-1"
              >
                Lanjutkan Membaca →
              </button>
            </motion.div>
          )}
        </div>
      ) : (
        /* 2. MAIN READING EXPERIENCE */
        <div className="pt-14 relative">
          {/* Top Reading Progress & Header */}
          <ReadingProgress
            progress={scrollProgress}
            currentChapterTitle={currentChapter.title}
            currentChapterNumber={currentChapter.number}
            isBookmarked={bookmarkedChapterId === currentChapter.id}
            onToggleBookmark={handleToggleBookmark}
          />

          {/* Floating Quick Action Bar (Top Right) */}
          <div className="fixed top-12 right-4 sm:right-8 z-30 flex items-center gap-2">
            <AmbientAudio />

            {/* Reading Mode Settings Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="p-2 rounded-full bg-[#EDE5D9]/90 backdrop-blur-xs border border-[#DED2C2] text-[#37332F] hover:bg-[#DED2C2] transition-colors shadow-xs"
                title="Sesuaikan Tampilan Membaca"
                aria-label="Pengaturan Tampilan"
              >
                <Sliders className="w-4 h-4" />
              </button>

              {showSettingsMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-[#F5F0E8] border border-[#DED2C2] rounded-lg shadow-xl p-4 space-y-4 text-xs font-sans-ui z-50">
                  {/* Font Size Toggle */}
                  <div>
                    <span className="text-[#9A8876] uppercase tracking-wider block mb-2 font-medium">
                      Ukuran Huruf
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setFontSize('normal')}
                        className={`py-1.5 rounded border text-center transition-colors ${
                          fontSize === 'normal'
                            ? 'bg-[#37332F] text-[#F5F0E8] border-[#37332F]'
                            : 'bg-[#EDE5D9] text-[#37332F] border-[#DED2C2]'
                        }`}
                      >
                        Standar (17px)
                      </button>
                      <button
                        onClick={() => setFontSize('large')}
                        className={`py-1.5 rounded border text-center transition-colors ${
                          fontSize === 'large'
                            ? 'bg-[#37332F] text-[#F5F0E8] border-[#37332F]'
                            : 'bg-[#EDE5D9] text-[#37332F] border-[#DED2C2]'
                        }`}
                      >
                        Besar (20px)
                      </button>
                    </div>
                  </div>

                  {/* Paper Tone Themes */}
                  <div>
                    <span className="text-[#9A8876] uppercase tracking-wider block mb-2 font-medium">
                      Warna Kertas
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'ivory', label: 'Warm Ivory', bg: '#F5F0E8' },
                        { id: 'paper', label: 'Paper', bg: '#EDE5D9' },
                        { id: 'sepia', label: 'Sepia Hangat', bg: '#E8DCB8' },
                        { id: 'dark', label: 'Tinta Malam', bg: '#1E1B18' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setPaperTone(t.id as typeof paperTone)}
                          className={`py-1.5 px-2 rounded border flex items-center gap-2 transition-colors ${
                            paperTone === t.id
                              ? 'border-[#37332F] ring-1 ring-[#37332F]'
                              : 'border-[#DED2C2]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: t.bg }}
                          />
                          <span className="truncate">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#DED2C2] flex items-center justify-between">
                    <span className="text-[#9A8876]">Musik Suasana:</span>
                    <AmbientAudio />
                  </div>
                </div>
              )}
            </div>

            {/* Table of Contents Trigger */}
            <button
              onClick={() => setIsIndexDrawerOpen(true)}
              className="p-2 rounded-full bg-[#EDE5D9]/90 backdrop-blur-xs border border-[#DED2C2] text-[#37332F] hover:bg-[#DED2C2] transition-colors shadow-xs"
              title="Buka Daftar Isi Bab"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            {/* Timeline View Trigger */}
            <button
              onClick={() => setIsTimelineOpen(true)}
              className="p-2 rounded-full bg-[#EDE5D9]/90 backdrop-blur-xs border border-[#DED2C2] text-[#777C91] hover:text-[#37332F] hover:bg-[#DED2C2] transition-colors shadow-xs"
              title="Peta Waktu (Timeline)"
            >
              <Sparkles className="w-4 h-4 text-[#A8B5A0]" />
            </button>
          </div>

          {/* Main Reading Container */}
          <main className="max-w-4xl mx-auto min-h-[75vh]">
            <ChapterContent
              chapter={currentChapter}
              fontSize={fontSize}
              onSelectMemory={(mem) => setActiveMemory(mem)}
              customImages={customImages}
            />

            {/* Chapter Navigation Bar */}
            <ChapterNavigation
              currentChapterIndex={currentChapterIndex}
              chapters={NOVEL_CHAPTERS}
              onSelectChapter={handleSelectChapter}
              onOpenIndexDrawer={() => setIsIndexDrawerOpen(true)}
            />
          </main>

          {/* Bottom Floating Bar to Return to Cover */}
          <div className="py-8 text-center text-xs font-sans-ui text-[#9A8876] border-t border-[#DED2C2]/40">
            <button
              onClick={() => {
                setHasStartedReading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#37332F] transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Sampul</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. MODALS & AUXILIARY PANELS */}

      {/* Chapter Index Drawer */}
      <ChapterIndexDrawer
        isOpen={isIndexDrawerOpen}
        onClose={() => setIsIndexDrawerOpen(false)}
        chapters={NOVEL_CHAPTERS}
        currentChapterId={currentChapter.id}
        bookmarkedChapterId={bookmarkedChapterId || undefined}
        onSelectChapter={handleSelectChapter}
      />

      {/* Timeline / Memory Map Modal */}
      {isTimelineOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F5F0E8] transition-colors">
          <div className="min-h-full">
            <TimelineView
              onClose={() => setIsTimelineOpen(false)}
              onNavigateToChapter={(chapterId) => {
                const idx = NOVEL_CHAPTERS.findIndex((c) => c.id === chapterId);
                if (idx !== -1) {
                  setCurrentChapterIndex(idx);
                  setHasStartedReading(true);
                  setIsTimelineOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Photo Lightbox */}
      <PhotoLightbox
        memory={activeMemory}
        onClose={() => setActiveMemory(null)}
        customImage={activeMemory ? customImages[activeMemory.id] : null}
        onUploadImage={handleUploadCustomImage}
      />

      {/* Bookmark Saved Notification */}
      <AnimatePresence>
        {showSavedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 right-6 z-50 bg-[#37332F] text-[#F5F0E8] px-4 py-2.5 rounded-full shadow-lg border border-[#A8B5A0]/40 flex items-center gap-2 text-xs font-sans-ui"
          >
            <BookmarkCheck className="w-4 h-4 text-[#A8B5A0]" />
            <span>Halaman berhasil ditandai (Bookmark tersimpan).</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
