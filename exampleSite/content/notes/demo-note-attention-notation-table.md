+++
title = "Notation for Multi-Head Attention (academic table)"
date = 2026-09-21T07:12:00+09:00
tags = ["Demo", "Attention", "Notation", "Tables"]
renderingTitle = "Notation Reference Table"
renderingCategory = "Tables"
renderingAliases = ["Notation Reference", "Symbol Table", "Attention Notation"]
renderingSummary = "Tabulates the symbols used for multi-head attention — shapes and meanings side by side — in the academic table style."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Multi-head attention reads better as shape bookkeeping than as prose: every
symbol below is a tensor, and the shapes alone decide which products are legal,
which is why papers about attention variants usually open with a notation table
before showing a single result.

The table below uses the academic three-rule style (`{.table-academic}`): a rule
above the table, a thin rule under the header, a rule at the bottom, and no
vertical lines — the shape journals and conference proceedings ask for. The
style is chosen per table with a block attribute on the Markdown table, so a
note can mix it with the default style without editing any stylesheet.

| Symbol | Shape | Meaning |
| :--- | :---: | :--- |
| \(X\) | \(T \times d_{\text{model}}\) | input embeddings of a sequence of \(T\) tokens |
| \(W^{Q}, W^{K}, W^{V}\) | \(d_{\text{model}} \times d_{\text{model}}\) | learned projections producing queries, keys and values |
| \(Q, K, V\) | \(T \times d_{\text{model}}\) | the projected sequence, one matrix per role |
| \(A\) | \(T \times T\) | attention weights, with every row summing to one |
| \(H\) | scalar | number of heads the projections are split into |
| \(d_{h}\) | scalar | head width, \(d_{\text{model}} / H\) |
| \(P\) | \(T \times d_{\text{model}}\) | concatenated head outputs, before the final projection |
{.table-academic}

Shapes are written without the batch dimension. Adding it gives
\(B \times T \times d_{\text{model}}\) for the inputs, and the per-head views
become \(B \times H \times T \times d_{h}\) once each projection is split — the
layout most implementations keep in memory, and the one that explains why the
head count \(H\) costs nothing in total width as long as \(d_{h}\) shrinks with
it.
