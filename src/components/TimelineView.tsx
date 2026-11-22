'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Sparkles, Filter, X, BookmarkCheck } from 'lucide-react';
import { TIMELINE_EVENTS } from '@/data/timelineData';
import { TimelineEvent } from '@/types/novel';

interface TimelineViewProps {
  onClose?: () => void;
  onNavigateToChapter: (chapterId: string) => void;
}

export default function TimelineView({
  onClose,
  onNavigateToChapter,
}: TimelineViewProps) {
  const [filter, setFilter] = useState<'all' | 'childhood' | 'adolescence' | 'reconnection' | 'turning-point'>('all');

  const filteredEvents = filter === 'all'
    ? TIMELINE_EVENTS
    : TIMELINE_EVENTS.filter((e) => e.category === filter);

  return (
    <div className="relative py-12 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-[#9A8876] hover:text-[#37332F] rounded-full hover:bg-[#EDE5D9] transition-colors"
            aria-label="Tutup Peta Waktu"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <span className="text-xs font-sans-ui tracking-[0.3em] uppercase text-[#777C91] block mb-2">
          Kronologi Perjalanan
        </span>
        <h2 className="font-cormorant text-4xl sm:text-5xl text-[#37332F] font-normal">
          Peta Waktu & Jejak Ingatan
        </h2>
        <p className="font-lora text-sm sm:text-base text-[#9A8876] mt-2 max-w-lg mx-auto italic">
          “Dari sebuah nama di SDN Bendan Ngisor hingga resmi beriringan di bawah dentum lagu Perunggu.”
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: 'all', label: 'Semua Perjalanan' },
            { id: 'childhood', label: 'Masa SD' },
            { id: 'adolescence', label: 'Nama Fazaa (SMP)' },
            { id: 'reconnection', label: 'Pertemuan & Pesan' },
            { id: 'turning-point', label: 'Titik Balik (Juni-Juli)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans-ui transition-all duration-200 border ${
                filter === tab.id
                  ? 'bg-[#37332F] text-[#F5F0E8] border-[#37332F] shadow-xs'
                  : 'bg-[#EDE5D9]/70 text-[#9A8876] border-[#DED2C2] hover:text-[#37332F] hover:border-[#9A8876]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chronological Spine */}
      <div className="relative border-l border-[#DED2C2] ml-4 sm:ml-32 md:ml-40 space-y-10 sm:space-y-12">
        {filteredEvents.map((event, index) => {
          const isKeyTurningPoint = event.category === 'turning-point';

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Spine Node Dot */}
              <div
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                  isKeyTurningPoint
                    ? 'bg-[#A8B5A0] border-[#37332F] ring-4 ring-[#A8B5A0]/20'
                    : event.highlight
                    ? 'bg-[#777C91] border-[#F5F0E8] ring-2 ring-[#777C91]/30'
                    : 'bg-[#F5F0E8] border-[#9A8876]'
                }`}
              />

              {/* Date Label on Left for Desktop */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-28">
                <span className="font-sans-ui text-xs font-semibold tracking-wider text-[#37332F] block">
                  {event.dateLabel}
                </span>
                {event.fullDate && event.fullDate !== event.dateLabel && (
                  <span className="text-[10px] text-[#9A8876] block">
                    {event.fullDate}
                  </span>
                )}
              </div>

              {/* Event Card */}
              <div
                className={`p-5 sm:p-6 rounded-md transition-all duration-300 border ${
                  isKeyTurningPoint
                    ? 'bg-[#24211E] text-[#EDE5D9] border-[#3E3935] shadow-lg'
                    : event.highlight
                    ? 'bg-[#EDE5D9] border-[#A8B5A0]/60 shadow-xs'
                    : 'bg-[#F5F0E8] border-[#DED2C2] hover:border-[#9A8876]'
                }`}
              >
                {/* Mobile Date Header */}
                <div className="sm:hidden flex items-center gap-1.5 text-xs font-sans-ui font-medium text-[#777C91] mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{event.dateLabel}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <h3
                    className={`font-cormorant text-2xl sm:text-3xl font-semibold leading-tight ${
                      isKeyTurningPoint ? 'text-[#F5F0E8]' : 'text-[#37332F]'
                    }`}
                  >
                    {event.title}
                  </h3>

                  {event.highlight && (
                    <span
                      className={`text-[10px] uppercase tracking-widest font-sans-ui px-2 py-0.5 rounded-full shrink-0 ${
                        isKeyTurningPoint
                          ? 'bg-[#A8B5A0] text-[#1E1B18]'
                          : 'bg-[#37332F] text-[#F5F0E8]'
                      }`}
                    >
                      Momen Kunci
                    </span>
                  )}
                </div>

                <p
                  className={`mt-2 font-lora text-sm sm:text-base leading-relaxed ${
                    isKeyTurningPoint ? 'text-[#EDE5D9]/85' : 'text-[#37332F]/85'
                  }`}
                >
                  {event.description}
                </p>

                {event.quote && (
                  <div
                    className={`mt-3 p-3 rounded-xs border-l-2 ${
                      isKeyTurningPoint
                        ? 'border-[#A8B5A0] bg-[#1E1B18]/60 text-[#A8B5A0]'
                        : 'border-[#777C91] bg-[#F5F0E8] text-[#37332F]'
                    }`}
                  >
                    <p className="font-handwriting text-lg italic">
                      {event.quote}
                    </p>
                  </div>
                )}

                {/* Chapter Link */}
                {event.chapterRef && (
                  <div className="mt-4 pt-3 border-t border-current/10 flex justify-end">
                    <button
                      onClick={() => onNavigateToChapter(event.chapterRef!)}
                      className={`inline-flex items-center gap-1.5 text-xs font-sans-ui tracking-wider transition-colors ${
                        isKeyTurningPoint
                          ? 'text-[#A8B5A0] hover:text-[#F5F0E8]'
                          : 'text-[#777C91] hover:text-[#37332F]'
                      }`}
                    >
                      <span>Baca di dalam Bab</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
