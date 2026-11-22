'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Music, Sparkles, Image as ImageIcon } from 'lucide-react';

interface TicketStubProps {
  onOpenLightbox: () => void;
  imageSrc?: string;
  hasCustomPhoto?: boolean;
}

export default function TicketStub({
  onOpenLightbox,
  imageSrc,
  hasCustomPhoto,
}: TicketStubProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="my-12 w-full max-w-xl mx-auto cursor-pointer"
      onClick={onOpenLightbox}
    >
      {/* Outer Glow / Shadow */}
      <div className="relative group rounded-xl overflow-hidden bg-[#24211E] text-[#EDE5D9] shadow-2xl border border-[#3E3935] transition-all duration-500 hover:shadow-orange-950/20 hover:border-[#777C91]/50">
        {/* Subtle Ticket Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-stretch">
          {/* Main Ticket Body */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#3E3935] pb-4">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#A8B5A0]" />
                <span className="text-[11px] font-sans-ui tracking-[0.25em] uppercase text-[#9A8876]">
                  Konser Musik Langsung
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest bg-[#37332F] text-[#A8B5A0] border border-[#A8B5A0]/30">
                ARTEFAK OTENTIK
              </span>
            </div>

            {/* Concert Name */}
            <div>
              <p className="text-xs font-sans-ui tracking-widest uppercase text-[#777C91] mb-1">
                Tur Musik Indonesia
              </p>
              <h4 className="font-cormorant text-3xl sm:text-4xl text-[#F5F0E8] font-semibold tracking-wide">
                PERUNGGU
              </h4>
              <p className="font-lora text-xs sm:text-sm text-[#9A8876] mt-1 italic">
                “Memilih Mengatakannya di Antara Gemuruh Lagu”
              </p>
            </div>

            {/* Date & Location Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-sans-ui border-t border-[#3E3935]/60">
              <div>
                <span className="text-[#9A8876] block text-[10px] uppercase tracking-wider">
                  Tanggal
                </span>
                <span className="font-medium text-[#F5F0E8] flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-[#A8B5A0]" />
                  02 Juli 2026
                </span>
              </div>
              <div>
                <span className="text-[#9A8876] block text-[10px] uppercase tracking-wider">
                  Momen Bersejarah
                </span>
                <span className="font-medium text-[#A8B5A0] flex items-center gap-1.5 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#A8B5A0]" />
                  Resmi Bersama
                </span>
              </div>
            </div>
          </div>

          {/* Perforated Divider */}
          <div className="relative flex md:flex-col items-center justify-between border-t md:border-t-0 md:border-l border-dashed border-[#554E47] py-2 md:py-0 px-4 md:px-0">
            {/* Cutout notches */}
            <div className="hidden md:block absolute -top-3 left-[-12px] w-6 h-6 rounded-full bg-[#1E1B18]" />
            <div className="hidden md:block absolute -bottom-3 left-[-12px] w-6 h-6 rounded-full bg-[#1E1B18]" />

            <div className="md:hidden absolute -left-3 top-[-12px] w-6 h-6 rounded-full bg-[#1E1B18]" />
            <div className="md:hidden absolute -right-3 top-[-12px] w-6 h-6 rounded-full bg-[#1E1B18]" />
          </div>

          {/* Ticket Stub / Photo Thumbnail / Barcode Section */}
          <div className="w-full md:w-48 bg-[#1C1A17] p-5 flex flex-col justify-between items-center text-center space-y-3">
            {imageSrc ? (
              <div className="relative w-full aspect-4/3 rounded overflow-hidden border border-[#3E3935] shadow-xs group-hover:scale-103 transition-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt="Tiket Konser Perunggu"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-[10px] font-sans-ui uppercase tracking-widest text-[#9A8876]">
                  Nomor Seri
                </span>
                <p className="font-mono text-xs text-[#EDE5D9] tracking-wider">
                  PRGG-2026-0702
                </p>
              </div>
            )}

            {/* Simulated Barcode */}
            <div className="w-full flex justify-center items-end gap-1 h-9 opacity-75">
              {[3, 1, 4, 2, 5, 2, 3, 1, 6, 2, 4, 1, 5, 2, 3, 2, 4, 1, 5, 3].map((h, i) => (
                <div
                  key={i}
                  className="bg-[#DED2C2] w-[2px] rounded-sm"
                  style={{ height: `${h * 5.5}px` }}
                />
              ))}
            </div>

            <span className="text-[10px] font-sans-ui text-[#A8B5A0] group-hover:underline flex items-center gap-1">
              <ImageIcon className="w-3 h-3" />
              <span>Lihat Foto Tiket</span>
            </span>
          </div>
        </div>
      </div>

      <p className="text-center font-handwriting text-lg text-[#9A8876] mt-3">
        “Malam di mana dua nama resmi melangkah beriringan.”
      </p>
    </motion.div>
  );
}
