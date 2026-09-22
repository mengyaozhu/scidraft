# Notes feed (homepage and /notes/)

The site's primary reading surface: cards of notes with identity line,
timestamp, body (or preview), read-more link, and tags.

## Where it appears

- Homepage — always the notes feed (SciDraft has one homepage model)
- `/notes/` — always the same feed, paginated
- Both render the identical partial, so a change applies to both

## Controlling files

| File | Role | Look for |
|---|---|---|
| `layouts/home.html` | Renders the feed on the homepage | the `partial "notes-feed.html"` call |
| `layouts/_partials/notes-feed.html` | Feed logic: which notes, promo rotation, pagination | `$realNotes`, `$promos`, `$regular`, `.Paginate`, `$seed` |
| `layouts/notes/list.html` | Makes `/notes/` render the shared feed | `partial "notes-feed.html"` |
| `layouts/_partials/note-card.html` | Each card's markup (see note-cards.md) | — |
| `layouts/_partials/numbered-pagination.html` | The page bar under the feed | — |
| `assets/css/common/notes.css` | Feed/card styling | `.notes-feed`, `.note-card` |

## How it works

- Notes are `content/notes/*.md` pages with non-empty content; **promotions**
  (`promotion = true`) are excluded from the date flow.
- Page size and promotions come from one settings table, `[params.feed]`, with
  the theme's defaults in the theme's `hugo.toml` overridden by the same table in
  the site config: `notesPerPage`, `promotionsPerPage` (1 by default) and `promotionPositions` (a range such as `"3-5"`).
  A page therefore holds notes **plus** promotions: 9 notes with 2 promotions is a
  page of 11 cards, and positions are counted in that final sequence.
- `layouts/_partials/feed-promotions.html` decides which promotions the page
  shows and where: never the same promotion twice on one page, distinct positions
  inside the range, and never a promotion on two consecutive pages — unless the
  pool is too small for that, which is the case below twice the per-page count
  (2 per page need 4, 3 need 6). With a single promotion it is therefore shown on
  every page. Draws are seeded on the build time, so a rebuild rearranges the
  feed and a reload does not.
- Long notes appear as preview cards (see note-cards.md).

## Configuration

| Setting | Where | Effect |
|---|---|---|
| `params.feed.notesPerPage` | theme `hugo.toml`, overridden by site | Notes on each feed page (theme default 8) |
| `params.feed.promotionsPerPage` | theme `hugo.toml`, overridden by site | Promotion cards added on top of them (theme default 1; 0 holds only notes) |
| `params.feed.promotionPositions` | theme `hugo.toml`, overridden by site | Range of card positions a promotion may take, in the final page |
| `pagination.pagerSize` | site `hugo.toml` | Other list pages; the notes feed uses `notesPerPage` instead |

## Verify after a change

1. Build; open `/` and `/notes/` — both show the same feed.
2. Page 2+ exists and the numbered pagination bar renders.
3. A promotion card appears in position 3 when promotions exist; rebuild and
   confirm the pick rotates.
