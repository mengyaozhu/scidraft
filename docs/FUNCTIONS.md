# SciDraft — function → files map

This folder documents the theme's features *for maintainers*: what each function
does, and which files and code lines control it. It ships with the theme but is
ignored by the Hugo build — it never appears on any site.

How to read an entry:

- **Where it appears** — the user-visible surface.
- **Controlling files** — every file involved, with the symbol to look for
  (preferred) and the line number at the time of writing (line numbers drift;
  trust the symbol, use the number as a hint).
- **Config** — settings that change behavior without touching code.
- **Verify** — how to check the feature still works after a change.

> Status: one function documented so far (bottom-of-note recommendations).
> Rows will be added as more functions are written up.

| Function | Where it appears | Controlling files | Doc |
|---|---|---|---|
| Random recommendations | Box under every note, below prev/next navigation | `layouts/notes/single.html` (the `partial "note-recommendations.html"` call) · `layouts/_partials/note-recommendations.html` (selection logic) · `assets/css/extended/note-recommendations.css` (appearance) · `hugo.toml` → `recommendationCount` (how many) | [note-recommendations.md](note-recommendations.md) |
