'use client';

import React, { useEffect, useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaRegister() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('PWA ServiceWorker registered with scope:', reg.scope);
          })
          .catch((err) => {
            console.log('PWA ServiceWorker registration failed:', err);
          });
      });
    }

    // 2. Check if already installed / running in standalone mode
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(isStandaloneMode);
    };
    checkStandalone();

    // 3. Listen for browser install prompt (Android Chrome, Edge, etc.)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      // Show subtle banner after 3 seconds if not already installed
      setTimeout(() => {
        setShowInstallBanner(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
      setInstallPrompt(null);
    }
  };

  if (isStandalone || !showInstallBanner || !installPrompt) {
    return null;
  }

  return (
    <aside
      aria-label="Pemberitahuan Pemasangan Aplikasi"
      className="fixed bottom-5 right-5 z-50 max-w-sm bg-[#EDE5D9]/95 backdrop-blur-md border border-[#DED2C2] text-[#37332F] rounded-2xl p-4 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#37332F] text-[#F5F0E8] flex items-center justify-center shrink-0 shadow-sm">
          <Smartphone className="w-5 h-5 text-[#A8B5A0]" />
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="font-cormorant text-lg font-semibold leading-tight text-[#37332F]">
            Pasang Aplikasi Fazaa
          </h4>
          <p className="text-[11px] font-sans-ui text-[#9A8876] mt-0.5 leading-snug">
            Pasang di layar utama HP Anda untuk membaca novel tanpa browser & lebih nyaman.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#37332F] hover:bg-[#201D1A] text-[#F5F0E8] rounded-full text-xs font-sans-ui tracking-wide transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#A8B5A0]" />
              <span>Pasang Sekarang</span>
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="px-2.5 py-1.5 text-xs text-[#9A8876] hover:text-[#37332F] transition-colors"
            >
              Nanti Saja
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowInstallBanner(false)}
          className="text-[#9A8876] hover:text-[#37332F] p-1 transition-colors"
          aria-label="Tutup Banner Pemasangan"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
