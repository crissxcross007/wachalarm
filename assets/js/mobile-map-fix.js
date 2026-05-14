
/* =========================================================
   Wachalarm – Mobile Karten-Zentrierung
   Datei zusätzlich NACH js/map.js einbinden:
   <script src="js/mobile-map-fix.js"></script>
========================================================= */

(function () {
    function getMapInstance() {
        return window.wachalarmMap || window.map || window.brandenburgMap || null;
    }

    function fitBrandenburg() {
        var map = getMapInstance();
        if (!map || typeof L === "undefined") return false;

        /*
          Brandenburg ungefähr:
          Südwest: 51.35, 11.20
          Nordost: 53.70, 14.85

          Dadurch wird auf dem Handy Brandenburg sichtbar,
          statt dass die Karte zu weit westlich bei Hannover landet.
        */
        var bounds = L.latLngBounds(
            [51.35, 11.20],
            [53.70, 14.85]
        );

        var isMobile = window.matchMedia("(max-width: 768px)").matches;

        map.fitBounds(bounds, {
            padding: isMobile ? [18, 18] : [42, 42],
            maxZoom: isMobile ? 8 : 8
        });

        setTimeout(function () {
            map.invalidateSize();
        }, 250);

        return true;
    }

    function tryFit() {
        var attempts = 0;
        var timer = setInterval(function () {
            attempts++;

            if (fitBrandenburg() || attempts > 30) {
                clearInterval(timer);
            }
        }, 150);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", tryFit);
    } else {
        tryFit();
    }

    window.addEventListener("resize", function () {
        setTimeout(fitBrandenburg, 250);
    });
})();
