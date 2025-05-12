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
