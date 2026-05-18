if (typeof L === "undefined") {
  const target = document.getElementById("waMap");
  if (target) target.innerHTML = "<div style='padding:2rem;font-weight:800'>Die Kartenbibliothek konnte nicht geladen werden. Bitte Internetverbindung prüfen.</div>";
  throw new Error("Leaflet konnte nicht geladen werden.");
}

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
  "Prignitz": "active",
  "Teltow-Fläming": "planned",
  "Uckermark": "planned"
};

const regionColors = {
  "Cottbus": "#fbd38d",
  "Dahme-Spreewald": "#86efac",
  "Elbe-Elster": "#fca5a5",
  "Oberspreewald-Lausitz": "#c4b5fd",
  "Spree-Neiße": "#93c5fd",
  "Barnim": "#9ca3af",
  "Oberhavel": "#9ca3af",
  "Ostprignitz-Ruppin": "#9ca3af",
  "Potsdam-Mittelmark": "#9ca3af",
  "Prignitz": "#f9a8d4",
  "Teltow-Fläming": "#9ca3af",
  "Uckermark": "#9ca3af"
};

const externalLausitzUrl = "https://evilausitz.de/data/evi-kanalorte.json";
const localWachalarmUrls = [
  "/data/nordwest.json",
  "/data/nordost.json",
  "/data/brandenburg.json"
];
const deutschlandKreiseUrl = "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/refs/heads/main/4_kreise/4_nied
