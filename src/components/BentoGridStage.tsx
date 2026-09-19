import React from 'react';
import { RawProduct, FilterSettings, BorderSettings, StickerBadge } from '../types';
import { FestiveBorderOverlay } from './FestiveBorderOverlay';
import { getBentoTileSVG } from '../data/bentoTiles';

interface Props {
  product: RawProduct;
  filter: FilterSettings;
  border: BorderSettings;
  badges: StickerBadge[];
  filterStyleCss: React.CSSProperties;
}

export const BentoGridStage: React.FC<Props> = ({
  product,
  border,
  filterStyleCss,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto aspect-square bg-slate-950 p-4 sm:p-6 rounded-2xl shadow-2xl border border-slate-800/80 flex flex-col justify-between select-none">
      {/* Bento Grid Header */}
      <div className="flex items-center justify-between mb-3 px-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          <span className="font-serif font-semibold text-slate-200 tracking-wider uppercase text-[11px]">
            Bento Grid Modulaire · Nuances Azur &amp; Or 2026
          </span>
        </div>
        <span className="text-[10px] font-mono text-yellow-300 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800/60">
          Format Carrousel / Pinterest
        </span>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-3 grid-rows-3 gap-3 flex-1 h-full">
        {/* 1. HERO TILE: Product with Studio Filter + Border (spans 2 cols, 2 rows) */}
        <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md group">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            style={filterStyleCss}
          />
          {/* Festive Border */}
          <FestiveBorderOverlay settings={border} aspectRatio="1:1" />

          {/* Hero product tag */}
          <div className="absolute top-3 left-3 z-30 bg-blue-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-yellow-400/40 text-[10px] text-yellow-200 font-medium">
            ✦ Pièce Maîtresse : {product.name}
          </div>
        </div>

        {/* 2. AMBIANCE TILE: Candle & Festive Warmth */}
        <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative border border-slate-800/80 shadow-md group bg-slate-900">
          <img
            src={getBentoTileSVG('ambiance-candle')}
            alt="Ambiance de fête"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-2.5">
            <span className="text-[9px] uppercase font-mono tracking-wider text-yellow-400">
              Atmosphère
            </span>
            <span className="text-[11px] font-medium text-slate-100 line-clamp-1">
              Lumière Feutrée
            </span>
          </div>
        </div>

        {/* 3. TEXTURE MACRO TILE: Wool & Natural Fibres */}
        <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative border border-slate-800/80 shadow-md group bg-slate-900">
          <img
            src={getBentoTileSVG('texture-knit')}
            alt="Texture naturelle"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-2.5">
            <span className="text-[9px] uppercase font-mono tracking-wider text-blue-300">
              Authenticité
            </span>
            <span className="text-[11px] font-medium text-slate-100 line-clamp-1">
              Matière Vraie
            </span>
          </div>
        </div>

        {/* 4. QUOTE TILE: Atelier Quote / Dedication (spans 2 cols, 1 row) */}
        <div className="col-span-2 row-span-1 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-950 p-4 border border-blue-900/40 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-yellow-400 uppercase tracking-widest">
              L’Esprit de l’Atelier
            </span>
            <span className="text-xs">✨</span>
          </div>
          <p className="font-serif italic text-xs sm:text-sm text-slate-200 leading-snug">
            « Façonné avec patience et minutie pour illuminer vos fêtes sous une douce harmonie azur et or. »
          </p>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>{product.category}</span>
            <span className="text-yellow-300 font-serif font-bold">Fêtes 2026</span>
          </div>
        </div>

        {/* 5. BADGE TILE: Gift Idea & Fast Delivery */}
        <div className="col-span-1 row-span-1 rounded-2xl bg-gradient-to-br from-blue-950/90 to-slate-900 p-3 border border-blue-800/50 flex flex-col justify-between shadow-md text-center items-center">
          <span className="text-base">🎁</span>
          <div>
            <p className="text-[11px] font-bold text-yellow-300">
              Idée Cadeau
            </p>
            <p className="text-[9px] text-blue-200">
              Prêt à offrir
            </p>
          </div>
          <span className="text-[9px] font-mono bg-blue-900/60 text-yellow-200 px-2 py-0.5 rounded-full border border-yellow-400/30">
            En Stock
          </span>
        </div>
      </div>
    </div>
  );
};
