'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, RotateCw, Sparkles, Music, BookOpen } from 'lucide-react';

interface BookCoverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CoverType = 'front' | 'back-blurb' | 'back-clean';

export default function BookCoverModal({ isOpen, onClose }: BookCoverModalProps) {
  const [activeCover, setActiveCover] = useState<CoverType>('front');
  const [isFlipping, setIsFlipping] = useState(false);

  if (!isOpen) return null;

  const coverConfig = {
    front: {
      src: '/cover-front.jpg',
      alt: 'Sampul Depan Novel — Nama yang Tumbuh Bersama Waktu',
      downloadName: 'sampul-depan-nama-yang-tumbuh.jpg',
      label: 'Sampul Depan',
      sublabel: 'Ilustrasi Senja, Bunga & Siluet Fazle (175cm) - Azalia (160cm)',
      isSpineLeft: true,
    },
    'back-blurb': {
      src: '/cover-back-blurb.jpg',
      alt: 'Sampul Belakang Novel — Puisi Sneha dalam Mauna & Lagu Tema',
      downloadName: 'sampul-belakang-puisi-fazaa.jpg',
      label: 'Sampul Belakang (Puisi)',
      sublabel: 'Sinopsis Puisi "Sneha dalam Mauna" & Lagu Sampai Jadi Debu',
      isSpineLeft: false,
    },
    'back-clean': {
      src: '/cover-back.jpg',
      alt: 'Sampul Belakang Novel — Polos Tanpa Teks',
      downloadName: 'sampul-belakang-polos.jpg',
      label: 'Sampul Belakang (Polos)',
      sublabel: 'Lanskap Padang Bunga, Jam Saku & Kaset Klasik Asli',
      isSpineLeft: false,
    },
  };

  const current = coverConfig[activeCover];

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setActiveCover((prev) => (prev === 'front' ? 'back-blurb' : 'front'));
      setIsFlipping(false);
    }, 200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative max-w-md w-full bg-[#1F1C18] rounded-2xl shadow-2xl border border-[#4A3E32]/60 overflow-hidden my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar Navigation */}
          <div className="px-4 py-3 bg-[#26221D] border-b border-[#3E342B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C49A7A]" />
              <span className="text-xs font-sans-ui tracking-wider uppercase text-[#D8CCB0]">
                Sampul Buku Resmi
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={current.src}
                download={current.downloadName}
                title="Unduh Sampul Ini"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans-ui bg-[#362F27] hover:bg-[#453C32] text-[#E8DFC8] rounded-full transition-colors border border-[#524538]"
              >
                <Download className="w-3 h-3 text-[#C49A7A]" />
                <span className="hidden sm:inline">Unduh</span>
              </a>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#362F27] text-[#A89A84] hover:text-white transition-colors"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Toggle Tabs */}
          <div className="px-4 pt-3 pb-2 flex gap-1.5 bg-[#1F1C18]">
            <button
              onClick={() => setActiveCover('front')}
              className={`flex-1 py-1.5 px-2 text-[11px] font-sans-ui rounded-lg transition-all text-center tracking-wide ${
                activeCover === 'front'
                  ? 'bg-[#3A3229] text-[#F0E8D5] font-semibold border border-[#5A4E40] shadow-xs'
                  : 'text-[#8E7E6A] hover:bg-[#28231E] hover:text-[#C4B49C]'
              }`}
            >
              Sampul Depan
            </button>
            <button
              onClick={() => setActiveCover('back-blurb')}
              className={`flex-1 py-1.5 px-2 text-[11px] font-sans-ui rounded-lg transition-all text-center tracking-wide ${
                activeCover === 'back-blurb'
                  ? 'bg-[#3A3229] text-[#F0E8D5] font-semibold border border-[#5A4E40] shadow-xs'
                  : 'text-[#8E7E6A] hover:bg-[#28231E] hover:text-[#C4B49C]'
              }`}
            >
              Belakang (Puisi)
            </button>
            <button
              onClick={() => setActiveCover('back-clean')}
              className={`flex-1 py-1.5 px-2 text-[11px] font-sans-ui rounded-lg transition-all text-center tracking-wide ${
                activeCover === 'back-clean'
                  ? 'bg-[#3A3229] text-[#F0E8D5] font-semibold border border-[#5A4E40] shadow-xs'
                  : 'text-[#8E7E6A] hover:bg-[#28231E] hover:text-[#C4B49C]'
              }`}
            >
              Belakang (Polos)
            </button>
          </div>

          {/* Book Cover Visual Frame */}
          <div className="relative p-4 sm:p-5 flex justify-center bg-gradient-to-b from-[#181613] to-[#231F1A]">
            <div
              className={`relative max-w-[340px] w-full rounded-md shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden transition-transform duration-300 ${
                isFlipping ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
              }`}
            >
              <img
                src={current.src}
                alt={current.alt}
                className="w-full h-auto block select-none rounded-md"
                draggable={false}
              />

              {/* Realistic Book Spine Shadow effect */}
              {current.isSpineLeft ? (
                <div className="absolute inset-y-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
              ) : (
                <div className="absolute inset-y-0 right-0 w-8 pointer-events-none bg-gradient-to-l from-black/40 via-black/15 to-transparent" />
              )}

              {/* Subtle Paper Grain Vignette */}
              <div className="absolute inset-0 pointer-events-none rounded-md ring-1 ring-inset ring-white/10" />

              {/* Flip Button Overlay Floating */}
              <button
                onClick={handleFlip}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-black/65 hover:bg-black/85 text-white/90 text-[11px] rounded-full backdrop-blur-md shadow-lg border border-white/20 transition-all hover:scale-105 active:scale-95"
                title="Balik ke sisi sebaliknya"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Balik</span>
              </button>
            </div>
          </div>

          {/* Details & Literary Metadata Footer */}
          <div className="px-5 py-3.5 bg-[#26221D] border-t border-[#3E342B] text-center space-y-1.5">
            <p className="font-cormorant text-base text-[#EDE5D9] tracking-wide">
              {current.label}
            </p>
            <p className="text-[11px] font-sans-ui text-[#9A8876]">
              {current.sublabel}
            </p>

            <div className="pt-1 flex items-center justify-center gap-3 text-[10px] text-[#C49A7A] border-t border-[#362F27]">
              <span className="flex items-center gap-1">
                <Music className="w-3 h-3 text-[#A8B5A0]" />
                Sampai Jadi Debu — Banda Neira
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C49A7A]" />
                Fazaa 2026
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
