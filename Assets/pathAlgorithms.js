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


// Dijkstra performansını ölçen fonksiyon
function measureDijkstraPerformance() {
  const start = startSelect.value;
  const end = endSelect.value;
  const routeType = routeTypeSelect.value;
  
  if (start === end) return alert("Başlangıç ve bitiş farklı olmalı");
  
  // Dijkstra algoritması için performans ölçümü
  let dijkstraTime;
  let dijkstraPath;
  let performanceText = "";
  
  // Trafik duyarlı seçeneğine göre uygun algoritmayı çalıştır
  if (routeType === "trafficAware") {
      // Dijkstra Trafik Duyarlı ölçümü
      const dijkstraStart = performance.now();
      dijkstraPath = dijkstraTrafficAware(trafficGraph.getGraph(), start, end);
      const dijkstraEnd = performance.now();
      dijkstraTime = dijkstraEnd - dijkstraStart;
      
      // 'Ar' içermeyen rotayı filtrele
      const filteredPath = dijkstraPath.filter(step => !step.includes("Ar"));
      
      // Performans bilgilerini hazırla
      performanceText = `Dijkstra Performans Ölçümü (Trafik Duyarlı Rota):
----------------------------------------------
• Algoritma Çalışma Süresi: ${dijkstraTime.toFixed(5)} ms`;
  } else {
      // Normal Dijkstra ölçümü
      const dijkstraStart = performance.now();
      dijkstraPath = dijkstra(legacyGraph.getGraph(), start, end);
      const dijkstraEnd = performance.now();
      dijkstraTime = dijkstraEnd - dijkstraStart;
      
      // 'Ar' içermeyen rotayı filtrele
      const filteredPath = dijkstraPath.filter(step => !step.includes("Ar"));
      
      // Performans bilgilerini hazırla
      performanceText = `Dijkstra Performans Ölçümü (En Kısa Rota):
----------------------------------------------
• Algoritma Çalışma Süresi: ${dijkstraTime.toFixed(5)} ms`;
  }
  
  // Toplam mesafeyi hesapla
  let totalDistance = 0;
  for (let i = 0; i < dijkstraPath.length - 1; i++) {
      if (routeType === "trafficAware") {
          totalDistance += trafficGraph.getGraph()[dijkstraPath[i]][dijkstraPath[i + 1]].distance;
      } else {
          totalDistance += legacyGraph.getGraph()[dijkstraPath[i]][dijkstraPath[i + 1]];
      }
  }
  
  // 'Ar' içermeyen rotayı filtrele
  const filteredPath = dijkstraPath.filter(step => !step.includes("Ar"));
  
  // Mesafe bilgisini ekle
  performanceText += `\n• Toplam Mesafe: ${totalDistance.toFixed(2)} metre`;
  performanceText += `\n• İzlenen Rota: ${filteredPath.join(' → ')}`;
  
  // Sonuçları göster
  alert(performanceText);
  console.log(performanceText);
}
