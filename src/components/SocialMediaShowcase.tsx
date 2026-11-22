'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function SocialMediaShowcase() {
  const platforms = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      subtitle: 'Pesan Langsung & Personal',
      note: 'Ruang tempat kami saling berkirim sapaan, bertukar kabar, hingga voting KBT Terpadu yang membuka kembali jalan.',
      color: '#25D366',
      badgeBg: 'rgba(37, 211, 102, 0.1)',
      borderColor: 'rgba(37, 211, 102, 0.25)',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.761.859 2.796.859 3.182 0 5.768-2.586 5.769-5.766.001-3.182-2.585-5.766-5.769-5.766zm3.393 8.163c-.144.405-.837.774-1.17.822-.312.043-.681.076-2.18-.544-1.748-.724-2.887-2.484-2.975-2.6-.088-.116-.708-.941-.708-1.794 0-.853.448-1.274.607-1.448.16-.175.348-.219.465-.219.116 0 .232.001.334.006.107.005.25.04.391.378.144.348.494 1.203.537 1.29.043.088.072.19.014.305-.058.116-.087.188-.174.29-.088.102-.185.228-.264.306-.088.087-.18.182-.077.36.103.177.458.756.983 1.224.676.602 1.246.788 1.423.875.177.087.28.073.385-.044.103-.116.448-.523.568-.702.12-.177.24-.148.404-.087.164.058 1.042.492 1.221.58.179.088.298.131.342.204.043.073.043.424-.101.829z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.043c-1.758 0-3.39-.508-4.773-1.385l-.343-.217-2.964.777.791-2.889-.238-.379A7.994 7.994 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8.043-8 8.043z" />
        </svg>
      ),
    },
    {
      id: 'instagram',
      name: 'Instagram',
      subtitle: 'Cerita & Respon Cerita',
      note: 'Ruang visual untuk saling menanggapi cerita, menyematkan reaksi, dan menyaksikan keseharian dari balik layar.',
      color: '#E1306C',
      badgeBg: 'rgba(225, 48, 108, 0.1)',
      borderColor: 'rgba(225, 48, 108, 0.25)',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      subtitle: 'Tawa & Video Ringkas',
      note: 'Ruang santai bertukar video, tren yang melintas, hingga sapaan hangat di sela waktu luang masa sekolah.',
      color: '#111111',
      badgeBg: 'rgba(0, 0, 0, 0.08)',
      borderColor: 'rgba(0, 0, 0, 0.2)',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="my-12 max-w-2xl mx-auto"
    >
      <div className="bg-[#EDE5D9]/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-[#DED2C2] shadow-sm relative overflow-hidden">
        {/* Subtle decorative header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-sans-ui uppercase tracking-[0.25em] text-[#777C91]">
            <Sparkles className="w-3.5 h-3.5 text-[#A8B5A0]" />
            <span>Pijakan Komunikasi Maya</span>
          </div>
          <h3 className="font-cormorant text-2xl sm:text-3xl text-[#37332F] font-semibold">
            Tiga Kanal, Satu Muara
          </h3>
          <p className="font-lora text-xs sm:text-sm text-[#9A8876] italic max-w-md mx-auto">
            “Kita chat-an, lalu asing. Chat-an lagi, lalu asing kembali. Tiga ruang yang menampung jejak langkah kami.”
          </p>
        </div>

        {/* The 3 Social Media Floating Badges / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {platforms.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#F5F0E8] p-5 rounded-xl border border-[#DED2C2] flex flex-col items-center text-center shadow-xs transition-shadow hover:shadow-md"
            >
              {/* Logo with signature color */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-xs"
                style={{
                  backgroundColor: p.badgeBg,
                  borderColor: p.borderColor,
                  color: p.color,
                  borderWidth: 1,
                }}
              >
                {p.icon}
              </div>

              <h4 className="font-cormorant text-xl font-bold text-[#37332F]">
                {p.name}
              </h4>
              <span className="text-[10px] font-sans-ui uppercase tracking-wider text-[#A8B5A0] font-medium block mt-0.5 mb-2">
                {p.subtitle}
              </span>
              <p className="font-lora text-xs text-[#37332F]/80 leading-relaxed">
                {p.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Poetic Footer Note */}
        <div className="mt-6 pt-4 border-t border-[#DED2C2]/60 text-center flex items-center justify-center gap-2 text-xs font-lora text-[#9A8876] italic">
          <MessageCircle className="w-3.5 h-3.5 text-[#777C91]" />
          <span>Fase SMK — Mengarungi pasang surut pesan singkat di WhatsApp, Instagram, dan TikTok.</span>
        </div>
      </div>
    </motion.section>
  );
}
