# Entry indexes (entry-map / entry-categories)

Two auto-generated index pages over notes that carry structured front-matter
fields. One mechanism, many **series**: each series of notes gets its own map
page and categories page, using its own field names.

## Where it appears

Any page whose body calls the shortcodes — typically two pages per series:

```markdown
{{</* entry-map set="occupations" */>}}          <!-- alphabetical -->
{{</* entry-categories set="occupations" */>}}   <!-- grouped by category -->
```

## Controlling files

| File | Role | Look for |
|---|---|---|
| `layouts/_shortcodes/entry-map.html` | Alphabetical index | `$titleField`, `$pool`, `$sorted` |
| `layouts/_shortcodes/entry-categories.html` | Grouped index | `$categoryField`, `$categories`, `Uncategorised` |
| `assets/css/extended/entry-index.css` | Styling for both | `.entry-*` classes |
| site `hugo.toml` → `[params.entrySets.*]` | One block per series | field names + membership + label |
| the notes | The data | the fields named in the set |

## The set model

A **set** names the front-matter fields for one series and (optionally) how
membership is decided:

```toml
[params.entrySets.occupations]        # series 1 — the shipped example
  titleField    = "occupationTitle"   # required: presence of this field makes a note an entry
  categoryField = "occupationCategory"
  aliasesField  = "alternativeTitles"
  summaryField  = "shortDescription"
  tag           = "Working with Agentic AI"   # optional: only notes with this tag
  countLabel    = "Occupations"               # the word in the count line

[params.entrySets.skills]             # series 2 — same mechanism, its own fields
  titleField    = "skillTitle"
  categoryField = "skillCategory"
  aliasesField  = "skillAliases"
  summaryField  = "skillSummary"
  tag           = "Agentic Skill"
  countLabel    = "Skills"
```

Resolution: per-call parameter → the set's block → theme defaults
(`entryTitle` / `entryCategory` / `entryAliases` / `entrySummary`, no tag).

## How it works

1. Pool = pages in `mainSections`; if the set has a `tag`, only notes carrying
   it; then only those **with a `titleField` value** — that field's presence is
   what makes a note an entry.
2. `entry-map` sorts by the title field and prints a letter jump bar plus one
   block per entry (name, aliases, description, link).
3. `entry-categories` groups by the category field, alphabetically, with an
   "Uncategorised" section for entries with a blank category.
4. Field lookups are lowercased — Hugo stores front-matter keys lowercase.

## Adding another series

1. Add a `[params.entrySets.<name>]` block naming that series' fields.
2. Give the series' notes a value for the `titleField` (and category/aliases/
   summary as wanted).
3. Create two pages calling `{{< entry-map set="<name>" >}}` and
   `{{< entry-categories set="<name>" >}}`.
4. Add menu entries if desired.

## Verify after a change

1. Both pages of a series list exactly the notes that carry the title field
   (and the tag, when set) — no more, no fewer.
2. Count lines show the right label ("3 Occupations Covered", "3 Skills
   Covered in 3 Categories").
3. A note missing only the category still appears, under "Uncategorised".
4. Switch `set=` to a different series: the same page renders that series'
   entries — proving the sets are independent.
