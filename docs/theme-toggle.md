# Theme toggle (light / dark)

The moon/sun control in the header switches the site's color scheme and
remembers the choice.

## Controlling files

| File | Role | Look for |
|---|---|---|
| `layouts/_partials/header.html` | The button and its two inline SVGs | `id="theme-toggle"`, `class="moon"`, `class="sun"` |
| `assets/css/common/header.css` | Shows/hides the right icon per theme | `[data-theme="dark"] .moon`, `[data-theme="light"] .sun` |
| `layouts/_partials/footer.html` | The click handler | `pref-theme`, `localStorage`, `accesskey` Alt+T |
| `layouts/baseof.html` | Sets the initial `data-theme` (`defaultTheme` param: `auto`/`light`/`dark`) | `site.Params.defaultTheme` |
| `assets/css/core/theme-vars.css` | The color palettes for both modes | `:root`, `[data-theme="dark"]` |

## How it works

- Clicking toggles the `dark` class and stores `pref-theme` in localStorage;
  the page reloads to apply it.
- With no stored preference, `defaultTheme` (`auto` = follow the OS) decides.
- The button carries `accesskey="t"` (Alt+T) and an `aria-label`.

## Verify after a change

1. Click the icon: the theme flips and persists across reloads.
2. With a fresh browser profile, the theme follows the OS if `defaultTheme`
   is `auto`.
3. The correct icon (moon/sun) is visible in each mode.
