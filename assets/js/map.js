/* =========================================================
   Wachalarm – Interaktive Brandenburg-Karte
   Vollständige Datei
========================================================= */

const REGION_BOUNDS = L.latLngBounds(
    [51.35, 11.15],
    [53.75, 14.85]
);

const REGION_CENTER = [52.48, 13.10];

const countyData = [
    {
        id: "cb",
        name: "Cottbus",
        status: "active",
        color: "#f6a6a6",
        bounds: [[51.69, 14.27], [51.84, 14.45]]
    },
    {
        id: "lds",
        name: "Dahme-Spreewald",
        status: "active",
        color: "#f8c58f",
        bounds: [[51.78, 13.35], [52.36, 14.30]]
    },
    {
        id: "ee",
        name: "Elbe-Elster",
        status: "active",
        color: "#f5d48d",
        bounds: [[51.35, 13.05], [51.85, 13.85]]
    },
    {
        id: "osl",
        name: "Oberspreewald-Lausitz",
        status: "active",
        color: "#b7dfb5",
        bounds: [[51.45, 13.72], [51.92, 14.20]]
    },
    {
        id: "spn",
        name: "Spree-Neiße",
        status: "active",
        color: "#a8d8f0",
        bounds: [[51.45, 14.20], [52.05, 14.78]]
    },
    {
        id: "bar",
        name: "Barnim",
        status: "planned",
        color: "#b8c0cc",
        bounds: [[52.55, 13.45], [53.05, 14.10]]
    },
    {
        id: "ohv",
        name: "Oberhavel",
        status: "planned",
        color: "#b8c0cc",
        bounds: [[52.65, 12.80], [53.25, 13.55]]
    },
    {
        id: "opr",
        name: "Ostprignitz-Ruppin",
        status: "planned",
        color: "#b8c0cc",
        bounds: [[52.75, 12.05], [53.35, 12.95]]
    },
    {
        id: "pm",
        name: "Potsdam-Mittelmark",
        status: "planned",
        color: "#b8c0cc",
        bounds: [[51.95, 12.25], [52.55, 13.25]]
    },
    {
        id: "pr",
        name: "Prignitz",
        status: "planned",
        color: "#b8c0cc",
        bounds: [[52.85, 11.25], [53.45, 12.25]]
    },
    {
        id: "tf",
        name: "Teltow-Fläming",
        status: "planned",
        color: "#b8c0cc",
        bounds: [[51.75, 12.75], [52.35, 13.75]]
    },
    {
        id: "um",
        name: "Uckermark",
        status: "planned",
        color: "#b8c0cc",
        bounds: [[52.95, 13.55], [53.65, 14.45]]
    }
];

const localChannels = [
    {
        name: "EVI Cottbus",
        region: "Cottbus",
        county: "cb",
        type: "hauptkanal",
        lat: 51.756,
        lng: 14.335,
        description: "Hauptkanal für Feuerwehr-Einsatzinfos aus Cottbus.",
        url: "#"
    },
    {
        name: "EVI LDS",
        region: "Dahme-Spreewald",
        county: "lds",
        type: "hauptkanal",
        lat: 52.03,
        lng: 13.82,
        description: "Hauptkanal für Feuerwehr-Einsatzinfos aus Dahme-Spreewald.",
        url: "#"
    },
    {
        name: "EVI Elbe-Elster",
        region: "Elbe-Elster",
        county: "ee",
        type: "hauptkanal",
        lat: 51.62,
        lng: 13.38,
        description: "Hauptkanal für Feuerwehr-Einsatzinfos aus Elbe-Elster.",
        url: "#"
    },
    {
        name: "EVI OSL",
        region: "Oberspreewald-Lausitz",
        county: "osl",
        type: "hauptkanal",
        lat: 51.58,
        lng: 13.98,
        description: "Hauptkanal für Feuerwehr-Einsatzinfos aus Oberspreewald-Lausitz.",
        url: "#"
    },
    {
        name: "EVI Spree-Neiße",
        region: "Spree-Neiße",
        county: "spn",
        type: "hauptkanal",
        lat: 51.73,
        lng: 14.63,
        description: "Hauptkanal für Feuerwehr-Einsatzinfos aus Spree-Neiße.",
        url: "#"
    }
];

let map;
let countyLayers = [];
let markerObjects = [];
let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
    initMap();
    initSearch();
    initFilters();
    renderResults(countyData);
});

function initMap() {
    map = L.map("map", {
        scrollWheelZoom: false,
        zoomControl: true
    });

    window.map = map;
    window.wachalarmMap = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    fitBrandenburg();

    countyData.forEach(county => {
        const layer = L.rectangle(county.bounds, {
            color: county.status === "active" ? county.color : "#7f8794",
            fillColor: county.color,
            fillOpacity: county.status === "active" ? 0.44 : 0.52,
            weight: county.status === "active" ? 2 : 1.6,
            radius: 12
        }).addTo(map);

        layer.bindTooltip(county.name, {
            permanent: true,
            direction: "center",
            className: county.status === "active" ? "county-label active" : "county-label planned"
        });

        layer.on("click", () => {
            openCounty(county.id);
        });

        countyLayers.push({
            id: county.id,
            layer
        });
    });

    addMarkers(localChannels);

    map.whenReady(() => {
        setTimeout(() => {
            map.invalidateSize();
            fitBrandenburg();
        }, 180);
    });

    window.addEventListener("resize", () => {
        setTimeout(() => {
            map.invalidateSize();
            fitBrandenburg();
        }, 220);
    });
}

function fitBrandenburg() {
    if (!map) return;

    const mobile = window.matchMedia("(max-width: 640px)").matches;

    map.fitBounds(REGION_BOUNDS, {
        padding: mobile ? [14, 14] : [42, 42],
        maxZoom: mobile ? 7 : 8
    });
}

function openCounty(countyId) {
    const county = countyData.find(item => item.id === countyId);
    if (!county) return;

    currentFilter = countyId;
    updateFilterButtons(countyId);

    const bounds = L.latLngBounds(county.bounds);
    map.fitBounds(bounds, {
        padding: [42, 42],
        maxZoom: window.matchMedia("(max-width: 640px)").matches ? 10 : 11
    });

    const countyChannels = getChannelsByCounty(countyId);
    addMarkers(countyChannels);
    renderResults(countyChannels);

    const mainChannel = markerObjects.find(item =>
        item.data.county === countyId && item.data.type === "hauptkanal"
    );

    if (mainChannel) {
        setTimeout(() => {
            mainChannel.marker.openPopup();
        }, 350);
    }
}

function getChannelsByCounty(countyId) {
    const known = localChannels.filter(item => item.county === countyId);

    if (known.length > 0) {
        return sortChannels(known);
    }

    const county = countyData.find(item => item.id === countyId);

    return [
        {
            name: county ? county.name : "Region",
            region: county ? county.name : "Region",
            county: countyId,
            type: "ortswehr_ohne_evi",
            description: "Diese Region ist vorbereitet und befindet sich im Aufbau.",
            url: ""
        }
    ];
}

function addMarkers(channels) {
    markerObjects.forEach(item => {
        map.removeLayer(item.marker);
    });

    markerObjects = [];

    channels
        .filter(item => typeof item.lat === "number" && typeof item.lng === "number")
        .forEach(item => {
            const marker = L.marker([item.lat, item.lng], {
                icon: createMarkerIcon(item.type),
                zIndexOffset: getPriority(item.type) * -100
            }).addTo(map);

            marker.bindPopup(createPopup(item));

            markerObjects.push({
                data: item,
                marker
            });
        });
}

function createMarkerIcon(type) {
    let className = "wa-marker planned";

    if (type === "hauptkanal") className = "wa-marker main";
    if (type === "kommune") className = "wa-marker municipality";
    if (type === "ortswehr_evi") className = "wa-marker local";
    if (type === "ortswehr_ohne_evi") className = "wa-marker planned";

    return L.divIcon({
        className: "",
        html: `<div class="${className}"></div>`,
        iconSize: type === "hauptkanal" ? [32, 32] : [24, 24],
        iconAnchor: type === "hauptkanal" ? [16, 16] : [12, 12]
    });
}

function createPopup(item) {
    const label = getTypeLabel(item.type);
    const badgeClass = getBadgeClass(item.type);
    const button = item.url
        ? `<a class="popup-button" href="${item.url}" target="_blank" rel="noopener">Jetzt abonnieren</a>`
        : "";

    return `
        <div class="popup-card">
            <span class="popup-badge ${badgeClass}">${label}</span>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.description || item.region || "")}</p>
            ${button}
        </div>
    `;
}

function renderResults(items) {
    const results = document.getElementById("channelResults");
    if (!results) return;

    const sorted = sortChannels(items);

    results.innerHTML = sorted.map(item => {
        const label = getTypeLabel(item.type);
        const hasUrl = item.url && item.url !== "#";

        return `
            <article class="channel-card type-${item.type}">
                <span class="card-label">${label}</span>
                <h3>${escapeHtml(item.name)}</h3>
                <p>${escapeHtml(item.description || item.region || "")}</p>
                ${
                    hasUrl
                        ? `<a class="cta-button" href="${item.url}" target="_blank" rel="noopener">Jetzt abonnieren</a>`
                        : `<a class="secondary-button" href="karte.html">Region öffnen</a>`
                }
            </article>
        `;
    }).join("");
}

function initSearch() {
    const input = document.getElementById("mapSearch");
    if (!input) return;

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();

        if (!query) {
            if (currentFilter === "all") {
                fitBrandenburg();
                addMarkers(localChannels);
                renderResults(countyData);
            } else {
                openCounty(currentFilter);
            }

            return;
        }

        const allItems = [
            ...countyData.map(county => ({
                name: county.name,
                region: county.name,
                county: county.id,
                type: county.status === "active" ? "hauptkanal" : "ortswehr_ohne_evi",
                description: county.status === "active"
                    ? "Aktive Region mit passenden WhatsApp-Kanälen."
                    : "Diese Region ist vorbereitet und befindet sich im Aufbau."
            })),
            ...localChannels
        ];

        const hits = allItems.filter(item =>
            normalize(item.name).includes(normalize(query)) ||
            normalize(item.region).includes(normalize(query)) ||
            normalize(item.county).includes(normalize(query))
        );

        if (hits.length === 0) {
            renderResults([]);
            return;
        }

        const first = hits[0];

        if (typeof first.lat === "number" && typeof first.lng === "number") {
            addMarkers(hits.filter(item => typeof item.lat === "number"));
            map.setView([first.lat, first.lng], 11, { animate: true });

            setTimeout(() => {
                const foundMarker = markerObjects.find(item => item.data.name === first.name);
                if (foundMarker) foundMarker.marker.openPopup();
            }, 250);
        } else if (first.county) {
            openCounty(first.county);
        }

        renderResults(hits);
    });
}

function initFilters() {
    const buttons = document.querySelectorAll("#filterRow button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            currentFilter = filter;

            updateFilterButtons(filter);

            if (filter === "all") {
                fitBrandenburg();
                addMarkers(localChannels);
                renderResults(countyData);
                return;
            }

            openCounty(filter);
        });
    });
}

function updateFilterButtons(filter) {
    document.querySelectorAll("#filterRow button").forEach(button => {
        button.classList.toggle("is-active", button.dataset.filter === filter);
    });
}

function sortChannels(items) {
    return [...items].sort((a, b) => {
        const priority = getPriority(a.type) - getPriority(b.type);

        if (priority !== 0) {
            return priority;
        }

        return String(a.name || "").localeCompare(String(b.name || ""), "de");
    });
}

function getPriority(type) {
    if (type === "hauptkanal") return 1;
    if (type === "kommune") return 2;
    if (type === "ortswehr_evi") return 3;
    if (type === "ortswehr_ohne_evi") return 4;
    return 99;
}

function getTypeLabel(type) {
    if (type === "hauptkanal") return "Hauptkanal";
    if (type === "kommune") return "Stadt / Gemeinde";
    if (type === "ortswehr_evi") return "Ortswehr mit EVI";
    if (type === "ortswehr_ohne_evi") return "Geplant";
    return "Region";
}

function getBadgeClass(type) {
    if (type === "hauptkanal") return "main";
    if (type === "kommune") return "municipality";
    if (type === "ortswehr_evi") return "local";
    if (type === "ortswehr_ohne_evi") return "planned";
    return "planned";
}

function normalize(value) {
    return String(value || "")
        .toLowerCase()
        .replace("ä", "ae")
        .replace("ö", "oe")
        .replace("ü", "ue")
        .replace("ß", "ss");
}

function escapeHtml(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
