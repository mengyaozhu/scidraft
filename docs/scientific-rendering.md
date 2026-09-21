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

**Two traps to know.** First, never write a literal `<` (or `&`) inside math
delimiters: the passthrough keeps it verbatim, so the browser reads it as the
start of an HTML tag and silently swallows the text that follows. Write `\lt`
for "<" — e.g. `x_{\lt t}` — and `\amp` for "&".

Second, inside a display block, never let a line *begin* with a character that
Markdown reads as a list marker: `-`, `+`, `*`, or a digit followed by `.` or
`)`. A long equation split across lines is the usual way this happens —

$$
a = b
+ c
$$

— and Markdown turns the second line into a bullet, so the equation is rendered
as a stray paragraph of LaTeX followed by a list item. Put the operator at the
end of the previous line instead:

$$
a = b +
c
$$

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

- Reference files live under the **site's** `assets/bib/`, one per paper —
  `bib/paper-a.bib`, `bib/paper-b.bib`. There is no default file: the shortcode
  must name the one a note uses, so a note can never silently cite the wrong
  bibliography.
- Place `{{< references bib="bib/paper-a.bib" title="References" >}}` where the
  bibliography should render. `bib` is required and is the path under `assets/`;
  `title` is optional and becomes the heading above the list. A missing argument
  or a file that does not exist fails the build, naming the note.
  `layouts/_shortcodes/references.html` creates the container and flags the page
  (`hasCitations`); `extend_head.html` loads citation-js and fills the container
  with the entries.
- Cite with `\cite{key}` in note text. Each list is numbered from 1 and holds
  the citations of the text **before** it that no earlier list has claimed, so a
  note may carry several lists with different files — a main bibliography and a
  second one further down, say. Markers that come after every list stay as
  written.
- Raw `pre`/`code` blocks are skipped, so syntax examples stay literal, as are
  typeset equations and the bibliography itself.
- Comment lines are removed from a bibliography before it is parsed: `%` starts a
  comment in BibTeX, and citation-js fails on a file containing one, even a
  commented-out entry. A file that still cannot be parsed is reported in the list
  itself rather than left blank.
- Raw `pre`/`code` blocks are skipped, so syntax examples stay literal.
- Styling: `assets/css/common/references.css` — named after the block it
  mostly styles; it also holds the one rule for inline citation markers.
- Loading is conditional on the shortcode, not on `\cite{...}` markers. A page
  without the shortcode downloads neither citation-js nor the bibliography and
  leaves the markers as plain text. A page with the shortcode but no markers
  still loads the library, while the bibliography is not fetched: the loader
  returns before the request when it finds nothing to number.
- Cost, paid by pages that use the shortcode: citation-js is about 530 KB over
  the wire (2.8 MB unpacked, from jsDelivr), and each list's own bibliography is
  fetched in the browser after the page has loaded — which is why the reference
  list appears a moment after the text. Two lists naming the same file fetch it
  once. List pages load neither, because their `<head>` is written before the
  cards' shortcodes run.

## LaTeX text commands (\textbf, \textit, \emph, \texttt)

Prose pasted out of a LaTeX source often carries commands that Markdown has no
meaning for and KaTeX will not touch, because they sit outside math delimiters.
`assets/js/latex-text.js`, loaded by `extend_head.html`, converts the four that
appear in practice into their HTML equivalents: bold, italic, emphasis and code.
Commands inside code blocks, inside an equation, or in the bibliography are
skipped, and an argument whose braces do not balance is left exactly as written.

Two consequences worth knowing. The conversion happens in the browser, so the raw
command is visible for a moment while the page loads, the same way citations
behave. And because the script skips `.katex` subtrees, its tag must stay below
the math block in `extend_head.html`: that ordering is what guarantees a command
belonging to an equation is never rewritten.

If you write notes yourself, prefer Markdown (`**bold**`, `*italic*`, `` `code` ``)
and treat this pass as a safety net for pasted material.

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
6. `\textbf{...}` in note text renders bold, while the same command inside a code
   block stays literal.
7. Check the browser console for CDN load failures (all four pipelines rely on
   jsDelivr).
