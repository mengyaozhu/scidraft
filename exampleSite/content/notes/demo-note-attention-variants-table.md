+++
title = "Attention Variants for Long Contexts (striped table)"
date = 2026-09-21T07:32:00+09:00
tags = ["Demo", "Attention", "Long Context", "Tables"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Long-context attention is usually chosen on cost rather than on quality. What
decides whether a variant is usable at a given sequence length is how the score
cost and the per-token cache grow with \(T\), and both are easiest to compare
side by side in one table rather than across several paragraphs.

The table below uses the striped style (`{.table-striped}`): horizontal rules
and a tinted every-other row, which keeps a row readable once it runs past five
or six columns. Its cells hold plain text, typeset math, and a line break where
two short answers belong in one cell, so a wide comparison still fits one
screen.

| Variant | What it attends to | Score cost | Cache per token | Position signal | Parallel over \(T\) |
| :--- | :--- | ---: | ---: | :--- | :-: |
| Full | every earlier position | \(T^{2}\) | \(2 \cdot d_{\text{model}}\) | rotary or additive | yes |
| Sliding window | the last \(w\) positions | \(T w\) | \(2 \cdot d_{\text{model}}\) | rotary | yes |
| Block sparse | a fixed pattern of blocks | \(T \sqrt{T}\) | \(2 \cdot d_{\text{model}}\) | rotary | yes |
| Kernel (linear) | a running feature summary | \(T d_{\varphi}\) | \(2 \cdot d_{\varphi}\) | decayed features | yes |
| State space | a compressed recurrent state | \(T d_{s}\) | \(d_{s}\) | exponential decay | sequential<br>scan |
{.table-striped}

The cache column is the one that decides serving cost. A full-attention layer
keeps \(2 \cdot d_{\text{model}}\) numbers per token, so its memory grows with
sequence length even when the score cost is no longer the bottleneck, while a
state-space layer replaces that growth with a state whose size is fixed by
design.
