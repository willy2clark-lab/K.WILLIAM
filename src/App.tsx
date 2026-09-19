/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Camera, Sliders, Frame, Sparkles, Wand2, ShieldCheck, HeartHandshake, Table, Check } from 'lucide-react';
import { RawProduct, FilterSettings, BorderSettings, StickerBadge, ViewMode, AspectRatio, FilterPreset, FestiveCopy } from './types';
import { SAMPLE_PRODUCTS } from './data/sampleProducts';
import { FILTER_PRESETS, DEFAULT_FILTER_SETTINGS } from './data/filterPresets';
import { BORDER_OPTIONS, DEFAULT_BORDER_SETTINGS } from './data/borderStyles';
import { Header } from './components/Header';
import { ProductSelector } from './components/ProductSelector';
import { FilterControls } from './components/FilterControls';
import { BorderControls } from './components/BorderControls';
import { EngagementAssistant } from './components/EngagementAssistant';
import { PreviewStage } from './components/PreviewStage';
import { ExportModal } from './components/ExportModal';
import { copySpreadsheetDataToClipboard } from './utils/spreadsheetExport';

const INITIAL_BADGES: StickerBadge[] = [
  {
    id: 'badge-gift',
    text: 'Idée Cadeau Fêtes 🎁',
    iconType: 'gift',
    color: '#1D4ED8', // Bleu Cobalt Studio
    textColor: '#FFFFFF',
    x: 78,
    y: 16,
    active: true,
  },
  {
    id: 'badge-limited',
    text: 'Édition Limitée 2026 🎄',
    iconType: 'star',
    color: '#EAB308', // Jaune Solaire / Or
    textColor: '#0F172A',
    x: 28,
    y: 16,
    active: false,
  },
  {
    id: 'badge-poll',
    text: 'Sondage : 1️⃣ ou 2️⃣ ?',
    iconType: 'poll',
    color: '#2563EB', // Bleu Royal
    textColor: '#FFFFFF',
    x: 50,
    y: 84,
    active: false,
  },
  {
    id: 'badge-handmade',
    text: 'Fait Main à l’Atelier 🌿',
    iconType: 'leaf',
    color: '#FACC15', // Jaune Vif
    textColor: '#0F172A',
    x: 28,
    y: 84,
    active: false,
  },
  {
    id: 'badge-delivery',
    text: 'Livraison Avant Noël 📦',
    iconType: 'delivery',
    color: '#1E3A8A', // Bleu Nuit Céleste
    textColor: '#FFFFFF',
    x: 74,
    y: 84,
    active: false,
  },
];

type ControlTab = 'products' | 'filters' | 'borders' | 'engagement';

export default function App() {
  const [products, setProducts] = useState<RawProduct[]>(SAMPLE_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<RawProduct>(SAMPLE_PRODUCTS[0]);
  const [filter, setFilter] = useState<FilterSettings>(DEFAULT_FILTER_SETTINGS);
  const [border, setBorder] = useState<BorderSettings>(DEFAULT_BORDER_SETTINGS);
  const [badges, setBadges] = useState<StickerBadge[]>(INITIAL_BADGES);

  const [viewMode, setViewMode] = useState<ViewMode>('final');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [activeTab, setActiveTab] = useState<ControlTab>('products');

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportDiptychOnly, setExportDiptychOnly] = useState(false);

  // Captions State (shared between Engagement tab and Spreadsheet export)
  const [captions, setCaptions] = useState<FestiveCopy[]>([
    {
      hook: `✨ Du brut de l'atelier au visuel de fête : zoom sur ${selectedProduct.name}.`,
      body: `Pour ces fêtes 2026, nous avons choisi de préserver chaque nuance et texture de notre création brute, sublimée par un étalonnage studio feutré et notre bordure artisanale. Une pièce pensée pour durer et émouvoir sous le sapin.`,
      question: `🎄 Dites-nous : vous êtes plutôt préparation des cadeaux dès novembre ou team dernière minute ?`,
      hashtags: `#${selectedProduct.name.replace(/\s+/g, '')} #ArtisanatFestif #CadeauDeNoel #Tendances2026 #StudioFestif #FaitMain`,
    },
  ]);

  // Spreadsheet Copy State
  const [isCopiedSpreadsheet, setIsCopiedSpreadsheet] = useState(false);
  const [showSpreadsheetToast, setShowSpreadsheetToast] = useState(false);

  // Function to copy all studio content formatted for spreadsheets
  const handleCopySpreadsheet = async () => {
    const success = await copySpreadsheetDataToClipboard({
      product: selectedProduct,
      filter,
      border,
      badges,
      captions,
      allProducts: products,
      aspectRatio,
      viewMode,
    });

    if (success) {
      setIsCopiedSpreadsheet(true);
      setShowSpreadsheetToast(true);
      setTimeout(() => setIsCopiedSpreadsheet(false), 3500);
      setTimeout(() => setShowSpreadsheetToast(false), 4500);
    }
  };

  // Preset Selection
  const handleSelectPreset = (preset: FilterPreset) => {
    setFilter((prev) => ({
      ...prev,
      ...preset.settings,
      tonePresetId: preset.id,
    }));
  };

  // Badge Toggle
  const handleToggleBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => (b.id === badgeId ? { ...b, active: !b.active } : b))
    );
  };

  // Add Custom Product from User Upload
  const handleAddCustomProduct = (newProd: RawProduct) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  // Reset to default
  const handleReset = () => {
    setFilter(DEFAULT_FILTER_SETTINGS);
    setBorder(DEFAULT_BORDER_SETTINGS);
    setBadges(INITIAL_BADGES);
    setViewMode('final');
    setAspectRatio('1:1');
  };

  const handleOpenDiptychExport = () => {
    setExportDiptychOnly(true);
    setIsExportOpen(true);
  };

  const handleOpenStandardExport = () => {
    setExportDiptychOnly(false);
    setIsExportOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-slate-950">
      {/* Top Navigation & Action Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenExport={handleOpenStandardExport}
        onReset={handleReset}
        onExportDiptych={handleOpenDiptychExport}
        onCopySpreadsheet={handleCopySpreadsheet}
        isCopiedSpreadsheet={isCopiedSpreadsheet}
      />

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 lg:p-6">
        {/* LEFT COLUMN: Controls & Settings (5 cols on lg) */}
        <section className="lg:col-span-5 flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-800 bg-slate-900/90 p-1.5 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline">Photos</span> Brutes
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('filters')}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'filters'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-yellow-300" />
              <span>Filtres Studio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('borders')}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'borders'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Frame className="w-3.5 h-3.5 text-yellow-300" />
              <span>Bordures</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('engagement')}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'engagement'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 text-yellow-300" />
              <span>Engagement</span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto max-h-[calc(100vh-14rem)] space-y-4">
            {activeTab === 'products' && (
              <ProductSelector
                products={products}
                selectedProduct={selectedProduct}
                onSelectProduct={setSelectedProduct}
                onAddCustomProduct={handleAddCustomProduct}
              />
            )}

            {activeTab === 'filters' && (
              <FilterControls
                presets={FILTER_PRESETS}
                settings={filter}
                onChangeSettings={setFilter}
                onSelectPreset={handleSelectPreset}
              />
            )}

            {activeTab === 'borders' && (
              <BorderControls
                options={BORDER_OPTIONS}
                settings={border}
                onChangeSettings={setBorder}
              />
            )}

            {activeTab === 'engagement' && (
              <EngagementAssistant
                product={selectedProduct}
                filter={filter}
                border={border}
                badges={badges}
                onToggleBadge={handleToggleBadge}
                onSetBadges={setBadges}
                captions={captions}
                setCaptions={setCaptions}
                onCopySpreadsheet={handleCopySpreadsheet}
                isCopiedSpreadsheet={isCopiedSpreadsheet}
              />
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: Interactive Studio Canvas & Visual Preview (7 cols on lg) */}
        <section className="lg:col-span-7 flex flex-col bg-slate-900/40 border border-slate-800 rounded-2xl p-4 lg:p-6 shadow-xl relative overflow-hidden">
          <PreviewStage
            product={selectedProduct}
            filter={filter}
            border={border}
            badges={badges}
            viewMode={viewMode}
            aspectRatio={aspectRatio}
            onChangeAspectRatio={setAspectRatio}
            onOpenExport={handleOpenStandardExport}
          />

          {/* 2026 Strategic Takeaways Footer Banner */}
          <div className="mt-auto pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-400 text-xs">
            <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <p className="font-semibold text-slate-200 text-[11px]">Vraie Matière</p>
                <p className="text-[10px] text-slate-400">Contraste avec l'IA</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
              <div>
                <p className="font-semibold text-slate-200 text-[11px]">Harmonie Azur &amp; Or</p>
                <p className="text-[10px] text-slate-400">Bloom &amp; Film Grain</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <HeartHandshake className="w-4 h-4 text-yellow-300 shrink-0" />
              <div>
                <p className="font-semibold text-slate-200 text-[11px]">Partages &amp; DMs</p>
                <p className="text-[10px] text-slate-400">Bento &amp; Storytelling</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Export Dialog */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        product={selectedProduct}
        filter={filter}
        border={border}
        badges={badges}
        aspectRatio={aspectRatio}
        diptychOnly={exportDiptychOnly}
        onCopySpreadsheet={handleCopySpreadsheet}
        isCopiedSpreadsheet={isCopiedSpreadsheet}
      />

      {/* Floating Spreadsheet Copy Confirmation Toast */}
      {showSpreadsheetToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-md bg-red-600 text-white border-2 border-white/20 p-4 rounded-2xl shadow-2xl shadow-red-950/60 flex items-start gap-3.5 transition-all transform animate-bounce"
        >
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-5 h-5 text-white stroke-[3]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm tracking-wide">Copié au format tableur !</h4>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/20 text-red-100">
                TSV / Excel
              </span>
            </div>
            <p className="text-xs text-red-100 mt-1 leading-snug">
              Toutes les données (produit, textures, étalonnage, bordures, badges et légendes) sont dans votre presse-papier.
            </p>
            <p className="text-[11px] font-semibold text-white mt-1.5 bg-red-700/60 px-2 py-1 rounded-md">
              💡 Ouvrez <strong>Google Sheets</strong> ou <strong>Excel</strong> et faites <strong>Ctrl+V</strong> (ou Cmd+V) : les colonnes et cellules se remplissent automatiquement !
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
