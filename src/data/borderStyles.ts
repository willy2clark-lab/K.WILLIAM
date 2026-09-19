import { BorderOption, BorderSettings } from '../types';

export const DEFAULT_BORDER_SETTINGS: BorderSettings = {
  styleId: 'folk-moderne',
  color: '#1E3A8A', // Bleu Nuit Céleste
  padding: 32,
  borderWidth: 3,
  cornerRadius: 16,
  opacity: 0.95,
  accentGold: true,
  customText: 'Édition Fêtes 2026',
  subText: 'Fait avec soin à l’atelier',
  showEmboss: true,
};

export const BORDER_OPTIONS: BorderOption[] = [
  {
    id: 'folk-moderne',
    name: 'Folk Moderne',
    category: 'folk',
    tagline: 'Broderie artisanale & motifs botaniques faits main',
    trendReason: 'Tendance artisanale 2026 pour reconnecter avec le fait-main et l’authenticité.',
    defaultColor: '#8A2D3B', // Bordeaux broderie
    supportsCustomText: true,
  },
  {
    id: 'art-deco',
    name: 'Art Déco Géométrique',
    category: 'art-deco',
    tagline: 'Filets biseautés or fin & angles géométriques chic',
    trendReason: 'Le code du luxe pour les fêtes 2026 : lignes acérées dorées sur velours sombre.',
    defaultColor: '#D4AF37', // Or champagne
    supportsCustomText: true,
  },
  {
    id: 'bio-design',
    name: 'Bio-Design Givré',
    category: 'bio-design',
    tagline: 'Aiguilles de conifère, baies d’hiver & givre organique',
    trendReason: 'Parfait pour produits écoresponsables et cosmétiques botaniques.',
    defaultColor: '#1B4332', // Vert forêt profond
    supportsCustomText: true,
  },
  {
    id: 'ribbon-seal',
    name: 'Ruban Satin & Sceau',
    category: 'ribbon',
    tagline: 'Ruban festif drapé & sceau de cire frappé',
    trendReason: 'Évoque le paquet cadeau d’exception prêt à déballer sous le sapin.',
    defaultColor: '#9E2A2B', // Rouge carmin festif
    supportsCustomText: true,
  },
  {
    id: 'postal-vintage',
    name: 'Carte Postale d’Hiver',
    category: 'postal',
    tagline: 'Bords perforés, timbre de fête & tampon d’atelier daté',
    trendReason: 'Nostalgie tangible et sentiment d’envoi postal personnalisé.',
    defaultColor: '#4A3E3D', // Sépia / terre d'ombre
    supportsCustomText: true,
  },
  {
    id: 'polaroid-studio',
    name: 'Polaroïd Studio Chic',
    category: 'polaroid',
    tagline: 'Cadre photo instantanée avec marge inférieure pour légende',
    trendReason: 'Format intimiste très plébiscité pour les stories et l’envers du décor.',
    defaultColor: '#FAF7F2', // Blanc cassé lin
    supportsCustomText: true,
  },
  {
    id: 'minimal-stars',
    name: 'Épure & Constellation',
    category: 'minimal-stars',
    tagline: 'Double filet fin & étincelles dorées délicates aux 4 coins',
    trendReason: 'Sobriété moderne pour mettre 100% l’accent sur la beauté brute du produit.',
    defaultColor: '#C5A059', // Or brossé doux
    supportsCustomText: false,
  },
];

export const FESTIVE_PALETTES = [
  { name: 'Bleu Nuit Céleste', hex: '#1E3A8A', textClass: 'text-blue-900' },
  { name: 'Jaune Or Solaire', hex: '#EAB308', textClass: 'text-yellow-500' },
  { name: 'Bleu Royal Studio', hex: '#2563EB', textClass: 'text-blue-600' },
  { name: 'Jaune Champagne Pâle', hex: '#FEF08A', textClass: 'text-yellow-200' },
  { name: 'Bleu Cobalt Minéral', hex: '#1D4ED8', textClass: 'text-blue-700' },
  { name: 'Jaune Ambré Chaud', hex: '#F59E0B', textClass: 'text-amber-500' },
  { name: 'Bleu Givré Polaire', hex: '#38BDF8', textClass: 'text-sky-400' },
  { name: 'Jaune Miel Doré', hex: '#CA8A04', textClass: 'text-yellow-600' },
  { name: 'Bleu Outremer Sombre', hex: '#0F172A', textClass: 'text-slate-900' },
  { name: 'Blanc Ivoire Lunaire', hex: '#F8FAFC', textClass: 'text-slate-100' },
];
