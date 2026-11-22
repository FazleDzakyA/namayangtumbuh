'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Feather } from 'lucide-react';
import { Chapter, MemoryItem } from '@/types/novel';
import MemoryInsert from './MemoryInsert';
import TicketStub from './TicketStub';
import SnehaMusicPlayer from './SnehaMusicPlayer';

interface ChapterContentProps {
  chapter: Chapter;
  fontSize: 'normal' | 'large';
  onSelectMemory: (memory: MemoryItem) => void;
  customImages: Record<string, string>;
}

export default function ChapterContent({
  chapter,
  fontSize,
  onSelectMemory,
  customImages,
}: ChapterContentProps) {
  const isDarkConcertChapter = chapter.id === 'chapter-10';
  const isMarch16GiftChapter = chapter.id === 'chapter-07';
  const isJune28CFDChapter = chapter.id === 'chapter-09';
  const isSnehaChapter = chapter.id === 'sneha-dalam-mauna';
  const isEpilogue = chapter.id === 'epilogue';

  const textSizeClass =
    fontSize === 'large'
      ? 'text-lg sm:text-xl leading-relaxed sm:leading-loose'
      : 'text-base sm:text-lg leading-relaxed sm:leading-loose';

  // Filter out placeholder markers completely so no dashed boxes appear
  const visibleParagraphs = chapter.paragraphs.filter(
    (p) => !p.startsWith('/* [RUANG NASKAH PENULIS:')
  );

  return (
    <article
      className={`relative py-12 md:py-20 px-4 sm:px-6 md:px-8 max-w-2xl mx-auto transition-colors duration-500 ${
        isDarkConcertChapter ? 'text-[#EDE5D9]' : 'text-[#37332F]'
      }`}
    >
      {/* Cinematic Dark Transition Container for Chapter 10 */}
      {isDarkConcertChapter && (
        <div className="absolute inset-0 -mx-4 sm:-mx-12 md:-mx-32 bg-[#1C1A17] -z-10 rounded-2xl shadow-2xl border border-[#3E3935] my-2 transition-all duration-700" />
      )}

      {/* Chapter Header */}
      <header className="text-center mb-12 sm:mb-16 space-y-4">
        {/* Chapter Period / Date Stamp */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 text-xs font-sans-ui tracking-[0.25em] uppercase text-[#777C91]"
        >
          <Calendar className="w-3.5 h-3.5 text-[#A8B5A0]" />
          <span>{chapter.period}</span>
        </motion.div>

        {/* Chapter Number */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xs md:text-sm font-sans-ui tracking-[0.3em] uppercase text-[#9A8876]"
        >
          {chapter.number}
        </motion.p>

        {/* Chapter Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-wide ${
            isDarkConcertChapter ? 'text-[#F5F0E8]' : 'text-[#37332F]'
          }`}
        >
          {isSnehaChapter ? 'SNEHA DALAM MAUNA' : chapter.title}
        </motion.h2>

        {/* Editorial Divider */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-[#DED2C2]" />
          <Feather className="w-4 h-4 text-[#A8B5A0]" />
          <span className="w-10 h-[1px] bg-[#DED2C2]" />
        </div>

        {/* Epigraph / Quote */}
        {chapter.epigraph && !isSnehaChapter && (
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`max-w-md mx-auto pt-4 italic font-lora text-sm sm:text-base leading-relaxed ${
              isDarkConcertChapter ? 'text-[#A8B5A0]' : 'text-[#777C91]'
            }`}
          >
            {chapter.epigraph.quote}
          </motion.blockquote>
        )}
      </header>

      {/* SNEHA DALAM MAUNA: Integrated Music Player */}
      {isSnehaChapter && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <SnehaMusicPlayer />
        </motion.div>
      )}

      {/* Literary Paragraphs Body */}
      <div className={`space-y-6 sm:space-y-8 font-lora ${textSizeClass}`}>
        {visibleParagraphs.map((paragraph, idx) => {
          // Check if this is the final poignant line in Sneha dalam Mauna
          const isSnehaPunchline =
            isSnehaChapter && paragraph === 'dan bagiku, keindahan itu adalah kamu.';

          if (isSnehaPunchline) {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="my-10 p-6 sm:p-8 text-center bg-[#EDE5D9]/70 border border-[#DED2C2] rounded-xl shadow-xs"
              >
                <p className="font-cormorant text-2xl sm:text-3xl md:text-4xl italic text-[#37332F] font-medium leading-relaxed">
                  “dan bagiku, keindahan itu adalah kamu.”
                </p>
              </motion.div>
            );
          }

          // First paragraph gets the classic editorial drop cap
          const isFirstParagraph = idx === 0;

          return (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`leading-relaxed ${
                isSnehaChapter ? 'text-justify italic text-[#37332F]/95' : 'text-justify'
              } ${isFirstParagraph ? 'dropcap' : ''} ${
                isDarkConcertChapter ? 'text-[#EDE5D9]/90' : 'text-[#37332F]/90'
              }`}
            >
              {paragraph}
            </motion.p>
          );
        })}
      </div>

      {/* Special Visual Memory Inserts for Key Chapters */}

      {/* CHAPTER 10: Special Perunggu Concert Ticket & Couple Photo */}
      {isDarkConcertChapter && (
        <section className="my-16 space-y-12">
          {/* Concert Ticket Artifact */}
          <div className="text-center">
            <span className="text-[11px] font-sans-ui tracking-[0.25em] uppercase text-[#A8B5A0] block mb-2">
              Artefak Konser
            </span>
            <TicketStub
              onOpenLightbox={() => {
                const ticketMemory = chapter.memories?.find((m) => m.type === 'ticket');
                if (ticketMemory) onSelectMemory(ticketMemory);
              }}
              imageSrc={
                chapter.memories?.find((m) => m.type === 'ticket')?.imageSrc ||
                customImages['memory-july2-ticket']
              }
              hasCustomPhoto={Boolean(
                customImages['memory-july2-ticket'] ||
                  chapter.memories?.find((m) => m.type === 'ticket')?.imageSrc
              )}
            />
          </div>

          {/* Couple Photograph Polaroid */}
          {chapter.memories
            ?.filter((m) => m.type !== 'ticket')
            .map((mem) => (
              <div key={mem.id} className="text-center">
                <span className="text-[11px] font-sans-ui tracking-[0.25em] uppercase text-[#A8B5A0] block mb-2">
                  Potret Kebersamaan
                </span>
                <MemoryInsert
                  memory={mem}
                  onSelect={onSelectMemory}
                  customImage={customImages[mem.id]}
                />
              </div>
            ))}
        </section>
      )}

      {/* CHAPTER 07: Special March 16 Gift Section */}
      {isMarch16GiftChapter && chapter.memories && (
        <section className="my-14 space-y-6">
          <div className="text-center">
            <span className="text-[11px] font-sans-ui tracking-[0.25em] uppercase text-[#777C91] block mb-1">
              Catatan Benda & Kenangan
            </span>
            <h3 className="font-cormorant text-2xl text-[#37332F]">
              Hadiah yang Diterima
            </h3>
          </div>
          {chapter.memories.map((mem) => (
            <MemoryInsert
              key={mem.id}
              memory={mem}
              onSelect={onSelectMemory}
              customImage={customImages[mem.id]}
            />
          ))}
        </section>
      )}

      {/* CHAPTER 09: Special June 28 CFD Section */}
      {isJune28CFDChapter && chapter.memories && (
        <section className="my-14 space-y-6">
          <div className="text-center">
            <span className="text-[11px] font-sans-ui tracking-[0.25em] uppercase text-[#777C91] block mb-1">
              Potret Pagi Hari
            </span>
            <h3 className="font-cormorant text-2xl text-[#37332F]">
              Car Free Day — 28 Juni 2026
            </h3>
          </div>
          {chapter.memories.map((mem) => (
            <MemoryInsert
              key={mem.id}
              memory={mem}
              onSelect={onSelectMemory}
              customImage={customImages[mem.id]}
            />
          ))}
        </section>
      )}

      {/* Other Memories (if any) */}
      {!isDarkConcertChapter &&
        !isMarch16GiftChapter &&
        !isJune28CFDChapter &&
        chapter.memories &&
        chapter.memories.map((mem) => (
          <MemoryInsert
            key={mem.id}
            memory={mem}
            onSelect={onSelectMemory}
            customImage={customImages[mem.id]}
          />
        ))}

      {/* Epilogue Special Signing Closing */}
      {isEpilogue && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-[#DED2C2] text-center space-y-4"
        >
          <p className="font-cormorant text-2xl md:text-3xl italic text-[#37332F]">
            “Fazaa — Dari Sebuah Nama, Menjadi Sebuah Kisah”
          </p>
          <div className="pt-4 flex flex-col items-center justify-center">
            <p className="font-handwriting text-3xl text-[#37332F]">
              Fazle & Azalia
            </p>
            <p className="text-[11px] font-sans-ui tracking-widest uppercase text-[#9A8876] mt-1">
              Semarang • 2026
            </p>
          </div>
        </motion.div>
      )}

      {/* Chapter Bottom Navigation Info */}
      <div className="mt-12 pt-6 flex items-center justify-center text-xs font-sans-ui border-t border-current/10">
        <span className="text-[#9A8876] text-[11px] italic font-lora">
          {chapter.number}
        </span>
      </div>
    </article>
  );
}
