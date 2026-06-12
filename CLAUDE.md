# DOIA — Website Design Rules
## Dulguun Otgonjav Interior Architect

Dit document beschrijft de vaste regels, structuur en logica van deze website.
Elke aanpassing — groot of klein — moet deze regels respecteren.

---

## 1. Merk & naam

- **Publieke merknaam**: altijd "Dulguun Otgonjav Interior Architect" — nooit "DOIA" op de site.
- **DOIA** is uitsluitend voor intern/administratief gebruik en URL's.
- **Woordmerk in nav**: `Dulguun Otgonjav Interior Architect` — font-size 0.65rem, letter-spacing 0.18em.
- **Woordmerk in footer**: idem, via `.footer__brand`.
- **Tagline**: "Interieurarchitect" of "Interieurarchitectuur · België" — altijd klein, als eyebrow of sub-label.

---

## 2. Taal & stem

- **Primaire taal**: Nederlands (NL). Alle publieke copy in het Nederlands.
- **Stem**: klantgericht — de klant staat altijd voorop. Spreek de lezer rechtstreeks aan met **"u"** ("uw thuis", "u werkt samen met één interieurarchitect"). De eerste persoon enkelvoud ("ik") blijft toegestaan wáár het over vakmanschap, visie of begeleiding gaat ("ik luister", "alles wat ik voor u maak"), maar open en kader vanuit de klant, niet vanuit "ik". Nooit "we" of "onze studio".
- **Tone of voice**: concreet, zintuiglijk, stellig en rustig. Geen buzzwords ("synergy", "passionated", "innovative").
- **Drie kernboodschappen** (altijd herkenbaar aanwezig):
  1. *"Een thuis hoeft niet ingewikkeld te zijn. Het moet kloppen."*
  2. *"Ontworpen vanuit wie u bent."*
  3. *"Eén hand, van het eerste gesprek tot het laatste detail."*
- **Dienstnamen** (nooit wijzigen zonder expliciete opdracht):
  - S/01 → Kennismaking
  - S/02 → Eén ruimte
  - S/03 → Visualisatie
  - S/04 → Volledig traject
  - Prijs-label: "Één heldere prijs,\nvooraf afgesproken" (nooit "fixed price")
  - Uitzondering S/01: "Vrijblijvend"

---

## 3. Kleur

Gedefinieerd als CSS-variabelen in `styles.css`:

| Variabele    | Waarde               | Gebruik                              |
|--------------|----------------------|--------------------------------------|
| `--paper`    | `#FBFAF8`            | Paginaachtergrond                    |
| `--paper-2`  | `#F2F0EC`            | Afbeeldingsplaceholder, subtiele bg  |
| `--ink`      | `#16140F`            | Primaire tekst, knoppen              |
| `--ink-2`    | `#5A564E`            | Secundaire tekst, beschrijvingen     |
| `--ink-3`    | `#98938A`            | Captions, labels, eyebrows           |
| `--line`     | `#DEDAD2`            | Haarlijnen, randen, dividers         |
| `--line-2`   | `#C9C4BA`            | Formuliervelden                      |
| `--accent`   | `oklch(0.59 0.10 42)`| Terracotta — spaarzaam gebruiken     |
| `--accent-2` | `oklch(0.72 0.06 220)`| Zachtblauw — zelden gebruiken       |

**Regel**: gebruik nooit willekeurige nieuwe kleuren. Kies altijd uit bovenstaande variabelen. Het accent (terracotta) enkel voor hover-states, step-nummers, CTA-knoppen en vereiste-sterretjes.

---

## 4. Typografie

Fonts geladen via Google Fonts in `styles.css`:
- `--mono`: IBM Plex Mono (300, 400, 500) → labels, nav, eyebrows, captions, nummers
- `--sans`: IBM Plex Sans (300, 400, 500) → headings, body, alles wat leesbaar moet zijn

**Klassen** (nooit opnieuw definiëren — gebruik altijd deze):
- `.h-display` → grote titels (pagina H1), clamp 2.6→7rem
- `.h-lg` → sectietitels, clamp 1.8→3.4rem
- `.lead` → intro-alinea's, clamp 1.05→1.4rem, max-width 30ch
- `.eyebrow` → mono uppercase, letter-spacing 0.18em, font-size 0.7rem, kleur `--ink-3`
- `.mono` → mono uppercase, letter-spacing 0.14em, font-size 0.72rem

**Regels**:
- Body copy altijd font-weight 300.
- Headings altijd font-weight 300, letter-spacing negatief (-0.01em tot -0.02em).
- Nooit bold (700) gebruiken — maximaal 500 voor wordmark.
- Minimale font-size: 0.62rem voor labels; 1rem voor leestekst.

---

## 5. Lay-out & grid

**Paginamarge**: `--gut: clamp(20px, 4.5vw, 64px)` — altijd via `.shell` toegepast.

**Rasterlogica**:
- Desktop breakpoint voor 2-koloms: `min-width: 860px` (tekst + beeld naast elkaar)
- Desktop breakpoint voor diensten/processen: `min-width: 820px`
- Desktop breakpoint voor paren (2 gelijke kolommen): `min-width: 720px`
- Altijd `display: grid` met `gap`, nooit losse margins tussen siblings.

**Vaste afstanden** (gebruik altijd `clamp`):
- Sectie vertical padding: `clamp(50px, 8vw, 110px)` of `clamp(80px, 12vw, 160px)`
- Pagina-header top padding: `clamp(120px, 18vh, 220px)`
- Gap tussen elementen: `clamp(28px, 5vw, 60px)` (groot) / `clamp(18px, 2.5vw, 28px)` (klein)

---

## 6. Componenten

### Nav
- Positie: fixed, z-index 50, mix-blend-mode: difference (wit op zwart/kleur).
- Wordmark links, menu rechts (Werk · Studio · Contact).
- Hover-state: `::after` underline scaleX animatie.
- Actieve pagina: `aria-current="page"` via `app.js initNav()`.

### Footer
- Altijd 2-koloms grid (Studio-info links, Pagina's rechts) + `.footer__bottom`.
- Inhoud: adres, email, telefoon, Instagram, LinkedIn, BTW-nummer.
- Vaste footer-info:
  - Adres: Heidijk 17, B-2860 Sint-Katelijne-Waver, België
  - Email: hello@dulguunotgonjav.com / press@dulguunotgonjav.com
  - Tel: +32 4 56 87 04 41
  - BTW: BE0735 512 495

### Afbeeldingen
- Vaste, ingebakken `<img>` (geen drag-and-drop slots meer). Altijd `loading="lazy"` behalve hero-beelden (`loading="eager" fetchpriority="high"`), met een beschrijvende Nederlandse `alt`.
- Wrapper altijd `.frame` (overflow hidden, bg `--paper-2`, hover scale 1.035); `.frame img` is `width/height:100%` + `object-fit:cover`.
- Bronbestanden in `images/`, geoptimaliseerd op max 2560px (langste zijde), JPEG q 0.8–0.82.

### Diensten (services) — index.html
- Grid per rij: `grid-template-columns: 1fr 1.7fr 0.5fr` op desktop.
- S/0X en naam altijd samen in `.svc__head` (flex, align-items baseline, gap clamp(22px,3vw,44px)).
- Prijs rechts uitlijnen, breek "Één heldere prijs," / "vooraf afgesproken" op 2 regels via `<br />`.
- Hover: `padding-left` transitie.

### Scroll-reveal
- Klasse `.reveal` op alle elementen die bij scroll verschijnen.
- Vertraging via `.d1`, `.d2`, `.d3` (0.08s / 0.16s / 0.24s).
- Eerste zichtbare elementen in hero: altijd `.reveal.is-visible` (al zichtbaar bij load).

### Knoppen
- `.btn`: ink achtergrond, paper tekst. Hover: accent achtergrond.
- `.link-line`: mono uppercase, border-bottom, hover gap vergroot.
- Nooit ronde knoppen of afgeronde hoeken.

### FAQ (studio.html)
- Accordion: hoogte animatie via JS (`panel.style.height`).
- `.qa__icon` plus/min via CSS `::after scaleY(0)`.
- Hover kleur: terracotta accent.

---

## 7. Bestandsstructuur

De **actieve pagina's** zijn de werkende, publieke website (schone URL's):
- `index.html` — Homepage
- `werk.html` — Portfolio-overzicht
- `studio.html` — Over / Aanpak / Werkwijze / FAQ
- `contact.html` — Contact + formulier
- `project-baigal.html`, `project-ger.html`, `project-shar.html` — projectpagina's
- `privacy.html`, `terms.html`, `disclaimer.html` — juridisch (noindex)

Gedeelde bestanden (nooit per pagina dupliceren):
- `styles.css` — alle tokens, utilities, nav, footer
- `app.js` — scroll-reveal IntersectionObserver + nav active state

**SEO / hosting-bestanden** (root, niet aanraken zonder reden):
- `sitemap.xml`, `robots.txt`, `site.webmanifest`, `404.html`
- `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `og-image.jpg`
- `CNAME` — custom domain voor GitHub Pages (`dulguunotgonjav.com`)
- Elke pagina heeft in `<head>`: unieke `<title>` + meta-description, canonical, Open Graph/Twitter, JSON-LD schema. Bij nieuwe pagina's dit patroon volgen en toevoegen aan `sitemap.xml`.

**Opgeruimd**: de oude `/archive/`, `/uploads/`, `/screenshots/`, `/opt/` mappen en de editor-only `image-slot.js` + `.image-slots.state.json` zijn verwijderd. De map bevat nu uitsluitend de werkende site + hosting-bestanden.

---

## 8. Wat nooit mag

- Geen emoji's.
- Geen afgeronde hoeken op containers (enkel op knoppen als dat zo is gedefineerd — hier: geen).
- Geen gradiëntachtergronden (enkel de hero-scrim is toegestaan).
- Geen nieuwe kleuren buiten de CSS-variabelen.
- Geen "we" of "onze" in de copy.
- Geen "DOIA" als publiek merk.
- Geen `position: absolute` voor lay-out (enkel voor hero overlays).
- Geen inline `margin` tussen siblings — altijd `gap` in flex/grid.
- Geen font-weight 700 (bold).
- Geen `scrollIntoView()`.
- Geen Lorem Ipsum of Engelse placeholder-copy.

---

## 9. Bij aanpassingen

1. **Lees eerst** het betreffende bestand voor je schrijft.
2. **Gebruik `str_replace_edit`** voor gerichte aanpassingen — geen volledige herschrijvingen tenzij nodig.
3. **Respecteer het grid**: pas kolommen aan via de bestaande breakpoints.
4. **Nieuwe secties**: volg het patroon `.shell` + `.block` of `.shell` + eigen sectie-class met `border-top: 1px solid var(--line)`.
5. **Nieuwe copy**: altijd Nederlands, eerste persoon, binnen de tone of voice.
6. **Screenshot** om te verifiëren bij twijfel over uitlijning.
