+++
title = "Validation Loss by Model Size (bordered table)"
date = 2026-09-21T15:02:00+09:00
tags = ["Demo", "Scaling", "Tables"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A scaling study compares models of different sizes trained on the same token
budget. If the loss falls smoothly as capacity grows, the family is in a regime
where parameters still buy accuracy, and the fall can be summarised as a power
law in the parameter count rather than reported as a list of separate runs.

The table below is the theme's default table style: every cell carries a border,
the header row is tinted, and the numeric columns are right-aligned so that
digits line up vertically. That alignment comes from the delimiter row of the
Markdown table, not from the stylesheet, so an author can set it per column
without touching any CSS.

| Parameters | \(d_{\text{model}}\) | Heads | Validation loss | Perplexity |
| ---: | ---: | ---: | ---: | ---: |
| 25M | 384 | 6 | 3.412 | 30.3 |
| 50M | 512 | 8 | 3.128 | 22.8 |
| 125M | 768 | 12 | 2.914 | 18.4 |
| 350M | 1024 | 16 | 2.703 | 14.9 |
| 760M | 1280 | 20 | 2.561 | 12.9 |

Fitting the last four rows gives a loss that decays roughly as \(N^{-0.07}\),
near the exponent reported for larger model families, so the shape of the curve
is the expected one. The absolute numbers are not: the runs behind this demo
used a fraction of the usual token budget, which is why the closing paragraph of
a real note would carry the run configuration and the seed count instead.
