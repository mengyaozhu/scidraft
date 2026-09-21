# Scientific rendering: math, algorithms, diagrams, tables, citations

Four rendering pipelines, all wired through the theme's script hub
`layouts/_partials/extend_head.html`, plus the table skins below.

## Math (KaTeX, in the browser)

| Layer | Where | Notes |
|---|---|---|
| Renderer | KaTeX auto-render, loaded by `extend_head.html` when `math = true` (site param or per note) | Typesets `$..$`, `$$..$$`, `\(..\)`, `\[..\]` inside `.md-content` / `.post-content`; skips pre/code |
| Delimiter preservation | **site** `hugo.toml` → `[markup.goldmark.extensions.passthrough]` | **Required.** Hugo does not merge `[markup]` from theme configs, so each site must set it (see README quick start) |
| Styles | `katex.min.css` (CDN) | Loaded with the auto-render block |

If math shows as raw text, the cause is almost always the missing passthrough
block in the *site* config, or `math` not enabled.

**One trap to know:** never write a literal `<` (or `&`) inside math delimiters.
The passthrough keeps it verbatim, so the browser reads it as the start of an
HTML tag and silently swallows the text that follows. Write `\lt` for "<" —
e.g. `x_{\lt t}` — and `\amp` for "&".

## Pseudo-algorithms (pseudocode.js + KaTeX)

Write a fenced block:

````markdown
```pseudo-algorithm
\begin{algorithmic}[1]
\State ...
\end{algorithmic}
```
````

- `layouts/_markup/render-codeblock-pseudo-algorithm.html` stores the source
  in a hidden `<pre>` and flags the page (`hasAlgorithm`).
- `extend_head.html` loads pseudocode.js + KaTeX on flagged pages, sanitizes
  paper-LaTeX idioms (`\(..\)` → `$..$`, drops `[H]`, `\footnotesize`,
  `\label`), and renders; on failure it shows the raw source instead of an
  empty box.

## Mermaid diagrams

Fenced ```` ```mermaid ```` blocks; the render hook flags the page and
`extend_head.html` loads Mermaid from CDN. Loaded on flagged pages plus the
notes feed (whose cards can contain diagrams).

## Tables (Markdown, three skins)

Plain Markdown tables use the default skin: bordered cells and a tinted header
row. Column alignment comes from the delimiter row (`:--`, `:-:`, `--:`), so a
numeric column can be right-aligned without touching CSS.

Two other skins are selected per table by a Goldmark block attribute on the line
after the table. The site must enable block attributes
(`markup.goldmark.parser.attribute.block = true`; the theme cannot supply it —
Hugo does not merge `[markup]` from theme configs):

````markdown
| Parameters | Loss  |
| ---------: | ----: |
| 125M       | 2.914 |
{.table-academic}
````

| Skin | Attribute | Look |
|---|---|---|
| Default | none | Bordered cells, tinted header row |
| Academic | `{.table-academic}` | Rules above, under the header and at the bottom; no vertical lines, no tint |
| Striped | `{.table-striped}` | Horizontal rules plus a tinted every-other row |

Styling lives in `assets/css/common/table.css` (the variants) over the base skin
in `md-content.css`. Both variants take their colours from the theme variables,
so light and dark modes need no separate rules, and both carry `!important` on
the cell properties: the base rule is
`.md-content table:not(.highlighttable, .highlight table, .gist .highlight) td`,
whose `:not()` list is weighted by its heaviest argument (`.gist .highlight`,
two classes), which no single extra class can outrank.

## Citations (citation-js + BibTeX)

- References live in the **site's** `assets/bib/refs.bib`.
- Cite with `\cite{key}` in note text; the loader numbers them by first
  appearance.
- Place `{{< references >}}` where the bibliography should render;
  `layouts/_shortcodes/references.html` creates the container and flags the
  page (`hasCitations`); `extend_head.html` loads citation-js and fills the
  container with APA entries.
- Raw `pre`/`code` blocks are skipped, so syntax examples stay literal.
- Styling: `assets/css/common/references.css` — named after the block it
  mostly styles; it also holds the one rule for inline citation markers.

## Search page exception

The search page generates result previews in the browser and loads its **own**
MathJax (in `layouts/search.html`) to typeset math inside those previews.
That is the only MathJax left in the theme.

## Verify after a change

1. A note with `$x^2$` shows rendered math (not raw text) after load.
2. A pseudo-algorithm block renders with line numbers; its math is typeset.
3. A mermaid fence renders a diagram.
4. `\cite{...}` becomes a numbered link; `{{< references >}}` lists entries.
5. A table carrying `{.table-academic}` or `{.table-striped}` changes skin,
   while neighbouring tables keep the default one.
6. Check the browser console for CDN load failures (all four pipelines rely on
   jsDelivr).
