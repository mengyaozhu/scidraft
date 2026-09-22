+++
title = "The Adam Update (formula)"
date = 2026-09-21T11:12:00+09:00
tags = ["Demo", "Formula", "Optimization"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A formula is a rule written in symbols so that it can be evaluated, and the one nearly
every model is trained with is Adam's update: two running averages of the gradient, a
correction for the fact that both start at zero, and a step whose size is set by their
ratio.

The bias-correction step is what the formula is usually remembered for. Without it the
first few steps are far too large, because a running average that began at zero
underestimates the quantity it is meant to summarise.

**Formula (Adam).** With parameters \(\theta\), gradient \(g_t\) at step \(t\), step
size \(\eta\), decay rates \(\beta_1, \beta_2 \in [0, 1)\) and a small constant
\(\varepsilon\),

$$
m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t, \qquad
v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^{2},
$$

$$
\hat{m}_t = \frac{m_t}{1 - \beta_1^{t}}, \qquad
\hat{v}_t = \frac{v_t}{1 - \beta_2^{t}}, \qquad
\theta_t = \theta_{t-1} - \eta \, \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \varepsilon} .
$$

The squared gradient in \(v_t\) is taken element-wise, so the division is also
element-wise: each parameter receives a step inversely proportional to the recent size of
its own gradient. The defaults \(\beta_1 = 0.9\), \(\beta_2 = 0.999\),
\(\varepsilon = 10^{-8}\) come from the original paper and are still the common
setting.

The division by \(\sqrt{\hat{v}_t}\) is what makes the method scale-free: multiplying
the loss by a constant leaves the update nearly unchanged, which is why the same step size
works across architectures that produce gradients of very different magnitudes.
