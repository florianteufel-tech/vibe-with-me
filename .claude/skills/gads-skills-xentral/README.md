# Xentral Google Ads Skills

Zwei Claude Skills für die operative Google Ads Arbeit bei Xentral. Gebaut für den Einsatz in Claude Code / Cowork mit MCP-Zugang zum Google Ads Account.

## Skills

### gads-headlines
RSA (Responsive Search Ad) Copywriter. Generiert komplette Headline- und Description-Sets für Google Ads.

**Was er kann:**
- 15 Headlines (max 30 Zeichen) + 4 Descriptions (max 90 Zeichen) pro Ad Group
- SKAG (Exact Match) und Thematische Gruppen (Phrase Match) differenzieren
- Disqualification-Copy: Headlines die aktiv unqualifizierte Klicks filtern
- Pinning-Empfehlungen für RSA-Positionen
- Programmatische Zeichenzählung (kein LLM-Raten)

**Kampagnentypen:** Brand, ERP, WaWi, Use-Case, Competitor, Vertical

### gads-optimizer
Account-Analyse und Optimierungsempfehlungen. 10 Analyse-Modi in einem Skill.

**Modi:**
1. Account Health Check
2. CPA Diagnostics (Dual-CPA: MQA + SQA mit Conversion-Lag)
3. Wasted Spend Finder (mit Negative-Listen-Abgleich)
4. Keyword Cannibalization Check (mit Negative-Listen-Abgleich)
5. Bid Strategy Review (Portfolio-Bewertung)
6. Quality Score Breakdown
7. Anomaly Detection (mit Change-Log-Referenz)
8. Search Term Mining
9. Day/Hour Performance
10. Full-Funnel Attribution (MQA, SQA, Opportunity, Customer)

**Datenquellen:** Google Ads MCP, HubSpot Funnel-Daten, Paid Ads Change Log, CSV-Export

## Xentral-spezifischer Kontext

Beide Skills sind auf Xentrals Account-Setup zugeschnitten:

- **Conversion-Funnel:** Full-Funnel via HubSpot (cv_mqa, cv_sqa, cv_oppy, cv_customer)
- **Desktop-First:** Mobile Bid Adjustment -100% auf Search
- **Ad Schedule:** Mo-Fr + Sa tagsüber, Sonntag ausgeschlossen
- **Keyword-Ansatz:** SKAG (Exact) wird zu thematischen Gruppen (Phrase) erweitert
- **Bid-Strategien:** Portfolio mit CPC Caps
- **Negative Keywords:** Account + Campaign Level, automatisiert via n8n (Pemavor)

## Hard Rules

- Wettbewerbernamen NIEMALS in Ad Copy verwenden (Abmahnrisiko in DE)
- Keine Emojis in Google Ads
- Keine Sonntags-Referenzen
- Free Trial / Demo als primärer CTA
- Zeichenlimits sind absolut, nicht "ungefähr"

## Installation

Die `.skill` Dateien in Claude installieren:
1. `gads-headlines.skill` und `gads-optimizer.skill` herunterladen
2. In Claude als Skill installieren

Alternativ die `SKILL.md` Dateien direkt als Project Knowledge in einem Claude Project ablegen.

## Roadmap

- **v1 (aktuell):** Analyse und Empfehlungen, manuelle Umsetzung
- **v2:** Aktive Account-Eingriffe (Bid Changes, Keyword Pauses)
- **v3:** Scheduled Monitoring und automatische Alerts
- **Foundation Skills:** Tonality und Brand Voice als separate Layer (in Arbeit)

## Abhängigkeiten

| Skill | Braucht | Optional |
|-------|---------|----------|
| gads-headlines | - | Foundation Skills (Tonality) |
| gads-optimizer | Google Ads MCP | HubSpot, Paid Ads Change Log |

## Kontext

Erstellt am 16.04.2026. Inspiriert durch [Ryze AI Marketing Skills](https://github.com/irinabuht12-oss/marketing-skills), aber komplett custom für Xentrals B2B SaaS ERP Setup.
