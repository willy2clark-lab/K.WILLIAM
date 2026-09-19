import React from 'react';
import { Sliders, Sun, Contrast, Droplets, Sparkles, Film, Eye } from 'lucide-react';
import { FilterPreset, FilterSettings } from '../types';

interface Props {
  presets: FilterPreset[];
  settings: FilterSettings;
  onChangeSettings: (s: FilterSettings) => void;
  onSelectPreset: (preset: FilterPreset) => void;
}

export const FilterControls: React.FC<Props> = ({
  presets,
  settings,
  onChangeSettings,
  onSelectPreset,
}) => {
  const updateSetting = (key: keyof FilterSettings, value: number | string) => {
    onChangeSettings({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="space-y-5">
      {/* Presets Gallery */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Styles Colorimétriques Studio 2026
          </label>
          <span className="text-[11px] text-yellow-400 font-medium">
            Presets Calibrés
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {presets.map((preset) => {
            const isSelected = settings.tonePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset)}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-950/40 border-yellow-400 shadow-sm ring-1 ring-yellow-400/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-blue-700/50 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-xs text-slate-100">
                      {preset.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950 text-yellow-300 border border-blue-800/60">
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {preset.tagline}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-[10px] text-slate-500">
                  {preset.yearTrend}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sliders Accordion / Fine Tuning */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 border-b border-slate-800 pb-2.5">
          <Sliders className="w-4 h-4 text-yellow-400" />
          <span>Réglages Fins d'Étalonnage Studio</span>
        </div>

        <div className="space-y-3.5 text-xs">
          {/* 1. Bloom / Diffusion (Key 2026 trend) */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5 font-medium text-yellow-200">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                Effet Bloom &amp; Diffusion des Reflets
              </span>
              <span className="font-mono text-yellow-300">{settings.bloom}%</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Diffuse doucement les hautes lumières pour un rendu chaleureux et cinématographique.
            </p>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.bloom}
              onChange={(e) => updateSetting('bloom', Number(e.target.value))}
              className="w-full accent-yellow-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* 2. Grain Argentique 35mm */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5 font-medium text-blue-200">
                <Film className="w-3.5 h-3.5 text-blue-400" />
                Micro-Grain Argentique (Film 35mm)
              </span>
              <span className="font-mono text-blue-300">{settings.grain}%</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Apporte l'authenticité tactile de la pellicule Portra/Fuji qui rompt avec le rendu artificiel.
            </p>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.grain}
              onChange={(e) => updateSetting('grain', Number(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* 3. Température & Chaleur */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Droplets className="w-3.5 h-3.5 text-yellow-400" />
                Température / Chaleur (Kelvin)
              </span>
              <span className="font-mono text-yellow-300">
                {settings.warmth > 0 ? `+${settings.warmth} (Chaud/Ambré)` : settings.warmth < 0 ? `${settings.warmth} (Froid/Bleu Azur)` : 'Neutre'}
              </span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              value={settings.warmth}
              onChange={(e) => updateSetting('warmth', Number(e.target.value))}
              className="w-full accent-yellow-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* 4. Contraste Cinématographique */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Contrast className="w-3.5 h-3.5 text-slate-400" />
                Contraste
              </span>
              <span className="font-mono text-slate-300">{settings.contrast.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.5"
              step="0.02"
              value={settings.contrast}
              onChange={(e) => updateSetting('contrast', Number(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* 5. Exposition / Luminosité */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Sun className="w-3.5 h-3.5 text-yellow-400" />
                Exposition
              </span>
              <span className="font-mono text-yellow-300">
                {settings.brightness > 0 ? `+${settings.brightness}` : settings.brightness}
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              value={settings.brightness}
              onChange={(e) => updateSetting('brightness', Number(e.target.value))}
              className="w-full accent-yellow-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* 6. Vignettage Studio */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                Vignettage Studio
              </span>
              <span className="font-mono text-slate-300">{settings.vignette}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={settings.vignette}
              onChange={(e) => updateSetting('vignette', Number(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
