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
- Page size comes from the site's `pagination.pagerSize`. A promotion card is
  inserted **in addition** to it, as the third card of the page, so a page that
  shows a promotion carries one card more than the configured number.
  The promotion shown on a page is picked pseudo-randomly per build
  (`now.Unix` seeded hash), and never repeats the previous page's pick.
- Long notes appear as preview cards (see note-cards.md).

## Configuration

| Setting | Where | Effect |
|---|---|---|
| `pagination.pagerSize` | site `hugo.toml` | Notes per page in the feed (the theme itself sets 6 as a default) |

## Verify after a change

1. Build; open `/` and `/notes/` — both show the same feed.
2. Page 2+ exists and the numbered pagination bar renders.
3. A promotion card appears in position 3 when promotions exist; rebuild and
   confirm the pick rotates.
