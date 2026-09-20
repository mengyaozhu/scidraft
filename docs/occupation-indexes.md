# Occupation indexes

Two auto-generated reference pages listing every note that carries occupation
metadata.

## Where it appears

`/occupation-map/` (alphabetical, with alternative titles) and
`/occupation-categories/` (grouped by category). Each page's body is a single
shortcode call.

## Controlling files

| File | Role | Look for |
|---|---|---|
| `layouts/_shortcodes/occupation-map.html` | Alphabetical index | `occupationTitle`, `sort` |
| `layouts/_shortcodes/occupation-categories.html` | Category grouping | `occupationCategory` |
| `assets/css/extended/occupation-map.css` | Styling for both | `.occupation-*` |
| Content pages | The data source | note front matter fields below |

## Note front matter fields

| Field | Purpose |
|---|---|
| `occupationTitle` | The occupation name (presence of this field is what makes a note appear in the indexes) |
| `occupationCategory` | Grouping used by the categories page |
| `alternativeTitles` | Job-market synonyms shown under the title |
| `shortDescription` | One-line summary shown in each entry |

## How it works

Both shortcodes collect pages from `site.Params.mainSections` (so a section
rename needs no change here), filter to those with an `occupationTitle`, and
render the fields. Links point at the notes themselves.

## Verify after a change

1. Both pages list every note with an `occupationTitle`.
2. Adding the field to a new note makes it appear on both pages after a
   rebuild, in the right letter group / category.
