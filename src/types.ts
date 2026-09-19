export type AspectRatio = '1:1' | '4:5' | '9:16' | '16:9';

export type ViewMode = 'final' | 'split-slider' | 'bento' | 'diptych';

export interface RawProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  lightingNotes: string;
  colorHex: string;
  textureDetail: string;
  tag: string;
}

export interface FilterSettings {
  brightness: number; // -50 to 50 (default 0)
  contrast: number; // 0.6 to 1.6 (default 1.0)
  saturation: number; // 0 to 2.0 (default 1.0)
  warmth: number; // -50 to 50 (default 0)
  tint: number; // -30 to 30 (default 0)
  bloom: number; // 0 to 100 (default 0)
  grain: number; // 0 to 100 (default 15)
  vignette: number; // 0 to 100 (default 10)
  tonePresetId: string;
}

export interface FilterPreset {
  id: string;
  name: string;
  tagline: string;
  yearTrend: string;
  description: string;
  badge: string;
  settings: Partial<FilterSettings>;
  overlayColor?: string;
  overlayBlendMode?: string;
  overlayOpacity?: number;
  highlightTint?: string;
  shadowTint?: string;
}

export type BorderStyleCategory =
  | 'folk'
  | 'art-deco'
  | 'bio-design'
  | 'ribbon'
  | 'postal'
  | 'polaroid'
  | 'minimal-stars';

export interface BorderOption {
  id: string;
  name: string;
  category: BorderStyleCategory;
  tagline: string;
  trendReason: string;
  defaultColor: string;
  supportsCustomText: boolean;
}

export interface BorderSettings {
  styleId: string;
  color: string;
  padding: number; // 12 to 48px
  borderWidth: number; // 1 to 12px
  cornerRadius: number; // 0 to 28px
  opacity: number; // 0.4 to 1.0
  accentGold: boolean;
  customText: string;
  subText: string;
  showEmboss: boolean;
}

export interface BentoTile {
  id: string;
  type: 'product' | 'ambiance' | 'texture' | 'quote' | 'badge';
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  colSpan?: number;
  rowSpan?: number;
}

export interface StickerBadge {
  id: string;
  text: string;
  subtext?: string;
  iconType: 'gift' | 'star' | 'poll' | 'leaf' | 'sparkles' | 'delivery';
  color: string;
  textColor: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  active: boolean;
}

export interface FestiveCopy {
  hook: string;
  body: string;
  question: string;
  hashtags: string;
}
