# Asset loading (what each page loads)

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
(core + common + `assets/css/scidraft/*` + Chroma), `search.js`
(fuse + fastsearch + license), and the menu toggle. Anything in
`assets/css/scidraft/` is picked up automatically — that is the folder for
site/theme style additions.

## CDN dependencies

KaTeX, pseudocode.js, Mermaid, and citation-js load from jsDelivr. Offline
builds still work; the rendered features need network at view time.

## Analytics: none by default

The theme ships **no analytics**. `extend_head.html` has a marked placeholder
where a site owner can paste their own snippet (Google Analytics, Plausible,
etc.); a site can also override that partial entirely from its own
`layouts/_partials/extend_head.html`.

## Verify after a change

1. Build; open a note with an algorithm — pseudocode + KaTeX scripts present
   in the page source; a plain note without `math` should not load them.
2. The stylesheet bundle contains rules from `assets/css/scidraft/`.
