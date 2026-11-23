'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Sparkles, Bookmark, Calendar, ArrowRight, BookMarked } from 'lucide-react';
import { Chapter } from '@/types/novel';

interface ChapterIndexDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  currentChapterId: string;
  bookmarkedChapterId?: string;
  onSelectChapter: (index: number) => void;
  onOpenCover?: () => void;
}

export default function ChapterIndexDrawer({
  isOpen,
  onClose,
  chapters,
  currentChapterId,
  bookmarkedChapterId,
  onSelectChapter,
  onOpenCover,
}: ChapterIndexDrawerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1E1B18]/70 backdrop-blur-xs cursor-pointer"
        />

        {/* Drawer Panel */}
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-md bg-[#F5F0E8] h-full shadow-2xl border-l border-[#DED2C2] flex flex-col justify-between overflow-hidden"
        >
          {/* Top Header */}
          <div className="p-6 bg-[#EDE5D9] border-b border-[#DED2C2] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-sans-ui tracking-[0.25em] uppercase text-[#777C91] block">
                Struktur Novel
              </span>
              <h3 className="font-cormorant text-2xl font-semibold text-[#37332F]">
                Daftar Isi Bab
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#DED2C2] text-[#37332F] transition-colors"
              aria-label="Tutup Daftar Isi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action: Sampul Buku */}
          {onOpenCover && (
            <div className="px-5 py-2.5 bg-[#EFE8DC] border-b border-[#DED2C2]">
              <button
                onClick={() => {
                  onClose();
                  onOpenCover();
                }}
                className="w-full py-2 px-3 rounded-lg bg-[#FAF6F0] hover:bg-white text-[#37332F] text-xs font-sans-ui flex items-center justify-between transition-all border border-[#DED2C2] shadow-xs group"
              >
                <span className="flex items-center gap-2 font-medium">
                  <BookMarked className="w-4 h-4 text-[#A8B5A0] group-hover:scale-110 transition-transform" />
                  <span>Lihat Sampul Buku (Depan & Belakang)</span>
                </span>
                <span className="text-[10px] text-[#9A8876] uppercase tracking-wider font-semibold">
                  Fazaa
                </span>
              </button>
            </div>
          )}

          {/* Chapter List */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-2 flex-1 divide-y divide-[#DED2C2]/40">
            {chapters.map((chapter, index) => {
              const isCurrent = chapter.id === currentChapterId;
              const isBookmarked = chapter.id === bookmarkedChapterId;

              return (
                <button
                  key={chapter.id}
                  onClick={() => {
                    onSelectChapter(index);
                    onClose();
                  }}
                  className={`w-full text-left p-3.5 rounded-md transition-all flex items-start justify-between gap-3 group pt-4 ${
                    isCurrent
                      ? 'bg-[#EDE5D9] border-l-4 border-[#37332F]'
                      : 'hover:bg-[#EDE5D9]/50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-sans-ui tracking-wider uppercase">
                      <span
                        className={`font-semibold ${
                          isCurrent ? 'text-[#37332F]' : 'text-[#777C91]'
                        }`}
                      >
                        {chapter.number}
                      </span>
                      <span className="text-[#9A8876]">•</span>
                      <span className="text-[#9A8876]">{chapter.period}</span>
                    </div>

                    <h4
                      className={`font-cormorant text-xl leading-tight ${
                        isCurrent
                          ? 'text-[#37332F] font-semibold'
                          : 'text-[#37332F]/85 group-hover:text-[#37332F]'
                      }`}
                    >
                      {chapter.title}
                    </h4>

                    {chapter.memories && chapter.memories.length > 0 && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#A8B5A0] font-sans-ui pt-0.5">
                        <Sparkles className="w-3 h-3" />
                        <span>Memuat {chapter.memories.length} Artefak Kenangan</span>
                      </span>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 shrink-0 pt-1">
                    {isBookmarked && (
                      <span
                        title="Tanda Baca Tersimpan"
                        className="text-[#A8B5A0]"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </span>
                    )}
                    {isCurrent ? (
                      <span className="text-xs font-sans-ui text-[#37332F] font-medium bg-[#DED2C2] px-2 py-0.5 rounded-full">
                        Sedang Dibaca
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#9A8876] opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="p-4 bg-[#EDE5D9]/70 border-t border-[#DED2C2] text-center text-xs font-sans-ui text-[#9A8876]">
            “Nama yang Tumbuh Bersama Waktu” — Fazaa
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
