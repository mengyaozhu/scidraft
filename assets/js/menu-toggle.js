/* Tap-to-toggle for the header submenu.

   The dropdown is pure CSS: :hover for pointers, :focus-within for
   keyboard focus. Touch devices have no hover, and iOS Safari does not
   reliably focus a tapped <span>, so taps must toggle a class. The .open
   class on the parent <li> is that signal (see menu.css); keeping
   aria-expanded in sync here also fixes the hardcoded aria state in the
   header markup. */
(function () {
    "use strict";

    var parents = document.querySelectorAll(".menu > li.has-submenu");
    if (!parents.length) return;

    function setOpen(parent, open) {
        parent.classList.toggle("open", open);
        var trigger = parent.querySelector("[aria-haspopup]");
        if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function closeAll() {
        parents.forEach(function (parent) {
            setOpen(parent, false);
        });
    }

    parents.forEach(function (parent) {
        var trigger = parent.querySelector(".menu-label, a[aria-haspopup]");
        if (!trigger) return;

        function toggle() {
            // A trigger that is a real link should navigate, not toggle.
            if (trigger.tagName === "A") return;
            // Capture the prior state first: closeAll() strips .open from
            // this parent too, so the read must not happen after it.
            var wasOpen = parent.classList.contains("open");
            closeAll();
            setOpen(parent, !wasOpen);
            // Closing must also release :focus-within, or a browser that
            // focuses the trigger on tap (iPad Safari) would keep the
            // panel visible after the close tap.
            if (wasOpen && document.activeElement === trigger) trigger.blur();
        }

        trigger.addEventListener("click", toggle);

        // role="button" does not synthesize click from the keyboard.
        trigger.addEventListener("keydown", function (event) {
            if (trigger.tagName === "A") return;
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggle();
            } else if (event.key === "Escape" && parent.classList.contains("open")) {
                setOpen(parent, false);
                // Blur as well: :focus-within would otherwise keep the panel
                // visible while the trigger holds focus.
                trigger.blur();
            }
        });
    });

    document.addEventListener("click", function (event) {
        if (!document.querySelector(".menu > li.has-submenu.open")) return;
        if (event.target.closest(".menu > li.has-submenu")) return;
        closeAll();
        // Same :focus-within release as the close tap above.
        var focused = document.activeElement;
        if (focused && focused.closest && focused.closest(".menu > li.has-submenu")) {
            focused.blur();
        }
    });
})();
