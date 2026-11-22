'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Info, Image as ImageIcon } from 'lucide-react';
import { MemoryItem } from '@/types/novel';

interface PhotoLightboxProps {
  memory: MemoryItem | null;
  onClose: () => void;
  customImage?: string | null;
  onUploadImage?: (id: string, dataUrl: string) => void;
}

export default function PhotoLightbox({
  memory,
  onClose,
  customImage,
  onUploadImage,
}: PhotoLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (memory) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [memory, onClose]);

  if (!memory) return null;

  const currentDisplayImage = customImage || memory.imageSrc;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUploadImage(memory.id, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1E1B18]/85 backdrop-blur-sm cursor-zoom-out"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#F5F0E8] rounded-lg shadow-2xl border border-[#DED2C2] flex flex-col md:flex-row overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#EDE5D9]/90 text-[#37332F] hover:bg-[#37332F] hover:text-[#F5F0E8] transition-all"
            aria-label="Tutup Pratinjau"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left / Image Area */}
          <div className="w-full md:w-3/5 bg-[#EDE5D9] min-h-[320px] md:min-h-[460px] flex items-center justify-center relative p-6 border-b md:border-b-0 md:border-r border-[#DED2C2]">
            {currentDisplayImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentDisplayImage}
                alt={memory.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded shadow-md"
              />
            ) : (
              /* High-end Literary Sketch / Archival Placeholder */
              <div className="w-full h-full min-h-[280px] border-2 border-dashed border-[#DED2C2] rounded-md flex flex-col items-center justify-center p-8 text-center bg-[#F5F0E8]/70">
                <div className="w-16 h-16 rounded-full bg-[#EDE5D9] flex items-center justify-center mb-4 text-[#9A8876]">
                  <ImageIcon className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h4 className="font-cormorant text-2xl text-[#37332F] font-normal mb-2">
                  Arsip Foto Asli
                </h4>
                <p className="font-lora text-xs text-[#9A8876] max-w-xs leading-relaxed mb-6">
                  {memory.placeholderNote}
                </p>

                {/* Upload Real Photo Button for User Experience */}
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#37332F] text-[#F5F0E8] rounded-full text-xs font-sans-ui tracking-wider hover:bg-[#252220] transition-colors shadow-sm">
                  <span>Pilih Foto dari Perangkat</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Right / Literary Details & Captions */}
          <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-[#F5F0E8]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-sans-ui tracking-widest uppercase text-[#777C91]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{memory.date}</span>
              </div>

              <h3 className="font-cormorant text-2xl md:text-3xl text-[#37332F] leading-tight">
                {memory.title}
              </h3>

              <div className="w-8 h-[1px] bg-[#DED2C2]" />

              <p className="font-lora text-sm text-[#37332F]/85 leading-relaxed">
                {memory.caption}
              </p>

              {memory.handwrittenNote && (
                <div className="mt-4 p-3 bg-[#EDE5D9]/50 rounded border-l-2 border-[#A8B5A0]">
                  <p className="text-[11px] font-sans-ui text-[#9A8876] uppercase tracking-wider mb-1">
                    Catatan Tulisan Tangan
                  </p>
                  <p className="font-handwriting text-lg text-[#37332F]">
                    {memory.handwrittenNote}
                  </p>
                </div>
              )}
            </div>

            {/* Permanent storage guidance */}
            <div className="mt-8 pt-4 border-t border-[#DED2C2] text-[11px] font-sans-ui text-[#9A8876] space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-[#37332F]">
                <Info className="w-3.5 h-3.5 text-[#A8B5A0]" />
                <span>Petunjuk Penempatan File Naskah:</span>
              </div>
              <p className="leading-normal">
                Letakkan file gambar asli di folder{' '}
                <code className="text-[#37332F] bg-[#EDE5D9] px-1 py-0.5 rounded">
                  public/images/memories/
                </code>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
