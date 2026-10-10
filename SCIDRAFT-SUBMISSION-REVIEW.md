# SciDraft — Hugo Theme Submission Review

**Subject:** `github.com/mengyaozhu/scidraft` submission to [gohugoio/hugoThemesSiteBuilder](https://github.com/gohugoio/hugoThemesSiteBuilder) (PR [#796](https://github.com/gohugoio/hugoThemesSiteBuilder/pull/796))

**Date of review:** read-only assessment; **no files in the theme were modified.**

**Bottom line:** The theme satisfies **every** published acceptance criterion. The Netlify deploy failure is **not caused by SciDraft** — it is a repo-wide build-environment breakage that affects all PRs opened after 2026-09-28.

---

## Task 1 — Acceptance criteria check

Criteria source: [`hugoThemesSiteBuilder/README.md` → "Criteria for acceptance of a theme"](https://raw.githubusercontent.com/gohugoio/hugoThemesSiteBuilder/main/README.md).

### Prerequisites (from "Adding a theme" / "Theme configuration" / "Media")

| # | Requirement | Status | Evidence |
|---|---|---|---|
| P1 | `theme.toml` present in root, **TOML format only** | ✅ Pass | `theme.toml` present and parses as TOML. |
| P2 | Required metadata: name, license, licenselink, description, homepage, tags, features, author(s) | ✅ Pass | All present. `authors` array not used (correct — single author). `[author]` = SciDraft + homepage. `demosite` also set. |
| P3 | `hugo.toml` declaring supported Hugo versions via `[module.hugoVersion]` | ✅ Pass | `[module.hugoVersion] min = "0.158.0"`. `extended`/`max` are optional and correctly omitted. |
| P4 | Screenshot at `images/screenshot.{png,jpg}`, 3:2, min 1500×1000 | ✅ Pass | `images/screenshot.png` = **1500×1000**, ratio exactly **1.500**. |
| P5 | Thumbnail at `images/tn.{png,jpg}`, 3:2, min 900×600 | ✅ Pass | `images/tn.png` = **1200×800**, ratio exactly **1.500**. |
| P6 | Descriptive `README.md` in Markdown, English translation | ✅ Pass | 458-line English `README.md` covering install, features, config, structure. |
| P7 | README images use **absolute** paths | ✅ Pass (n/a) | README contains **no** image references at all (no Markdown `![]()` and no `<img>`), so the relative-path pitfall cannot apply. |
| P8 | Images actually present in the **latest release** tag | ✅ Pass | `v1.1.0` (3f90efb) contains both `images/screenshot.png` and `images/tn.png`. This is the specific trap called out in the README's "no image found for images/tn" troubleshooting note — **avoided**. |
| P9 | Theme URL added to `themes.txt` in lexicographical order | ✅ Pass | Placed between `MeiK2333/github-style` and `mertbakir/resume-a4` — correct ordering. |
| P10 | Meaningful commit message | ✅ Pass | PR commit: `Add theme scidraft`. |

### Acceptance criteria

| # | Criterion | Status | Evidence / reasoning |
|---|---|---|---|
| **1** | **Forks must be notably different**, with arguments listed in `README.md` | ✅ Pass | Declared as a PaperMod derivative in `theme.toml` `[original]` and credited in README + `LICENSE`. Divergence is objectively substantial, not "a few colors": **13 custom shortcodes** (`entry-a-to-z`, `entry-categories`, `references`, `promotion-textual`, pseudo-algorithm, …) vs **0** in PaperMod; **28 CSS files** vs 18; genuinely new subsystems — BibTeX citations, KaTeX math, Mermaid diagrams, pseudo-algorithm blocks, entry maps/indexed research collections, notes feed with promotion slots. README §"Why SciDraft?" (line 103) argues the case for a separate theme. |
| **2** | **Open-source license** allowing free use/modification/sharing | ✅ Pass | MIT (`LICENSE`, `theme.toml license = "MIT"`). Repo API reports `spdx_id: MIT`. |
| **2.1** | **Derivative-work license compliance** | ✅ Pass | Upstream PaperMod is MIT. SciDraft's `LICENSE` **retains the original copyright lines** (`nanxiaobei and adityatelange`, `adityatelange`) and appends `Mengyao Zhu`. This is exactly the required MIT attribution behaviour. Original license is clear, so the "unclear license → reject" rule does not apply. |
| **3** | **Paid themes / marketing READMEs** | ✅ Pass | No purchase, pricing, premium, "pro version", subscription, or sponsorship content anywhere in the README (grep across buy/purchase/price/paid/premium/sponsor/donate/patreon/gumroad returned nothing). |

**Criterion 1 note (the only judgment call):** "notably different" is explicitly subjective per the README. On the evidence above, SciDraft is well clear of the stated negative example ("changing a few colors or making a few style changes"). The residual risk is purely reviewer discretion, not a factual gap.

### Minor observations (non-blocking, cosmetic only)

- `theme.toml` sets `min_version = "0.158.0"`, a legacy key. The current README specifies the Hugo version via `[module.hugoVersion]` in `hugo.toml` (P3, correctly done). The builder's parser (`pkg/client/client.go`) merely unmarshals all of `theme.toml` into metadata, so an extra unknown key is harmless — but it is redundant with P3 and could be dropped for tidiness.
- `theme.toml` `[author].name = "SciDraft"` is the theme name rather than a person's name. Valid, though a personal name may read better.
- The build resolves the **latest tag (v1.1.0)**, confirmed on `proxy.golang.org` → `v1.1.0` @ `3f90efb`. `v1.0.0` predates the metadata/images, so tagging v1.1.0 was necessary and correct. **Do not delete or re-tag**, per the README's Go-modules warning.

**Task 1 conclusion: all criteria satisfied. No theme-side action required.**

---

## Task 2 — Why the Netlify deployment failed

### Verdict

**The failure is environmental and repo-wide. It is NOT caused by the SciDraft theme.** Every deploy preview opened after a specific builder config change fails, regardless of which theme it adds.

### The single distinguishing change

Themes.gohugo.io is built from `themes.txt` by Netlify. Between the last passing preview and all subsequent failures, exactly **one** relevant commit landed on `main`:

```
commit b4db454  "Update HUGO_VERSION to 0.167.0"
date   2026-09-28T15:32:26Z
diff   netlify.toml:  -HUGO_VERSION = "0.166.0"  →  +HUGO_VERSION = "0.167.0"
```

Hugo v0.167.0 itself was published `2026-09-28T15:20:52Z` — about 12 minutes earlier.

### The decisive evidence: identical PRs, opposite outcomes

Four consecutive theme PRs are **byte-for-byte the same kind of change** — a single `+1/-0` line added to `themes.txt`:

| PR | Theme | File changed | Preview result | When |
|---|---|---|---|---|
| [#793](https://github.com/gohugoio/hugoThemesSiteBuilder/pull/793) | hugo-swipefolio | `themes.txt` +1/−0 | ✅ **success** | 2026-09-22 |
| [#794](https://github.com/gohugoio/hugoThemesSiteBuilder/pull/794) | chaos-theme | `themes.txt` +1/−0 | ✅ **success** | 2026-09-24 |
| [#795](https://github.com/gohugoio/hugoThemesSiteBuilder/pull/795) | almanac | `themes.txt` +1/−0 | ✅ **success** | 2026-09-27T13:44Z |
| **#796** | **scidraft** | `themes.txt` +1/−0 | ❌ **failure** | 2026-09-29T10:06Z |
| [#797](https://github.com/gohugoio/hugoThemesSiteBuilder/pull/797) | retro-fusion | `themes.txt` +1/−0 | ❌ **failure** | 2026-09-30T07:19Z |
| [#798](https://github.com/gohugoio/hugoThemesSiteBuilder/pull/798) | hugo-fixlog | `themes.txt` +1/−0 | ❌ **failure** | 2026-09-30T17:32Z |

The last success (#795, 09-27) precedes the 0.167.0 bump; **every** failure follows it. Unrelated third-party themes fail identically, so the added theme cannot be the variable.

**Corroborating signal:** `main`'s own **production** deploy is stuck in `pending` on commit `b4db454` — the version-bump commit — and there have been **no commits to `main` since**. No revert, no bump to a 0.167.x patch. The breakage is currently unfixed upstream.

### SciDraft is provably not the cause

- The PR's entire diff is one line in `themes.txt`.
- The module resolves cleanly on the Go module proxy: `github.com/mengyaozhu/scidraft` → **v1.1.0**, hash `3f90efbfc09d5e0949a3fa83e2b8c5d6be37b889`, matching the tag exactly.
- The builder no longer builds per-theme demo sites; it resolves modules and builds one shared site. A single well-formed theme cannot plausibly break that shared build.
- The netlify build environment pins `GO_VERSION = "1.26.0"`, which **is** sufficient: `hugoDocs` requires `go 1.26.0` and the builder site's own `go.mod` says `go 1.26.0`. So the version constraint is satisfied, not exceeded.
- Independently verified by running the **real Hugo v0.167.0 binary** against the real site config: it parses fine (failing only on offline module resolution), so 0.167.0 does not reject the site's `_merge`, `[security]`, `outputs`, or Tailwind configuration.

### What could not be confirmed

- **The actual build log is private.** Netlify's API returns the deploy records (all three are `state=error`, with a ~6–7 minute build time), but the build log endpoint requires authentication (`/api/v1/builds/<id>` → HTTP 401) and the dashboard is login-walled. Netlify exposes `error_message: null` and `summary.status: "unavailable"` publicly, so **no public error text exists**.
- Consequently the precise failing command is unknown. `build.sh` has two stages: `go run main.go build`, then `hugo --gc --minify`.
- Running the real Hugo v0.167.0 binary against the real site config locally did **not** reproduce a config-level error, so the trigger operates within the full Netlify module/Tailwind/Node environment that cannot be replicated offline.

**Confidence:** **High** that the 0.167.0 bump is the trigger and that the failure is environmental rather than SciDraft-specific (based on the exact temporal correlation, the identical one-line diffs, and the unrelated themes failing in the same window). **Low–medium** on the precise internal mechanism, since the log is inaccessible.

### Recommended next steps

**For the theme author (SciDraft side) — nothing to fix.** Do not modify the theme to chase this failure; the evidence shows it is independent of the added theme. The current PR already contains a clear, well-reasoned comment from `mengyaozhu` correctly identifying the 0.167.0 bump as the suspect. The right action is to wait for the maintainer to resolve it, then retrigger the preview (`git commit --amend --no-edit && git push -f`).

**For the hugoThemesSiteBuilder maintainer:**
1. Open the build log for `build_id 6abb8c2488cd390008fb1085` — the failing stage and error line exist only there.
2. Fastest unblock: revert `HUGO_VERSION` to `"0.166.0"` (last known-good) in `netlify.toml`, confirm previews go green, then re-bump once a 0.167.x patch lands.
3. Note that v0.167.0 shipped security hardening in areas this site uses directly — Sass import resolution, ESBuild fallback resolution, and symlinked mounts — all now checked against `security.allowRead` roots. The site's `[security].exec.allow` block and Tailwind pipeline are the most likely interaction points.

---

## Summary

| Task | Result |
|---|---|
| **1. Acceptance criteria** | ✅ **All criteria fully satisfied.** No theme-side defects. Two purely cosmetic notes (`min_version` legacy key; author name). |
| **2. Netlify failure** | ❌ Failure is **real but not SciDraft's fault**. Caused upstream by `HUGO_VERSION` 0.166.0 → 0.167.0 (2026-09-28). All PRs after that point fail, including unrelated themes; `main`'s production deploy is also stuck pending. |

**Nothing was modified.** This report is the only file written.
