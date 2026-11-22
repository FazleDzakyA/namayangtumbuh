'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ListOrdered, BookOpen } from 'lucide-react';
import { Chapter } from '@/types/novel';

interface ChapterNavigationProps {
  currentChapterIndex: number;
  chapters: Chapter[];
  onSelectChapter: (index: number) => void;
  onOpenIndexDrawer: () => void;
}

export default function ChapterNavigation({
  currentChapterIndex,
  chapters,
  onSelectChapter,
  onOpenIndexDrawer,
}: ChapterNavigationProps) {
  const prevChapter = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null;
  const nextChapter =
    currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null;

  return (
    <nav className="my-16 pt-8 border-t border-[#DED2C2] max-w-2xl mx-auto px-4 font-sans-ui">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous Chapter */}
        <div className="w-full sm:w-1/3 text-left">
          {prevChapter ? (
            <button
              onClick={() => onSelectChapter(currentChapterIndex - 1)}
              className="group flex flex-col items-start text-xs text-[#9A8876] hover:text-[#37332F] transition-colors"
            >
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider mb-0.5">
                <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                Sebelumnya
              </span>
              <span className="font-cormorant text-base sm:text-lg text-[#37332F] line-clamp-1 italic">
                {prevChapter.number}: {prevChapter.title}
              </span>
            </button>
          ) : (
            <div className="text-[11px] text-[#9A8876]/40 uppercase tracking-wider">
              Awal Buku
            </div>
          )}
        </div>

        {/* Center: Table of Contents Trigger */}
        <div className="w-full sm:w-auto text-center">
          <button
            onClick={onOpenIndexDrawer}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#EDE5D9] hover:bg-[#DED2C2] text-[#37332F] rounded-full text-xs tracking-wider transition-colors border border-[#DED2C2]"
          >
            <ListOrdered className="w-3.5 h-3.5 text-[#777C91]" />
            <span>Daftar Isi Bab</span>
          </button>
        </div>

        {/* Next Chapter */}
        <div className="w-full sm:w-1/3 text-right">
          {nextChapter ? (
            <button
              onClick={() => onSelectChapter(currentChapterIndex + 1)}
              className="group flex flex-col items-end text-xs text-[#9A8876] hover:text-[#37332F] transition-colors ml-auto"
            >
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider mb-0.5">
                Selanjutnya
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="font-cormorant text-base sm:text-lg text-[#37332F] line-clamp-1 italic">
                {nextChapter.number}: {nextChapter.title}
              </span>
            </button>
          ) : (
            <div className="text-[11px] text-[#9A8876]/40 uppercase tracking-wider">
              Akhir Buku
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
