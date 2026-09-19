import React, { useRef } from 'react';
import { Upload, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { RawProduct } from '../types';

interface Props {
  products: RawProduct[];
  selectedProduct: RawProduct;
  onSelectProduct: (p: RawProduct) => void;
  onAddCustomProduct: (p: RawProduct) => void;
}

export const ProductSelector: React.FC<Props> = ({
  products,
  selectedProduct,
  onSelectProduct,
  onAddCustomProduct,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const customProduct: RawProduct = {
        id: `custom-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ''),
        category: 'Produit Importé',
        description: 'Photo brute importée depuis votre atelier.',
        imageUrl: dataUrl,
        lightingNotes: 'Prise de vue utilisateur · Couleurs & textures brutes préservées',
        colorHex: '#C5A059',
        textureDetail: 'Texture originale',
        tag: 'Photo Personnelle',
      };
      onAddCustomProduct(customProduct);
      onSelectProduct(customProduct);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {/* 2026 Authenticity Notice */}
      <div className="bg-blue-950/30 border border-blue-800/40 rounded-xl p-3.5 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-yellow-300">
            L’Authenticité Maîtrisée (Tendance 2026)
          </p>
          <p className="text-slate-300 leading-relaxed">
            Partir de vraies photos brutes avec leurs textures naturelles (fibres, reflets réels, légers plis) crée une confiance immédiate chez l’acheteur face aux visuels 100% IA.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Photos Brutes de Démo ou Personnelles
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {products.map((p) => {
            const isSelected = p.id === selectedProduct.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProduct(p)}
                className={`group relative rounded-xl p-2.5 text-left border transition-all cursor-pointer flex flex-col items-center text-center ${
                  isSelected
                    ? 'bg-slate-800/90 border-yellow-400 shadow-md ring-1 ring-yellow-400/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-blue-700/50 hover:bg-slate-800/40'
                }`}
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-slate-950/80 mb-2 relative flex items-center justify-center">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 bg-yellow-400 text-slate-950 rounded-full p-0.5 shadow">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <span className="absolute bottom-1 left-1 text-[9px] px-1.5 py-0.5 rounded bg-blue-950/80 backdrop-blur-xs text-yellow-200 font-mono border border-blue-800/40">
                    RAW
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-200 line-clamp-1 w-full">
                  {p.name}
                </p>
                <p className="text-[10px] text-slate-400 line-clamp-1 w-full">
                  {p.tag}
                </p>
              </button>
            );
          })}

          {/* Upload Button Card */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl p-2.5 border-2 border-dashed border-slate-700 hover:border-yellow-400/70 hover:bg-blue-950/30 transition-all cursor-pointer flex flex-col items-center justify-center text-center group min-h-[140px]"
          >
            <div className="w-9 h-9 rounded-full bg-slate-800 group-hover:bg-yellow-400/20 text-slate-400 group-hover:text-yellow-400 flex items-center justify-center mb-2 transition-colors">
              <Upload className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-300 group-hover:text-yellow-300">
              Importer ma photo
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">
              JPG, PNG, WebP
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </button>
        </div>
      </div>

      {/* Selected Product Card Info */}
      <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-yellow-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Prise de vue active : {selectedProduct.name}
          </span>
          <span className="text-[10px] font-mono text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
            {selectedProduct.category}
          </span>
        </div>
        <p className="text-xs text-slate-300">
          {selectedProduct.description}
        </p>
        <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-slate-400 border-t border-slate-800/80">
          <span>🔍 <strong className="text-slate-200">Matière :</strong> {selectedProduct.textureDetail}</span>
          <span>💡 <strong className="text-slate-200">Éclairage :</strong> {selectedProduct.lightingNotes}</span>
        </div>
      </div>
    </div>
  );
};
