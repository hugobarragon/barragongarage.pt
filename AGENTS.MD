# AGENTS.md — Barragon Garage

Rules the owner has asked for so far. Follow them. Write these rules in English; all site copy is pt-PT.

## Project

- One-page showcase site for Barragon Garage, a motorcycle workshop.
- Purpose: establish the workshop's identity, showcase its work, and encourage visitors to follow its social channels.
- Keep the experience focused. It is not an online shop, booking platform, blog, or complex corporate site.

## Language

- All visible copy in European Portuguese (pt-PT).

## Design direction

- Use an authentic motorcycle-culture direction: industrial, raw, and heritage-inspired, balanced with a contemporary, readable experience.
- Preserve the Barragon Garage identity. The logo is the source of truth for the palette: navy #1C2541, crimson #D93A63, cream #FDF8D8, and charcoal #252525. Navy and cream lead; use crimson sparingly.
- Use Bebas Neue for headings and Work Sans for body text; keep the type system to these two main families.
- Favor strong typography, asymmetrical editorial layouts, and large, authentic workshop photography.
- Avoid generic landing-page patterns: excessive rounded cards, gradients, glassmorphism, decorative floating elements, repeated centered headings, unnecessary shadows, and meaningless icons.
- Keep animation subtle and respect `prefers-reduced-motion`.

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
- Use only verified, owner-provided contact and social profile details. Do not invent profile URLs or business information.
- Do not add booking functionality or booking language.
- Do not add an address, map, opening hours, or other unprovided business details.

## Page structure

- Keep a single-page structure with navigation, hero, introduction, services, featured work/gallery, about, social media, and footer/contact.
- Give each section a distinct purpose; avoid repeating taglines or calls to action across the hero, introduction, gallery, and social sections.
- Use the hero to communicate the workshop's character immediately with authentic photography and clear, concise copy.
- Present services so they are easy to scan. P1's suggested categories and copy are examples, not verified claims; confirm new services before publishing.
- Owner-confirmed scope: the workshop works with all brands and types of motorcycles (including high-displacement, carburettor, modern, and motocross bikes, plus custom preparations) and specialises in Portuguese mopeds such as Famel, Casal, and other historic marques.
- The owner has confirmed the broad service categories in `src/data/content.js`; do not add more specific capabilities without confirmation.
- Make the gallery image-led, using authentic workshop photography in an asymmetrical editorial composition. Preserve useful alt text and avoid repeating visible photos. A lightweight accessible lightbox is optional.
- Use the social section to invite visitors to follow the verified Instagram and Facebook profiles.
- Treat all proposed copy in P1 as draft. Do not publish unverified claims about services, history, experience, awards, certifications, customers, or team size.
- P1.md currently ends mid-section at “Optional Instagram”; do not infer missing requirements from the unfinished text.

## Images

- Pictures are library assets served at `-/asset/<storage id>/<hash>`.
- A real images/ folder was requested but needs the files uploaded to the repo (tools cannot copy bytes). When images are in images/, reference them from src/data/images.js only.
- Prefer authentic Barragon Garage photography; do not use generic stock imagery as a substitute.

## Process

- No invented facts, including names, addresses, hours, prices, services, or business history.
- Small targeted edits.
- Verify in the preview (snapshot + console); only the Babel in-browser warning is acceptable.
