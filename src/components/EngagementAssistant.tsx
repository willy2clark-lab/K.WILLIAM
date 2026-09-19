import React, { useState } from 'react';
import { Share2, Bookmark, MessageSquare, Copy, Check, Wand2, HelpCircle } from 'lucide-react';
import { RawProduct, FilterSettings, BorderSettings, StickerBadge, FestiveCopy } from '../types';

interface Props {
  product: RawProduct;
  filter: FilterSettings;
  border: BorderSettings;
  badges: StickerBadge[];
  onToggleBadge: (badgeId: string) => void;
  onSetBadges: (badges: StickerBadge[]) => void;
}

export const EngagementAssistant: React.FC<Props> = ({
  product,
  filter,
  border,
  badges,
  onToggleBadge,
}) => {
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [captions, setCaptions] = useState<FestiveCopy[]>([
    {
      hook: `✨ Du brut de l'atelier au visuel de fête : zoom sur ${product.name}.`,
      body: `Pour ces fêtes 2026, nous avons choisi de préserver chaque nuance et texture de notre création brute, sublimée par un étalonnage studio feutré et notre bordure artisanale. Une pièce pensée pour durer et émouvoir sous le sapin.`,
      question: `🎄 Dites-nous : vous êtes plutôt préparation des cadeaux dès novembre ou team dernière minute ?`,
      hashtags: `#${product.name.replace(/\s+/g, '')} #ArtisanatFestif #CadeauDeNoel #Tendances2026 #StudioFestif #FaitMain`,
    },
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerateCopy = async () => {
    setLoadingCopy(true);
    try {
      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          productCategory: product.category,
          filterStyle: filter.tonePresetId,
          borderStyle: border.styleId,
          tone: 'chaleureux, authentique et captivant',
          targetPlatform: 'Instagram',
        }),
      });
      const data = await res.json();
      if (data.captions && data.captions.length > 0) {
        setCaptions(data.captions);
      }
    } catch (err) {
      console.error('Failed to generate copy:', err);
    } finally {
      setLoadingCopy(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-5">
      {/* 2026 Engagement Strategy Card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-yellow-300 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-yellow-400" />
            Objectif 2026 : « L’Engagement Invisible »
          </span>
          <span className="text-[10px] font-mono text-blue-300 bg-blue-950/80 border border-blue-800/40 px-2 py-0.5 rounded">
            Sauvegardes &amp; Partages DM
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          En 2026, l’algorithme valorise les publications qui incitent à l'enregistrement pour inspiration cadeau et au partage en message privé.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
            <Share2 className="w-4 h-4 mx-auto mb-1 text-sky-400" />
            <p className="text-[10px] text-slate-400">Partages DM</p>
            <p className="text-xs font-semibold text-slate-200">+38%</p>
          </div>
          <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
            <Bookmark className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
            <p className="text-[10px] text-slate-400">Sauvegardes</p>
            <p className="text-xs font-semibold text-slate-200">X2.4</p>
          </div>
          <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
            <MessageSquare className="w-4 h-4 mx-auto mb-1 text-blue-400" />
            <p className="text-[10px] text-slate-400">Réponses Story</p>
            <p className="text-xs font-semibold text-slate-200">Élevé</p>
          </div>
        </div>
      </div>

      {/* Interactive Badges & Stickers */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Stickers &amp; Badges d'Engagement
          </label>
          <span className="text-[10px] text-slate-400">
            À incruster sur le visuel
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {badges.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => onToggleBadge(b.id)}
              className={`px-3 py-2 rounded-xl text-left border text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                b.active
                  ? 'bg-blue-950/60 border-yellow-400 text-slate-100 ring-1 ring-yellow-400/40 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: b.color }}
                />
                <span className="truncate">{b.text}</span>
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-mono shrink-0 ml-1 ${
                  b.active
                    ? 'bg-yellow-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {b.active ? 'Actif' : 'Off'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Copywriting & Caption Copilot */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div>
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5 text-yellow-400" />
              Légendes &amp; Questions d'Engagement
            </span>
            <p className="text-[10px] text-slate-400">
              Génération d’accroches et de questions pour vos stories &amp; posts
            </p>
          </div>
          <button
            type="button"
            onClick={handleGenerateCopy}
            disabled={loadingCopy}
            className="px-3 py-1.5 rounded-lg bg-blue-950/70 hover:bg-blue-900/60 border border-yellow-400/30 text-yellow-300 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <Wand2 className={`w-3.5 h-3.5 text-yellow-400 ${loadingCopy ? 'animate-spin' : ''}`} />
            {loadingCopy ? 'Rédaction...' : 'Regénérer'}
          </button>
        </div>

        <div className="space-y-3">
          {captions.map((cap, idx) => {
            const fullPostText = `${cap.hook}\n\n${cap.body}\n\n${cap.question}\n\n${cap.hashtags}`;
            const isCopied = copiedIndex === idx;

            return (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 space-y-2 text-xs relative group"
              >
                {/* Hook */}
                <p className="font-semibold text-slate-100 text-[13px] leading-snug">
                  {cap.hook}
                </p>

                {/* Body */}
                <p className="text-slate-300 leading-relaxed">
                  {cap.body}
                </p>

                {/* Question d'engagement */}
                <div className="bg-blue-950/30 border border-blue-800/40 rounded-lg p-2.5 text-blue-200 text-[11px] flex items-start gap-2">
                  <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-yellow-400" />
                  <span>{cap.question}</span>
                </div>

                {/* Hashtags */}
                <p className="text-[11px] text-slate-500 font-mono">
                  {cap.hashtags}
                </p>

                {/* Copy Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(fullPostText, idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white transition-all text-xs font-medium cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="text-yellow-300">Copié dans le presse-papier !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Copier la légende complète</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
