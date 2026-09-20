# Identity: institute and author

Every card and note page shows two identities: the institute name and the
author handle. The same `author` also feeds the page byline, the HTML meta
tag, and RSS.

## Controlling files

| File | Role | Look for |
|---|---|---|
| `layouts/_partials/note-card.html` | Card identity line | `$institute`, `$author`, `reflect.IsSlice` |
| `layouts/notes/single.html` | Same identity on the note page header | `$institute`, `$author` |
| `layouts/_partials/author.html` | Byline / meta / RSS author (PaperMod) | `.Params.author`, `site.Params.author` |
| `hugo.toml` (site) | The defaults | `institute`, `author` |

## Resolution order (per field, independently)

1. the note's front matter — `institute` / `author`
2. the site's `hugo.toml` `[params]`
3. the theme's own `hugo.toml` defaults

Accepted values: a plain string (`author = "mengyaozhu"`) or a list
(`author = ["Mengyao Zhu"]`). Cards show the first list entry; the byline
joins multiple authors with commas.

## Configuration

```toml
[params]
  institute = "My Lab"
  author = "myhandle"
```

Per note:

```toml
+++
institute = "Guest Lab"
author = "coauthor"
+++
```

## Verify after a change

1. A note with no identity fields shows the site defaults on its card, page
   byline, and `<meta name="author">`.
2. A note with both fields shows its own values everywhere.
3. A list-form author renders as the first item on the card and joined in the
   byline.
