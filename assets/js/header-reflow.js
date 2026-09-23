/* Header re-flow: stack the header when the menu cannot fit beside it.
 *
 * WHY THIS EXISTS
 * The wide-screen header is a single line: site title (with its theme
 * toggle) on the left, menu on the right. When the title is long or the
 * menu has many items, the two no longer fit side by side: the menu wraps
 * below the logo and, left to the browser's default wrapping, sits there
 * left-aligned — inconsistent with the centered stacked look used on
 * narrow screens. This watcher notices the wrap and applies the class
 * "nav-stacked", which header.css turns into the same centered stacked
 * layout at any screen width. The trigger is content-based (does the row
 * fit?), not viewport-based, so it also covers mid-size windows.
 *
 * HOW IT WORKS
 * On load and on window resize (debounced), the header is measured in its
 * UNstacked state: the class is removed first, then the menu position is
 * read. If the menu has dropped below the logo row, "nav-stacked" is
 * applied again. This measure-then-decide order keeps the layout
 * deterministic — the two states cannot oscillate. A final check runs
 * once web fonts finish loading, because font metrics change which
 * layout fits.
 */
(function () {
  "use strict";

  var nav = document.querySelector(".header-nav");
  if (!nav) return;
  var logo = nav.querySelector(".logo");
  var menu = nav.querySelector(".menu");
  if (!logo || !menu) return;

  function check() {
    var wasStacked = nav.classList.contains("nav-stacked");
    if (wasStacked) nav.classList.remove("nav-stacked");
    var wrapped =
      menu.getBoundingClientRect().top >= logo.getBoundingClientRect().bottom - 1;
    if (wrapped) nav.classList.add("nav-stacked");
    else if (wasStacked) nav.classList.remove("nav-stacked");
  }

  var debounce = null;
  window.addEventListener("resize", function () {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(check, 120);
  });

  function start() {
    check();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(check).catch(function () {});
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
