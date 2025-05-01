let stepText = "";

const map = L.map('map', {
    minZoom: 15, // min zoom limiti
    maxBounds: [
        [40.21720889071898, 28.83295152664185],
        [40.237967194326756, 28.895806934356693]
    ],
    maxBoundsViscosity: 0.75
}).setView([40.22459954185981, 28.872349262237552], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// HTML elementleri
const startSelect = document.getElementById("startSelect");
const endSelect = document.getElementById("endSelect");
const routeTypeSelect = document.getElementById("routeTypeSelect");

// Binaları selectlere ekleme
buildings.forEach(b => {
    if (!b.name.startsWith("Ar")) {
        const opt1 = new Option(b.name, b.name);
        const opt2 = new Option(b.name, b.name);
        startSelect.add(opt1);
        endSelect.add(opt2);
    }
});

// Rota çizimleri için global değişkenler
let routeLine = null;
let activeMarkers = [];
let pathHistory = {}; // Her rota tipine göre son gösterilen yolu saklamak için

// Kısa yol bulma fonksiyonu
function showShortestPath() {
    const start = startSelect.value;
    const end = endSelect.value;
    const routeType = routeTypeSelect.value;

    if (start === end) return alert("Başlangıç ve bitiş farklı olmalı");

    // Rota tipine göre yol bulma
    let path;
    if (routeType === "shortest") {
        path = dijkstra(legacyGraph.getGraph(), start, end);
    } else if (routeType === "trafficAware") {
        path = dijkstraTrafficAware(trafficGraph.getGraph(), start, end);
    }

    if (!path.length) return alert("Yol bulunamadı");

    // eskileri temizle
    if (routeLine) map.removeLayer(routeLine);
    activeMarkers.forEach(marker => map.removeLayer(marker));
    activeMarkers = [];

    // Rotayı çiz
    const segmentGroup = L.layerGroup().addTo(map);
    routeLine = segmentGroup;

    let delay = 0;
    // Renk seçimi
    const lineColor = routeType === "shortest" ? 'blue' : 'red';

    // Yolları çiz
    for (let i = 0; i < path.length - 1; i++) {
        const from = buildings.find(b => b.name === path[i]).coords;
        const to = buildings.find(b => b.name === path[i + 1]).coords;

        // Yol parçasını oluştur
        setTimeout(() => {
            // Rota tipine göre çizgi rengi ve kalınlığı seçimi
            const line = L.polyline([from, to], {
                color: lineColor,
                weight: 5,
                dashArray: routeType === "trafficAware" ? "5, 10" : null  // Trafik duyarlı rotada kesikli çizgi
            }).addTo(segmentGroup);

            // Trafiğe duyarlı rotada trafik yoğunluk bilgisini göster
            if (routeType === "trafficAware") {
                const segment = adjacency[path[i]][path[i + 1]];
                const trafficInfo = getTrafficDescription(segment.traffic);
                line.bindTooltip(`Mesafe: ${segment.distance}m, Trafik: ${trafficInfo}`);
            }
        }, delay);
        delay += 300; // 300ms delay verildi burada
    }

    // Başlangıç ve bitiş noktalarını işaretle
    [0, path.length - 1].forEach((i, index) => {
        const building = buildings.find(b => b.name === path[i]);
        const markerIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${index === 0 ? 'green' : 'red'}; width: 15px; height: 15px; border-radius: 50%;"></div>`,
            iconSize: [15, 15],
            iconAnchor: [7, 7]
        });
        const marker = L.marker(building.coords, { icon: markerIcon })
            .addTo(segmentGroup)
            .bindTooltip(path[i], { permanent: true, direction: 'top', offset: [0, -10] });
        activeMarkers.push(marker);
    });

    // Haritayı rotaya odakla
    const latlngs = path.map(name => buildings.find(b => b.name === name).coords);
    map.fitBounds(L.polyline(latlngs).getBounds());

    // Rotayı sesli oku
    speakPath(path, routeType);

    //showStepList(path, routeType); // htmle stepleri yazar.
    stepText = ""
    showStepListAlert(path,routeType);

    // Bu rotayı geçmişte sakla
    pathHistory[routeType] = path;
}

// Trafik yoğunluğunu dikkate almayan klasik Dijkstra algoritması
function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const queue = new Queue();
    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
        queue.enqueue(node);
    }
    distances[start] = 0;

    while (!queue.isEmpty()) {
        const current = queue.toArray().reduce((a, b) => distances[a] < distances[b] ? a : b);
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
    while (u) {
        path.unshift(u);
        u = previous[u];
    }
    return path[0] === start ? path : [];
}

function dijkstraTrafficAware(graph, start, end) {
    const distances = {};
    const previous = {};
    const queue_ = new Queue();

    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
        queue_.enqueue(node);
    }
    distances[start] = 0;

    while (!queue_.isEmpty()) {
        const current = queue_.toArray().reduce((a, b) => distances[a] < distances[b] ? a : b);
        queue_.delete(current);

        if (current === end) break;

        for (let neighbor in graph[current]) {
            const segment = graph[current][neighbor];
            const weightedDistance = segment.distance * (1 + segment.traffic / 3);
            const alt = distances[current] + weightedDistance;
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = current;
            }
        }
    }

    const path = [];
    let u = end;
    while (u) {
        path.unshift(u);
        u = previous[u];
    }

    return path[0] === start ? path : [];
}

// Trafik yoğunluğunu metin olarak açıkla
function getTrafficDescription(trafficValue) {
    if (trafficValue <= 2) return "Düsük";
    if (trafficValue <= 5) return "Normal";
    if (trafficValue <= 8) return "Yogun";
    return "Cok yogun";
}

// Rotayı sesli okuma fonksiyonu
function speakPath(path, routeType) {
    let routeDesc = routeType === "shortest" ? "En kısa" : "Trafik duyarlı";

    // 'ar' regex filtreleme
    const filteredPath = path.filter(step => !step.includes("Ar"));

    const utterance = new SpeechSynthesisUtterance(`${routeDesc} rota: ${filteredPath.join(" → ")}`);
    utterance.rate = 0.8;
    utterance.lang = "tr-TR";
    speechSynthesis.speak(utterance);
}

// Rotaları adım şeklinde gösterme
// function showStepList(path, routeType) {
//     const container = document.getElementById("stepList");
//     if (!container) return;


//     let totalDistance = 0;
//     let totalTraffic = 0;

//     for (let i = 0; i < path.length - 1; i++) {
//         if (routeType === "shortest") {
//             totalDistance += legacyAdjacency[path[i]][path[i + 1]];
//         } else {
//             const segment = adjacency[path[i]][path[i + 1]];
//             totalDistance += segment.distance;
//             totalTraffic += segment.traffic;
//         }
//     }
//     console.log(totalDistance);

//     const routeTypeTitle = routeType === "shortest" ? "En Kısa Rota" : "Trafik Duyarlı Rota";

//     let html = `<b>${routeTypeTitle} (${totalDistance}m)</b><ol>`;

//     // Her adımı liste olarak göster
//     for (let i = 0; i < path.length - 1; i++) {
//         if (routeType === "shortest") {
//             // En kısa rota için sadece mesafe göster
//             const distance = legacyAdjacency[path[i]][path[i + 1]];
//             html += `<li>${path[i]} → ${path[i + 1]} (${distance}m)</li>`;
//         } else {
//             // Trafik duyarlı rota için hem mesafe hem trafik durumu göster
//             const segment = adjacency[path[i]][path[i + 1]];
//             const trafficInfo = getTrafficDescription(segment.traffic);
//             html += `<li>${path[i]} → ${path[i + 1]} (${segment.distance}m, Trafik: ${trafficInfo})</li>`;
//         }
//     }

//     html += "</ol>";

//     // Karşılaştırma bölümü ekle (eğer diğer rota tipi de gösterilmişse)
//     const otherType = routeType === "shortest" ? "trafficAware" : "shortest";
//     if (pathHistory[otherType]) {
//         let otherDist = 0;
//         let otherTraffic = 0;

//         for (let i = 0; i < pathHistory[otherType].length - 1; i++) {
//             if (otherType === "shortest") {
//                 otherDist += legacyAdjacency[pathHistory[otherType][i]][pathHistory[otherType][i + 1]];
//             } else {
//                 const segment = adjacency[pathHistory[otherType][i]][pathHistory[otherType][i + 1]];
//                 otherDist += segment.distance;
//                 otherTraffic += segment.traffic;
//             }
//         }

//         const diff = totalDistance - otherDist;
//         const diffText = diff > 0 ? `${Math.abs(diff)}m daha uzun` : `${Math.abs(diff)}m daha kısa`;

//         html += `<p><b>Karşılaştırma:</b> ${otherType === "shortest" ? "En kısa rota" : "Trafik duyarlı rota"} ile karşılaştırıldığında ${diffText}.</p>`;
//     }
//     container.innerHTML = html;
// }


function showStepListAlert(path, routeType) {
    console.log("semih");
    let totalDistance = 0;
    let totalTraffic = 0;
    for (let i = 0; i < path.length - 1; i++) {
        if (routeType === "shortest") {
            totalDistance += legacyAdjacency[path[i]][path[i + 1]];
        } else {
            const segment = adjacency[path[i]][path[i + 1]];
            totalDistance += segment.distance;
            totalTraffic += segment.traffic;
        }
    }
    const routeTypeTitle = routeType === "shortest" ? "En Kısa Rota" : "Trafik Duyarlı Rota";
    stepText += `${routeTypeTitle} (${totalDistance}m)\n\n`;
    for (let i = 0; i < path.length - 1; i++) {
        if (routeType === "shortest") {
            const distance = legacyAdjacency[path[i]][path[i + 1]];
            stepText += `${i + 1}. ${path[i]} → ${path[i + 1]} (${distance}m)\n`;
        } else {
            const segment = adjacency[path[i]][path[i + 1]];
            const trafficInfo = getTrafficDescription(segment.traffic);
            stepText += `${i + 1}. ${path[i]} → ${path[i + 1]} (${segment.distance}m, Trafik: ${trafficInfo})\n`;
        }
    }
    const otherType = routeType === "shortest" ? "trafficAware" : "shortest";
    if (pathHistory[otherType]) {
        let otherDist = 0;
        let otherTraffic = 0;

        for (let i = 0; i < pathHistory[otherType].length - 1; i++) {
            if (otherType === "shortest") {
                otherDist += legacyAdjacency[pathHistory[otherType][i]][pathHistory[otherType][i + 1]];
            } else {
                const segment = adjacency[pathHistory[otherType][i]][pathHistory[otherType][i + 1]];
                otherDist += segment.distance;
                otherTraffic += segment.traffic;
            }
        }

        const diff = totalDistance - otherDist;
        const diffText = diff > 0 ? `${Math.abs(diff)}m daha uzun` : `${Math.abs(diff)}m daha kısa`;

        stepText += `\nKarşılaştırma: ${otherType === "shortest" ? "En kısa rota" : "Trafik duyarlı rota"} ile karşılaştırıldığında ${diffText}.\n`;
    }
}
function showStepOnAlertBox() {
    if(stepText)
        alert(stepText);
    else
        alert("Rota bilgileri belirlenmedi. Lütfen rota belirleyiniz.");
}
