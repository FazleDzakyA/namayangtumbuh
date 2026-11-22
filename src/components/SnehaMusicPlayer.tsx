'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export default function SnehaMusicPlayer() {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    trackTitle,
    artist,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
  } = useAudio();

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="my-10 max-w-xl mx-auto">
      <div className="p-6 bg-[#EDE5D9]/95 backdrop-blur-xs rounded-2xl border border-[#DED2C2] shadow-lg transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Spinning Vinyl Record (Synchronized with global audio state) */}
          <div className="relative shrink-0">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="w-20 h-20 rounded-full bg-[#201D1A] border-3 border-[#37332F] shadow-xl flex items-center justify-center relative overflow-hidden"
            >
              {/* Vinyl Grooves */}
              <div className="absolute inset-1.5 border border-white/10 rounded-full" />
              <div className="absolute inset-3 border border-white/10 rounded-full" />
              <div className="absolute inset-5 border border-white/10 rounded-full" />
              <div className="absolute inset-7 border border-white/10 rounded-full" />

              {/* Center Label */}
              <div className="w-7 h-7 rounded-full bg-[#A8B5A0] border border-[#F5F0E8] flex items-center justify-center shadow-inner">
                <div className="w-2 h-2 rounded-full bg-[#201D1A]" />
              </div>
            </motion.div>

            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8B5A0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#A8B5A0]"></span>
              </span>
            )}
          </div>

          {/* Song Details & Primary Controls */}
          <div className="flex-1 text-center sm:text-left space-y-3 w-full">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-sans-ui uppercase tracking-[0.2em] text-[#777C91]">
                <Music className="w-3.5 h-3.5 text-[#A8B5A0]" />
                <span>Lagu Pengiring Novel</span>
                {isPlaying && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium normal-case tracking-normal bg-[#A8B5A0]/25 text-[#37332F] border border-[#A8B5A0]/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0] animate-pulse" />
                    Sedang Berputar
                  </span>
                )}
              </div>
              <h4 className="font-cormorant text-2xl sm:text-3xl text-[#37332F] font-semibold leading-tight mt-0.5">
                {trackTitle}
              </h4>
              <p className="font-lora text-xs sm:text-sm text-[#9A8876] italic">
                {artist}
              </p>
            </div>

            {/* Time Seek Bar */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-[#DED2C2] rounded-lg appearance-none cursor-pointer accent-[#37332F]"
                aria-label="Seek Waktu Lagu"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#9A8876]">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Play Button & Volume Bar */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <button
                onClick={togglePlay}
                className="px-5 py-2.5 bg-[#37332F] hover:bg-[#201D1A] text-[#F5F0E8] rounded-full text-xs font-sans-ui tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Jeda Lagu</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Putar Lagu</span>
                  </>
                )}
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 text-[#9A8876]">
                <button
                  onClick={toggleMute}
                  className="hover:text-[#37332F] transition-colors"
                  aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-[#777C91]" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#A8B5A0]" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 sm:w-20 h-1.5 bg-[#DED2C2] rounded-lg appearance-none cursor-pointer accent-[#37332F]"
                  aria-label="Volume Lagu"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
