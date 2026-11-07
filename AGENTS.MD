# AGENTS.md — Barragon Garage

Rules the owner has asked for so far. Follow them. Write these rules in English; all site copy is pt-PT.

## Project

- One-page showcase site for Barragon Garage, a motorcycle workshop.
- Purpose: only to showcase the work and point to social channels. It is NOT for bookings.

## Language

- All visible copy in European Portuguese (pt-PT).

## Look

- Keep the current display and design.
- Theme follows the logo: navy (~#1c2541), crimson accent #d93a63, cream (~#fdf8d8), charcoal.
- Headings: Bebas Neue. Body: Work Sans.
- Never invent a new identity.

## Stack

- React + JSX with NO build pipeline: React 18, ReactDOM and Babel standalone from CDNs.
- Scripts are plain `type="text/babel"` with window globals. No import/export.
- Classic JSX pragmas at top of each JSX file: `/** @jsxRuntime classic */ /** @jsx React.createElement */`.
- Scripts listed in dependency order in index.html.
- index.html stays minimal: root div, CDN scripts, stylesheet, fonts.

## Repo layout

- index.html
- styles/main.css
- src/main.jsx, src/App.jsx
- src/components/: Header, Hero, Sections (Services, About), Gallery, Social, Footer
- src/data/content.js (copy) and src/data/images.js (picture URLs and alt text)
- src/config/contact.js (contacts and social links)
- Keep the repo organised; delete files, code, CSS and content keys that are no longer needed.

## Configurable contacts

- All contact details and social links live ONLY in src/config/contact.js (`window.CONTACT`); components read from it.
- Never hardcode phone numbers or social URLs elsewhere.
- Contact is via round icon buttons only (WhatsApp, Instagram, Facebook; inline SVG) in header and footer.
- Do NOT show the phone number as text, no `tel:` link.
- No booking / "marcar visita" buttons or wording.
- No Contacto section, no location/map section, no address or hours unless the owner provides them.

## Page structure

- Nav: Serviços, Galeria, Sobre.
- Hero: full-viewport background photo with slow Ken-Burns zoom on load, text over it, transparent header that turns solid navy on scroll, no button.
- Serviços: examples only. Subtitle "Alguns dos serviços que fazemos", deduplicated short lists, closing "e muito mais…".
- Galeria: photos only (no headings or captions), as a puzzle/mosaic of square-ish tiles with hover zoom, crimson outline and lift animations, plus scroll reveal. Avoid visible photo repetition. Keep alt text.
- Sobre: LAST section before the footer. Says the workshop works with all brands and types (high-displacement carburettor or modern bikes, motocross, preparações), specialising in Portuguese mopeds such as Famel, Casal and other historic marques. No separate Marcas section.
- Footer.

## Images

- Pictures are library assets served at `-/asset/<storage id>/<hash>`.
- A real images/ folder was requested but needs the files uploaded to the repo (tools cannot copy bytes). When images are in images/, reference them from src/data/images.js only.
- Respect `prefers-reduced-motion` for all animations.

## Process

- No invented facts (no names, addresses, hours, prices).
- Small targeted edits.
- Verify in the preview (snapshot + console); only the Babel in-browser warning is acceptable.
