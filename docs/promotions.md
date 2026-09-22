# Promotions

Two mechanisms for promoting content, both under the `promotion-` family.

## 1. Promote a whole note into the feed

Set in a note's front matter:

```toml
promotion = true
```

The note leaves the chronological flow and becomes part of the promotion pool for
feed pages. How many appear on a page, and where, is set by `[params.feed]` in the
site config (`promotionsPerPage`, `promotionPositions`; defaults in the theme's
`hugo.toml`, where the count is 1). Positions are
counted in the final page of notes plus promotions, are distinct, and stay inside
the range — clamped to the page's last card if it is shorter. A promotion is not
repeated on the next page unless the pool is too small for that, which is the case
below twice the per-page count; with a single promotion it therefore appears on
every page. Logic lives in `layouts/_partials/feed-promotions.html`, called by
`notes-feed.html`.

## 2. Text promotion (inline card)

`{{< promotion-textual >}}` — a card with headline, subtitle, and one optional
pill button. Parameters drive the text and links; styles in
`assets/css/common/promotion-textual.css`.

## 3. Sponsored disclosure (not a separate style)

The inline card accepts `sponsored=true`:

```markdown
{{</* promotion-textual sponsored=true title="…" … */>}}
```

The flag switches every link in the block to `rel="sponsored noopener"` and
renders a small "Sponsored" label (`.promotion-sponsored-label`). Use it for
any paid or affiliate placement — unmarked commercial links risk
search-engine penalties.

## Verify after a change

1. A `promotion = true` note appears as card 3 on feed pages and is absent
   from the date flow.
2. The text promo card renders inside a note.
3. Links point where the parameters say (check the built HTML).
