'use client';

import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface ReadingProgressProps {
  progress: number; // 0 to 100
  currentChapterTitle: string;
  currentChapterNumber: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export default function ReadingProgress({
  progress,
  currentChapterTitle,
  currentChapterNumber,
  isBookmarked,
  onToggleBookmark,
}: ReadingProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-[#F5F0E8]/90 backdrop-blur-md border-b border-[#DED2C2]/60 transition-colors">
      {/* Thin Gold/Sage Progress line */}
      <div
        className="h-[2.5px] bg-[#A8B5A0] transition-all duration-150 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between text-xs font-sans-ui text-[#9A8876]">
        {/* Chapter Title */}
        <div className="flex items-center gap-2 truncate">
          <span className="font-semibold text-[#37332F] shrink-0">
            {currentChapterNumber}:
          </span>
          <span className="truncate italic font-cormorant text-sm text-[#37332F]">
            {currentChapterTitle}
          </span>
        </div>

        {/* Right side: Bookmark & Percent */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden sm:inline text-[11px] font-mono">
            {Math.round(progress)}% Selesai
          </span>

          <button
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Hapus Pembatas Buku' : 'Tandai Halaman Ini (Simpan Penanda)'}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition-colors border ${
              isBookmarked
                ? 'bg-[#37332F] text-[#F5F0E8] border-[#37332F]'
                : 'bg-transparent text-[#9A8876] hover:text-[#37332F] border-[#DED2C2]'
            }`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-[#A8B5A0]" />
                <span className="hidden sm:inline">Ditandai</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tandai</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
