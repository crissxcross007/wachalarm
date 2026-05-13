const regionStatus = {
  "Cottbus": "active",
  "Dahme-Spreewald": "active",
  "Elbe-Elster": "active",
  "Oberspreewald-Lausitz": "active",
  "Spree-Neiße": "active",
  "Barnim": "planned",
  "Oberhavel": "planned",
  "Ostprignitz-Ruppin": "planned",
  "Potsdam-Mittelmark": "planned",
  "Prignitz": "planned",
  "Teltow-Fläming": "planned",
  "Uckermark": "planned"
};

const regionColors = {
  "Cottbus": "#f2c94c",
  "Dahme-Spreewald": "#27ae60",
  "Elbe-Elster": "#eb5757",
  "Oberspreewald-Lausitz": "#9b51e0",
  "Spree-Neiße": "#2f80ed",
  "Barnim": "#9b9b9b",
  "Oberhavel": "#9b9b9b",
  "Ostprignitz-Ruppin": "#9b9b9b",
  "Potsdam-Mittelmark": "#9b9b9b",
  "Prignitz": "#9b9b9b",
  "Teltow-Fläming": "#9b9b9b",
  "Uckermark": "#9b9b9b"
};

const externalLausitzUrl = "https://evilausitz.de/data/evi-kanalorte.json";
const localWachalarmUrl = "/data/wachalarm-kanalorte.json";
const deutschlandKreiseUrl = "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/refs/heads/main/4_kreise/4_niedrig.geo.json";

const fallbackKanalOrte = [{"name": "EVI - EE (Einsatz Info Elbe Elster)", "landkreis": "Elbe-Elster", "kommune": "Elbe-Elster", "ort": "Landkreis Elbe-Elster", "typ": "Landkreis", "eviAlarmierung": true, "lat": 51.6, "lng": 13.23, "link": "https://www.whatsapp.com/channel/0029VbAnfI9AInPlODhQVV3K"}, {"name": "EVI - OSL (Einsatz Info Oberspreewald Lausitz)", "landkreis": "Oberspreewald-Lausitz", "kommune": "Oberspreewald-Lausitz", "ort": "Landkreis Oberspreewald-Lausitz", "typ": "Landkreis", "eviAlarmierung": true, "lat": 51.52, "lng": 13.95, "link": "https://www.whatsapp.com/channel/0029VbADYtq4SpkOz4Pc7x28"}, {"name": "EVI - LDS (Einsatz Info Dahme-Spreewald)", "landkreis": "Dahme-Spreewald", "kommune": "Dahme-Spreewald", "ort": "Landkreis Dahme-Spreewald", "typ": "Landkreis", "eviAlarmierung": true, "lat": 52.05, "lng": 13.76, "link": "https://www.whatsapp.com/channel/0029Vb5jA22BvvshQme3S341"}, {"name": "EVI - SPN (Einsatz Info Spree-Neiße)", "landkreis": "Spree-Neiße", "kommune": "Spree-Neiße", "ort": "Landkreis Spree-Neiße", "typ": "Landkreis", "eviAlarmierung": true, "lat": 51.756, "lng": 14.42, "link": "https://www.whatsapp.com/channel/0029Vb9zdpT11ulGlwf18l3K"}, {"name": "EVI - Cottbus", "landkreis": "Cottbus", "kommune": "Cottbus", "ort": "Cottbus", "typ": "Landkreis", "eviAlarmierung": true, "lat": 51.76, "lng": 14.334, "link": "https://www.whatsapp.com/channel/0029Vb6uhqTIXnlsMU6gZQ2T"}, {"name": "Einsatzticker - Amt-Döbern-Land", "landkreis": "Spree-Neiße", "kommune": "Amt Döbern-Land", "ort": "Döbern", "typ": "Amt/Gemeinde/Stadt", "eviAlarmierung": true, "lat": 51.616, "lng": 14.6, "link": "https://www.whatsapp.com/channel/0029Vabfzzs7T8bgHFArGN2W"}, {"name": "Feuerwehr Halbendorf", "landkreis": "Spree-Neiße", "kommune": "Schleife", "ort": "Halbendorf", "typ": "Ortswehr", "eviAlarmierung": false, "lat": 51.516, "lng": 14.548, "link": "https://www.whatsapp.com/channel/0029VaE25JG6xCSSW5pDKq0w"}, {"name": "Freiwillige Feuerwehr Schleife", "landkreis": "Spree-Neiße", "kommune": "Schleife", "ort": "Schleife", "typ": "Ortswehr", "eviAlarmierung": false, "lat": 51.535, "lng": 14.533, "link": "https://www.whatsapp.com/channel/0029VaKwojmHVvTdTQVmsL14"}, {"name": "Freiwillige Feuerwehr Hoyerswerda Altstadt 🚒", "landkreis": "Bautzen", "kommune": "Hoyerswerda", "ort": "Hoyerswerda Altstadt", "typ": "Ortswehr", "eviAlarmierung": false, "lat": 51.438, "lng": 14.236, "link": "https://www.whatsapp.com/channel/0029VaF96GSF1YlaG75mjT1W"}, {"name": "Feuerwehr Lauta-Stadt", "landkreis": "Bautzen", "kommune": "Lauta", "ort": "Lauta-Stadt", "typ": "Ortswehr", "eviAlarmierung": false, "lat": 51.46, "lng": 14.101, "link": "https://www.whatsapp.com/channel/0029VaFDfJ30VycIXp0Ep23q"}, {"name": "Feuerwehr Finsterwalde Stadtmitte", "landkreis": "Elbe-Elster", "kommune": "Finsterwalde", "ort": "Finsterwalde Stadtmitte", "typ": "Ortswehr", "eviAlarmierung": true, "lat": 51.633, "lng": 13.706, "link": "https://www.whatsapp.com/channel/0029Vaiz5pHEquiH6BlrCs0o"}, {"name": "Freiwillige Feuerwehr der Stadt Peitz", "landkreis": "Spree-Neiße", "kommune": "Peitz", "ort": "Peitz", "typ": "Ortswehr", "eviAlarmierung": true, "lat": 51.859, "lng": 14.411, "link": "https://www.whatsapp.com/channel/0029VanhIsvADTOLMPL0LB0f"}, {"name": "Feuerwehren in Lübben (Spreewald)", "landkreis": "Dahme-Spreewald", "kommune": "Lübben (Spreewald)", "ort": "Lübben (Spreewald)", "typ": "Ortswehr", "eviAlarmierung": false, "lat": 51.94, "lng": 13.895, "link": "https://www.whatsapp.com/channel/0029Vaf2ZiW47XeBE3Vq0y2Y"}, {"name": "Freiwillige Feuerwehr Elsterwerda", "landkreis": "Elbe-Elster", "kommune": "Elsterwerda", "ort": "Elsterwerda", "typ": "Ortswehr", "eviAlarmierung": false, "lat": 51.46, "lng": 13.52, "link": "https://www.whatsapp.com/channel/0029VaEYOGR3GJOu7ZRkxz2i"}, {"name": "Freiwillige Feuerwehr Lieberose", "landkreis": "Dahme-Spreewald", "kommune": "Lieberose", "ort": "Lieberose", "typ": "Ortswehr", "eviAlarmierung": false, "lat": 51.984, "lng": 14.299, "link": "https://www.whatsapp.com/channel/0029VajwwtvJZg4D5naDZ41U"}, {"name": "Freiwillige Feuerwehr Stadt Welzow", "landkreis": "Spree-Neiße", "kommune": "Welzow", "ort": "Welzow", "typ": "Ortswehr", "eviAlarmierung": false, "lat": 51.582, "lng": 14.17, "link": "https://www.whatsapp.com/channel/0029Vb5nvuO9cDDQk2la6x2S"}, {"name": "Freiwillige Feuerwehr Senftenberg", "landkreis": "Oberspreewald-Lausitz", "kommune": "Senftenberg", "ort": "Senftenberg", "typ": "Ortswehr", "eviAlarmierung": true, "lat": 51.525, "lng": 14.001, "link": "https://www.whatsapp.com/channel/0029Vb9DksM3gvWRT218LJ2G"}, {"name": "Einsatzticker Senftenberg", "landkreis": "Oberspreewald-Lausitz", "kommune": "Senftenberg", "ort": "Senftenberg", "typ": "Amt/Gemeinde/Stadt", "eviAlarmierung": true, "lat": 51.53, "lng": 14.02, "link": "https://whatsapp.com/channel/0029Vb6VOPdA2pLFGgKwvv3p"}, {"name": "Feuerwehr Neuhausen/Spree", "landkreis": "Spree-Neiße", "kommune": "Neuhausen/Spree", "ort": "Neuhausen/Spree", "typ": "Amt/Gemeinde/Stadt", "eviAlarmierung": true, "lat": 51.684, "lng": 14.412, "link": "https://whatsapp.com/channel/0029VaeKOJRBadmjgBKhFL1G"}, {"name": "Einsatzticker - Forst (Lausitz)", "landkreis": "Spree-Neiße", "kommune": "Forst (Lausitz)", "ort": "Forst (Lausitz)", "typ": "Amt/Gemeinde/Stadt", "eviAlarmierung": true, "lat": 51.735, "lng": 14.64, "link": "https://www.whatsapp.com/channel/0029VbBQGaVFi8xjR3E3h32e"}, {"name": "FF Burg (Spreewald)", "landkreis": "Spree-Neiße", "kommune": "Burg (Spreewald)", "ort": "Burg (Spreewald)", "typ": "Ortswehr", "eviAlarmierung": true, "lat": 51.834, "lng": 14.148, "link": "https://www.whatsapp.com/channel/0029VaoDKpb3AzNM5AuLhN1H"}, {"name": "Feuerwehr Tauer", "landkreis": "Spree-Neiße", "kommune": "Tauer", "ort": "Tauer", "typ": "Ortswehr", "eviAlarmierung": true, "lat": 51.897, "lng": 14.454, "link": "https://www.whatsapp.com/channel/0029Vaira2y2kNFxrEpQd11J"}, {"name": "Freiwillige Feuerwehr Guben", "landkreis": "Spree-Neiße", "kommune": "Guben", "ort": "Guben", "typ": "Ortswehr", "eviAlarmierung": true, "lat": 51.949, "lng": 14.714, "link": "https://whatsapp.com/channel/0029Vb1VrOr60eBXRt7pO21B"}, {"name": "Einsatzticker- FF Schenkendöbern", "landkreis": "Spree-Neiße", "kommune": "Schenkendöbern", "ort": "Schenkendöbern", "typ": "Amt/Gemeinde/Stadt", "eviAlarmierung": true, "lat": 51.957, "lng": 14.635, "link": "https://www.whatsapp.com/channel/0029VbCCDYN42Dclxqm9rG2h"}, {"name": "Feuerwehren im Stadtgebiet Luckau (EVI-Luckau)", "landkreis": "Dahme-Spreewald", "kommune": "Luckau", "ort": "Luckau", "typ": "Amt/Gemeinde/Stadt", "eviAlarmierung": true, "lat": 51.852, "lng": 13.707, "link": "https://www.whatsapp.com/channel/0029Vb6rH6g77qVXSF0G7R1D"}];
const fallbackRegionGeoJson = {"type": "FeatureCollection", "name": "EVI Brandenburg Regionen Fallback", "features": [{"type": "Feature", "properties": {"name": "Prignitz"}, "geometry": {"type": "Polygon", "coordinates": [[[11.45, 52.85], [12.25, 53.35], [12.75, 53.22], [12.55, 52.7], [11.75, 52.55], [11.45, 52.85]]]}}, {"type": "Feature", "properties": {"name": "Ostprignitz-Ruppin"}, "geometry": {"type": "Polygon", "coordinates": [[[12.15, 52.6], [12.55, 53.18], [13.15, 53.1], [13.25, 52.55], [12.55, 52.35], [12.15, 52.6]]]}}, {"type": "Feature", "properties": {"name": "Oberhavel"}, "geometry": {"type": "Polygon", "coordinates": [[[12.85, 52.45], [13.15, 53.1], [13.65, 53.02], [13.75, 52.45], [13.35, 52.2], [12.85, 52.45]]]}}, {"type": "Feature", "properties": {"name": "Uckermark"}, "geometry": {"type": "Polygon", "coordinates": [[[13.35, 52.82], [13.85, 53.45], [14.42, 53.36], [14.25, 52.72], [13.75, 52.55], [13.35, 52.82]]]}}, {"type": "Feature", "properties": {"name": "Barnim"}, "geometry": {"type": "Polygon", "coordinates": [[[13.45, 52.45], [13.78, 52.78], [14.22, 52.66], [14.02, 52.28], [13.55, 52.22], [13.45, 52.45]]]}}, {"type": "Feature", "properties": {"name": "Potsdam-Mittelmark"}, "geometry": {"type": "Polygon", "coordinates": [[[12.15, 51.95], [12.65, 52.43], [13.2, 52.33], [13.12, 51.78], [12.45, 51.62], [12.15, 51.95]]]}}, {"type": "Feature", "properties": {"name": "Teltow-Fläming"}, "geometry": {"type": "Polygon", "coordinates": [[[12.85, 51.7], [13.18, 52.12], [13.78, 52.05], [13.7, 51.55], [13.08, 51.4], [12.85, 51.7]]]}}, {"type": "Feature", "properties": {"name": "Dahme-Spreewald"}, "geometry": {"type": "Polygon", "coordinates": [[[13.2, 51.75], [13.42, 52.42], [14.25, 52.38], [14.35, 51.78], [13.95, 51.55], [13.2, 51.75]]]}}, {"type": "Feature", "properties": {"name": "Elbe-Elster"}, "geometry": {"type": "Polygon", "coordinates": [[[12.8, 51.35], [13.15, 51.82], [13.78, 51.7], [13.73, 51.25], [13.15, 51.08], [12.8, 51.35]]]}}, {"type": "Feature", "properties": {"name": "Oberspreewald-Lausitz"}, "geometry": {"type": "Polygon", "coordinates": [[[13.55, 51.3], [13.75, 51.82], [14.25, 51.82], [14.25, 51.35], [13.95, 51.12], [13.55, 51.3]]]}}, {"type": "Feature", "properties": {"name": "Cottbus"}, "geometry": {"type": "Polygon", "coordinates": [[[14.25, 51.68], [14.4, 51.68], [14.43, 51.83], [14.29, 51.88], [14.21, 51.78], [14.25, 51.68]]]}}, {"type": "Feature", "properties": {"name": "Spree-Neiße"}, "geometry": {"type": "Polygon", "coordinates": [[[14.2, 51.3], [14.75, 51.42], [14.86, 52.08], [14.38, 52.12], [14.25, 51.86], [14.45, 51.77], [14.26, 51.67], [14.2, 51.3]]]}}]};

let kanalOrte = [];
let mode = "overview";
let activeRegion = "Alle";
let activeType = "Alle";
let searchTerm = "";

const homeCenter = [52.20, 13.55];
const homeZoom = 7;

const map = L.map("waMap", {
  scrollWheelZoom: false,
  tap: true
}).setView(homeCenter, homeZoom);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "&copy; OpenStreetMap"
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);
const labelLayer = L.layerGroup().addTo(map);

const regionLayer = L.geoJSON(null, {
  style: feature => regionStyle(feature.properties.name, false),
  onEachFeature: (feature, layer) => {
    const name = feature.properties.name;
    const status = regionStatus[name] || "planned";

    layer.bindTooltip(name, { sticky: true });

    layer.on("click", () => {
      map.closePopup();
      if (status === "active") openRegion(name);
      if (status !== "active") zoomToRegion(name);
    });

    layer.on("mouseover", () => {
      if (activeRegion !== name) layer.setStyle(regionStyle(name, true));
    });

    layer.on("mouseout", () => {
      if (activeRegion !== name) layer.setStyle(regionStyle(name, false));
    });
  }
}).addTo(map);

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const wantedRegions = Object.keys(regionStatus);
const regionSearchMap = {
  "Cottbus": ["cottbus"],
  "Dahme-Spreewald": ["dahme spreewald"],
  "Elbe-Elster": ["elbe elster"],
  "Oberspreewald-Lausitz": ["oberspreewald lausitz"],
  "Spree-Neiße": ["spree neisse", "spree neiße"],
  "Barnim": ["barnim"],
  "Oberhavel": ["oberhavel"],
  "Ostprignitz-Ruppin": ["ostprignitz ruppin"],
  "Potsdam-Mittelmark": ["potsdam mittelmark"],
  "Prignitz": ["prignitz"],
  "Teltow-Fläming": ["teltow flaeming", "teltow fläming"],
  "Uckermark": ["uckermark"]
};

function detectRegionName(properties) {
  const values = Object.values(properties || {})
    .filter(value => typeof value === "string" || typeof value === "number")
    .map(value => normalizeText(value))
    .join(" | ");

  for (const region of wantedRegions) {
    const needles = regionSearchMap[region].map(normalizeText);
    if (needles.some(needle => values.includes(needle))) return region;
  }

  return "";
}

function convertGermanyCountyGeoJson(data) {
  if (!data || !Array.isArray(data.features)) throw new Error("Keine Features gefunden.");

  const byName = {};

  data.features.forEach(feature => {
    const regionName = detectRegionName(feature.properties || {});
    if (!wantedRegions.includes(regionName)) return;

    byName[regionName] = {
      type: "Feature",
      properties: { ...(feature.properties || {}), name: regionName },
      geometry: feature.geometry
    };
  });

  const features = Object.values(byName);
  if (features.length < 5) throw new Error("Zu wenige Regionen erkannt.");

  return {
    type: "FeatureCollection",
    name: "Wachalarm Brandenburg Kreisgrenzen",
    features
  };
}

function normalizeChannelItem(item) {
  return {
    name: item.name || item.titel || item.channel || "Unbenannter Kanal",
    landkreis: item.landkreis || item.kreis || item.region || "",
    kommune: item.kommune || item.gemeinde || item.stadt || "",
    ort: item.ort || item.name || "",
    typ: item.typ || item.type || "Ortswehr",
    eviAlarmierung: item.eviAlarmierung === true || item.evi === true || item.alarmierung === true,
    lat: Number(item.lat),
    lng: Number(item.lng),
    link: item.link || item.url || item.whatsapp || ""
  };
}

async function loadChannelData() {
  const sources = [
    fetchJson(externalLausitzUrl).catch(error => {
      console.warn("Externe EVI-Lausitz-Daten nicht erreichbar. Fallback wird genutzt.", error);
      return fallbackKanalOrte;
    }),
    fetchJson(localWachalarmUrl).catch(() => [])
  ];

  const results = await Promise.all(sources);
  const merged = results.flatMap(extractChannelArray).map(normalizeChannelItem);

  kanalOrte = merged.filter(item =>
    item.landkreis &&
    Number.isFinite(item.lat) &&
    Number.isFinite(item.lng)
  );
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function extractChannelArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.kanaele)) return data.kanaele;
  if (Array.isArray(data?.kanalOrte)) return data.kanalOrte;
  if (Array.isArray(data?.channels)) return data.channels;
  if (Array.isArray(data?.orte)) return data.orte;
  return [];
}

function loadRegionGeoJson(data, sourceLabel) {
  regionLayer.clearLayers();
  labelLayer.clearLayers();
  markerLayer.clearLayers();

  regionLayer.addData(data);
  renderLabels();
  renderAll();

  if (regionLayer.getBounds().isValid()) {
    map.fitBounds(regionLayer.getBounds(), { padding: [25, 25] });
  }

  console.info("Wachalarm Karte: Grenzen geladen aus", sourceLabel);
}

function regionStyle(name, hover) {
  const status = regionStatus[name] || "planned";
  const color = regionColors[name] || "#999999";
  const active = activeRegion === name;

  return {
    color: active ? "#111111" : (status === "planned" ? "#666666" : "#222222"),
    weight: active ? 4 : 2.5,
    opacity: 1,
    fillColor: color,
    fillOpacity: status === "active" ? (active ? 0.60 : (hover ? 0.54 : 0.42)) : (hover ? 0.36 : 0.24),
    dashArray: status === "planned" ? "6,5" : null
  };
}

function channelGroup(item) {
  const typ = String(item.typ || "").toLowerCase();

  if (typ === "landkreis" || typ.includes("hauptkanal")) return "main";
  if (typ.includes("amt") || typ.includes("gemeinde") || typ.includes("stadt")) return "kommune";
  if (typ.includes("ortswehr") && item.eviAlarmierung === true) return "ortswehr-evi";
  if (typ.includes("ortswehr")) return "ortswehr-ohne-evi";

  return item.eviAlarmierung ? "ortswehr-evi" : "ortswehr-ohne-evi";
}

function pinColor(item) {
  const group = channelGroup(item);
  if (group === "main") return "#f01812";
  if (group === "kommune") return "#f2994a";
  if (group === "ortswehr-evi") return "#1d70b8";
  return "#888888";
}

function markerIcon(item) {
  const group = channelGroup(item);
  const color = pinColor(item);
  const size = group === "main" ? 26 : 20;
  const opacity = group === "ortswehr-ohne-evi" ? 0.75 : 1;

  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};opacity:${opacity};border:3px solid white;box-shadow:0 2px 9px rgba(0,0,0,.38);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

function typeMatches(item) {
  const group = channelGroup(item);

  return activeType === "Alle" ||
    (activeType === "Hauptkanal" && group === "main") ||
    (activeType === "Kommune" && group === "kommune") ||
    (activeType === "OrtswehrEvi" && group === "ortswehr-evi") ||
    (activeType === "OrtswehrOhneEvi" && group === "ortswehr-ohne-evi");
}

function searchMatches(item) {
  const term = normalizeText(searchTerm);
  if (!term) return true;

  return normalizeText(`${item.landkreis} ${item.kommune || ""} ${item.ort} ${item.name} ${item.typ}`).includes(term);
}

function visibleItems() {
  if (mode === "overview") return [];
  return kanalOrte.filter(item => item.landkreis === activeRegion && typeMatches(item) && searchMatches(item));
}

function statusBadge(item) {
  const group = channelGroup(item);

  if (group === "main") return `<span class="tagline">Hauptkanal</span>`;
  if (group === "kommune") return item.eviAlarmierung
    ? `<span class="tagline" style="background:#dbeafe;color:#1d4ed8;">EVI aktiv</span>`
    : `<span class="tagline" style="background:#e5e7eb;color:#4b5563;">ohne EVI</span>`;
  if (group === "ortswehr-evi") return `<span class="tagline" style="background:#dbeafe;color:#1d4ed8;">EVI aktiv</span>`;

  return `<span class="tagline" style="background:#e5e7eb;color:#4b5563;">ohne EVI</span>`;
}

function renderMarkers() {
  markerLayer.clearLayers();

  visibleItems().forEach(item => {
    const marker = L.marker([item.lat, item.lng], { icon: markerIcon(item) }).addTo(markerLayer);
    const link = item.link
      ? `<a class="wa-button" href="${item.link}" target="_blank" rel="noopener">Jetzt abonnieren</a>`
      : `<span class="wait-button">Link folgt</span>`;

    marker.bindPopup(`
      <div class="popup-title">${item.ort}</div>
      <div class="popup-meta">
        <strong>${item.name}</strong><br>
        ${item.typ} · ${item.landkreis}<br>
        ${statusBadge(item)}
      </div>
      ${link}
    `);
  });
}

function cardClass(item) {
  return channelGroup(item);
}

function renderList() {
  const list = document.getElementById("channelList");
  const title = document.getElementById("listTitle");

  list.innerHTML = "";

  if (mode === "overview") {
    title.textContent = "Regionen";

    Object.keys(regionStatus).forEach(region => {
      const status = regionStatus[region];
      const card = document.createElement("div");
      card.className = "channel-card " + (status === "active" ? "region" : "planned");
      card.innerHTML = status === "active"
        ? `<span class="tagline">Aktive Region</span><strong>${region}</strong><small>Klick öffnet die Detailkarte mit Kanälen.</small><span class="wa-button">Region öffnen</span>`
        : `<span class="tagline">Geplant</span><strong>${region}</strong><small>Diese Region ist vorbereitet und befindet sich im Aufbau.</small><span class="wait-button">Im Aufbau</span>`;

      if (status === "active") card.addEventListener("click", () => openRegion(region));
      list.appendChild(card);
    });

    return;
  }

  title.textContent = `Kanäle in ${activeRegion}`;
  const items = visibleItems();

  if (!items.length) {
    list.innerHTML = "<p>Keine passenden Kanäle gefunden.</p>";
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "channel-card " + cardClass(item);
    const link = item.link
      ? `<a class="wa-button" href="${item.link}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Jetzt abonnieren</a>`
      : `<span class="wait-button">Link folgt</span>`;

    card.innerHTML = `
      ${statusBadge(item)}
      <span class="tagline">${item.typ}</span>
      <strong>${item.name}</strong>
      <small>${item.ort} · ${item.kommune || item.landkreis} · ${item.landkreis}</small>
      ${link}
    `;
    card.addEventListener("click", () => map.setView([item.lat, item.lng], channelGroup(item) === "main" ? 10 : 12));
    list.appendChild(card);
  });
}

function renderRegionButtons() {
  const container = document.getElementById("regionButtons");
  container.innerHTML = "";

  ["Alle", ...Object.keys(regionStatus)].forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;

    if ((name === "Alle" && mode === "overview") || name === activeRegion) btn.classList.add("active");

    btn.addEventListener("click", () => {
      if (name === "Alle") {
        backToOverview();
        return;
      }

      if (regionStatus[name] === "active") openRegion(name);
      else {
        mode = "overview";
        activeRegion = name;
        renderAll();
        zoomToRegion(name);
      }
    });

    container.appendChild(btn);
  });
}

function renderMode() {
  const badge = document.getElementById("modeBadge");
  const back = document.getElementById("backBtn");
  const filters = document.getElementById("typeFilters");
  const legend = document.getElementById("legendBox");

  if (mode === "overview") {
    badge.textContent = "Übersicht Brandenburg";
    badge.className = "mode-badge";
    back.classList.remove("visible");
    filters.classList.remove("visible");
    legend.innerHTML = `<span class="legend-dot dot-active"></span>bunte Fläche = aktive Region<br><span class="legend-dot dot-planned"></span>graue Fläche = geplant / im Aufbau`;
  } else {
    badge.textContent = `Detailansicht: ${activeRegion}`;
    badge.className = "mode-badge detail";
    back.classList.add("visible");
    filters.classList.add("visible");
    legend.innerHTML = `<span class="legend-dot dot-main"></span>roter Pin = Hauptkanal Landkreis / Stadt<br>
      <span class="legend-dot dot-kommune"></span>orangener Pin = Amt / Gemeinde / Stadt<br>
      <span class="legend-dot dot-ortswehr-evi"></span>blauer Pin = Ortswehr mit EVI<br>
      <span class="legend-dot dot-ortswehr-ohne-evi"></span>grauer Pin = Ortswehr ohne EVI`;
  }
}

function refreshRegionStyles() {
  regionLayer.eachLayer(layer => layer.setStyle(regionStyle(layer.feature.properties.name, false)));
}

function renderLabels() {
  labelLayer.clearLayers();

  regionLayer.eachLayer(layer => {
    const name = layer.feature.properties.name;
    const center = layer.getBounds().getCenter();

    L.marker(center, {
      icon: L.divIcon({
        className: "county-label",
        html: name,
        iconSize: [150, 28],
        iconAnchor: [75, 14]
      }),
      interactive: false
    }).addTo(labelLayer);
  });
}

function zoomToRegion(name) {
  regionLayer.eachLayer(layer => {
    if (layer.feature.properties.name === name) {
      map.fitBounds(layer.getBounds(), { padding: [35, 35] });
    }
  });
}

function openRegion(name) {
  if (regionStatus[name] !== "active") return;

  mode = "detail";
  activeRegion = name;
  activeType = "Alle";
  setTypeButton("Alle");
  renderAll();
  zoomToRegion(name);
}

function backToOverview() {
  mode = "overview";
  activeRegion = "Alle";
  activeType = "Alle";
  searchTerm = "";

  setTypeButton("Alle");
  document.getElementById("searchInput").value = "";
  renderAll();

  if (regionLayer.getBounds().isValid()) {
    map.fitBounds(regionLayer.getBounds(), { padding: [25, 25] });
  }
}

function setTypeButton(type) {
  document
    .querySelectorAll("#typeAll, #typeMain, #typeKommune, #typeOrtswehrEvi, #typeOrtswehrOhneEvi")
    .forEach(btn => btn.classList.remove("active"));

  if (type === "Alle") document.getElementById("typeAll").classList.add("active");
  if (type === "Hauptkanal") document.getElementById("typeMain").classList.add("active");
  if (type === "Kommune") document.getElementById("typeKommune").classList.add("active");
  if (type === "OrtswehrEvi") document.getElementById("typeOrtswehrEvi").classList.add("active");
  if (type === "OrtswehrOhneEvi") document.getElementById("typeOrtswehrOhneEvi").classList.add("active");
}

function setType(type) {
  activeType = type;
  setTypeButton(type);
  renderMarkers();
  renderList();
}

function renderAll() {
  renderMode();
  renderRegionButtons();
  refreshRegionStyles();
  renderMarkers();
  renderList();
}

function bindControls() {
  document.getElementById("backBtn").addEventListener("click", backToOverview);
  document.getElementById("searchInput").addEventListener("input", event => {
    searchTerm = event.target.value;
    renderMarkers();
    renderList();
  });

  document.getElementById("typeAll").addEventListener("click", () => setType("Alle"));
  document.getElementById("typeMain").addEventListener("click", () => setType("Hauptkanal"));
  document.getElementById("typeKommune").addEventListener("click", () => setType("Kommune"));
  document.getElementById("typeOrtswehrEvi").addEventListener("click", () => setType("OrtswehrEvi"));
  document.getElementById("typeOrtswehrOhneEvi").addEventListener("click", () => setType("OrtswehrOhneEvi"));
}

async function initMap() {
  bindControls();
  await loadChannelData();

  fetch(deutschlandKreiseUrl)
    .then(response => {
      if (!response.ok) throw new Error("Echte Kreisgrenzen konnten nicht geladen werden");
      return response.json();
    })
    .then(data => loadRegionGeoJson(convertGermanyCountyGeoJson(data), "echte Kreisgrenzen"))
    .catch(error => {
      console.warn("Echte Kreisgrenzen nicht verfügbar, nutze Fallback:", error);
      loadRegionGeoJson(fallbackRegionGeoJson, "Fallback-Kreisflächen");
    });
}

initMap();
