function benchmarkdijkstra(graph, start, end, iterations = 1000) {
    const times = [];
    const memoryUsage = [];
    let totalTime = 0;
    let minTime = Infinity;
    let maxTime = -Infinity;

    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();

        // Bellek kullanımını ölç
        const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;

        // Dijkstra algoritmasını çalıştır
        dijkstra(graph, start, end);

        const endTime = performance.now();

        // Bellek kullanımını tekrar ölç
        const finalMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;

        const timeTaken = endTime - startTime;
        times.push(timeTaken);
        totalTime += timeTaken;

        const memoryUsed = finalMemory - initialMemory; // İterasyon başındaki ve sonundaki bellek farkı
        memoryUsage.push(memoryUsed);

        if (timeTaken < minTime) minTime = timeTaken;
        if (timeTaken > maxTime) maxTime = timeTaken;
    }

    // Ortalama ve standart sapma hesapla
    const mean = totalTime / iterations;
    const stddev = Math.sqrt(times.reduce((sum, t) => sum + Math.pow(t - mean, 2), 0) / iterations);

    // Ortalama bellek kullanımını hesapla
    const meanMemory = memoryUsage.reduce((sum, m) => sum + m, 0) / iterations;

    // Sonuçları yazdır
    console.log(`Benchmark Results:`);
    console.log(`Iterations: ${iterations}`);
    console.log(`Min Time: ${minTime.toFixed(4)} ms`);
    console.log(`Max Time: ${maxTime.toFixed(4)} ms`);

    console.log(`Mean Time: ${mean.toFixed(4)} ms`);
    console.log(`Standard Deviation: ${stddev.toFixed(4)} ms`);
    console.log(`Mean Memory Usage: ${(meanMemory / 1024).toFixed(2)} KB`); // Ortalama bellek kullanımını KB olarak göster
}
function benchmarkPriorityQueue(queue, iterations = 1000) {
    const enqueueTimes = [];
    const dequeueTimes = [];
    const resizeTimes = [];
    const siftUpTimes = [];
    const siftDownTimes = [];
    const decreaseKeyTimes = [];

    // Enqueue Benchmark
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        queue.enqueue(i, Math.random());
        const endTime = performance.now();
        enqueueTimes.push(endTime - startTime);
    }

    // Dequeue Benchmark
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        queue.dequeue();
        const endTime = performance.now();
        dequeueTimes.push(endTime - startTime);
    }

    // SiftUp Benchmark
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        queue._siftUp(i);
        const endTime = performance.now();
        siftUpTimes.push(endTime - startTime);
    }

    // SiftDown Benchmark
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        queue._siftDown(i);
        const endTime = performance.now();
        siftDownTimes.push(endTime - startTime);
    }

    // DecreaseKey Benchmark
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        queue.decreaseKey(i, Math.random());
        const endTime = performance.now();
        decreaseKeyTimes.push(endTime - startTime);
    }

    // Ortalama ve standart sapma hesaplama fonksiyonu
    function calculateStats(times) {
        const totalTime = times.reduce((acc, time) => acc + time, 0);
        const meanTime = totalTime / iterations;
        const stddevTime = Math.sqrt(times.reduce((acc, time) => acc + Math.pow(time - meanTime, 2), 0) / iterations);
        return {
            minTime: Math.min(...times).toFixed(4),
            maxTime: Math.max(...times).toFixed(4),
            meanTime: meanTime.toFixed(4),
            stddevTime: stddevTime.toFixed(4),
        };
    }

    // Sonuçları döndür
    return {
        enqueue: calculateStats(enqueueTimes),
        dequeue: calculateStats(dequeueTimes),
        siftUp: calculateStats(siftUpTimes),
        siftDown: calculateStats(siftDownTimes),
        decreaseKey: calculateStats(decreaseKeyTimes),
    };
}


function benchmarkGraph(graph, iterations = 1000) {
    const addNodeTimes = [];
    const addEdgeTimes = [];
    const getNeighborsTimes = [];
    
    let totalAddNodeTime = 0;
    let totalAddEdgeTime = 0;
    let totalGetNeighborsTime = 0;
    
    let minAddNodeTime = Infinity;
    let maxAddNodeTime = -Infinity;
    
    let minAddEdgeTime = Infinity;
    let maxAddEdgeTime = -Infinity;
    
    let minGetNeighborsTime = Infinity;
    let maxGetNeighborsTime = -Infinity;

    for (let i = 0; i < iterations; i++) {
        // Measure addNode time
        const addNodeStart = performance.now();
        graph.addNode(`node${i}`);
        const addNodeEnd = performance.now();
        const addNodeTime = addNodeEnd - addNodeStart;
        addNodeTimes.push(addNodeTime);
        totalAddNodeTime += addNodeTime;
        minAddNodeTime = Math.min(minAddNodeTime, addNodeTime);
        maxAddNodeTime = Math.max(maxAddNodeTime, addNodeTime);

        // Measure addEdge time
        const addEdgeStart = performance.now();
        graph.addEdge(`node${i}`, `node${i+1}`, 10);
        const addEdgeEnd = performance.now();
        const addEdgeTime = addEdgeEnd - addEdgeStart;
        addEdgeTimes.push(addEdgeTime);
        totalAddEdgeTime += addEdgeTime;
        minAddEdgeTime = Math.min(minAddEdgeTime, addEdgeTime);
        maxAddEdgeTime = Math.max(maxAddEdgeTime, addEdgeTime);

        // Measure getNeighbors time
        const getNeighborsStart = performance.now();
        graph.getNeighbors(`node${i}`);
        const getNeighborsEnd = performance.now();
        const getNeighborsTime = getNeighborsEnd - getNeighborsStart;
        getNeighborsTimes.push(getNeighborsTime);
        totalGetNeighborsTime += getNeighborsTime;
        minGetNeighborsTime = Math.min(minGetNeighborsTime, getNeighborsTime);
        maxGetNeighborsTime = Math.max(maxGetNeighborsTime, getNeighborsTime);
    }

    // Calculate mean and standard deviation for each operation
    function calculateStandardDeviation(times, meanTime) {
        const variance = times.reduce((sum, time) => sum + Math.pow(time - meanTime, 2), 0) / iterations;
        return Math.sqrt(variance);
    }

    const meanAddNodeTime = totalAddNodeTime / iterations;
    const stddevAddNodeTime = calculateStandardDeviation(addNodeTimes, meanAddNodeTime);

    const meanAddEdgeTime = totalAddEdgeTime / iterations;
    const stddevAddEdgeTime = calculateStandardDeviation(addEdgeTimes, meanAddEdgeTime);

    const meanGetNeighborsTime = totalGetNeighborsTime / iterations;
    const stddevGetNeighborsTime = calculateStandardDeviation(getNeighborsTimes, meanGetNeighborsTime);

    // Print results
    console.log(`Benchmark Results (averages over ${iterations} iterations):`);
    console.log(`addNode Average Time: ${meanAddNodeTime.toFixed(6)} ms`);
    console.log(`addEdge Average Time: ${meanAddEdgeTime.toFixed(6)} ms`);
    console.log(`getNeighbors Average Time: ${meanGetNeighborsTime.toFixed(6)} ms`);
    console.log(`\naddNode - Min Time: ${minAddNodeTime.toFixed(6)} ms, Max Time: ${maxAddNodeTime.toFixed(6)} ms, StdDev: ${stddevAddNodeTime.toFixed(6)} ms`);
    console.log(`addEdge - Min Time: ${minAddEdgeTime.toFixed(6)} ms, Max Time: ${maxAddEdgeTime.toFixed(6)} ms, StdDev: ${stddevAddEdgeTime.toFixed(6)} ms`);
    console.log(`getNeighbors - Min Time: ${minGetNeighborsTime.toFixed(6)} ms, Max Time: ${maxGetNeighborsTime.toFixed(6)} ms, StdDev: ${stddevGetNeighborsTime.toFixed(6)} ms`);

}
