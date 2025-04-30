const map = L.map('map', {
    minZoom: 15.4, 
    maxBounds: [
        [40.219093212908916, 28.852500915527347], 
        [40.230070051445686, 28.892755508422855]  
    ],
    maxBoundsViscosity: 0.7  
}).setView([40.22459954185981, 28.872349262237552], 16);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


const startSelect = document.getElementById("startSelect");
const endSelect = document.getElementById("endSelect");

buildings.forEach(b => {
    if (!b.name.startsWith("Ar")) {
        const opt1 = new Option(b.name, b.name);
        const opt2 = new Option(b.name, b.name);
        startSelect.add(opt1);
        endSelect.add(opt2);
    }
});

let routeLine = null;
let activeMarkers = [];

function showShortestPath() {
    const start = startSelect.value;
    const end = endSelect.value;
    if (start === end) return alert("Başlangıç ve bitiş farklı olmalı");

    const path = dijkstra(adjacency, start, end);
    if (!path.length) return alert("Yol bulunamadı");

    if (routeLine) map.removeLayer(routeLine);
    activeMarkers.forEach(marker => map.removeLayer(marker));
    activeMarkers = [];

    const segmentGroup = L.layerGroup().addTo(map);
    routeLine = segmentGroup;

    let delay = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const from = buildings.find(b => b.name === path[i]).coords;
        const to = buildings.find(b => b.name === path[i + 1]).coords;
        setTimeout(() => {
            L.polyline([from, to], { color: 'red', weight: 5 }).addTo(segmentGroup);
        }, delay);
        delay += 500;
    }

    [0, path.length - 1].forEach(i => {
        const building = buildings.find(b => b.name === path[i]);
        const marker = L.marker(building.coords)
            .addTo(segmentGroup)
            .bindTooltip(path[i], { permanent: true, direction: 'top', offset: [0, -10] });
        activeMarkers.push(marker);
    });

    const latlngs = path.map(name => buildings.find(b => b.name === name).coords);
    map.fitBounds(L.polyline(latlngs).getBounds());

    
    speakPath(path); // sesli okumak icin
    showStepList(path); // step list, html ekleme
}

function dijkstra(graph, start, end) { // kısa yol bulma algoritması
    const distances = {}; // uzaklklar
    const previous = {};  // önceki
    const queue = new Set(Object.keys(graph));

    for (let node of queue) {
        distances[node] = Infinity; // uzaklıklar sonsuz halde ayarlanır.
        previous[node] = null;
    }
    distances[start] = 0;

    while (queue.size > 0) {
        const current = [...queue].reduce((a, b) => distances[a] < distances[b] ? a : b);
        queue.delete(current);

        if (current === end) break;

        for (let neighbor in graph[current]) {
            const alt = distances[current] + graph[current][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = current;
            }
        }
    }

    const path = [];
    let u = end;
    while (u) 
    {
        path.unshift(u);
        u = previous[u];
    }
    return path[0] === start ? path : [];
}

// rotayı sesli okumak için.
function speakPath(path) {
    const utterance = new SpeechSynthesisUtterance("İzlenecek rota: " + path.join(" → "));
    utterance.rate = 0.8;
    utterance.lang = "tr-TR";
    speechSynthesis.speak(utterance);
}

// rotaları adım şeklinde göstermek
function showStepList(path) {
    const container = document.getElementById("stepList");
    if (!container) return;
    let html = "<b>Adım Adım Rota:</b><ol>";
    for (let i = 0; i < path.length - 1; i++) {
        html += `<li>${path[i]} → ${path[i + 1]}</li>`;
    }
    html += "</ol>";
    container.innerHTML = html;
}
