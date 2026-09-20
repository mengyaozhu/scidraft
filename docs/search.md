# Search

Client-side search over all notes, on a dedicated page.

## Controlling files

| File | Role | Look for |
|---|---|---|
| `layouts/search.html` | The search page: input, results, previews, its **own MathJax** for preview math | `search-input`, `fetch('/index.json')` |
| `assets/js/fastsearch.js` + `fuse.basic.min.js` (PaperMod) | Bundled into `search.js` by `layouts/_partials/head.html` | `fuseOpts` |
| site `hugo.toml` → `[outputs]` | Generates `index.json` | `home = ["HTML", "RSS", "JSON"]` |

## Required site config

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

Hugo does not inherit `[outputs]` from theme configs — without this block the
search page loads but returns nothing.

## Notes

- Results are built in the browser from `index.json`; previews can contain
  math, which is why this one page still loads MathJax (the rest of the site
  renders math with KaTeX — see scientific-rendering.md).
- Notes with `searchHidden = true` are excluded from the index (used by the
  About page).
- The menu item for `/search/` is commented out in `hugo.toml` by default.

## Verify after a change

1. Build; confirm `public/index.json` exists.
2. On `/search/`, type a word from a note's title — results appear as you type.
3. A note with `searchHidden = true` never appears in results.
