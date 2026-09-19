import { RawProduct, FilterSettings, BorderSettings, StickerBadge, FestiveCopy, AspectRatio, ViewMode } from '../types';

export interface SpreadsheetExportData {
  product: RawProduct;
  filter: FilterSettings;
  border: BorderSettings;
  badges: StickerBadge[];
  captions: FestiveCopy[];
  allProducts: RawProduct[];
  aspectRatio: AspectRatio;
  viewMode: ViewMode;
}

/**
 * Escapes a cell value for TSV (Tab-Separated Values).
 * Surrounds with quotes if it contains tabs, quotes, or newlines.
 */
function escapeTSV(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes('\t') || str.includes('\n') || str.includes('\r') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Generates structured TSV text ready to paste directly into Google Sheets, Excel, or Calc.
 */
export function generateSpreadsheetTSV(data: SpreadsheetExportData): string {
  const { product, filter, border, badges, captions, allProducts, aspectRatio, viewMode } = data;
  const lines: string[] = [];

  const addRow = (...cells: (string | number | boolean)[]) => {
    lines.push(cells.map(escapeTSV).join('\t'));
  };

  const addEmptyLine = () => lines.push('');

  // 1. HEADER & META
  addRow('STUDIO PHOTO FESTIF 2026', 'SYNTHÈSE COMPLÈTE DU CONTENU & CONFIGURATION');
  addRow('Date d\'exportation', new Date().toLocaleString('fr-FR'));
  addRow('Produit actif', product.name);
  addRow('Format d\'export', aspectRatio);
  addRow('Mode de prévisualisation', viewMode);
  addEmptyLine();

  // 2. CONFIGURATION ACTIVE DU POST (PARAMÈTRES DU VISUEL)
  addRow('SECTION', 'PARAMÈTRE', 'VALEUR', 'UNITÉ / TYPE', 'NOTES STRATÉGIQUES 2026');
  addRow('Produit', 'Nom', product.name, 'Texte', 'Mise en avant de la texture brute');
  addRow('Produit', 'Catégorie', product.category, 'Texte', 'Artisanat & Fêtes');
  addRow('Produit', 'Tag', product.tag, 'Texte', 'Orientation cadeau');
  addRow('Produit', 'Matière / Texture', product.textureDetail, 'Description', 'Authenticité de l\'atelier');
  addRow('Produit', 'Éclairage d\'atelier', product.lightingNotes, 'Description', 'Reflets chauds & lumière feutrée');
  addRow('Produit', 'Code Couleur Hex', product.colorHex, 'Hex', 'Teinte signature');
  addRow('Produit', 'Description', product.description, 'Texte', 'Storytelling produit');
  addEmptyLine();

  addRow('Étalonnage', 'Preset de Teinte', filter.tonePresetId, 'Identifiant', 'Harmonie colorimétrique studio');
  addRow('Étalonnage', 'Effet Bloom (Lumière diffuse)', filter.bloom, '%', 'Aura chaleureuse des fêtes');
  addRow('Étalonnage', 'Micro-Grain Argentique 35mm', filter.grain, '%', 'Texture tactile anti-synthétique');
  addRow('Étalonnage', 'Température Kelvin (Chaleur)', filter.warmth, 'Indice (-50 à +50)', 'Feu de bois et bougies');
  addRow('Étalonnage', 'Contraste', filter.contrast, 'Ratio', 'Relief des matières');
  addRow('Étalonnage', 'Exposition / Luminosité', filter.brightness, 'Indice (-50 à +50)', 'Clair-obscur feutré');
  addRow('Étalonnage', 'Vignettage Studio', filter.vignette, '%', 'Recentrage du regard sur la création');
  addRow('Étalonnage', 'Saturation', filter.saturation, 'Ratio', 'Teintes naturelles');
  addRow('Étalonnage', 'Nuance (Tint)', filter.tint, 'Indice (-30 à +30)', 'Équilibre des tons');
  addEmptyLine();

  addRow('Bordure Festive', 'Style de bordure', border.styleId, 'Identifiant', 'Encadrement narratif');
  addRow('Bordure Festive', 'Couleur du cadre', border.color, 'Code Hex', 'Nuance azur, nuit ou or');
  addRow('Bordure Festive', 'Marge intérieure (Padding)', border.padding, 'Pixels (px)', 'Respiration visuelle');
  addRow('Bordure Festive', 'Épaisseur du filet', border.borderWidth, 'Pixels (px)', 'Finesse artisanale');
  addRow('Bordure Festive', 'Rayon des coins (Radius)', border.cornerRadius, 'Pixels (px)', 'Douceur géométrique');
  addRow('Bordure Festive', 'Opacité du cadre', `${Math.round(border.opacity * 100)}%`, '%', 'Superposition subtile');
  addRow('Bordure Festive', 'Rehauts Or Champagne', border.accentGold ? 'Activé' : 'Désactivé', 'Booléen', 'Reflets dorés festifs');
  addRow('Bordure Festive', 'Texte principal du cadre', border.customText, 'Texte', 'Mention de prestige');
  addRow('Bordure Festive', 'Sous-titre / Mention atelier', border.subText, 'Texte', 'Authenticité fait main');
  addEmptyLine();

  // 3. BADGES & STICKERS D'ENGAGEMENT
  addRow('BADGE ID', 'LIBELLÉ / TEXTE', 'STATUT', 'TYPE D\'ICÔNE', 'POS X (%)', 'POS Y (%)', 'COULEUR FOND', 'COULEUR TEXTE');
  badges.forEach((b) => {
    addRow(
      b.id,
      b.text,
      b.active ? 'ACTIF (Visible sur le visuel)' : 'Inactif',
      b.iconType,
      b.x,
      b.y,
      b.color,
      b.textColor
    );
  });
  addEmptyLine();

  // 4. LÉGENDES & TEXTES RÉSEAUX SOCIAUX
  addRow('N° LÉGENDE', 'ACCROCHE (HOOK)', 'CORPS DU POST (BODY)', 'QUESTION D\'ENGAGEMENT', 'HASHTAGS RECOMMANDÉS', 'STRATÉGIE CONSEILLÉE');
  captions.forEach((c, idx) => {
    addRow(
      `Option ${idx + 1}`,
      c.hook,
      c.body,
      c.question,
      c.hashtags,
      'Maximise les partages DM et les sauvegardes pour inspiration'
    );
  });
  addEmptyLine();

  // 5. CATALOGUE COMPLET DES PRODUITS
  addRow('ID PRODUIT', 'NOM DE LA CRÉATION', 'CATÉGORIE', 'TAG', 'MATIÈRE & FIBRES', 'ÉCLAIRAGE STUDIO', 'DESCRIPTION COMPLÈTE', 'COULEUR HEX');
  allProducts.forEach((p) => {
    addRow(
      p.id,
      p.name,
      p.category,
      p.tag,
      p.textureDetail,
      p.lightingNotes,
      p.description,
      p.colorHex
    );
  });
  addEmptyLine();

  // 6. OBJECTIFS D'ENGAGEMENT 2026 (KPI)
  addRow('LEVIER D\'ENGAGEMENT', 'INDICATEUR CIBLE', 'CROISSANCE ESTIMÉE', 'IMPACT SUR L\'ALGORITHME 2026', 'CONSEIL ACTIONNABLE');
  addRow('Partages en Messages Privés (DM)', 'Taux de transfert en conversation', '+38%', 'Considéré comme le signal d\'intérêt le plus fort', 'Poser une question ouverte incitant à envoyer le post à un proche');
  addRow('Sauvegardes (Bookmarks)', 'Enregistrements collections cadeaux', 'Multiplié par 2.4', 'Boost de distribution dans le fil d\'actualité et explorer', 'Proposer le visuel comme "Aide-mémoire cadeau de Noël"');
  addRow('Réponses aux Stories', 'Interactions directes stickers & sondages', 'Élevé', 'Favorise la visibilité immédiate en tête de carrousel', 'Intégrer le badge sondage "1️⃣ ou 2️⃣ ?" sur le visuel');

  return lines.join('\n');
}

/**
 * Generates an HTML table representation of the data.
 * When pasted into Excel or Google Sheets, the HTML format provides formatted cells with colored headers and clean borders!
 */
export function generateSpreadsheetHTML(data: SpreadsheetExportData): string {
  const { product, filter, border, badges, captions, allProducts, aspectRatio, viewMode } = data;

  const tableHeaderStyle = 'background-color: #1e3a8a; color: #ffffff; font-weight: bold; padding: 8px 12px; border: 1px solid #cbd5e1; text-align: left;';
  const subHeaderStyle = 'background-color: #f1f5f9; color: #0f172a; font-weight: bold; padding: 6px 10px; border: 1px solid #cbd5e1; text-align: left;';
  const cellStyle = 'padding: 6px 10px; border: 1px solid #cbd5e1; vertical-align: top;';
  const titleStyle = 'background-color: #dc2626; color: #ffffff; font-size: 16px; font-weight: bold; padding: 12px; border: 1px solid #cbd5e1;';

  let html = `<table style="border-collapse: collapse; font-family: system-ui, -apple-system, sans-serif; font-size: 13px; width: 100%;">`;

  // Title Banner
  html += `
    <tr>
      <td colspan="5" style="${titleStyle}">
        STUDIO PHOTO FESTIF 2026 — EXPORT GLOBAL POUR TABLEUR (EXCEL / SHEETS)
      </td>
    </tr>
    <tr>
      <td style="${cellStyle}"><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</td>
      <td style="${cellStyle}"><strong>Produit Actif :</strong> ${product.name}</td>
      <td style="${cellStyle}"><strong>Format :</strong> ${aspectRatio}</td>
      <td style="${cellStyle}" colspan="2"><strong>Mode :</strong> ${viewMode}</td>
    </tr>
    <tr><td colspan="5" style="height: 12px; border: none;"></td></tr>
  `;

  // Section 1: Configuration du post
  html += `
    <thead>
      <tr>
        <th style="${tableHeaderStyle}">Section</th>
        <th style="${tableHeaderStyle}">Paramètre</th>
        <th style="${tableHeaderStyle}">Valeur Active</th>
        <th style="${tableHeaderStyle}">Unité / Format</th>
        <th style="${tableHeaderStyle}">Notes Stratégiques 2026</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="${cellStyle}">Produit</td><td style="${cellStyle}">Nom</td><td style="${cellStyle}"><strong>${product.name}</strong></td><td style="${cellStyle}">Texte</td><td style="${cellStyle}">Mise en valeur de la matière brute</td></tr>
      <tr><td style="${cellStyle}">Produit</td><td style="${cellStyle}">Catégorie</td><td style="${cellStyle}">${product.category}</td><td style="${cellStyle}">Texte</td><td style="${cellStyle}">Artisanat & Fêtes</td></tr>
      <tr><td style="${cellStyle}">Produit</td><td style="${cellStyle}">Tag</td><td style="${cellStyle}">${product.tag}</td><td style="${cellStyle}">Texte</td><td style="${cellStyle}">Angle cadeau</td></tr>
      <tr><td style="${cellStyle}">Produit</td><td style="${cellStyle}">Matière / Texture</td><td style="${cellStyle}">${product.textureDetail}</td><td style="${cellStyle}">Description</td><td style="${cellStyle}">Authenticité de l'atelier</td></tr>
      <tr><td style="${cellStyle}">Produit</td><td style="${cellStyle}">Éclairage studio brut</td><td style="${cellStyle}">${product.lightingNotes}</td><td style="${cellStyle}">Description</td><td style="${cellStyle}">Reflets chauds & lumière feutrée</td></tr>
      <tr><td style="${cellStyle}">Produit</td><td style="${cellStyle}">Code Couleur</td><td style="${cellStyle}">${product.colorHex}</td><td style="${cellStyle}">Hex</td><td style="${cellStyle}">Teinte signature</td></tr>
      <tr><td style="${cellStyle}">Produit</td><td style="${cellStyle}">Description</td><td style="${cellStyle}">${product.description}</td><td style="${cellStyle}">Texte</td><td style="${cellStyle}">Storytelling produit</td></tr>

      <tr><td style="${cellStyle}">Étalonnage</td><td style="${cellStyle}">Preset</td><td style="${cellStyle}"><strong>${filter.tonePresetId}</strong></td><td style="${cellStyle}">Preset</td><td style="${cellStyle}">Harmonie colorimétrique studio</td></tr>
      <tr><td style="${cellStyle}">Étalonnage</td><td style="${cellStyle}">Effet Bloom</td><td style="${cellStyle}">${filter.bloom}%</td><td style="${cellStyle}">Pourcentage</td><td style="${cellStyle}">Aura lumineuse des fêtes</td></tr>
      <tr><td style="${cellStyle}">Étalonnage</td><td style="${cellStyle}">Micro-Grain Argentique 35mm</td><td style="${cellStyle}">${filter.grain}%</td><td style="${cellStyle}">Pourcentage</td><td style="${cellStyle}">Texture tactile anti-synthétique</td></tr>
      <tr><td style="${cellStyle}">Étalonnage</td><td style="${cellStyle}">Température Kelvin</td><td style="${cellStyle}">${filter.warmth}</td><td style="${cellStyle}">Indice</td><td style="${cellStyle}">Chaleur bois et bougies</td></tr>
      <tr><td style="${cellStyle}">Étalonnage</td><td style="${cellStyle}">Contraste</td><td style="${cellStyle}">${filter.contrast}</td><td style="${cellStyle}">Ratio</td><td style="${cellStyle}">Relief des matières</td></tr>
      <tr><td style="${cellStyle}">Étalonnage</td><td style="${cellStyle}">Luminosité</td><td style="${cellStyle}">${filter.brightness}</td><td style="${cellStyle}">Indice</td><td style="${cellStyle}">Clair-obscur feutré</td></tr>
      <tr><td style="${cellStyle}">Étalonnage</td><td style="${cellStyle}">Vignettage Studio</td><td style="${cellStyle}">${filter.vignette}%</td><td style="${cellStyle}">Pourcentage</td><td style="${cellStyle}">Recentrage du regard</td></tr>

      <tr><td style="${cellStyle}">Bordure</td><td style="${cellStyle}">Style</td><td style="${cellStyle}"><strong>${border.styleId}</strong></td><td style="${cellStyle}">ID</td><td style="${cellStyle}">Encadrement narratif</td></tr>
      <tr><td style="${cellStyle}">Bordure</td><td style="${cellStyle}">Couleur</td><td style="${cellStyle}">${border.color}</td><td style="${cellStyle}">Hex</td><td style="${cellStyle}">Teinte du cadre</td></tr>
      <tr><td style="${cellStyle}">Bordure</td><td style="${cellStyle}">Marge (Padding)</td><td style="${cellStyle}">${border.padding} px</td><td style="${cellStyle}">Pixels</td><td style="${cellStyle}">Respiration visuelle</td></tr>
      <tr><td style="${cellStyle}">Bordure</td><td style="${cellStyle}">Épaisseur</td><td style="${cellStyle}">${border.borderWidth} px</td><td style="${cellStyle}">Pixels</td><td style="${cellStyle}">Finesse artisanale</td></tr>
      <tr><td style="${cellStyle}">Bordure</td><td style="${cellStyle}">Coins Arrondis</td><td style="${cellStyle}">${border.cornerRadius} px</td><td style="${cellStyle}">Pixels</td><td style="${cellStyle}">Douceur géométrique</td></tr>
      <tr><td style="${cellStyle}">Bordure</td><td style="${cellStyle}">Rehauts Or Champagne</td><td style="${cellStyle}">${border.accentGold ? 'Oui' : 'Non'}</td><td style="${cellStyle}">Booléen</td><td style="${cellStyle}">Reflets dorés festifs</td></tr>
      <tr><td style="${cellStyle}">Bordure</td><td style="${cellStyle}">Texte Principal</td><td style="${cellStyle}">${border.customText}</td><td style="${cellStyle}">Texte</td><td style="${cellStyle}">Mention de prestige</td></tr>
      <tr><td style="${cellStyle}">Bordure</td><td style="${cellStyle}">Sous-titre</td><td style="${cellStyle}">${border.subText}</td><td style="${cellStyle}">Texte</td><td style="${cellStyle}">Mention d'atelier</td></tr>
    </tbody>
  `;

  // Section 2: Stickers & Badges
  html += `
    <thead>
      <tr><th colspan="5" style="${subHeaderStyle}">STICKERS &amp; BADGES D'ENGAGEMENT (INCRUSTATION VISUEL)</th></tr>
      <tr>
        <th style="${tableHeaderStyle}">ID Badge</th>
        <th style="${tableHeaderStyle}">Texte / Libellé</th>
        <th style="${tableHeaderStyle}">Statut Actif</th>
        <th style="${tableHeaderStyle}">Type d'Icône</th>
        <th style="${tableHeaderStyle}">Position (X, Y) / Couleurs</th>
      </tr>
    </thead>
    <tbody>
  `;
  badges.forEach((b) => {
    html += `
      <tr>
        <td style="${cellStyle}">${b.id}</td>
        <td style="${cellStyle}"><strong>${b.text}</strong></td>
        <td style="${cellStyle}">${b.active ? '✅ OUI' : '❌ Non'}</td>
        <td style="${cellStyle}">${b.iconType}</td>
        <td style="${cellStyle}">X: ${b.x}%, Y: ${b.y}% | Fond: ${b.color}</td>
      </tr>
    `;
  });
  html += `</tbody>`;

  // Section 3: Légendes réseaux sociaux
  html += `
    <thead>
      <tr><th colspan="5" style="${subHeaderStyle}">LÉGENDES &amp; POSTS POUR INSTAGRAM / RÉSEAUX SOCIAUX</th></tr>
      <tr>
        <th style="${tableHeaderStyle}">Option</th>
        <th style="${tableHeaderStyle}">Accroche (Hook)</th>
        <th style="${tableHeaderStyle}">Corps du Message (Body)</th>
        <th style="${tableHeaderStyle}">Question d'Engagement</th>
        <th style="${tableHeaderStyle}">Hashtags</th>
      </tr>
    </thead>
    <tbody>
  `;
  captions.forEach((c, idx) => {
    html += `
      <tr>
        <td style="${cellStyle}">Option ${idx + 1}</td>
        <td style="${cellStyle}"><strong>${c.hook}</strong></td>
        <td style="${cellStyle}">${c.body}</td>
        <td style="${cellStyle}">${c.question}</td>
        <td style="${cellStyle}">${c.hashtags}</td>
      </tr>
    `;
  });
  html += `</tbody>`;

  // Section 4: Catalogue
  html += `
    <thead>
      <tr><th colspan="5" style="${subHeaderStyle}">CATALOGUE COMPLET DES CRÉATIONS DU STUDIO</th></tr>
      <tr>
        <th style="${tableHeaderStyle}">ID</th>
        <th style="${tableHeaderStyle}">Nom de la Création</th>
        <th style="${tableHeaderStyle}">Catégorie &amp; Tag</th>
        <th style="${tableHeaderStyle}">Matière / Texture</th>
        <th style="${tableHeaderStyle}">Éclairage &amp; Description</th>
      </tr>
    </thead>
    <tbody>
  `;
  allProducts.forEach((p) => {
    html += `
      <tr>
        <td style="${cellStyle}">${p.id}</td>
        <td style="${cellStyle}"><strong>${p.name}</strong></td>
        <td style="${cellStyle}">${p.category} (${p.tag})</td>
        <td style="${cellStyle}">${p.textureDetail}</td>
        <td style="${cellStyle}"><em>${p.lightingNotes}</em> — ${p.description}</td>
      </tr>
    `;
  });
  html += `</tbody>`;

  // Section 5: KPI 2026
  html += `
    <thead>
      <tr><th colspan="5" style="${subHeaderStyle}">INDICATEURS CLÉS &amp; STRATÉGIE 2026</th></tr>
      <tr>
        <th style="${tableHeaderStyle}">Levier</th>
        <th style="${tableHeaderStyle}">Indicateur Cible</th>
        <th style="${tableHeaderStyle}">Croissance</th>
        <th style="${tableHeaderStyle}" colspan="2">Recommandation Stratégique</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="${cellStyle}">Partages DM</td>
        <td style="${cellStyle}">Transferts en messages privés</td>
        <td style="${cellStyle}">+38%</td>
        <td style="${cellStyle}" colspan="2">Signal n°1 pour l'algorithme : inciter à partager avec un proche pour avis cadeau.</td>
      </tr>
      <tr>
        <td style="${cellStyle}">Sauvegardes</td>
        <td style="${cellStyle}">Enregistrements favoris</td>
        <td style="${cellStyle}">×2.4</td>
        <td style="${cellStyle}" colspan="2">Positionner l'image comme un repère d'inspiration esthétique et pratique.</td>
      </tr>
      <tr>
        <td style="${cellStyle}">Réponses Stories</td>
        <td style="${cellStyle}">Interactions directes</td>
        <td style="${cellStyle}">Élevé</td>
        <td style="${cellStyle}" colspan="2">Utiliser des stickers de sondage et questions de choix "1️⃣ ou 2️⃣".</td>
      </tr>
    </tbody>
  `;

  html += `</table>`;
  return html;
}

/**
 * Copies the spreadsheet formatted content to the clipboard.
 * Uses both text/html and text/plain for optimal compatibility with Google Sheets, Excel, and LibreOffice Calc.
 */
export async function copySpreadsheetDataToClipboard(data: SpreadsheetExportData): Promise<boolean> {
  const tsvText = generateSpreadsheetTSV(data);
  const htmlText = generateSpreadsheetHTML(data);

  // Modern asynchronous clipboard API with dual mime-types
  if (navigator?.clipboard && typeof ClipboardItem !== 'undefined') {
    try {
      const blobText = new Blob([tsvText], { type: 'text/plain' });
      const blobHtml = new Blob([htmlText], { type: 'text/html' });
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': blobText,
          'text/html': blobHtml,
        }),
      ]);
      return true;
    } catch {
      // Fall back to writeText
      try {
        await navigator.clipboard.writeText(tsvText);
        return true;
      } catch (err) {
        console.warn('ClipboardItem write failed, trying fallback textarea:', err);
      }
    }
  } else if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(tsvText);
      return true;
    } catch (err) {
      console.warn('writeText failed, trying fallback textarea:', err);
    }
  }

  // Fallback for restricted iframe or older environments
  try {
    const textArea = document.createElement('textarea');
    textArea.value = tsvText;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('All copy methods failed:', err);
    return false;
  }
}
