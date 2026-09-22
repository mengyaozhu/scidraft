+++
title = "Attention Entropy Falls with Depth (observation)"
date = 2026-09-21T11:02:00+09:00
tags = ["Demo", "Observation", "Attention"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Entropy is a convenient scalar summary of an attention row, and the observation reported
here is that its average falls as one moves up the layers: early heads spread their weight
widely, later heads concentrate it.

Like most observations about trained networks, this is a tendency rather than a rule, and
the note states the measured form and the conditions under which it was measured. The
useful part is the consequence for pruning and for interpretability, both of which care
whether a head is diffuse or focused.

**Observation.** For a trained decoder with \(L\) layers and \(H\) heads per layer,
let \(A^{(\ell, h)}\) be the attention matrix at layer \(\ell\) and head \(h\), averaged
over a held-out set of sequences. With the row entropy

$$
\mathcal{H}^{(\ell, h)} = -\frac{1}{T} \sum_{i=1}^{T} \sum_{j=1}^{T}
A^{(\ell, h)}_{ij} \log A^{(\ell, h)}_{ij} ,
$$

the observation is a decreasing trend in \(\mathcal{H}^{(\ell, h)}\) as \(\ell\)
increases, from values close to \(\log T\) in the first layers towards values well below
it in the last ones. Individual heads depart from the trend in both directions.

Average entropy is not the same as usefulness: a head that attends uniformly has maximum
entropy and carries little information, while a head that always attends to the same
relative offset can have low entropy and be essential, so the observation is a description
of the population rather than a criterion for any single head.
