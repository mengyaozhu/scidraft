# SciDraft

**A modern Hugo theme for scientific writing and research.**

Built for quick research notes and comprehensive scientific articles — one content
type, with BibTeX citations, KaTeX math, mermaid diagrams, pseudo-algorithm
blocks, galleries, and per-series A–Z / category indexes (the entry map).

[![Minimum Hugo Version](https://img.shields.io/static/v1?label=Hugo&message=v0.146.0%2B&color=blue&logo=hugo)](https://github.com/gohugoio/hugo/releases/tag/v0.146.0)

> Based on [hugo-PaperMod](https://github.com/adityatelange/hugo-PaperMod) by Aditya Telange (MIT).

Demo: [dycoai.com](https://dycoai.com/)

---

## Quick start

```toml
# hugo.toml (minimum for a SciDraft site)
baseURL = "https://example.com/"
title = "My Research Site"
theme = "SciDraft"

# Required for the built-in search page (Hugo does not inherit this from themes)
[outputs]
  home = ["HTML", "RSS", "JSON"]

# Required for math in note bodies: preserve \( \) and $$ $$ delimiters
# through Markdown so KaTeX auto-render can typeset them. Like [outputs],
# this cannot be supplied by the theme — Hugo does not merge [markup].
[markup]
  [markup.goldmark]
    [markup.goldmark.extensions.passthrough]
      enable = true
      [markup.goldmark.extensions.passthrough.delimiters]
        block = [['$$', '$$'], ['\[', '\]']]
        inline = [['\(', '\)'], ['$', '$']]
```

Put notes in `content/notes/*.md`. Short notes render in full inside the feed;
long articles use preview markers (below). A minimal note:

```toml
+++
title = "A Short Note"
date = 2026-01-15
tags = ["Topic"]
+++

The note body in Markdown.
```

---

## The content model: one type, any length

Everything is a *note*. Length is a property of the content, not a separate type.

### Preview markers (long articles)

Wrap the part that should appear on the feed card:

```markdown
## 1. Introduction

{{</* preview */>}}
Opening paragraphs that appear on the card …
{{</* /preview */>}}

The rest of the article — only on the note's own page.
```

- With markers: the card shows the marked region plus a **Read more »** link.
- Without markers: the card shows the full content and no link.

### Card titles

| `showTitle` | Preview markers | Title on card |
|---|---|---|
| absent | present | **shown** |
| absent | absent | hidden |
| `true` | any | **shown** |
| `false` | any | hidden |

The front-matter flag always wins over the marker rule. A note with no
front-matter `title` never renders an empty heading.

### Promotions

Mark a note `promotion = true` to pull it out of the chronological flow and
feature it as the third card on feed pages (rotating per build, never twice in
a row).

---

## Identity: institute and author

Every card and note page shows an institute name and an author handle. The
resolution order is:

1. the note's own front matter (`institute`, `author`)
2. the site defaults in `hugo.toml`
3. the theme defaults (`DyCoAI.com`, `mengyaozhu`)

```toml
# hugo.toml — one place for all notes
[params]
  institute = "My Lab"
  author = "myhandle"
```

```toml
# a single note can override either value
+++
institute = "Guest Lab"
author = "coauthor"
+++
```

`author` also feeds the page byline, `<meta name="author">`, and RSS. Both a
plain string and a list (`author = ["A", "B"]`) are accepted; the card shows
the first, the byline joins them.

---

## Configuration reference

```toml
[params]
  # Content
  mainSections = ["notes"]     # sections that feed listings (used by occupation
                               # indexes and random recommendations)
  math = true                  # KaTeX math rendering
  homeNotesFeed = true         # true = notes feed homepage, false = classic post list

  # Identity defaults (see above)
  institute = "DyCoAI.com"
  author = "mengyaozhu"

  # Recommendations under each note
  recommendationCount = 3      # any number; invalid values fall back to 3

  # PaperMod-compatible toggles
  ShowShareButtons = true
  ShowReadingTime = true
  ShowToc = true
  ShowBreadCrumbs = true
  ShowPostNavLinks = true
  ShowCodeCopyButtons = true
  ShowRelatedPosts = true
```

### Math

Math is typeset by **KaTeX at build time** — formulas arrive in the HTML
already rendered, with no client-side math library on content pages. Inline
`\( … \)` / `$ … $` and display `\[ … \]` / `$$ … $$` both work. The search
page loads MathJax itself, because search previews are generated in the
browser.

### Citations

Put your references in `assets/bib/refs.bib`, cite with `\cite{key}` in the
text, and place the `{{</* references */>}}` shortcode where the bibliography
should render.

---

## Shortcodes

| Shortcode | Purpose |
|---|---|
| `{{</* preview */>}}…{{</* /preview */>}}` | Mark the feed-card region of a long note |
| `{{</* references */>}}` | Render the BibTeX bibliography (see Citations) |
| `{{</* gallery */>}}` + `{{</* gallery-item image=… caption=… link=… */>}}` | Image gallery |
| `{{</* entry-a-to-z set="…" */>}}` | A–Z index over notes with a configured title field |
| `{{</* entry-categories set="…" */>}}` | The same entries grouped by a configured category field |
| `{{</* promotion-visual */>}}` | Rotating image promotion from a site data file (any item set; the shipped data is a resume-template example) |
| `{{</* promotion-textual */>}}` | Text-based promotional card |
| ```` ```pseudo-algorithm ```` (fence) | LaTeX `algorithmic` block, rendered by pseudocode.js + KaTeX |
| ```` ```mermaid ```` (fence) | Mermaid diagram |

### The entry map (one mechanism, many series)

`entry-a-to-z` and `entry-categories` build index pages over notes that carry
structured fields. Each **series** of notes gets its own map page, categories
page, and field names — defined once in the site config:

```toml
[params.entrySets.occupations]
  titleField    = "occupationTitle"
  categoryField = "occupationCategory"
  aliasesField  = "alternativeTitles"
  summaryField  = "shortDescription"
  tag           = "Working with Agentic AI"   # optional membership filter
  countLabel    = "Occupations"

[params.entrySets.skills]                     # a second series, its own fields
  titleField    = "skillTitle"
  categoryField = "skillCategory"
  aliasesField  = "skillAliases"
  summaryField  = "skillSummary"
  tag           = "Agentic Skill"
  countLabel    = "Skills"
```

A note becomes an entry by carrying the series' `titleField` value. Pages then
select a series: `{{</* entry-a-to-z set="skills" */>}}`. Without any config, the
theme falls back to generic field names (`entryTitle`, `entryCategory`,
`entryAliases`, `entrySummary`).

---

## Maintainer documentation

A code-level map of every function — what it does and which files control it —
is in [`docs/README.md`](docs/README.md), with one detail page per function.

## Layouts and styling

- `layouts/` — templates (`_partials/`, `_shortcodes/`, `_markup/` render hooks,
  `notes/` section layouts)
- `assets/css/core/` — palette variables (`theme-vars.css`)
- `assets/css/common/` — PaperMod base styles
- `assets/css/extended/` — SciDraft's own styles (notes, citations, galleries,
  occupation map, …) — the place to add overrides
- `assets/js/` — search, menu toggle, license notices

---

## License

MIT, with the inherited copyright notices preserved — see [LICENSE](LICENSE).
