'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Camera, Maximize2, Tag } from 'lucide-react';
import { MemoryItem } from '@/types/novel';

interface MemoryInsertProps {
  memory: MemoryItem;
  onSelect: (memory: MemoryItem) => void;
  customImage?: string | null;
}

export default function MemoryInsert({
  memory,
  onSelect,
  customImage,
}: MemoryInsertProps) {
  const rotationStyle = memory.rotation
    ? { transform: `rotate(${memory.rotation}deg)` }
    : {};

  const displayImage = customImage || memory.imageSrc;

  // Artifact Style (Special March 16 gift journal layout)
  if (memory.type === 'artifact') {
    return (
      <motion.figure
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="my-10 mx-auto max-w-lg cursor-pointer group"
        onClick={() => onSelect(memory)}
      >
        <div className="bg-[#EDE5D9] p-5 sm:p-7 rounded-sm shadow-md border border-[#DED2C2] relative transition-transform duration-300 group-hover:-translate-y-1">
          {/* Subtle Washi Tape effect on top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#DED2C2]/60 backdrop-blur-xs border border-white/20 -rotate-1 shadow-xs" />

          {/* Photo container */}
          <div className="relative aspect-4/3 w-full bg-[#F5F0E8] rounded-xs overflow-hidden border border-[#DED2C2] flex items-center justify-center">
            {displayImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={displayImage}
                alt={memory.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
            ) : (
              <div className="p-6 text-center flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#EDE5D9] flex items-center justify-center text-[#9A8876]">
                  <Camera className="w-6 h-6 stroke-[1.2]" />
                </div>
                <p className="font-cormorant text-xl text-[#37332F]">
                  Foto Hadiah 16 Maret
                </p>
                <p className="font-lora text-[11px] text-[#9A8876] max-w-xs leading-relaxed">
                  {memory.placeholderNote}
                </p>
                <span className="text-[10px] font-sans-ui text-[#777C91] underline mt-1">
                  Klik untuk melihat / unggah pratinjau
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-[#37332F]/80 text-[#F5F0E8] p-2 rounded-full text-xs">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Caption */}
          <figcaption className="mt-4 space-y-1 text-center">
            <div className="flex items-center justify-center gap-2 text-[11px] font-sans-ui text-[#777C91] tracking-widest uppercase">
              <Calendar className="w-3 h-3" />
              <span>{memory.date}</span>
            </div>
            <h4 className="font-cormorant text-xl text-[#37332F] font-medium">
              {memory.title}
            </h4>
            <p className="font-lora text-xs text-[#37332F]/80 max-w-sm mx-auto italic leading-normal">
              {memory.caption}
            </p>
            {memory.handwrittenNote && (
              <p className="font-handwriting text-lg text-[#9A8876] pt-1">
                {memory.handwrittenNote}
              </p>
            )}
          </figcaption>
        </div>
      </motion.figure>
    );
  }

  // Polaroid Style (Default)
  return (
    <motion.figure
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={rotationStyle}
      className="my-10 mx-auto max-w-sm cursor-pointer group"
      onClick={() => onSelect(memory)}
    >
      <div className="bg-[#FFFFFF] p-4 sm:p-5 pb-6 rounded-xs polaroid-shadow border border-[#DED2C2]/50 relative transition-all duration-300 group-hover:rotate-0 group-hover:scale-102">
        {/* Subtle Pin or Tape */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#EDE5D9]/80 backdrop-blur-xs border border-black/5 rotate-1 shadow-xs" />

        {/* Polaroid Image Area */}
        <div className={`relative w-full ${memory.aspectRatio === 'square' ? 'aspect-square' : 'aspect-4/5'} bg-[#F5F0E8] overflow-hidden border border-[#EDE5D9] flex items-center justify-center`}>
          {displayImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displayImage}
              alt={memory.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            />
          ) : (
            <div className="p-4 text-center flex flex-col items-center justify-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#EDE5D9] flex items-center justify-center text-[#9A8876]">
                <Camera className="w-5 h-5 stroke-[1.2]" />
              </div>
              <p className="font-cormorant text-lg text-[#37332F]">
                {memory.title}
              </p>
              <p className="font-lora text-[10px] text-[#9A8876] max-w-xs leading-relaxed">
                {memory.placeholderNote}
              </p>
            </div>
          )}

          {/* Hover zoom icon */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-[#37332F]/80 text-[#F5F0E8] p-2 rounded-full text-xs">
              <Maximize2 className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Polaroid Bottom Note Area */}
        <figcaption className="mt-4 text-center space-y-1">
          {memory.handwrittenNote ? (
            <p className="font-handwriting text-xl text-[#37332F] leading-tight">
              {memory.handwrittenNote}
            </p>
          ) : (
            <p className="font-cormorant text-lg text-[#37332F]">
              {memory.title}
            </p>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[10px] font-sans-ui text-[#9A8876] tracking-widest uppercase">
            <span>{memory.date}</span>
          </div>
        </figcaption>
      </div>
    </motion.figure>
  );
}
