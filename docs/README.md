# SciDraft — function → files map

**Maintainer documentation.** This is the code-level map of the theme's
functions: what each one does and which files control it. For the
user-facing documentation — install, configuration, usage — see the
[theme's README](../README.md) in the theme root.

Ships with the theme but is ignored by the Hugo build (never appears on a
site). Each function's own doc lives in this folder next to this index.

How to read an entry: find the **symbol** (survives edits), treat line numbers
as hints, and use the **Verify** section of each doc after changes.

| Function | Where it appears | Controlling files | Doc |
|---|---|---|---|
| Notes feed (homepage + /notes/) | Homepage and /notes/ listing | `layouts/home.html` `layouts/_partials/notes-feed.html` (feed logic) · `layouts/notes/list.html` (section list) · `hugo.toml` params | [notes-feed.md](notes-feed.md) |
| Note cards | Every card in feeds and lists; the note page itself | `layouts/_partials/note-card.html` · `layouts/notes/single.html` · `assets/css/common/notes.css` | [note-cards.md](note-cards.md) |
| Preview markers + card titles | Card truncation, "Read more »", when a card shows its title | `note-card.html` (`findRESubmatch` on `.RawContent`, `showTitle`) · `layouts/_shortcodes/preview.html` | [note-cards.md](note-cards.md) |
| Identity (institute / author) | Card header line, page byline, `<meta name="author">`, RSS | `note-card.html`, `notes/single.html`, `_partials/author.html` · `hugo.toml` params `institute`/`author` | [identity.md](identity.md) |
| Note recommendations | Box under every note (random notes) | `notes/single.html` (call) · `_partials/note-recommendations.html` · `assets/css/common/note-recommendations.css` · `recommendationCount` | [note-recommendations.md](note-recommendations.md) |
| Promotions | Feed promo slot + inline promos (text/visual) with sponsored flag | `promotion = true` front matter · `_shortcodes/promotion-*.html` · `data/promotion-visual.*` · `promotionLink` param | [promotions.md](promotions.md) |
| Entry map (multi-series) | A–Z + categories pages per series (occupation-a-to-z, skill-a-to-z, …) | `_shortcodes/entry-a-to-z.html`, `entry-categories.html` · `assets/css/common/entry-map.css` · site `[params.entrySets.*]` · note front matter fields | [entry-map.md](entry-map.md) |
| Scientific rendering | Math, pseudo-algorithms, mermaid, citations | `_markup/render-codeblock-*.html` · `_shortcodes/references.html` · `_partials/extend_head.html` · site `[markup]` passthrough | [scientific-rendering.md](scientific-rendering.md) |
| Navigation | Header menus (with dropdowns), prev/next, numbered pagination | `_partials/header.html` · `assets/css/common/menu.css` · `assets/js/menu-toggle.js` · `_partials/note-nav-links.html` · `_partials/numbered-pagination.html` · `assets/css/common/numbered-pagination.css` | [navigation.md](navigation.md) |
| Search | /search/ page | `layouts/search.html` · `js/fastsearch.js` + Fuse (PaperMod) · `index.json` (site `[outputs]`) | [search.md](search.md) |
| Theme toggle (light/dark) | Header icon; site-wide theme | `_partials/header.html` (moon/sun SVGs) · `_partials/footer.html` (toggle JS, `pref-theme`) · `assets/css/common/header.css` | [theme-toggle.md](theme-toggle.md) |
| Scripts and asset loading | What loads on which page, and from where | `layouts/_partials/extend_head.html` (script hub) · `layouts/_partials/head.html` (bundles) · `assets/js/*` | [scripts-and-assets.md](scripts-and-assets.md) |
