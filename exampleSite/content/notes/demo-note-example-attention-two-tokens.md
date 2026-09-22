+++
title = "Attention with Two Tokens (example)"
date = 2026-09-21T08:32:00+09:00
tags = ["Demo", "Example", "Attention"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The smallest interesting attention example has two positions and one head, which is
enough for a full calculation with no matrix product larger than two by two.

Working it at this size makes the two roles visible: the score decides how much the output
at position two borrows from position one, and the value vectors set what is borrowed. With
a causal mask, the first row has nothing to attend to but itself.

**Example.** Let \(d_h = 2\) and take

$$
Q = K = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}, \qquad
V = \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix} .
$$

The unnormalised scores are \(QK^{\top} = I\), so with \(\sqrt{d_h} = \sqrt{2}\) the
scaled scores are the identity divided by \(1.414\): \(0.707\) on the diagonal and zero
elsewhere. After the causal mask the upper-right entry is set to \(-\infty\), giving

$$
S_{\text{masked}} = \begin{pmatrix} 0.707 & -\infty \\ 0 & 0.707 \end{pmatrix},
\qquad
A = \begin{pmatrix} 1 & 0 \\ 0.354 & 0.646 \end{pmatrix},
$$

where the second row of \(A\) splits its weight between the two positions because the two
scores there are \(0\) and \(0.707\). The output is then

$$
A V = \begin{pmatrix} 1 & 0 \\ 0.354 & 1.293 \end{pmatrix} .
$$

Row one returns the first value vector unchanged — it had nowhere else to look.

The example is worth keeping in mind when reading an attention map: a row that concentrates
on one position is not necessarily a strong match, since the causal mask forces the first
row into that shape regardless of the scores.
