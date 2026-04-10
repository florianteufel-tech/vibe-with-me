# LinkedIn Carousel Generator v2 — Xentral Corporate Design

Erstellt LinkedIn-Karussell-Posts im Xentral Corporate Design.
Format: 1080x1350px (4:5), als PDF fuer LinkedIn-Dokument-Posts.

Trigger: "Erstelle ein Carousel", "LinkedIn Carousel", "Carousel zum Thema", "/linkedin-carousel"

---

## Interaktiver Workflow

Wenn der User ein Carousel erstellen will, fuehre diesen Dialog:

### Schritt 1: Thema und Kontext
Frage: "Was ist das Thema des Carousels? Gibt es einen bestimmten Anlass (Produktlaunch, Feature, Event)?"

### Schritt 2: Grafiken / Mockups
Frage: "Hast du Grafiken, Screenshots oder Mockups vom Grafik-Team? Wenn ja, lege sie in den Ordner `assets/` im Skill-Verzeichnis oder gib mir die Dateipfade.

Ohne Grafiken erstelle ich ein reines Text-Carousel. Mit Grafiken wird es deutlich naeher am Xentral-Referenzdesign."

Assets-Ordner: `.claude/skills/linkedin-carousel/assets/`

### Schritt 3: Slide-Plan vorschlagen
Erstelle einen Slide-Plan mit 5-8 Slides und zeige ihn dem User:

```
Slide 1 (cover-light): Headline + Subline + [Grafik falls vorhanden]
Slide 2 (step):         -> Step-Label + Grafik/Mockup
Slide 3 (step):         -> Step-Label + Grafik/Mockup + Badges
Slide 4 (step):         -> Step-Label + Grafik/Mockup
Slide 5 (cta-light):    CTA Headline + Grafik + www.xentral.com
```

### Schritt 4: Freigabe und Generierung
Nach Freigabe: Config JSON erstellen und `generate-slideshow.js` ausfuehren.

---

## Xentral Branding

### Farben
| Name | Hex | Verwendung |
|------|-----|------------|
| **Blurple** | `#5b64ee` | Akzent, Buttons, Links, Gradient |
| **Navy** | `#283a50` | Headlines, dunkle Hintergruende |
| **Green** | `#19e49b` | Checkmarks, Erfolg |
| **Pink** | `#ee5bad` | Gradient-Akzent |
| **Cyan** | `#1cdcdd` | Gradient-Akzent |
| **Light** | `#f2f3fd` | Helle Hintergruende (Blurple-20) |
| **White** | `#ffffff` | Cards, Text auf dunkel |

### Typografie
| Rolle | Font | Gewicht |
|-------|------|---------|
| Headlines | Alexandria | Bold / ExtraBold (700-800) |
| Body / Labels / CTAs | Inter | Regular bis SemiBold (400-600) |

### Logo
- Farbig auf hellem Hintergrund: `logos/Xentral_logo_color.png`
- Weiss auf dunklem Hintergrund: `logos/Xentral_logo_white.png`

### Hintergruende (Gradient-Blobs)
- `bg-01.png` — Lila/Pink (fuer dunkle Slides)
- `bg-02.png` — Hell Mint/Lila (fuer helle Slides)
- `bg-03.png` — Blurple/Cyan (fuer Accent Slides)

---

## Layouts

### `cover-light` (Standard-Cover)
Heller Hintergrund + farbiges Logo + grosse Headline + optionale Grafik unten + optionale Badges.
Wie im Xentral-Referenzdesign (KI-ERP Carousel).

### `cover-dark`
Dunkler Hintergrund + weisses Logo + helle Headline. Fuer dramatischere Opener.

### `step`
Heller Hintergrund + Step-Label (Pfeil + Text) + optionale Grafik/Mockup + optionale Badges.
Hauptlayout fuer Content-Slides mit Screenshots.

### `accent`
Blurple-Hintergrund + grosse Zahl/Statistik als Wasserzeichen + Headline.
Fuer Key-Insights und Zahlen.

### `dark`
Dunkler Hintergrund + Statement-Headline. Fuer emotionale Aussagen.

### `cta-light`
Heller Hintergrund + Headline + optionale Grafik + grosse URL.
Wie im Xentral-Referenzdesign (letzte Slide).

### `cta-dark`
Dunkler Hintergrund + Label + Headline + Button + Footer mit Logo.
Fuer actionorientierte CTAs.

---

## Config JSON Format

```json
{
  "title": "carousel-dateiname",
  "brand": {
    "name": "xentral",
    "dark": "#283a50",
    "accent": "#5b64ee",
    "green": "#19e49b",
    "pink": "#ee5bad",
    "cyan": "#1cdcdd",
    "light": "#f2f3fd",
    "white": "#ffffff",
    "website": "xentral.com"
  },
  "slides": [
    {
      "layout": "cover-light",
      "headline": "Xentral<br><span class='gradient-text'>KI-ERP</span>",
      "body": "Ein ERP, das mitdenkt. Und mitarbeitet.",
      "graphic": "assets/cover-mockup.png",
      "badges": ["Kunde gefunden", "Auftrag gefunden", "Artikel gefunden"]
    },
    {
      "layout": "step",
      "stepLabel": "Kunde sendet Frage per E-Mail",
      "headline": "Stornierung einer Bestellung",
      "graphic": "assets/step1-email.png"
    },
    {
      "layout": "step",
      "stepLabel": "Anfrage erreicht deinen Xentral Agent Hub",
      "headline": "KI analysiert den Fall",
      "graphic": "assets/step2-agent.png",
      "badges": ["Fall analysiert", "Aufgabe angelegt", "E-Mail vorbereitet"]
    },
    {
      "layout": "step",
      "stepLabel": "KI-Agenten analysieren und bearbeiten die Anfrage",
      "headline": "Ausfuehren mit einem Klick",
      "graphic": "assets/step3-execute.png"
    },
    {
      "layout": "cta-light",
      "headline": "Alle Xentral KI Updates auf unserer Website",
      "graphic": "assets/cta-website.png",
      "ctaUrl": "www.xentral.com"
    }
  ]
}
```

### Slide-Felder

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `layout` | string | Layout-Typ (siehe oben) |
| `headline` | string | Hauptueberschrift. Supports HTML: `<br>`, `<span class='gradient-text'>` |
| `body` | string | Optionaler Fliesstext |
| `stepLabel` | string | Pfeil-Label: "-> Text" (nur step/dark) |
| `graphic` | string | Pfad zu Grafik/Mockup PNG (relativ zur config.json) |
| `backgroundImage` | string | Optionaler Custom-Hintergrund (ueberschreibt Default) |
| `badges` | string[] | Liste von Status-Texten mit gruenen Checkmarks |
| `accentText` | string | Grosse Zahl/Text als Wasserzeichen (nur accent) |
| `ctaText` | string | Button-Text (nur cta-dark) |
| `ctaUrl` | string | Grosse URL-Anzeige (nur cta-light) |

---

## Ausfuehrung

```bash
cd .claude/skills/linkedin-carousel
node generate-slideshow.js <config.json> <output-dir>
```

Beispiel:
```bash
node generate-slideshow.js config-ki-erp.json ~/Desktop/Carousel-xentral
```

Output: Einzelne PNGs + kombiniertes PDF fuer LinkedIn-Upload.

---

## Assets-Workflow

1. Grafik-Team liefert Mockups/Screenshots als PNG
2. Ablage in `assets/` Ordner (oder beliebiger Pfad)
3. In der Config referenzieren: `"graphic": "assets/dateiname.png"`
4. Carousel generieren

Ohne Grafiken: Reines Text-Carousel mit Gradient-Hintergruenden.
Mit Grafiken: Nah am Xentral-Referenzdesign.
