import React, { useState } from 'react';
import { X, Download, Check, SplitSquareVertical, Image as ImageIcon, Sparkles } from 'lucide-react';
import { RawProduct, FilterSettings, BorderSettings, StickerBadge, AspectRatio } from '../types';
import { renderPostToCanvas, downloadCanvas } from '../utils/canvasRenderer';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: RawProduct;
  filter: FilterSettings;
  border: BorderSettings;
  badges: StickerBadge[];
  aspectRatio: AspectRatio;
  diptychOnly?: boolean;
}

export const ExportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  product,
  filter,
  border,
  badges,
  aspectRatio,
  diptychOnly = false,
}) => {
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [isDiptych, setIsDiptych] = useState<boolean>(diptychOnly);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  // Resolve dimensions based on aspect ratio & diptych
  let width = 1080;
  let height = 1080;

  if (isDiptych) {
    width = 1920;
    height = 1080;
  } else {
    switch (aspectRatio) {
      case '1:1':
        width = 1080;
        height = 1080;
        break;
      case '4:5':
        width = 1080;
        height = 1350;
        break;
      case '9:16':
        width = 1080;
        height = 1920;
        break;
      case '16:9':
        width = 1920;
        height = 1080;
        break;
    }
  }

  const handleDownload = async () => {
    setIsExporting(true);
    setExportSuccess(false);

    try {
      const canvas = await renderPostToCanvas({
        width,
        height,
        product,
        filter,
        border,
        badges,
        format,
        diptych: isDiptych,
      });

      const cleanName = product.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const filename = isDiptych
        ? `diptyque-avant-apres-${cleanName}-2026`
        : `post-festif-${cleanName}-${aspectRatio.replace(':', 'x')}`;

      downloadCanvas(canvas, filename, format);
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-5 sm:p-6 space-y-5 text-slate-100 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <h3 className="font-serif text-lg font-bold text-slate-100">
              Exportation Haute Résolution
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Génération directe du post étalonné avec bordures festives et stickers d'engagement.
          </p>
        </div>

        {/* Export Mode Toggle: Solo vs Diptych */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setIsDiptych(false)}
            className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 cursor-pointer transition-all ${
              !isDiptych
                ? 'bg-blue-950/60 border-yellow-400 text-white ring-1 ring-yellow-400/30 shadow-sm'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">Post Solo Studio</span>
            <span className="text-[10px] text-slate-400">
              Format {aspectRatio} ({width}×{height} px)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsDiptych(true)}
            className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 cursor-pointer transition-all ${
              isDiptych
                ? 'bg-blue-950/60 border-yellow-400 text-white ring-1 ring-yellow-400/30 shadow-sm'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <SplitSquareVertical className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">Diptyque Avant / Après</span>
            <span className="text-[10px] text-slate-400">
              Storytelling 1920×1080 px
            </span>
          </button>
        </div>

        {/* Format Selection */}
        <div className="space-y-2 text-xs">
          <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
            Format de fichier
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFormat('png')}
              className={`px-3 py-2 rounded-lg border text-left cursor-pointer transition-all ${
                format === 'png'
                  ? 'bg-blue-950/60 border-yellow-400 text-slate-100 ring-1 ring-yellow-400/30'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <p className="font-semibold">PNG HD (Recommandé)</p>
              <p className="text-[10px] text-slate-400">
                Pleine fidélité sans compression pour Instagram
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormat('jpeg')}
              className={`px-3 py-2 rounded-lg border text-left cursor-pointer transition-all ${
                format === 'jpeg'
                  ? 'bg-blue-950/60 border-yellow-400 text-slate-100 ring-1 ring-yellow-400/30'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <p className="font-semibold">JPEG Qualité 95%</p>
              <p className="text-[10px] text-slate-400">
                Fichier plus léger pour bannières web
              </p>
            </button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>Produit sélectionné :</span>
            <span className="font-medium text-yellow-300">{product.name}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Étalonnage :</span>
            <span className="font-medium text-slate-200">{filter.tonePresetId}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Bordure festive :</span>
            <span className="font-medium text-slate-200">{border.styleId}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Résolution de rendu :</span>
            <span className="font-mono text-slate-400">{width} × {height} pixels</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                <span>Rendu haute résolution en cours...</span>
              </>
            ) : exportSuccess ? (
              <>
                <Check className="w-4 h-4 text-slate-950 font-bold" />
                <span>Téléchargement Réussi !</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-slate-950" />
                <span>Télécharger le Fichier ({format.toUpperCase()})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
