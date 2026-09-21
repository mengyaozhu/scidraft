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
| LaTeX text commands (bundled locally) | Page renders note bodies: a note, a standalone page, `/notes/` or the homepage | — |

Order inside `extend_head.html` matters for the last two blocks: the LaTeX-text
pass must stay below the math block, so that KaTeX has already replaced math text
nodes and the pass can skip `.katex` subtrees instead of rewriting a command that
belongs to an equation.

The notes-feed exception exists because feed pages render many notes' bodies
while `<head>` is emitted before the render hooks run, so per-page flags would
be missed.

The citations block is deliberately **not** given that exception, so on list
pages neither citation-js nor the bibliography is downloaded and `\cite{...}`
stays as plain text inside the cards. On a note page the shortcode alone decides:
the library loads whenever it is present, and `refs.bib` is fetched in the browser
only when the page actually has markers to number. The library is about 530 KB
over the wire (2.8 MB unpacked); `refs.bib` is 557 KB in the demo site.

## Local bundles

`layouts/_partials/head.html` builds fingerprinted bundles: the stylesheet
(licence banner → `core/` variables, reset and media queries → everything in
`common/` → Chroma themes → everything in `extended/`), `search.js`
(fuse + fastsearch + license). Two further local scripts are wired in
`extend_head.html`: the menu toggle and `js/latex-text.js`.

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
