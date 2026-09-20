# Glossary

Inline glossary terms with a right-side panel that lists definitions.

## Usage

Once per note, place the panel:

```markdown
{{</* glossary */>}}
```

Then mark terms inline:

```markdown
{{</* glossary-term id="dms" def="Document Management System" */>}}DMS{{</* /glossary-term */>}}
```

## Controlling files

| File | Role | Look for |
|---|---|---|
| `layouts/_shortcodes/glossary.html` | Panel markup + its scroll-tracking script | `glossary-panel` |
| `layouts/_shortcodes/glossary-term.html` | The inline span: `id`, `def` | `data-gid`, `data-def` |

## How it works

The inline term renders as a highlighted span carrying `data-gid` and
`data-def`. The panel shortcode's script collects all terms on the page into
the side panel and highlights the one currently in view while scrolling.

## Notes

- Without `{{< glossary >}}` on the page, terms still render as spans but the
  panel is absent.
- Terms and panel are styled by class names defined in the shortcode markup;
  there is no dedicated stylesheet.

## Verify after a change

1. A note with the panel shows a glossary box listing each term and definition.
2. Scrolling highlights the term in view.
