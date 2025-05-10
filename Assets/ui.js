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
const algorithmSelect = document.getElementById("algorithmSelect");
const dijkstraOptionsLabel = document.getElementById("dijkstraOptionsLabel");

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

// Bu fonksiyonu HTML'i değiştirince kaldırdık
function toggleAlgorithmOptions() {
    // Rota tipi seçenekleri her algoritma için gösteriliyor
}




// Ana rota gösteren fonksiyon
function showPath() {
    const start = startSelect.value;
    const end = endSelect.value;
    const algorithm = algorithmSelect.value;
    const routeType = routeTypeSelect.value;
    
    if (start === end) return alert("Başlangıç ve bitiş farklı olmalı");
    
    // Algoritma seçimine göre yol bulma
    let path;
    let routeColor;
    let pathKey = `${algorithm}_${routeType}`;
    
    if (algorithm === "dijkstra") {
        if (routeType === "shortest") {
            path = dijkstra(legacyGraph.getGraph(), start, end);
            routeColor = 'blue';
        } else if (routeType === "trafficAware") {
            path = dijkstraTrafficAware(trafficGraph.getGraph(), start, end);
            routeColor = 'red';
        }
    } else if (algorithm === "astar") {
        if (routeType === "shortest") {
            path = astar(legacyGraph.getGraph(), start, end, heuristicFunction);
            routeColor = 'green';
        } else if (routeType === "trafficAware") {
            path = astarTrafficAware(trafficGraph.getGraph(), start, end, heuristicFunction);
            routeColor = 'purple';
        }
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
    speakPath(path, algorithm, routeType);
    
    // Adım bilgisi hazırla
    stepText = "";
    showStepListAlert(path, algorithm, routeType);
    
    // Bu rotayı geçmişte sakla
    pathHistory[`${algorithm}_${routeType}`] = path;
}


// PriorityQueue sınıfı tanımı (A* için)



// Trafik yoğunluğunu metin olarak açıkla
function getTrafficDescription(trafficValue) {
    if (trafficValue <= 2) return "Düsük";
    if (trafficValue <= 5) return "Normal";
    if (trafficValue <= 8) return "Yogun";
    return "Cok yogun";
}

// Rotayı sesli okuma fonksiyonu
function speakPath(path, algorithm, routeType) {
    let routeDesc = "";
    
    if (routeType === "shortest") {
        routeDesc = algorithm === "dijkstra" ? "Dijkstra en kısa" : "A-Star en kısa";
    } else {
        routeDesc = algorithm === "dijkstra" ? "Dijkstra trafik duyarlı" : "A-Star trafik duyarlı";
    }

    // 'ar' regex filtreleme
    const filteredPath = path.filter(step => !step.includes("Ar"));

    const utterance = new SpeechSynthesisUtterance(`${routeDesc} rota: ${filteredPath.join(" → ")}`);
    utterance.rate = 0.8;
    utterance.lang = "tr-TR";
    speechSynthesis.speak(utterance);
}

// Karşılaştırma için adım bilgilerini hazırla
function showStepListAlert(path, algorithm, routeType) {
    // Mevcut rotanın algoritma türünü ve adını belirle
    const currentPathKey = `${algorithm}_${routeType}`;
    let currentRouteName = "";
    
    if (algorithm === "dijkstra") {
        currentRouteName = routeType === "shortest" ? "En Kısa Rota (Dijkstra)" : "Trafik Duyarlı Rota (Dijkstra)";
    } else if (algorithm === "astar") {
        currentRouteName = routeType === "shortest" ? "En Kısa Rota (A*)" : "Trafik Duyarlı Rota (A*)";
    }
    
    // Mevcut rotanın toplam mesafesini hesapla
    let currentRouteDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
        if (routeType === "shortest") {
            currentRouteDistance += legacyGraph.getGraph()[path[i]][path[i + 1]];
        } else {
            currentRouteDistance += trafficGraph.getGraph()[path[i]][path[i + 1]].distance;
        }
    }
    
    // Karşılaştırma metni oluştur
    stepText = `${currentRouteName}: ${currentRouteDistance}m\n\n`;
    
    // Diğer algoritmaların rota bilgilerini ekle (eğer daha önce hesaplanmışsa)
    const otherPaths = {
        "dijkstra_shortest": "En Kısa Rota (Dijkstra)",
        "dijkstra_trafficAware": "Trafik Duyarlı Rota (Dijkstra)",
        "astar_shortest": "En Kısa Rota (A*)",
        "astar_trafficAware": "Trafik Duyarlı Rota (A*)"
    };
    
    // Tüm rota türlerini kontrol et
    for (const [pathKey, pathName] of Object.entries(otherPaths)) {
        // Kendimizi karşılaştırmaya eklemeyelim
        if (pathKey === currentPathKey) continue;
        
        // Bu rota daha önce hesaplanmış mı?
        if (pathHistory[pathKey]) {
            let otherDistance = 0;
            const otherPath = pathHistory[pathKey];
            
            // Toplam mesafeyi hesapla
            for (let i = 0; i < otherPath.length - 1; i++) {
                if (pathKey.includes("_shortest")) {
                    otherDistance += legacyGraph.getGraph()[otherPath[i]][otherPath[i + 1]];
                } else {
                    otherDistance += trafficGraph.getGraph()[otherPath[i]][otherPath[i + 1]].distance;
                }
            }
            
            // Farkı hesapla
            const diff = currentRouteDistance - otherDistance;
            const diffText = diff > 0 
                ? `${Math.abs(diff)}m daha uzun` 
                : diff < 0 
                    ? `${Math.abs(diff)}m daha kısa` 
                    : "aynı uzunlukta";
                    
            stepText += `${pathName}: ${otherDistance}m - ${diffText}\n\n`;
        }
    }
    
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



function updateUI() {
    // Performans karşılaştırma butonu oluştur
    const compareButton = document.createElement('button');
    compareButton.id = 'compareButton';
    compareButton.className = 'btn btn-warning';
    compareButton.innerHTML = 'Algoritmaları Karşılaştır';
    compareButton.onclick = compareAlgorithmPerformance;
    
    // Butonu uygun yere ekle - "Rota Göster" butonunun yanına
    const showPathButton = document.querySelector('button'); // İlk buton muhtemelen "Rota Göster" butonu
    if (showPathButton && showPathButton.parentNode) {
        showPathButton.parentNode.appendChild(compareButton);
    }
}




// Sayfa yüklendiğinde algoritma seçeneklerini ayarla
document.addEventListener('DOMContentLoaded', function() {
    toggleAlgorithmOptions();
    updateUI();
});
