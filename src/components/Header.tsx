import React from 'react';
import { Sparkles, Download, SplitSquareVertical, LayoutGrid, RotateCcw } from 'lucide-react';
import { ViewMode } from '../types';

interface Props {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onOpenExport: () => void;
  onReset: () => void;
  onExportDiptych: () => void;
}

export const Header: React.FC<Props> = ({
  viewMode,
  setViewMode,
  onOpenExport,
  onReset,
  onExportDiptych,
}) => {
  return (
    <header className="bg-slate-900 text-slate-100 border-b border-slate-800 sticky top-0 z-40 px-4 lg:px-8 py-3.5 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Concept Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-yellow-400 flex items-center justify-center shadow-inner">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-lg lg:text-xl font-bold tracking-tight text-slate-100">
                Studio Photo Festif
              </h1>
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-300 border border-yellow-400/30">
                Palette Azur &amp; Or
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Du produit brut au visuel de fête haute qualité · Étalonnage studio &amp; bordures narratives
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setViewMode('final')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'final'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Rendu Final
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split-slider')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'split-slider'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5 text-yellow-300" />
            Avant / Après
          </button>
          <button
            type="button"
            onClick={() => setViewMode('bento')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'bento'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-yellow-300" />
            Bento Grid 2026
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onReset}
            title="Réinitialiser les réglages"
            className="p-2 text-slate-400 hover:text-yellow-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onExportDiptych}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-blue-950/70 text-yellow-300 hover:bg-blue-900/60 border border-yellow-400/30 transition-colors cursor-pointer"
            title="Exporter l'envers du décor côte à côte"
          >
            <SplitSquareVertical className="w-3.5 h-3.5 text-yellow-400" />
            Diptyque Avant/Après
          </button>

          <button
            type="button"
            onClick={onOpenExport}
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-300 hover:to-yellow-400 text-slate-950 font-sans shadow-md hover:shadow-yellow-500/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-950" />
            Exporter Post HD
          </button>
        </div>
      </div>
    </header>
  );
};
