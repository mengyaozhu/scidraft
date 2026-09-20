# Scientific rendering: math, algorithms, diagrams, citations

Four rendering pipelines, all wired through the theme's script hub
`layouts/_partials/extend_head.html`.

## Math (KaTeX, in the browser)

| Layer | Where | Notes |
|---|---|---|
| Renderer | KaTeX auto-render, loaded by `extend_head.html` when `math = true` (site param or per note) | Typesets `$..$`, `$$..$$`, `\(..\)`, `\[..\]` inside `.md-content` / `.post-content`; skips pre/code |
| Delimiter preservation | **site** `hugo.toml` → `[markup.goldmark.extensions.passthrough]` | **Required.** Hugo does not merge `[markup]` from theme configs, so each site must set it (see README quick start) |
| Styles | `katex.min.css` (CDN) | Loaded with the auto-render block |

If math shows as raw text, the cause is almost always the missing passthrough
block in the *site* config, or `math` not enabled.

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

## Citations (citation-js + BibTeX)

- References live in the **site's** `assets/bib/refs.bib`.
- Cite with `\cite{key}` in note text; the loader numbers them by first
  appearance.
- Place `{{< references >}}` where the bibliography should render;
  `layouts/_shortcodes/references.html` creates the container and flags the
  page (`hasCitations`); `extend_head.html` loads citation-js and fills the
  container with APA entries.
- Raw `pre`/`code` blocks are skipped, so syntax examples stay literal.

## Search page exception

The search page generates result previews in the browser and loads its **own**
MathJax (in `layouts/search.html`) to typeset math inside those previews.
That is the only MathJax left in the theme.

## Verify after a change

1. A note with `$x^2$` shows rendered math (not raw text) after load.
2. A pseudo-algorithm block renders with line numbers; its math is typeset.
3. A mermaid fence renders a diagram.
4. `\cite{...}` becomes a numbered link; `{{< references >}}` lists entries.
5. Check the browser console for CDN load failures (all four pipelines rely on
   jsDelivr).
