class PriorityQueue {
    constructor(initialCapacity = 10) {
        this.heap = new Array(initialCapacity);
        this.size = 0;
    }

    // yeni bir eleman ekle
    enqueue(node, priority) {
        if (this.size >= this.heap.length)
            this._resize();
        // sona ekle
        this.heap[this.size] = [node, priority];
        // elamanın önceliği bakımından doğru yere taşı
        this._siftUp(this.size);
        this.size++;
    }

    // küçük öncelikli olan eleman çıkarılır
    dequeue() {
        if (this.isEmpty()) return null;

        // Kök elemanı al
        const min = this.heap[0];
        
        // Son elemanı köke taşı ve boyutu azalt
        this.size--;
        if (this.size > 0) {
            this.heap[0] = this.heap[this.size];
            // Kök elemanı doğru pozisyona taşı
            this._siftDown(0);
        }
        
        return { node: min[0], priority: min[1] };
    }

    // Diziyi otomatik olarak genişletir
    _resize() {
        const newCapacity = this.heap.length * 2;
        const newHeap = new Array(newCapacity);
        
        // elemanları kopyalama
        for (let i = 0; i < this.size; i++) 
        {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    // Bir elemanı yukarı doğru taşır
    _siftUp(index) {
        // Eğer kök düğüme ulaştıysak, durdur
        if (index === 0) return;

        const parentIndex = Math.floor((index - 1) / 2);
        
        // Eğer ebeveyn düğüm, mevcut düğümden daha büyük önceliğe sahipse
        if (this.heap[parentIndex][1] > this.heap[index][1]) {
            // Elemanları değiştir
            const temp = this.heap[parentIndex];
            this.heap[parentIndex] = this.heap[index];
            this.heap[index] = temp;
            
            // Recursive olarak devam et
            this._siftUp(parentIndex);
        }
    }

    // Bir elemanı aşağı doğru taşır
    _siftDown(index) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallestIndex = index;

        // Sol çocuk daha küçükse
        if (leftChildIndex < this.size && 
            this.heap[leftChildIndex][1] < this.heap[smallestIndex][1]) {
            smallestIndex = leftChildIndex;
        }

        // Sağ çocuk en küçükse
        if (rightChildIndex < this.size && 
            this.heap[rightChildIndex][1] < this.heap[smallestIndex][1]) {
            smallestIndex = rightChildIndex;
        }

        if (smallestIndex !== index) {
            const temp = this.heap[index];
            this.heap[index] = this.heap[smallestIndex];
            this.heap[smallestIndex] = temp;
            
            this._siftDown(smallestIndex);
        }
    }

    isEmpty() {
        return this.size === 0;
    }

    decreaseKey(node, newPriority) {
        for (let i = 0; i < this.size; i++) {
            if (this.heap[i][0] === node) {
                if (newPriority < this.heap[i][1]) {
                    this.heap[i][1] = newPriority;
                    this._siftUp(i);
                }
                return;
            }
        }
    }
    
    // debug için
    print() {
        const result = [];
        for (let i = 0; i < this.size; i++) {
            result[i] = this.heap[i];
        }
        return result;
    }
}


class Graph {
    constructor(weighted = false, trafficAware = false) {
        this.nodes = new Set();
        this.edges = {};
        this.weighted = weighted;
        this.trafficAware = trafficAware;
    }

    addNode(node) {
        this.nodes.add(node);
        if (!this.edges[node]) {
            this.edges[node] = {};
        }
    }

    addEdge(from, to, distance, traffic = 0) {
        this.addNode(from);
        this.addNode(to);

        if (this.trafficAware) {
            this.edges[from][to] = { distance, traffic };
        } else if (this.weighted) {
            this.edges[from][to] = distance;
        } else {
            this.edges[from][to] = 1;
        }
    }

    getNeighbors(node) {
        return this.edges[node] || {};
    }

    getGraph() {
        return this.edges;
    }
}


class Graph {
    constructor(weighted = false, trafficAware = false) {
        this.nodes = new Set();
        this.edges = {};
        this.weighted = weighted;
        this.trafficAware = trafficAware;
    }

    addNode(node) {
        this.nodes.add(node);
        if (!this.edges[node]) {
            this.edges[node] = {};
        }
    }

    addEdge(from, to, distance, traffic = 0) {
        this.addNode(from);
        this.addNode(to);

        if (this.trafficAware) {
            this.edges[from][to] = { distance, traffic };
        } else if (this.weighted) {
            this.edges[from][to] = distance;
        } else {
            this.edges[from][to] = 1;
        }
    }

    getNeighbors(node) {
        return this.edges[node] || {};
    }

    getGraph() {
        return this.edges;
    }
}
