+++
title = "Note with Pseudo-Algorithm"
date = 2026-09-21T13:52:00+09:00
tags = ["Working with Agentic AI"]
+++
Re-ran the same annotation prompt 10 times: 8 identical, 2 diverged on evidence codes. Reproducibility is a prompting problem before it is a model problem.

```pseudo-algorithm
\begin{algorithm}[H]
\footnotesize       
\caption{Pseudocode: Linear Reasoning with Specific Reasoning Strategy}
\label{alg:pseudocode-linear-reasoning-with-specific-reasoning-strategy}
\begin{algorithmic}[1]

\Require Source of demonstrations \(\mathcal{D} = \{d_1, d_2, \ldots, d_K\}\),
Target LLM \(M_{\text{a-gen}} \in \mathcal{M}\) for generation,
Reasoning strategy configuration \(\mathcal{C}_{\text{reason}}\)
\Ensure Optimized prompt with reasoning strategy

\State \textbf{Candidate Generation}
\State Generate reasoning demonstrations from \(\mathcal{D}\) according to \(\mathcal{C}_{\text{reason}}\):
\State \hspace{0.5cm} - High-level abstraction construction
\State \hspace{0.5cm} - Action or plan formulation
\State \hspace{0.5cm} - Step-by-step rationale generation

\State \textbf{Demonstration Selection}
\State Select \(K\) demonstrations \(\mathcal{D}_{\text{selected}} \subseteq \mathcal{D}\) based on \(\mathcal{C}_{\text{reason}}\):
\State \hspace{0.5cm} - Representativeness of reasoning patterns
\State \hspace{0.5cm} - Diversity of problem-solving approaches
\State \hspace{0.5cm} - Quality of intermediate reasoning steps

\State \textbf{Inference with Reasoning Strategy}
\State Construct prompt with \(\mathcal{I}\) and \(\mathcal{D}_{\text{selected}}\) according to \(\mathcal{C}_{\text{reason}}\)
\State Apply reasoning mechanism according to \(\mathcal{C}_{\text{reason}}\):
\State \hspace{0.5cm} - Generate structured reasoning path
\State \hspace{0.5cm} - Execute sequential reasoning steps
\State \hspace{0.5cm} - Aggregate multiple reasoning paths if applicable
\State Generate output via \(M_{\text{a-gen}}\)

\State \Return Optimized reasoning-enhanced prompt
\end{algorithmic}
\end{algorithm}
```


