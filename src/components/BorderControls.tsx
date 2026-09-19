import React from 'react';
import { Palette, Type, Sparkles, Sliders } from 'lucide-react';
import { BorderOption, BorderSettings } from '../types';
import { FESTIVE_PALETTES } from '../data/borderStyles';

interface Props {
  options: BorderOption[];
  settings: BorderSettings;
  onChangeSettings: (s: BorderSettings) => void;
}

export const BorderControls: React.FC<Props> = ({
  options,
  settings,
  onChangeSettings,
}) => {
  const updateSetting = (key: keyof BorderSettings, val: any) => {
    onChangeSettings({
      ...settings,
      [key]: val,
    });
  };

  const currentOption = options.find((o) => o.id === settings.styleId) || options[0];

  return (
    <div className="space-y-5">
      {/* Border Style Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Bordures Festives &amp; Narratives 2026
        </label>
        <p className="text-[11px] text-slate-400">
          En 2026, la bordure n’est plus un simple cadre mais un élément de narration qui renforce le sentiment de fait main ou de cadeau d’exception.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {options.map((opt) => {
            const isSelected = opt.id === settings.styleId;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  updateSetting('styleId', opt.id);
                  if (opt.defaultColor && opt.id !== settings.styleId) {
                    updateSetting('color', opt.defaultColor);
                  }
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-950/40 border-yellow-400 ring-1 ring-yellow-400/40 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-blue-700/50 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-100">
                      {opt.name}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {opt.tagline}
                  </p>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 italic">
                  {opt.trendReason}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Palette Selector */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-yellow-400" />
            Palette de Teintes Festives (Nuances Bleu &amp; Jaune)
          </span>
          <span className="text-[11px] font-mono text-yellow-300 font-semibold">
            {settings.color}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {FESTIVE_PALETTES.map((p) => {
            const isSelected = settings.color.toLowerCase() === p.hex.toLowerCase();
            return (
              <button
                key={p.hex}
                type="button"
                onClick={() => updateSetting('color', p.hex)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-yellow-400 text-slate-100 ring-1 ring-yellow-400/40 font-medium'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-blue-700/60'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/30 shrink-0 shadow-xs"
                  style={{ backgroundColor: p.hex }}
                />
                <span className="text-[11px]">{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Gold Accent Toggle */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs">
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Reflets &amp; Filets Or Jaune Champagne</span>
          </label>
          <input
            type="checkbox"
            checked={settings.accentGold}
            onChange={(e) => updateSetting('accentGold', e.target.checked)}
            className="w-4 h-4 accent-yellow-400 cursor-pointer rounded"
          />
        </div>
      </div>

      {/* Border Custom Text */}
      {currentOption.supportsCustomText && (
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Type className="w-3.5 h-3.5 text-yellow-400" />
            <span>Texte ou Sceau Personnalisé sur la Bordure</span>
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">
              Mention Principale (Titre, Collection ou Vœux)
            </label>
            <input
              type="text"
              value={settings.customText}
              onChange={(e) => updateSetting('customText', e.target.value)}
              placeholder="Ex: Édition Fêtes 2026, Fait Main..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">
              Sous-titre ou Mention d'Atelier (si supporté)
            </label>
            <input
              type="text"
              value={settings.subText}
              onChange={(e) => updateSetting('subText', e.target.value)}
              placeholder="Ex: Prise de vue Studio Atelier"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-yellow-400"
            />
          </div>
        </div>
      )}

      {/* Geometry Sliders */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3.5 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-slate-300 border-b border-slate-800 pb-2">
          <Sliders className="w-3.5 h-3.5 text-yellow-400" />
          <span>Dimensions &amp; Marges de la Bordure</span>
        </div>

        {/* Padding */}
        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>Marge Intérieure (Padding)</span>
            <span className="font-mono text-yellow-300">{settings.padding}px</span>
          </div>
          <input
            type="range"
            min="12"
            max="60"
            value={settings.padding}
            onChange={(e) => updateSetting('padding', Number(e.target.value))}
            className="w-full accent-yellow-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Thickness */}
        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>Épaisseur des Filets</span>
            <span className="font-mono text-yellow-300">{settings.borderWidth}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            value={settings.borderWidth}
            onChange={(e) => updateSetting('borderWidth', Number(e.target.value))}
            className="w-full accent-yellow-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Opacity */}
        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>Opacité de la Bordure</span>
            <span className="font-mono text-yellow-300">{Math.round(settings.opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.4"
            max="1.0"
            step="0.05"
            value={settings.opacity}
            onChange={(e) => updateSetting('opacity', Number(e.target.value))}
            className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
