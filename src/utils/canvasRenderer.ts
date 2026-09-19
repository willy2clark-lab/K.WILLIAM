import { FilterSettings, BorderSettings, StickerBadge, RawProduct } from '../types';

export interface ExportOptions {
  width: number;
  height: number;
  product: RawProduct;
  filter: FilterSettings;
  border: BorderSettings;
  badges: StickerBadge[];
  format: 'png' | 'jpeg';
  diptych?: boolean;
}

export async function renderPostToCanvas(options: ExportOptions): Promise<HTMLCanvasElement> {
  const { width, height, product, filter, border, badges, diptych } = options;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Cannot get 2D canvas context');

  // Load product image as HTMLImageElement
  const img = await loadImage(product.imageUrl);

  if (diptych) {
    // Diptych Mode: Left half = Raw, Right half = Studio Festive
    const halfWidth = width / 2;

    // 1. Draw Raw Image on Left
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, halfWidth, height);
    ctx.clip();
    drawCoverImage(ctx, img, 0, 0, halfWidth, height);
    // Darken footer slightly for raw label
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(0, height - 80, halfWidth, 80);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('📷 PHOTO BRUTE (RAW)', halfWidth / 2, height - 35);
    ctx.font = '14px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fillText('Texture naturelle & lumière d’atelier', halfWidth / 2, height - 15);
    ctx.restore();

    // Divider line in center
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(halfWidth - 2, 0, 4, height);

    // 2. Draw Studio Festive on Right
    ctx.save();
    ctx.beginPath();
    ctx.rect(halfWidth, 0, halfWidth, height);
    ctx.clip();

    // Draw filtered image on right
    drawFilteredImage(ctx, img, halfWidth, 0, halfWidth, height, filter);

    // Draw border and badges
    drawBorderOnCanvas(ctx, border, halfWidth, 0, halfWidth, height);
    drawBadgesOnCanvas(ctx, badges, halfWidth, 0, halfWidth, height);

    // Label for Festive Studio
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(halfWidth, height - 80, halfWidth, 80);
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ RENDU STUDIO FESTIF 2026', halfWidth + halfWidth / 2, height - 35);
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Filtres Studio & Bordure Fêtes', halfWidth + halfWidth / 2, height - 15);

    ctx.restore();
    return canvas;
  }

  // Standard Post: Single Image
  // 1. Draw base image with filters
  drawFilteredImage(ctx, img, 0, 0, width, height, filter);

  // 2. Draw Festive Border
  drawBorderOnCanvas(ctx, border, 0, 0, width, height);

  // 3. Draw Active Badges
  drawBadgesOnCanvas(ctx, badges, 0, 0, width, height);

  return canvas;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = img.width / img.height;
  const targetRatio = w / h;
  let renderW = w;
  let renderH = h;
  let offsetX = x;
  let offsetY = y;

  if (imgRatio > targetRatio) {
    renderW = h * imgRatio;
    offsetX = x - (renderW - w) / 2;
  } else {
    renderH = w / imgRatio;
    offsetY = y - (renderH - h) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
}

function drawFilteredImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  filter: FilterSettings
) {
  ctx.save();

  // CSS Filter string calculation
  const brightnessVal = 100 + filter.brightness;
  const contrastVal = filter.contrast * 100;
  const saturationVal = filter.saturation * 100;
  const sepiaVal = filter.warmth > 0 ? Math.min(30, filter.warmth * 0.5) : 0;
  const hueRotateVal = filter.tint;

  ctx.filter = `brightness(${brightnessVal}%) contrast(${contrastVal}%) saturate(${saturationVal}%) sepia(${sepiaVal}%) hue-rotate(${hueRotateVal}deg)`;

  drawCoverImage(ctx, img, x, y, w, h);
  ctx.filter = 'none';

  // Warmth / Coolness overlay
  if (filter.warmth !== 0) {
    if (filter.warmth > 0) {
      ctx.fillStyle = `rgba(245, 158, 11, ${Math.min(0.2, (filter.warmth / 100) * 0.25)})`;
    } else {
      ctx.fillStyle = `rgba(13, 92, 99, ${Math.min(0.2, (Math.abs(filter.warmth) / 100) * 0.25)})`;
    }
    ctx.fillRect(x, y, w, h);
  }

  // Soft Bloom (glow of highlights)
  if (filter.bloom > 5) {
    ctx.globalCompositeOperation = 'screen';
    ctx.filter = `blur(${Math.round(filter.bloom * 0.35)}px) brightness(120%)`;
    ctx.globalAlpha = (filter.bloom / 100) * 0.45;
    drawCoverImage(ctx, img, x, y, w, h);
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.filter = 'none';
  }

  // Vignette overlay
  if (filter.vignette > 0) {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const radius = Math.sqrt(w * w + h * h) / 2;
    const grad = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, `rgba(0,0,0,${(filter.vignette / 100) * 0.65})`);
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w, h);
  }

  // Procedural Film Grain
  if (filter.grain > 5) {
    const grainCanvas = document.createElement('canvas');
    grainCanvas.width = 160;
    grainCanvas.height = 160;
    const grainCtx = grainCanvas.getContext('2d');
    if (grainCtx) {
      const imgData = grainCtx.createImageData(160, 160);
      const data = imgData.data;
      const grainStrength = (filter.grain / 100) * 55;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = grainStrength * Math.random();
      }
      grainCtx.putImageData(imgData, 0, 0);

      const pattern = ctx.createPattern(grainCanvas, 'repeat');
      if (pattern) {
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = pattern;
        ctx.fillRect(x, y, w, h);
        ctx.globalAlpha = 1.0;
      }
    }
  }

  ctx.restore();
}

function drawBorderOnCanvas(
  ctx: CanvasRenderingContext2D,
  border: BorderSettings,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.globalAlpha = border.opacity;

  const pad = (border.padding / 1000) * Math.min(w, h);
  const color = border.color;
  const goldColor = '#D4AF37';

  if (border.styleId === 'folk-moderne') {
    // Outer folk dashed frame
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2, border.borderWidth * (w / 600));
    ctx.setLineDash([12, 8]);
    ctx.strokeRect(x + pad, y + pad, w - pad * 2, h - pad * 2);
    ctx.setLineDash([]);

    // Inner gold hairline
    ctx.strokeStyle = border.accentGold ? goldColor : color;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + pad + 10, y + pad + 10, w - (pad + 10) * 2, h - (pad + 10) * 2);

    // Corner decorative flowerets
    const cornerOffsets = [
      [x + pad + 25, y + pad + 25],
      [x + w - pad - 25, y + pad + 25],
      [x + pad + 25, y + h - pad - 25],
      [x + w - pad - 25, y + h - pad - 25],
    ];
    cornerOffsets.forEach(([cx, cy]) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = border.accentGold ? goldColor : '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Tag text
    if (border.customText) {
      const tagW = Math.min(w * 0.5, 340);
      const tagH = 40;
      const tagX = x + (w - tagW) / 2;
      const tagY = y + h - pad - 20;

      ctx.fillStyle = '#FFFDF9';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      roundRect(ctx, tagX, tagY, tagW, tagH, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.font = `bold ${Math.round(w / 65)}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`✦ ${border.customText.toUpperCase()} ✦`, x + w / 2, tagY + tagH / 2);
    }
  } else if (border.styleId === 'art-deco') {
    // Art Déco double wire
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2, border.borderWidth * (w / 600));
    ctx.strokeRect(x + pad, y + pad, w - pad * 2, h - pad * 2);

    ctx.strokeStyle = border.accentGold ? goldColor : color;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + pad + 12, y + pad + 12, w - (pad + 12) * 2, h - (pad + 12) * 2);

    // Corner stepped diamonds
    const corners = [
      [x + pad + 16, y + pad + 16],
      [x + w - pad - 16, y + pad + 16],
      [x + pad + 16, y + h - pad - 16],
      [x + w - pad - 16, y + h - pad - 16],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = border.accentGold ? goldColor : color;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 14);
      ctx.lineTo(cx + 14, cy);
      ctx.lineTo(cx, cy + 14);
      ctx.lineTo(cx - 14, cy);
      ctx.closePath();
      ctx.fill();
    });
  } else if (border.styleId === 'polaroid-studio') {
    // Polaroid border
    const sideBorder = pad * 0.8;
    const bottomBorder = pad * 2.2;
    ctx.fillStyle = '#FAF7F2';
    // Top, Left, Right
    ctx.fillRect(x, y, w, sideBorder);
    ctx.fillRect(x, y, sideBorder, h);
    ctx.fillRect(x + w - sideBorder, y, sideBorder, h);
    ctx.fillRect(x, y + h - bottomBorder, w, bottomBorder);

    // Divider line on chin
    ctx.strokeStyle = '#E5E0D8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + sideBorder + 20, y + h - bottomBorder + 20);
    ctx.lineTo(x + w - sideBorder - 20, y + h - bottomBorder + 20);
    ctx.stroke();

    if (border.customText) {
      ctx.fillStyle = '#292524';
      ctx.font = `italic bold ${Math.round(w / 55)}px serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(border.customText, x + sideBorder + 24, y + h - bottomBorder / 2 + 8);
    }
  } else {
    // General elegant border
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2, border.borderWidth * (w / 600));
    ctx.strokeRect(x + pad, y + pad, w - pad * 2, h - pad * 2);

    if (border.accentGold) {
      ctx.strokeStyle = goldColor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + pad + 10, y + pad + 10, w - (pad + 10) * 2, h - (pad + 10) * 2);
    }
  }

  ctx.restore();
}

function drawBadgesOnCanvas(
  ctx: CanvasRenderingContext2D,
  badges: StickerBadge[],
  x: number,
  y: number,
  w: number,
  h: number
) {
  badges.forEach((b) => {
    if (!b.active) return;
    ctx.save();
    const bx = x + (b.x / 100) * w;
    const by = y + (b.y / 100) * h;
    const pillW = Math.min(260, w * 0.35);
    const pillH = 42;

    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = b.color;
    ctx.beginPath();
    roundRect(ctx, bx - pillW / 2, by - pillH / 2, pillW, pillH, 21);
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.fillStyle = b.textColor;
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(b.text, bx, by);

    ctx.restore();
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string, format: 'png' | 'jpeg') {
  const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const quality = format === 'jpeg' ? 0.95 : 1.0;
  const dataUrl = canvas.toDataURL(mimeType, quality);

  const link = document.createElement('a');
  link.download = `${filename}.${format === 'jpeg' ? 'jpg' : 'png'}`;
  link.href = dataUrl;
  link.click();
}
