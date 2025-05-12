function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();

    for (let node in graph) {
        if (node === start) {
            distances[node] = 0; // ilk node için uzaklık sıfır yapıyoruz.
            pq.enqueue(node, 0);
        } else {
            distances[node] = Infinity; // diger nodelar için uzaklık sonsuz yapıyoruz.
            pq.enqueue(node, Infinity);
        }
        previous[node] = null;
    }
    
    // Ana döngü
    while (!pq.isEmpty()) {
        const { node: current } = pq.dequeue(); // şimdi olan node dequeue yap
        
        if (current === end) break;
        
        // her komşu için kontrol yapılıyor
        for (let neighbor in graph[current]) {
            const alt = distances[current] + graph[current][neighbor];
            
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = current;        
                pq.decreaseKey(neighbor, alt);
            }
        }
    }
    
    const path = [];
    let current = end;
    
    // Yolu geri doğru izleriz
    while (current) 
    {
        path.unshift(current);
        current = previous[current];
    }
    
    // Start noktasından end noktasına bir yol var mı?
    return path[0] === start ? path : [];
}


function dijkstraTrafficAware(graph, start, end) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();
    
    for (let node in graph) {
        if (node === start) {
            distances[node] = 0;
            pq.enqueue(node, 0);
        } else {
            distances[node] = Infinity;
            pq.enqueue(node, Infinity);
        }
        previous[node] = null;
    }
    

    while (!pq.isEmpty()) {
        const { node: current } = pq.dequeue();
        
        // Son noktaya ulaştıysak döngüden çık
        if (current === end) break;
        
        // Her komşu için kontrol et
        for (let neighbor in graph[current]) {
            const segment = graph[current][neighbor];
            // Trafik durumunu dikkate alarak ağırlıklı mesafeyi hesapla
            const weightedDistance = segment.distance * (1 + segment.traffic / 3);
            const alt = distances[current] + weightedDistance;
            
            // Daha kısa bir yol bulduk mu?
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = current;
                
                // Öncelik kuyruğunda güncelleştir
                pq.decreaseKey(neighbor, alt);
            }
        }
    }
    
    const path = [];
    let current = end;
    
    while (current) {
        path.unshift(current);
        current = previous[current];
    }
    
    // Start noktasından end noktasına bir yol var mı?
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
