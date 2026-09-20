# Galleries

Image galleries inside note bodies.

## Usage

```markdown
{{</* gallery */>}}
  {{</* gallery-item image="/img/a.jpg" caption="Figure A" link="/notes/x/" */>}}
  {{</* gallery-item image="/img/b.jpg" caption="Figure B" */>}}
{{</* /gallery */>}}
```

## Controlling files

| File | Role | Look for |
|---|---|---|
| `layouts/_shortcodes/gallery.html` | Wrapper (`<div class="image-gallery">`) | `RenderString` |
| `layouts/_shortcodes/gallery-item.html` | One image: `image`, `caption` (also alt), `link` (new tab) | `gallery-item` |
| `assets/css/extended/gallery.css` | Styling (grid + hover) | `.image-gallery`, `.gallery-item` |

## Notes

- The visual promotion row reuses the same gallery classes, so gallery styling
  affects promo rows too.
- `link` opens in a new tab with `rel="noopener"`.

## Verify after a change

1. A note with a gallery shows the images laid out as a grid, captions under
   them, and links opening in a new tab.
