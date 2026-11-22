'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Feather, ArrowDown } from 'lucide-react';
import AmbientAudio from './AmbientAudio';
import { useAudio } from '@/context/AudioContext';

interface OpeningScreenProps {
  onStartReading: () => void;
  onOpenTimeline: () => void;
}

export default function OpeningScreen({
  onStartReading,
  onOpenTimeline,
}: OpeningScreenProps) {
  const { play } = useAudio();

  const handleStart = () => {
    play();
    onStartReading();
  };
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between px-6 py-12 md:py-16 text-center select-none overflow-hidden">
      {/* Decorative Book Page Background Grain & Border */}
      <div className="absolute inset-4 md:inset-8 border border-[#DED2C2]/70 pointer-events-none rounded-sm transition-all" />
      <div className="absolute inset-5 md:inset-9 border border-[#DED2C2]/30 pointer-events-none rounded-sm" />

      {/* Top Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 w-full max-w-4xl flex items-center justify-between text-xs tracking-widest uppercase font-sans-ui text-[#9A8876]"
      >
        <span className="flex items-center gap-1.5">
          <Feather className="w-3.5 h-3.5 text-[#A8B5A0]" />
          Arsip Kenangan Pribadi
        </span>
        <div className="flex items-center gap-3">
          <AmbientAudio />
        </div>
      </motion.div>

      {/* Main Center Content */}
      <div className="relative z-10 my-auto max-w-3xl flex flex-col items-center">
        {/* Subtle Botanical Pressed Flower Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-8 text-[#A8B5A0]"
        >
          <svg
            className="w-20 h-20 md:w-24 md:h-24 stroke-current fill-none stroke-[1.2]"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            {/* Elegant botanical stem and leaves */}
            <path
              d="M50 90 Q48 55 50 15"
              strokeLinecap="round"
            />
            {/* Left Leaf 1 */}
            <path
              d="M49 68 Q32 60 30 48 Q42 50 49 60"
              fill="rgba(168, 181, 160, 0.15)"
            />
            {/* Right Leaf 1 */}
            <path
              d="M50 56 Q68 48 70 36 Q58 38 50 48"
              fill="rgba(168, 181, 160, 0.15)"
            />
            {/* Left Leaf 2 */}
            <path
              d="M50 40 Q36 32 38 22 Q48 24 50 32"
              fill="rgba(168, 181, 160, 0.12)"
            />
            {/* Bloom Petals */}
            <path
              d="M50 15 Q43 8 50 3 Q57 8 50 15"
              fill="rgba(168, 181, 160, 0.25)"
            />
            <circle cx="50" cy="15" r="2.5" fill="#9A8876" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="space-y-3"
        >
          <p className="text-xs md:text-sm font-sans-ui tracking-[0.3em] uppercase text-[#777C91]">
            Sebuah Autobiografi Sastra
          </p>

          <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-[#37332F] leading-[1.15] max-w-2xl mx-auto">
            NAMA YANG TUMBUH <br className="hidden sm:inline" />
            <span className="italic font-light">BERSAMA WAKTU</span>
          </h1>

          <div className="pt-2">
            <span className="inline-block w-12 h-[1px] bg-[#DED2C2] mb-3" />
            <p className="font-cormorant text-xl sm:text-2xl md:text-3xl italic text-[#9A8876] font-normal tracking-normal">
              Fazaa — Dari Sebuah Nama, Menjadi Sebuah Kisah
            </p>
          </div>
        </motion.div>

        {/* Opening Quotation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-8 md:mt-12 max-w-xl px-4"
        >
          <blockquote className="font-lora text-base sm:text-lg md:text-xl text-[#37332F]/85 italic leading-relaxed relative">
            <span className="text-2xl font-cormorant text-[#9A8876] select-none absolute -left-4 -top-2">
              “
            </span>
            Ada nama yang tak pernah benar-benar pergi,
            <br />
            ia hanya tumbuh diam-diam bersama waktu.
            <span className="text-2xl font-cormorant text-[#9A8876] select-none ml-1">
              ”
            </span>
          </blockquote>
          <p className="mt-3 text-xs tracking-widest font-sans-ui text-[#9A8876] uppercase">
            — Fazle
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-[#37332F] text-[#F5F0E8] rounded-full text-sm font-sans-ui tracking-wider transition-all duration-300 hover:bg-[#252220] hover:shadow-lg hover:shadow-[#37332F]/10 hover:-translate-y-0.5 active:translate-y-0"
          >
            <BookOpen className="w-4 h-4 text-[#A8B5A0] transition-transform duration-300 group-hover:scale-110" />
            <span>Mulai Membaca</span>
            <span className="text-xs text-[#F5F0E8]/60 ml-1">→</span>
          </button>

          <button
            onClick={onOpenTimeline}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#EDE5D9]/80 border border-[#DED2C2] text-[#37332F] rounded-full text-sm font-sans-ui tracking-wider hover:bg-[#EDE5D9] hover:border-[#9A8876] transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-[#777C91]" />
            <span>Peta Waktu (Timeline)</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="relative z-10 w-full max-w-4xl pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans-ui tracking-wider text-[#9A8876] border-t border-[#DED2C2]/40"
      >
        <span>SDN Bendan Ngisor — 2 Juli 2026</span>
        <button
          onClick={handleStart}
          className="mt-2 sm:mt-0 flex items-center gap-1.5 hover:text-[#37332F] transition-colors"
        >
          <span>Buka Lembaran Novel</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </button>
        <span>Semarang, Indonesia</span>
      </motion.div>
    </section>
  );
}
