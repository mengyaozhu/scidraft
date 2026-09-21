# Navigation

Three navigation surfaces: the **site menus** (header, which you configure),
**note-to-note navigation** (prev/next), and **feed pagination** (the numbered
page bar). The first is a setting you edit; the other two are automatic.

## Site menus

| File | Role |
|---|---|
| site `hugo.toml` → `[menu.main]` | The menu itself: items, weights, parents, `[menu.main.params] note` (subtitle) |
| `layouts/_partials/header.html` | Renders the menu, theme toggle, site title |
| `assets/css/scidraft/menu.css` | Dropdown styling (hover for pointers, focus for keyboard) |
| `assets/js/menu-toggle.js` | Tap-to-toggle for touch devices: toggles `.open` on the parent `li` and syncs `aria-expanded` |
| `layouts/baseof.html` | Bundles menu-toggle.js and deliberately does **not** cache the header |

Menu internals: items with a `parent` become dropdown children; the optional
`note` param renders the grey subtitle under a child's name.

## Note-to-note navigation

`layouts/_partials/note-nav-links.html` — the « Prev / Next » box on note
pages. The pool is the `notes` section, so notes navigate among notes only
(not site-wide). Called from `layouts/notes/single.html`.

## Feed pagination

`layouts/_partials/numbered-pagination.html` + `assets/css/scidraft/numbered-pagination.css`
— the page bar (‹ 1 … 4 … 9 ›) under feeds and lists. Called from
`home.html`, `list.html`, and `notes-feed.html`. Deliberately does not reuse the
inherited `.pagination` class (its pill rules conflict).

## Verify after a change

1. Menu dropdowns open on hover, keyboard focus, and tap (narrow window).
2. Prev/next links move between notes and wrap correctly at the ends.
3. The pagination bar shows the current page filled and links to the rest.
