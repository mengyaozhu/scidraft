+++
title = "Power-Law Scaling (conjecture)"
date = 2026-09-21T07:22:00+09:00
tags = ["Demo", "Conjecture", "Statistics"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A conjecture is a statement believed on the weight of evidence but not proved, and the
best-known one in this field concerns how loss falls as models grow. Fits are tight over
the measured range, and the conjecture is that the same form continues past it.

Nothing in the mathematics forces the form; it is adopted because the residuals of the fit
are small and because the constants that come out are stable across independent studies.
That is strong evidence and it is still not a proof.

**Conjecture (power-law scaling).** There exist constants \(L_\infty \geq 0\),
\(N_c \gt 0\) and \(\alpha \gt 0\) such that, for models trained to convergence on a
fixed token budget,

$$
L(N) = L_{\infty} + \left(\frac{N_c}{N}\right)^{\alpha}
$$

holds for every model size \(N\), and similarly in the number of training tokens \(D\)
with its own exponent \(\beta\). The conjecture asserts the form outside the range where
it has been fitted.

A consequence used in planning runs: doubling the parameter count reduces the
size-dependent term by \(2^{-\alpha}\), so a small difference in \(\alpha\) compounds
into a large difference in compute.

Because the statement is a conjecture, the honest way to use it is as a budget model:
it says what a run is expected to buy, and any run whose measured loss sits well off the
fitted curve is evidence about the form itself rather than only about that run.
