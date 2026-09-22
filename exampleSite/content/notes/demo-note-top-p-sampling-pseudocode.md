+++
title = "Nucleus (Top-p) Sampling"
date = 2026-09-21T06:52:00+09:00
tags = ["Demo", "Pseudo-Algorithm", "LLM", "Sampling"]
renderingTitle = "Top-p Sampling"
renderingCategory = "Pseudo-algorithm"
renderingAliases = ["Nucleus Sampling", "Top-p Sampling", "Nucleus Decoding"]
renderingSummary = "Selects the smallest set of tokens whose cumulative probability reaches p, then samples from it rather than from the full distribution."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A language model does not emit a token; it emits a probability for every token
in the vocabulary, and something has to choose one. Choosing the single most
probable token makes output repetitive, while sampling from the full distribution
occasionally picks from its long tail of near-zero probabilities. Nucleus
sampling keeps the smallest set of tokens whose combined probability reaches a
threshold and samples only from those.

The threshold makes the candidate set adaptive rather than fixed: after a peaked
distribution, the nucleus is one or two tokens; after a flat one, it can hold
hundreds. Temperature acts first, dividing the logits before the softmax, so it
reshapes the distribution that the nucleus is then cut from.

```pseudo-algorithm
\begin{algorithm}[H]
\caption{Nucleus (Top-p) Sampling of One Token}
\begin{algorithmic}[1]

\Require Logits \(z \in \mathbb{R}^{V}\) for the next position
\Require Temperature \(T > 0\) and nucleus threshold \(p \in (0, 1]\)
\Require Random source \(u \sim \mathrm{Uniform}(0, 1)\)

\Ensure Sampled token index \(i^{\star}\)

\State Turn the logits into a distribution: \(q \leftarrow \mathrm{softmax}(z / T)\)
\State Sort the vocabulary by probability, largest first:
\State \hspace{0.5cm} \(q_{(1)} \geq q_{(2)} \geq \ldots \geq q_{(V)}\)
\State Find the smallest prefix whose probability mass reaches the threshold:
\State \hspace{0.5cm} \(k \leftarrow \min \{ m : \sum_{j=1}^{m} q_{(j)} \geq p \}\)
\State Renormalise the kept tokens so they sum to one:
\State \hspace{0.5cm} \(\tilde{q}_{(j)} \leftarrow q_{(j)} / \sum_{l=1}^{k} q_{(l)}\) for every \(j \leq k\)
\State Sample by walking the cumulative distribution with \(u\):
\State \hspace{0.5cm} \(i^{\star} \leftarrow \) the first index where the running sum of \(\tilde{q}\) exceeds \(u\)
\Return \(i^{\star}\)

\end{algorithmic}
\end{algorithm}
```

**Reading the algorithm.** Steps 1–2 produce a sorted distribution; step 3 is the
whole idea — the size of the candidate set is a consequence of the model's own
confidence, not a constant. Step 4 matters for correctness rather than
appearance: after truncation the probabilities no longer sum to one, so sampling
without renormalisation would bias the choice towards the first kept token. The
random draw in step 5 is why the same prompt can yield different completions, and
why reproducibility requires fixing the seed as well as the temperature.
