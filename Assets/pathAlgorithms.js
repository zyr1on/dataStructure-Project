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



function heuristicFunction(node1, node2) {
    const building1 = buildings.find(b => b.name === node1);
    const building2 = buildings.find(b => b.name === node2);
    
    if (!building1 || !building2) return 0;
    
    // Haversine formülü ile kuş uçuşu mesafe hesaplama
    const lat1 = building1.coords[0];
    const lon1 = building1.coords[1];
    const lat2 = building2.coords[0];
    const lon2 = building2.coords[1];
    
    // Yeryüzü yarıçapı (metre cinsinden)
    const R = 6371000;
    
    // Radyan cinsine çevirme
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    // Mesafe (metre cinsinden)
    return R * c;
}

// A* Algoritması implementasyonu
function astar(graph, start, end, heuristic) {
    // Eğer heuristic fonksiyonu verilmemişse, varsayılan olarak 0 döndür
    heuristic = heuristic || (() => 0);
    
    const openSet = new PriorityQueue();
    const closedSet = new Set();
    const gScore = {}; // Başlangıçtan şimdiki düğüme olan maliyet
    const fScore = {}; // Tahmini toplam maliyet (gScore + heuristic)
    const cameFrom = {}; // Önceki düğümleri izlemek için
    
    // Tüm düğümler için başlangıç değerlerini ayarla
    for (let node in graph) {
      gScore[node] = Infinity;
      fScore[node] = Infinity;
      cameFrom[node] = null;
    }
    
    // Başlangıç düğümünün değerleri
    gScore[start] = 0;
    fScore[start] = heuristic(start, end);
    openSet.enqueue(start, fScore[start]);
    
    while (!openSet.isEmpty()) {
      // En düşük fScore'a sahip düğümü al
      const current = openSet.dequeue();
      
      // Hedef düğüme ulaştıysak, yolu oluştur ve döndür
      if (current === end) {
        const path = [];
        let temp = current;
        while (temp) {
          path.unshift(temp);
          temp = cameFrom[temp];
        }
        return path;
      }
      
      // Mevcut düğümü işlem görmüş olarak işaretle
      closedSet.add(current);
      
      // Komşu düğümleri değerlendir
      for (let neighbor in graph[current]) {
        // İşlem görmüş düğümleri atla
        if (closedSet.has(neighbor)) continue;
        
        // Bu komşuya gitmek için yeni maliyet
        const tentativeGScore = gScore[current] + graph[current][neighbor];
        
        // Daha önce işlenmemişse veya daha iyi bir yol bulduysa
        if (tentativeGScore < gScore[neighbor]) {
          cameFrom[neighbor] = current;
          gScore[neighbor] = tentativeGScore;
          fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end);
          
          if (!openSet.contains(neighbor)) {
            openSet.enqueue(neighbor, fScore[neighbor]);
          } else {
            openSet.updatePriority(neighbor, fScore[neighbor]);
          }
        }
      }
    }
    
    // Hiçbir yol bulunamadı
    return [];
}

function astarTrafficAware(graph, start, end, heuristic) {
    // Eğer heuristic fonksiyonu verilmemişse, varsayılan olarak 0 döndür
    heuristic = heuristic || (() => 0);
    
    const openSet = new PriorityQueue();
    const closedSet = new Set();
    const gScore = {}; // Başlangıçtan şimdiki düğüme olan maliyet
    const fScore = {}; // Tahmini toplam maliyet (gScore + heuristic)
    const cameFrom = {}; // Önceki düğümleri izlemek için
    
    // Tüm düğümler için başlangıç değerlerini ayarla
    for (let node in graph) {
      gScore[node] = Infinity;
      fScore[node] = Infinity;
      cameFrom[node] = null;
    }
    
    // Başlangıç düğümünün değerleri
    gScore[start] = 0;
    fScore[start] = heuristic(start, end);
    openSet.enqueue(start, fScore[start]);
    
    while (!openSet.isEmpty()) {
      // En düşük fScore'a sahip düğümü al
      const current = openSet.dequeue();
      
      // Hedef düğüme ulaştıysak, yolu oluştur ve döndür
      if (current === end) {
        const path = [];
        let temp = current;
        while (temp) {
          path.unshift(temp);
          temp = cameFrom[temp];
        }
        return path;
      }
      
      // Mevcut düğümü işlem görmüş olarak işaretle
      closedSet.add(current);
      
      // Komşu düğümleri değerlendir
      for (let neighbor in graph[current]) {
        // İşlem görmüş düğümleri atla
        if (closedSet.has(neighbor)) continue;
        
        // Bu komşuya gitmek için yeni maliyet - trafik faktörünü hesaba kat
        const segment = graph[current][neighbor];
        const weightedDistance = segment.distance * (1 + segment.traffic / 3);
        const tentativeGScore = gScore[current] + weightedDistance;
        
        // Daha önce işlenmemişse veya daha iyi bir yol bulduysa
        if (tentativeGScore < gScore[neighbor]) {
          cameFrom[neighbor] = current;
          gScore[neighbor] = tentativeGScore;
          fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end);
          
          if (!openSet.contains(neighbor)) {
            openSet.enqueue(neighbor, fScore[neighbor]);
          } else {
            openSet.updatePriority(neighbor, fScore[neighbor]);
          }
        }
      }
    }
    
    // Hiçbir yol bulunamadı
    return [];
}






function compareAlgorithmPerformance() {
    const start = startSelect.value;
    const end = endSelect.value;
    const routeType = routeTypeSelect.value;
    
    if (start === end) return alert("Başlangıç ve bitiş farklı olmalı");
    
    // Sonuçları tutacak değişkenler
    let dijkstraTime, astarTime;
    let dijkstraPath, astarPath;
    let performanceText = "";
    
    // Trafik duyarlı seçeneğine göre uygun algoritmaları çalıştır
    if (routeType === "trafficAware") {
        // Dijkstra Trafik Duyarlı ölçümü
        const dijkstraStart = performance.now();
        dijkstraPath = dijkstraTrafficAware(trafficGraph.getGraph(), start, end);
        const dijkstraEnd = performance.now();
        dijkstraTime = dijkstraEnd - dijkstraStart;
        
        // A* Trafik Duyarlı ölçümü
        const astarStart = performance.now();
        astarPath = astarTrafficAware(trafficGraph.getGraph(), start, end, heuristicFunction);
        const astarEnd = performance.now();
        astarTime = astarEnd - astarStart;
        
        // Performans bilgilerini hazırla
        performanceText = `Trafik Duyarlı Rota Performans Karşılaştırması:
----------------------------------------------
• Dijkstra Trafik Duyarlı: ${dijkstraTime.toFixed(2)} ms
• A* Trafik Duyarlı: ${astarTime.toFixed(2)} ms
• Fark: ${Math.abs(dijkstraTime - astarTime).toFixed(2)} ms (${dijkstraTime > astarTime ? "A* daha hızlı" : "Dijkstra daha hızlı"})`;
    } else {
        // Normal Dijkstra ölçümü
        const dijkstraStart = performance.now();
        dijkstraPath = dijkstra(legacyGraph.getGraph(), start, end);
        const dijkstraEnd = performance.now();
        dijkstraTime = dijkstraEnd - dijkstraStart;
        
        // Normal A* ölçümü
        const astarStart = performance.now();
        astarPath = astar(legacyGraph.getGraph(), start, end, heuristicFunction);
        const astarEnd = performance.now();
        astarTime = astarEnd - astarStart;
        
        // Performans bilgilerini hazırla
        performanceText = `En Kısa Rota Performans Karşılaştırması:
----------------------------------------------
• Dijkstra: ${dijkstraTime.toFixed(2)} ms
• A*: ${astarTime.toFixed(2)} ms
• Fark: ${Math.abs(dijkstraTime - astarTime).toFixed(2)} ms (${dijkstraTime > astarTime ? "A* daha hızlı" : "Dijkstra daha hızlı"})`;
    }
    
    // Sonuç yolları karşılaştır
    let pathsEqual = true;
    if (dijkstraPath.length === astarPath.length) {
        for (let i = 0; i < dijkstraPath.length; i++) {
            if (dijkstraPath[i] !== astarPath[i]) {
                pathsEqual = false;
                break;
            }
        }
    } else {
        pathsEqual = false;
    }
    
    // Yol karşılaştırma bilgisini ekle
    performanceText += `\n\n• Bulunan yollar: ${pathsEqual ? "Aynı" : "Farklı"}\n`;
    
    // Eğer yollar farklıysa, toplam mesafeleri karşılaştır
    if (!pathsEqual) {
        let dijkstraDistance = 0;
        let astarDistance = 0;
        
        // Toplam mesafeleri hesapla
        for (let i = 0; i < dijkstraPath.length - 1; i++) {
            if (routeType === "trafficAware") {
                dijkstraDistance += trafficGraph.getGraph()[dijkstraPath[i]][dijkstraPath[i + 1]].distance;
            } else {
                dijkstraDistance += legacyGraph.getGraph()[dijkstraPath[i]][dijkstraPath[i + 1]];
            }
        }
        
        for (let i = 0; i < astarPath.length - 1; i++) {
            if (routeType === "trafficAware") {
                astarDistance += trafficGraph.getGraph()[astarPath[i]][astarPath[i + 1]].distance;
            } else {
                astarDistance += legacyGraph.getGraph()[astarPath[i]][astarPath[i + 1]];
            }
        }
        
        // Mesafe karşılaştırmasını ekle
        performanceText += `• Dijkstra mesafe: ${dijkstraDistance}m\n`;
        performanceText += `• A* mesafe: ${astarDistance}m\n`;
        performanceText += `• Mesafe farkı: ${Math.abs(dijkstraDistance - astarDistance)}m (${dijkstraDistance > astarDistance ? "A* daha kısa" : "Dijkstra daha kısa"})`;
    }
    
    // Sonuçları göster
    alert(performanceText);
    console.log(performanceText);
}
