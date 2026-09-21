# Note cards (and the preview / title system)

One partial renders every note card: in the feed, in lists, on the note page
itself, and in the promotion slot.

## Where it appears

Card list surfaces (homepage, `/notes/`, pagination pages) and the note's own
page header block.

## Controlling files

| File | Role | Look for |
|---|---|---|
| `layouts/_partials/note-card.html` | Card markup + preview extraction + title logic | `$preview`, `findRESubmatch`, `$showTitle`, `isset .Params "showtitle"` |
| `layouts/notes/single.html` | The note page layout (renders the card header + body) | `partial "related..."`, `$institute`, `$author` |
| `layouts/_shortcodes/preview.html` | The marker shortcode itself (renders inner text on the full page) | `.Inner` |
| `assets/css/extended/notes.css` | Card styling | `.note-card`, `.note-head`, `.note-body`, `.note-tags`, `.note-title`, `.note-readmore` |

## Preview markers

```markdown
{{</* preview */>}}
The part of a long note shown on its feed card.
{{</* /preview */>}}
```

- With markers: card shows the marked region + a **Read more »** link.
- Without markers: card shows the full content, no link.

The partial extracts the region from the page's raw markdown with
`findRESubmatch` (multiline), then renders it as markdown inside the card.

## Card titles

| `showTitle` | Markers present | Title on card |
|---|---|---|
| absent | yes | shown |
| absent | no | hidden |
| `true` | either | shown |
| `false` | either | hidden |

Implementation detail: front-matter keys are lowercased, so the lookup is
`isset .Params "showtitle"`. A note without a front-matter `title` never
renders an empty heading.

## Other card parts

- **Identity line** — institute + @author (see identity.md)
- **Timestamp** — links to the note; hidden on promotion cards
- **Tags** — from front matter `tags`, linking to tag pages
- **Avatar letter** — hardcoded `D` in the partial (candidate for a config
  parameter if the theme ships to other users)

## Verify after a change

1. A marked note shows preview + Read more; an unmarked one shows everything
   with no link.
2. A note with `showTitle = false` shows no card title even with markers.
3. Existing short notes' cards are visually unchanged (compare with a build
   from before the change).
