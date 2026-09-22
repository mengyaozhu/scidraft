+++
title = "The KV Cache Is Exact (claim)"
date = 2026-09-21T14:22:00+09:00
tags = ["Demo", "Claim", "Attention"]
mathTitle = "The KV Cache Is Exact"
mathCategory = "Claims"
mathAliases = ["KV Cache Correctness", "Exact Decoding Cache", "Incremental Attention Equivalence"]
mathSummary = "Argues that caching keys and values during decoding leaves the attention output bit-for-bit unchanged rather than merely close."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Caching keys and values is standard practice, and the claim that justifies it is strong:
incremental decoding gives exactly the same outputs as recomputing attention over the whole
sequence, not an approximation of them.

Stated for the arithmetic of the model rather than for floating-point hardware, the claim is
what licenses treating the cache as an optimisation. The caveat about floating point is
worth stating alongside it, because it is where a literal reading of the claim fails.

**Claim.** Let a decoder attend over a prefix of length \(t\), and let the same decoder
attend over the prefix extended to length \(t + 1\) with the additional key \(k_{t+1}\)
and value \(v_{t+1}\) appended to the cached matrices. Then

$$
\operatorname{softmax}\!\left(\frac{q_{t+1} K_{1:t+1}^{\top}}{\sqrt{d_h}}\right) V_{1:t+1} =
\left[\operatorname{softmax}\!\left(\frac{Q_{1:t+1} K_{1:t+1}^{\top}}{\sqrt{d_h}}\right) V_{1:t+1}\right]_{t+1}
$$

the left side being the incremental step that uses only the cached keys and values and the
current query, and the right side being row \(t + 1\) of the full computation over the
whole prefix. The equality holds because the cache stores exactly the keys and values the
full computation would use, and the softmax at a causal position depends only on those and
on the current query.

The claim is about the mathematical function, and it is exact there; in floating point the
two orders of summation can differ in the last bits, which is why a cache and a
recomputation may differ in the eighth decimal place while computing the same
mathematical quantity.
