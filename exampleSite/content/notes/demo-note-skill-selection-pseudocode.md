+++
title = "Choosing Between Human and Agentic Skills"
date = 2026-09-21T13:42:00+09:00
tags = ["Demo", "Agentic Skills", "Human Skills", "Pseudo-Algorithm"]
math = true
showTitle = false
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Occupational work is carried out by actions, and an action can be executed by
a human skill, by an agentic skill, or by a combination of the two. The choice
is not a fixed property of the occupation: the same responsibility may call for
judgment in one context and high-volume processing in another.

The procedure below treats the choice as a constrained optimisation. It first
tests whether the action is *eligible* for agentic execution at all — an agent
may be capable and still be excluded by accountability, confidentiality, or
irreversibility — and only then compares the candidates on effectiveness,
reliability and cost.

```pseudo-algorithm
\begin{algorithm}[H]
\caption{Select the Skill Configuration for an Action}
\begin{algorithmic}[1]

\Require Action \(a\) with skill requirements \(R(a) = \{r_1, \ldots, r_p\}\)
\Require Human skill set \(H\), agentic skill set \(A\)
\Require Oversight constraint: a human must accept the outcome of \(a\)

\Ensure Chosen configuration \(c^{\star} \in \{\mathrm{human}, \mathrm{agent}, \mathrm{hybrid}\}\)

\State Screen the action for agent eligibility:
\State \hspace{0.5cm} \(E \leftarrow \mathrm{eligible}(a)\)
\State \hspace{0.5cm} checks accountability, confidentiality and reversibility

\For{configuration \(c \in \{\mathrm{human}, \mathrm{agent}, \mathrm{hybrid}\}\)}
\State \(u(c) \leftarrow \mathrm{coverage}(c, R(a))\)
\State \(q(c) \leftarrow \mathrm{expectedQuality}(c, a)\)
\State \(t(c) \leftarrow \mathrm{time}(c, a)\)
\State \(k(c) \leftarrow \mathrm{cost}(c, a)\)
\EndFor

\State Discard configurations that violate eligibility or oversight:
\State \hspace{0.5cm} \(C \leftarrow \{c : u(c) > 0\}\) filtered by \(E\) and human acceptance

\If{\(C\) is empty}
\Return escalation to a human professional with a wider mandate
\EndIf

\State Choose the best trade of quality against time and cost:
\State \hspace{0.5cm} \(c^{\star} \leftarrow \arg\max_{c \in C} q(c) - \lambda_t t(c) - \lambda_k k(c)\)

\Return \(c^{\star}\) with the residual risks the human must watch

\end{algorithmic}
\end{algorithm}
```

**How to read it.** The eligibility screen (step 1) is the part that is easy
to skip and expensive to get wrong: an agent can be technically the better
executor and still be the wrong choice for an action that must be attributable
to a named professional. Steps 2–3 build the candidate set, while the weights
\(\lambda_t\) and \(\lambda_k\) express how much the situation values speed
and cost against quality. The scores are estimates, so the procedure inherits
the quality of its inputs — which is why step 5 returns the residual risks with
the choice: the human owns the outcome.
