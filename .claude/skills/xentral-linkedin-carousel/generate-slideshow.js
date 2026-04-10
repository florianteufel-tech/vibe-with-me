/**
 * LinkedIn Carousel Generator v2 — Xentral Corporate Design
 *
 * Usage:
 *   node generate-slideshow.js <config.json> [output-dir]
 *
 * Layouts: cover-light, cover-dark, step, accent, dark, cta-light, cta-dark
 *
 * Output: Individual PNGs (1080x1350) + combined PDF
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// ─── Paths (resolved relative to this script) ───────────────────────────────
const SCRIPT_DIR = __dirname;
const FONT_ALEXANDRIA = 'file://' + path.join(SCRIPT_DIR, 'fonts', 'Alexandria-VariableFont_wght.ttf');
const FONT_INTER = 'file://' + path.join(SCRIPT_DIR, 'fonts', 'Inter-VariableFont_opsz,wght.ttf');
const LOGO_COLOR = 'file://' + path.join(SCRIPT_DIR, 'logos', 'Xentral_logo_color.png');
const LOGO_WHITE = 'file://' + path.join(SCRIPT_DIR, 'logos', 'Xentral_logo_white.png');
const BG_LIGHT = 'file://' + path.join(SCRIPT_DIR, 'bg-02.png');
const BG_ACCENT = 'file://' + path.join(SCRIPT_DIR, 'bg-03.png');
const BG_DARK = 'file://' + path.join(SCRIPT_DIR, 'bg-01.png');

const DEFAULT_BRAND = {
  name: 'xentral',
  dark: '#283a50',
  accent: '#5b64ee',
  green: '#19e49b',
  pink: '#ee5bad',
  cyan: '#1cdcdd',
  light: '#f2f3fd',
  white: '#ffffff',
  website: 'xentral.com',
};

const WIDTH = 1080;
const HEIGHT = 1350;

// ─── Base Styles ─────────────────────────────────────────────────────────────
function baseStyles(B) {
  return `
    @font-face {
      font-family: 'Alexandria';
      src: url('${FONT_ALEXANDRIA}') format('truetype');
      font-weight: 100 900;
    }
    @font-face {
      font-family: 'Inter';
      src: url('${FONT_INTER}') format('truetype');
      font-weight: 100 900;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${WIDTH}px; height: ${HEIGHT}px;
      overflow: hidden;
      font-family: 'Alexandria', system-ui, sans-serif;
    }
    .slide {
      width: ${WIDTH}px; height: ${HEIGHT}px;
      position: relative;
      display: flex; flex-direction: column;
      overflow: hidden;
    }
    .logo img { height: 36px; width: auto; }
    .slide-number {
      font-family: 'Inter', sans-serif;
      font-size: 20px; font-weight: 500; opacity: 0.4;
    }
    .gradient-text {
      background: linear-gradient(135deg, ${B.accent} 0%, ${B.pink || '#ee5bad'} 50%, ${B.cyan || '#1cdcdd'} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .step-label {
      font-family: 'Inter', sans-serif;
      font-size: 24px; font-weight: 500;
      color: ${B.accent};
      display: flex; align-items: center; gap: 12px;
    }
    .step-label::before {
      content: '\\2192';
      font-size: 20px;
    }
    .badge-list {
      display: flex; flex-direction: column; gap: 12px;
      background: ${B.white || '#ffffff'};
      padding: 24px 28px;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      width: fit-content;
    }
    .badge-item {
      font-family: 'Inter', sans-serif;
      font-size: 20px; font-weight: 500;
      color: ${B.dark};
      display: flex; align-items: center; gap: 12px;
    }
    .badge-check {
      width: 24px; height: 24px;
      background: ${B.green || '#19e49b'};
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: white; font-size: 14px; font-weight: 700;
      flex-shrink: 0;
    }
    .mockup-area {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .mockup-area img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 12px;
      filter: drop-shadow(0 8px 32px rgba(0,0,0,0.12));
    }
  `;
}

// ─── COVER LIGHT ─────────────────────────────────────────────────────────────
function renderCoverLight(slide, slideNum, totalSlides, B) {
  const bg = slide.backgroundImage || BG_LIGHT;
  const hasGraphic = !!slide.graphic;
  const hasBadges = slide.badges && slide.badges.length > 0;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${baseStyles(B)}
  .slide-cover-light {
    background: ${B.light};
    background-image: url('${bg}'); background-size: cover; background-position: center;
    padding: 70px;
    justify-content: space-between;
  }
  .cover-top { display: flex; justify-content: space-between; align-items: center; }
  .cover-center { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 24px; }
  .cover-headline {
    font-size: 88px; font-weight: 800;
    color: ${B.dark};
    line-height: 1.0; letter-spacing: -3px;
  }
  .cover-body {
    font-family: 'Inter', sans-serif;
    font-size: 28px; font-weight: 400;
    color: ${B.dark}; opacity: 0.7;
    line-height: 1.5;
  }
  .cover-bottom-area {
    display: flex;
    justify-content: ${hasGraphic ? 'center' : 'flex-start'};
    align-items: flex-end;
    gap: 24px;
    position: relative;
    min-height: ${hasGraphic ? '380px' : '0'};
  }
  .cover-graphic img {
    max-height: 360px; max-width: 580px;
    object-fit: contain;
    border-radius: 12px;
    filter: drop-shadow(0 8px 32px rgba(0,0,0,0.1));
  }
  .cover-badges {
    position: absolute; right: 0; bottom: 20px;
  }
</style></head><body>
<div class="slide slide-cover-light">
  <div class="cover-top">
    <div class="logo"><img src="${LOGO_COLOR}" alt="${B.name}"/></div>
  </div>
  <div class="cover-center">
    <div class="cover-headline">${slide.headline}</div>
    ${slide.body ? `<div class="cover-body">${slide.body}</div>` : ''}
  </div>
  <div class="cover-bottom-area">
    ${hasGraphic ? `<div class="cover-graphic"><img src="${slide.graphic}" alt=""/></div>` : ''}
    ${hasBadges ? `<div class="cover-badges"><div class="badge-list">${slide.badges.map(b => `<div class="badge-item"><div class="badge-check">&#10003;</div>${b}</div>`).join('')}</div></div>` : ''}
  </div>
</div>
</body></html>`;
}

// ─── COVER DARK ──────────────────────────────────────────────────────────────
function renderCoverDark(slide, slideNum, totalSlides, B) {
  const bg = slide.backgroundImage || BG_DARK;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${baseStyles(B)}
  .slide-cover-dark {
    background: ${B.dark};
    background-image: url('${bg}'); background-size: cover; background-position: center;
    padding: 70px;
    justify-content: space-between;
  }
  .cover-top { display: flex; justify-content: space-between; align-items: center; }
  .cover-center { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 28px; }
  .cover-headline {
    font-size: 80px; font-weight: 800;
    color: ${B.white || '#ffffff'};
    line-height: 1.05; letter-spacing: -2px;
  }
  .cover-body {
    font-family: 'Inter', sans-serif;
    font-size: 28px; font-weight: 400;
    color: ${B.white || '#ffffff'}; opacity: 0.7;
    line-height: 1.5;
  }
  .cover-bottom {
    display: flex; justify-content: space-between; align-items: center;
  }
  .swipe-hint {
    font-family: 'Inter', sans-serif;
    font-size: 22px; color: ${B.accent}; font-weight: 500;
  }
</style></head><body>
<div class="slide slide-cover-dark">
  <div class="cover-top">
    <div class="logo"><img src="${LOGO_WHITE}" alt="${B.name}"/></div>
    <div class="slide-number" style="color: ${B.white || '#fff'};">${slideNum} / ${totalSlides}</div>
  </div>
  <div class="cover-center">
    <div style="height: 5px; width: 80px; background: ${B.accent}; border-radius: 2px;"></div>
    <div class="cover-headline">${slide.headline}</div>
    ${slide.body ? `<div class="cover-body">${slide.body}</div>` : ''}
  </div>
  <div class="cover-bottom">
    <div class="swipe-hint">Weiter swipe &rarr;</div>
    <div style="color: ${B.white || '#fff'}; opacity: 0.35; font-size: 20px; font-family: 'Inter', sans-serif;">${B.website}</div>
  </div>
</div>
</body></html>`;
}

// ─── STEP SLIDE (Light with mockup + step label + badges) ────────────────────
function renderStepSlide(slide, slideNum, totalSlides, B) {
  const bg = slide.backgroundImage || BG_LIGHT;
  const hasGraphic = !!slide.graphic;
  const hasBadges = slide.badges && slide.badges.length > 0;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${baseStyles(B)}
  .slide-step {
    background: ${B.light};
    background-image: url('${bg}'); background-size: cover; background-position: center;
    padding: 70px;
    justify-content: space-between;
  }
  .step-top { display: flex; justify-content: space-between; align-items: center; }
  .step-content {
    flex: 1; display: flex; flex-direction: column;
    justify-content: ${hasGraphic ? 'flex-start' : 'center'};
    gap: 28px; padding-top: 20px;
  }
  .step-headline {
    font-size: ${hasGraphic ? '48px' : '64px'}; font-weight: 800;
    color: ${B.dark};
    line-height: 1.1; letter-spacing: -1.5px;
  }
  .step-body {
    font-family: 'Inter', sans-serif;
    font-size: 26px; font-weight: 400;
    color: ${B.dark}; opacity: 0.75;
    line-height: 1.5;
  }
  .step-graphic-area {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 20px;
    position: relative;
    min-height: ${hasGraphic ? '500px' : '0'};
  }
  .step-graphic img {
    max-height: 480px; max-width: 680px;
    object-fit: contain;
    border-radius: 12px;
    filter: drop-shadow(0 8px 32px rgba(0,0,0,0.1));
  }
  .step-badges {
    position: absolute; right: 0; bottom: 20px;
  }
  .step-bottom {
    display: flex; justify-content: space-between; align-items: center;
  }
</style></head><body>
<div class="slide slide-step">
  <div class="step-top">
    <div class="logo"><img src="${LOGO_COLOR}" alt="${B.name}"/></div>
    <div class="slide-number" style="color: ${B.dark};">${slideNum} / ${totalSlides}</div>
  </div>
  <div class="step-content">
    ${slide.stepLabel ? `<div class="step-label">${slide.stepLabel}</div>` : ''}
    ${!hasGraphic ? `<div class="step-headline">${slide.headline}</div>` : ''}
    ${!hasGraphic && slide.body ? `<div class="step-body">${slide.body}</div>` : ''}
  </div>
  <div class="step-graphic-area">
    ${hasGraphic ? `<div class="step-graphic"><img src="${slide.graphic}" alt=""/></div>` : ''}
    ${hasBadges ? `<div class="step-badges"><div class="badge-list">${slide.badges.map(b => `<div class="badge-item"><div class="badge-check">&#10003;</div>${b}</div>`).join('')}</div></div>` : ''}
  </div>
  <div class="step-bottom">
    <div style="height: 4px; width: 80px; background: ${B.accent}; border-radius: 2px;"></div>
    <div style="color: ${B.dark}; opacity: 0.3; font-size: 20px; font-family: 'Inter', sans-serif;">${B.website}</div>
  </div>
</div>
</body></html>`;
}

// ─── ACCENT SLIDE (Blurple bg, big numbers/stats) ────────────────────────────
function renderAccentSlide(slide, slideNum, totalSlides, B) {
  const bg = slide.backgroundImage || BG_ACCENT;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${baseStyles(B)}
  .slide-accent {
    background: ${B.accent};
    background-image: url('${bg}'); background-size: cover; background-position: center;
    padding: 70px;
    justify-content: space-between;
    position: relative;
  }
  .accent-top { display: flex; justify-content: space-between; align-items: center; }
  .accent-big {
    font-size: 140px; font-weight: 800;
    color: ${B.dark}; opacity: 0.12;
    position: absolute; right: 50px; top: 50%; transform: translateY(-50%);
    letter-spacing: -4px; line-height: 1;
  }
  .accent-center {
    flex: 1; display: flex; flex-direction: column;
    justify-content: center; gap: 28px;
    position: relative; z-index: 1;
  }
  .accent-headline {
    font-size: 68px; font-weight: 800;
    color: ${B.dark};
    line-height: 1.05; letter-spacing: -2px;
  }
  .accent-body {
    font-family: 'Inter', sans-serif;
    font-size: 28px; font-weight: 500;
    color: ${B.dark}; opacity: 0.8;
    line-height: 1.5;
  }
  .accent-bottom { display: flex; justify-content: space-between; align-items: center; }
</style></head><body>
<div class="slide slide-accent">
  <div class="accent-top">
    <div class="logo"><img src="${LOGO_COLOR}" alt="${B.name}"/></div>
    <div class="slide-number" style="color: ${B.dark};">${slideNum} / ${totalSlides}</div>
  </div>
  ${slide.accentText ? `<div class="accent-big">${slide.accentText}</div>` : ''}
  <div class="accent-center">
    <div style="height: 5px; width: 70px; background: ${B.dark}; opacity: 0.25; border-radius: 2px;"></div>
    <div class="accent-headline">${slide.headline}</div>
    ${slide.body ? `<div class="accent-body">${slide.body}</div>` : ''}
  </div>
  <div class="accent-bottom">
    <div style="font-family: 'Inter', sans-serif; font-size: 20px; color: ${B.dark}; opacity: 0.4;">${B.website}</div>
  </div>
</div>
</body></html>`;
}

// ─── DARK SLIDE ──────────────────────────────────────────────────────────────
function renderDarkSlide(slide, slideNum, totalSlides, B) {
  const bg = slide.backgroundImage || BG_DARK;
  const hasGraphic = !!slide.graphic;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${baseStyles(B)}
  .slide-dark {
    background: ${B.dark};
    background-image: url('${bg}'); background-size: cover; background-position: center;
    padding: 70px;
    justify-content: space-between;
  }
  .dark-top { display: flex; justify-content: space-between; align-items: center; }
  .dark-center {
    flex: 1; display: flex; flex-direction: column;
    justify-content: center; gap: 28px;
  }
  .dark-headline {
    font-size: 68px; font-weight: 800;
    color: ${B.white || '#ffffff'};
    line-height: 1.05; letter-spacing: -2px;
  }
  .dark-body {
    font-family: 'Inter', sans-serif;
    font-size: 28px; font-weight: 400;
    color: ${B.white || '#ffffff'}; opacity: 0.7;
    line-height: 1.5;
  }
  .dark-bottom { display: flex; justify-content: space-between; align-items: center; }
</style></head><body>
<div class="slide slide-dark">
  <div class="dark-top">
    <div class="logo"><img src="${LOGO_WHITE}" alt="${B.name}"/></div>
    <div class="slide-number" style="color: ${B.white || '#fff'};">${slideNum} / ${totalSlides}</div>
  </div>
  <div class="dark-center">
    ${slide.stepLabel ? `<div class="step-label" style="color: ${B.accent};">${slide.stepLabel}</div>` : ''}
    <div style="height: 5px; width: 70px; background: ${B.accent}; border-radius: 2px;"></div>
    <div class="dark-headline">${slide.headline}</div>
    ${slide.body ? `<div class="dark-body">${slide.body}</div>` : ''}
  </div>
  <div class="dark-bottom">
    <div style="color: ${B.white || '#fff'}; opacity: 0.3; font-size: 20px; font-family: 'Inter', sans-serif;">${B.website}</div>
  </div>
</div>
</body></html>`;
}

// ─── CTA LIGHT ───────────────────────────────────────────────────────────────
function renderCtaLight(slide, slideNum, totalSlides, B) {
  const bg = slide.backgroundImage || BG_LIGHT;
  const hasGraphic = !!slide.graphic;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${baseStyles(B)}
  .slide-cta-light {
    background: ${B.light};
    background-image: url('${bg}'); background-size: cover; background-position: center;
    padding: 70px;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  .cta-headline {
    font-size: 56px; font-weight: 800;
    color: ${B.dark};
    line-height: 1.1; letter-spacing: -2px;
  }
  .cta-graphic img {
    max-height: 420px; max-width: 700px;
    object-fit: contain;
    border-radius: 16px;
    filter: drop-shadow(0 8px 32px rgba(0,0,0,0.1));
  }
  .cta-url {
    font-family: 'Inter', sans-serif;
    font-size: 36px; font-weight: 600;
    color: ${B.accent};
  }
</style></head><body>
<div class="slide slide-cta-light">
  <div style="width: 100%;"></div>
  <div class="cta-headline">${slide.headline}</div>
  ${hasGraphic ? `<div class="cta-graphic"><img src="${slide.graphic}" alt=""/></div>` : ''}
  <div class="cta-url">${slide.ctaUrl || 'www.' + B.website}</div>
</div>
</body></html>`;
}

// ─── CTA DARK ────────────────────────────────────────────────────────────────
function renderCtaDark(slide, slideNum, totalSlides, B) {
  const bg = slide.backgroundImage || BG_DARK;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${baseStyles(B)}
  .slide-cta-dark {
    background: ${B.dark};
    background-image: url('${bg}'); background-size: cover; background-position: center;
    padding: 70px;
    justify-content: space-between;
  }
  .cta-top { display: flex; justify-content: space-between; align-items: center; }
  .cta-center { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 40px; }
  .cta-label {
    font-family: 'Inter', sans-serif;
    font-size: 22px; color: ${B.accent};
    font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
  }
  .cta-headline {
    font-size: 64px; font-weight: 800;
    color: ${B.white || '#ffffff'};
    line-height: 1.05; letter-spacing: -2px;
  }
  .cta-body {
    font-family: 'Inter', sans-serif;
    font-size: 26px; font-weight: 400;
    color: ${B.white || '#ffffff'}; opacity: 0.7;
    line-height: 1.5;
  }
  .cta-button {
    background: ${B.accent};
    color: ${B.white || '#ffffff'};
    font-family: 'Alexandria', sans-serif;
    font-weight: 700; font-size: 26px;
    padding: 22px 44px;
    border-radius: 100px;
    display: inline-block; width: fit-content;
  }
  .cta-bottom { display: flex; flex-direction: column; gap: 16px; }
  .cta-divider { height: 1px; background: ${B.white || '#fff'}; opacity: 0.12; }
  .cta-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 8px; }
</style></head><body>
<div class="slide slide-cta-dark">
  <div class="cta-top">
    <div class="logo"><img src="${LOGO_WHITE}" alt="${B.name}"/></div>
    <div class="slide-number" style="color: ${B.white || '#fff'};">${slideNum} / ${totalSlides}</div>
  </div>
  <div class="cta-center">
    <div class="cta-label">${slide.accentText || 'Next Step'}</div>
    <div style="height: 5px; width: 70px; background: ${B.accent}; border-radius: 2px;"></div>
    <div class="cta-headline">${slide.headline}</div>
    ${slide.body ? `<div class="cta-body">${slide.body}</div>` : ''}
    ${slide.ctaText ? `<div class="cta-button">${slide.ctaText}</div>` : ''}
  </div>
  <div class="cta-bottom">
    <div class="cta-divider"></div>
    <div class="cta-footer">
      <div class="logo"><img src="${LOGO_WHITE}" alt="${B.name}"/></div>
      <div style="font-family: 'Inter', sans-serif; font-size: 20px; color: ${B.white || '#fff'}; opacity: 0.45;">${B.website}</div>
    </div>
  </div>
</div>
</body></html>`;
}

// ─── Legacy layout aliases ───────────────────────────────────────────────────
function getSlideHtml(slide, slideNum, totalSlides, B) {
  switch (slide.layout) {
    case 'cover-light':  return renderCoverLight(slide, slideNum, totalSlides, B);
    case 'cover-dark':   return renderCoverDark(slide, slideNum, totalSlides, B);
    case 'cover':        return renderCoverLight(slide, slideNum, totalSlides, B);
    case 'step':         return renderStepSlide(slide, slideNum, totalSlides, B);
    case 'light':        return renderStepSlide(slide, slideNum, totalSlides, B);
    case 'accent':       return renderAccentSlide(slide, slideNum, totalSlides, B);
    case 'lime':         return renderAccentSlide(slide, slideNum, totalSlides, B);
    case 'dark':         return renderDarkSlide(slide, slideNum, totalSlides, B);
    case 'dark-image':   return renderDarkSlide(slide, slideNum, totalSlides, B);
    case 'cta-light':    return renderCtaLight(slide, slideNum, totalSlides, B);
    case 'cta-dark':     return renderCtaDark(slide, slideNum, totalSlides, B);
    case 'cta':          return renderCtaLight(slide, slideNum, totalSlides, B);
    default:             return renderStepSlide(slide, slideNum, totalSlides, B);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const configPath = process.argv[2];
  if (!configPath) {
    console.error('Usage: node generate-slideshow.js <config.json> [output-dir]');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const outputDir = process.argv[3] || config.outputDir || './slideshow-output';
  const B = { ...DEFAULT_BRAND, ...(config.brand || {}) };

  fs.mkdirSync(outputDir, { recursive: true });

  // Resolve relative paths for backgroundImage and graphic fields
  const configDir = path.dirname(path.resolve(configPath));
  for (const slide of config.slides) {
    for (const field of ['backgroundImage', 'graphic']) {
      if (slide[field] && !slide[field].startsWith('http') && !slide[field].startsWith('file://')) {
        slide[field] = 'file://' + path.resolve(configDir, slide[field]);
      }
    }
  }

  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: WIDTH, height: HEIGHT });

  const pngPaths = [];
  const total = config.slides.length;
  console.log(`Generating ${total} slides for "${B.name}"...`);

  for (let i = 0; i < total; i++) {
    const slide = config.slides[i];
    const slideNum = i + 1;
    const html = getSlideHtml(slide, slideNum, total, B);
    const htmlPath = path.join(outputDir, `slide-${String(slideNum).padStart(2, '0')}.html`);
    fs.writeFileSync(htmlPath, html);
    await page.goto(`file://${path.resolve(htmlPath)}`);
    await page.waitForTimeout(1200);
    const pngPath = path.join(outputDir, `slide-${String(slideNum).padStart(2, '0')}.png`);
    await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    pngPaths.push(pngPath);
    console.log(`  Done: ${slideNum}/${total}: ${slide.layout} — ${(slide.headline || '').substring(0, 40)}`);
  }

  await browser.close();

  // Combine to PDF
  const pdfPath = path.join(outputDir, `${config.title || 'carousel'}.pdf`);
  try {
    const { PDFDocument } = require('pdf-lib');
    const pdfDoc = await PDFDocument.create();
    for (const p of pngPaths) {
      const img = await pdfDoc.embedPng(fs.readFileSync(p));
      const pg = pdfDoc.addPage([WIDTH, HEIGHT]);
      pg.drawImage(img, { x: 0, y: 0, width: WIDTH, height: HEIGHT });
    }
    fs.writeFileSync(pdfPath, await pdfDoc.save());
    console.log(`\nPDF: ${pdfPath}`);
  } catch (e) {
    console.log(`\npdf-lib not found — PNGs only. Install: npm install pdf-lib`);
  }

  console.log(`Output: ${outputDir} (${pngPaths.length} slides)`);
}

main().catch(err => { console.error('Error:', err); process.exit(1); });
