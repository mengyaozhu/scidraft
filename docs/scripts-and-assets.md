# Scripts and asset loading

How SciDraft decides what to load on each page.

## The hub

`layouts/_partials/extend_head.html` is where nearly all page-level scripts are
wired. Blocks load only when needed:

| Block | Loaded when | Flag set by |
|---|---|---|
| Menu toggle (bundled locally) | Always | — |
| Mermaid (CDN) | Page has a mermaid block, **or** is the notes feed | `hasMermaid` store flag from the render hook |
| Pseudo-algorithm (CDN: pseudocode + KaTeX) | Page has a pseudo-algorithm block, or is the notes feed | `hasAlgorithm` |
| Math auto-render (CDN: KaTeX + auto-render) | `math = true` (site or note) | — |
| Citations (CDN: citation-js) | Page uses the `references` shortcode | `hasCitations` |

The notes-feed exception exists because feed pages render many notes' bodies
while `<head>` is emitted before the render hooks run, so per-page flags would
be missed.

## Local bundles

`layouts/_partials/head.html` builds fingerprinted bundles: the stylesheet
(licence banner → `core/` variables, reset and media queries → everything in
`common/` → Chroma themes → everything in `extended/`), `search.js`
(fuse + fastsearch + license), and the menu toggle.

Load order is deliberate: `common/` holds the theme's own styles, and
`extended/` — whose `custom.css` begins empty — is loaded last, so a site
owner's additions there override the theme without `!important`.

## CDN dependencies

KaTeX, pseudocode.js, Mermaid, and citation-js load from jsDelivr. Offline
builds still work; the rendered features need network at view time.

## Known site-specific item

`extend_head.html` currently contains a **Google Analytics tag with a
hardcoded tracking ID**. It is site-specific and should move to site config
(or be removed) before the theme is published — as shipped, every user's site
would report to that property.

## Verify after a change

1. Build; open a note with an algorithm — pseudocode + KaTeX scripts present
   in the page source; a plain note without `math` should not load them.
2. The stylesheet bundle contains rules from `assets/css/common/`.
