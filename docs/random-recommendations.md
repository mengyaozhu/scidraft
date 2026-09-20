# Random recommendations (bottom of every note)

A bordered box under each note listing a few other notes, picked at random.
It appears on every note without any content action, and reshuffles on every
build.

## Where it appears

Every note page, directly below the prev/next navigation and above the
"back to feed" footer area.

## Controlling files

| File | Role | What to look for |
|---|---|---|
| `layouts/notes/single.html` | **Placement** — the only place the feature is invoked | `partial "related-random.html"` (line 29 at time of writing), immediately after `partial "note-nav-links.html"` |
| `layouts/_partials/related-random.html` | **Selection logic** — builds the list | the `$pool`, `$ranked`, `$pick` variables |
| `assets/css/extended/related-random.css` | **Appearance** — the box styling | the `.related-random` rules |
| `hugo.toml` (site root, `[params]`) | **Count** — how many notes are shown | `relatedCount` (line 17 at time of writing) |

## How the selection works (in `related-random.html`)

1. **Pool** — all pages from the sections named in `mainSections`, with
   promotions (`promotion = true`) and the current note itself excluded. So a
   note never recommends itself, and ads never appear as recommendations.
2. **Ranking** — each candidate gets a score from a hash of the *build
   timestamp* mixed with the current note's path and the candidate's path
   (`hash.XxHash`). Sorting by that score and taking the first N gives a
   different, non-repeating sample per note — and a fresh one on every build.
   This is deliberate; the randomness is the feature, not a bug. The same
   technique is reused by the visual promo rows.
3. **Output** — a `<nav class="related-random">` element with one link per
   pick. The CSS file styles exactly that class.

## Configuration

| Setting | Where | Effect |
|---|---|---|
| `relatedCount` | site `hugo.toml` → `[params]` | Number of recommendations (default 3 if missing). Any positive number; `0` or garbage falls back to 3 |

Note: the count is read from the **site** config. The theme's own
`hugo.toml` documents the parameter but does not set it, so a site that
configures nothing gets 3.

## Common customizations

| Want | Change |
|---|---|
| Different number | Set `relatedCount` in the site's `hugo.toml` |
| Remove the box entirely | Delete the `partial "related-random.html"` line in `notes/single.html` |
| Move it above the prev/next navigation | Swap the two `partial` lines in `notes/single.html` |
| Only recommend notes sharing tags (smart, not random) | Replace the ranking block in `related-random.html` with Hugo's `.Related` method — a starting implementation is parked at `reference/theme-candidates/shortcodes/` (site-level, not shipped) |
| Different look | Edit `.related-random` rules in `related-random.css` |

## Verify after a change

1. Build: `hugo` — no errors.
2. Open any note page; the box must list exactly `relatedCount` distinct links,
   none pointing to the note itself.
3. Rebuild and reload: the selection should change between builds (randomness
   working).
4. Grep check that the file paths named above still exist (renames happen —
   see `docs/FUNCTIONS.md`).
