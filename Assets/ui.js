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

// Ana rota gösteren fonksiyon
function showPath() {
    const start = startSelect.value;
    const end = endSelect.value;
    const routeType = routeTypeSelect.value;
    
    if (start === end) return alert("Başlangıç ve bitiş farklı olmalı");
    
    // Dijkstra algoritması ile yol bulma
    let path;
    let routeColor;
    let pathKey = `dijkstra_${routeType}`;
    
    if (routeType === "shortest") {
        path = dijkstra(legacyGraph.getGraph(), start, end);
        routeColor = 'blue';
    } else if (routeType === "trafficAware") {
        path = dijkstraTrafficAware(trafficGraph.getGraph(), start, end);
        routeColor = 'red';
    }
    
    if (!path || !path.length) return alert("Yol bulunamadı");
    
    // Eskileri temizle
    if (routeLine) map.removeLayer(routeLine);
    activeMarkers.forEach(marker => map.removeLayer(marker));
    activeMarkers = [];
    
    // Rotayı çiz
    const segmentGroup = L.layerGroup().addTo(map);
    routeLine = segmentGroup;
    
    let delay = 0;
    let dashArray = null;
    
    // Kesikli çizgiyi tüm trafiğe duyarlı rotalar için kullan
    if (routeType === "trafficAware") {
        dashArray = "5, 10";
    }
    
    // Yolları çizmek için for döngüsü
    for (let i = 0; i < path.length - 1; i++) {
        const from = buildings.find(b => b.name === path[i]).coords;
        const to = buildings.find(b => b.name === path[i + 1]).coords;
        
        // Yolun yavaş yavaş timeouta göre çizilmesi için
        setTimeout(() => {
            // Kalınlık seçimi
            const line = L.polyline([from, to], {
                color: routeColor,
                weight: 5,
                dashArray: dashArray
            }).addTo(segmentGroup);
            
            // Trafiğe duyarlı rotada trafik yoğunluk bilgisini göster
            if (routeType === "trafficAware") {
                const segment = adjacency[path[i]][path[i + 1]];
                const trafficInfo = getTrafficDescription(segment.traffic);
                line.bindTooltip(`Mesafe: ${segment.distance}m, Trafik: ${trafficInfo}`);
            } else {
                // En kısa yol rotaları için sadece mesafe bilgisi
                const distance = legacyGraph.getGraph()[path[i]][path[i + 1]];
                line.bindTooltip(`Mesafe: ${distance}m`);
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
    
    // Adım bilgisi hazırla
    stepText = "";
    showStepListAlert(path, routeType);
    
    // Bu rotayı geçmişte sakla
    pathHistory[pathKey] = path;
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
    let routeDesc = routeType === "shortest" ? "Dijkstra en kısa" : "Dijkstra trafik duyarlı";

    // 'ar' regex filtreleme
    const filteredPath = path.filter(step => !step.includes("Ar"));

    const utterance = new SpeechSynthesisUtterance(`${routeDesc} rota: ${filteredPath.join(" → ")}`);
    utterance.rate = 0.8;
    utterance.lang = "tr-TR";
    speechSynthesis.speak(utterance);
}

// Karşılaştırma için adım bilgilerini hazırla
function showStepListAlert(path, routeType) {
    // 'Ar' olmadan rota
    const filteredPath = path.filter(step => !step.includes("Ar"));
    
    // Mevcut rotanın algoritma türünü ve adını belirle
    const currentPathKey = `dijkstra_${routeType}`;
    let currentRouteName = routeType === "shortest" ? "En Kısa Rota" : "Trafik Duyarlı Rota";
    
    // Mevcut rotanın toplam mesafesini hesapla
    let currentRouteDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
        if (routeType === "shortest") {
            currentRouteDistance += legacyGraph.getGraph()[path[i]][path[i + 1]];
        } else {
            currentRouteDistance += trafficGraph.getGraph()[path[i]][path[i + 1]].distance;
        }
    }
    
    // Diğer rota tipini belirle
    const otherType = routeType === "shortest" ? "trafficAware" : "shortest";
    const otherName = otherType === "shortest" ? "En Kısa Rota" : "Trafik Duyarlı Rota";
    
    // Diğer rota için hesaplama
    let otherPath, otherRouteDistance;
    if (otherType === "shortest") {
        otherPath = dijkstra(legacyGraph.getGraph(), path[0], path[path.length - 1]);
    } else {
        otherPath = dijkstraTrafficAware(trafficGraph.getGraph(), path[0], path[path.length - 1]);
    }
    
    // Diğer rotanın mesafesini hesapla
    otherRouteDistance = 0;
    for (let i = 0; i < otherPath.length - 1; i++) {
        if (otherType === "shortest") {
            otherRouteDistance += legacyGraph.getGraph()[otherPath[i]][otherPath[i + 1]];
        } else {
            otherRouteDistance += trafficGraph.getGraph()[otherPath[i]][otherPath[i + 1]].distance;
        }
    }
    
    // 'Ar' içermeyen rotaları filtrele
    const filteredOtherPath = otherPath.filter(step => !step.includes("Ar"));
    
    // Farkı hesapla
    const diff = currentRouteDistance - otherRouteDistance;
    const diffText = diff > 0 
        ? `${Math.abs(diff).toFixed(2)} metre daha uzun` 
        : diff < 0 
            ? `${Math.abs(diff).toFixed(2)} metre daha kısa` 
            : "aynı uzunlukta";
    
    // Karşılaştırma metni oluştur
    stepText = `${currentRouteName}: ${currentRouteDistance.toFixed(2)} metre\n`;
    stepText += `İzlenen Rota:\n${filteredPath.join(' → ')}\n`;
    stepText += "---------------------------------------------------------------------\n"
    stepText += `${otherName}: ${otherRouteDistance.toFixed(2)} metre (${diffText})`;
    stepText += `\nDiğer Rotanın Yolu:\n${filteredOtherPath.join(' → ')}`;
    
    // Konsola yazdır
    console.log(stepText);
}

// Detayları alert box'ta göster
function showStepOnAlertBox() {
    if(stepText)
        alert(stepText);
    else
        alert("Rota bilgileri belirlenmedi. Lütfen rota belirleyiniz.");
}

// Detayları alert box'ta göster
function showStepOnAlertBox() {
    if(stepText)
        alert(stepText);
    else
        alert("Rota bilgileri belirlenmedi. Lütfen rota belirleyiniz.");
}

function updateUI() {
    // Performans butonu oluştur
    const performanceButton = document.createElement('button');
    performanceButton.id = 'performanceButton';
    performanceButton.className = 'btn btn-warning';
    performanceButton.innerHTML = 'Performans Ölç';
    performanceButton.onclick = measureDijkstraPerformance;
    
    // Butonu uygun yere ekle - "Rota Göster" butonunun yanına
    const showPathButton = document.querySelector('button'); 
    if (showPathButton && showPathButton.parentNode) {
        showPathButton.parentNode.appendChild(performanceButton);
    }
}

// Sayfa yüklendiğinde UI'ı güncelle
document.addEventListener('DOMContentLoaded', function() {
    updateUI();
});
