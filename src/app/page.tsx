'use client';

import NovelShell from '@/components/NovelShell';
import { AudioProvider } from '@/context/AudioContext';

export default function Home() {
  return (
    <AudioProvider>
      <NovelShell />
    </AudioProvider>
  );
}
