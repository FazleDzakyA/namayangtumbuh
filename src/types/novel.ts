export interface MemoryItem {
  id: string;
  date: string;
  title: string;
  caption: string;
  location?: string;
  type: 'polaroid' | 'ticket' | 'artifact' | 'letter' | 'standard';
  imageSrc?: string;
  placeholderNote: string;
  handwrittenNote?: string;
  rotation?: number;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  period: string;
  epigraph?: {
    quote: string;
    author?: string;
  };
  theme: 'paper' | 'warm-ivory' | 'dark-ink' | 'cinema';
  paragraphs: string[];
  literaryPrompts?: string[];
  memories?: MemoryItem[];
  isSpecial?: boolean;
  specialType?: 'march16' | 'june28' | 'july2' | 'sneha';
}

export interface TimelineEvent {
  id: string;
  dateLabel: string;
  fullDate?: string;
  title: string;
  description: string;
  category: 'childhood' | 'adolescence' | 'reconnection' | 'turning-point';
  chapterRef?: string;
  highlight?: boolean;
  quote?: string;
}

export interface ReadingProgressState {
  currentChapterId: string;
  scrollPercentage: number;
  lastReadDate: string;
  fontSize: 'normal' | 'large';
  paperTone: 'ivory' | 'paper' | 'sepia' | 'dark';
}
