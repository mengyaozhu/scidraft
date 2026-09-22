# Promotions

Three mechanisms for promoting content, all under the `promotion-*` family
(two organic variants, one sponsored).

## 1. Promote a whole note into the feed

Set in a note's front matter:

```toml
promotion = true
```

The note leaves the chronological flow and becomes part of the promotion pool for
feed pages. How many appear on a page, and where, is set by `[params.feed]` in the
site config (`promotionsPerPage`, `promotionPositions`; defaults in the theme's
`hugo.toml`, where the count is 0 so a default page carries none). Positions are
counted in the final page of notes plus promotions, are distinct, and stay inside
the range — clamped to the page's last card if it is shorter. A promotion is not
repeated on the next page unless the pool is too small for that, which is the case
below twice the per-page count; with a single promotion it therefore appears on
every page. Logic lives in `layouts/_partials/feed-promotions.html`, called by
`notes-feed.html`.

## 2. Text promotion (inline card)

`{{< promotion-textual >}}` — a card with headline, subtitle, and one or two
pill buttons. Parameters drive the text and links; styles in
`assets/css/common/promotion-textual.css`.

## 3. Visual promotion (image row)

`{{< promotion-visual >}}` — one row picked at random per build from a site
data file, rendered as an image gallery; each image links out.

| Parameter | Default | Meaning |
|---|---|---|
| `data` | `promotion-visual` | Site data file to read (`data/<name>.<ext>`) |
| `link` | `promotionLink` site param | Fallback link for images without their own |

```toml
[params]
  promotionLink = "https://example.com/"
```

## 4. Sponsored disclosure (not a separate style)

Both inline styles accept `sponsored=true`:

```markdown
{{</* promotion-textual sponsored=true title="…" … */>}}
{{</* promotion-visual sponsored=true */>}}
```

The flag switches every link in the block to `rel="sponsored noopener"` and
renders a small "Sponsored" label (`.promotion-sponsored-label`). Use it for
any paid or affiliate placement — unmarked commercial links risk
search-engine penalties.

The standalone `promotion-sponsored` shortcode was retired once this flag
existed; its archive lives at
`reference/function-archive/promotion-sponsored/` (see its RESTORE.md).

## Verify after a change

1. A `promotion = true` note appears as card 3 on feed pages and is absent
   from the date flow.
2. Both promo shortcodes render inside a note; the visual one changes its
   pick between builds.
3. Links point where the parameters say (check the built HTML).
