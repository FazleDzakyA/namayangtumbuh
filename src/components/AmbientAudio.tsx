'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export default function AmbientAudio() {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <button
      onClick={togglePlay}
      title={isPlaying ? 'Heningkan Musik' : 'Putar Musik: Sampai Jadi Debu — Banda Neira'}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300 font-sans-ui border ${
        isPlaying
          ? 'bg-[#EDE5D9]/90 border-[#A8B5A0] text-[#37332F] shadow-xs'
          : 'bg-[#F5F0E8]/70 border-[#DED2C2] text-[#9A8876] hover:text-[#37332F] hover:border-[#9A8876]'
      }`}
    >
      {isPlaying ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8B5A0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A8B5A0]"></span>
          </span>
          <Volume2 className="w-3.5 h-3.5 text-[#A8B5A0]" />
          <span className="hidden sm:inline">Sampai Jadi Debu (Aktif)</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Putar Musik</span>
        </>
      )}
    </button>
  );
}
