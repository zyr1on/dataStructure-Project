// linked list kullanan queue
class Queue {
    constructor() {
        this.head = 0;
        this.tail = 0;
        this.storage = {};
    }

    enqueue(element) {
        this.storage[this.tail] = element;
        this.tail++;
    }

    dequeue() {
        if (this.size() === 0) {
            return undefined;
        }
        const element = this.storage[this.head];
        delete this.storage[this.head];
        this.head++;
        return element;
    }

    delete(element) {
        const newStorage = {};
        let newHead = 0;
        let newTail = 0;
        for (let i = this.head; i < this.tail; i++) {
            if (this.storage[i] !== element) {
                newStorage[newTail] = this.storage[i];
                newTail++;
            }
        }
        this.storage = newStorage;
        this.head = 0;
        this.tail = newTail;
    }

    isEmpty() {
        return this.head === this.tail;
    }
    size() {
        return this.tail - this.head;
    }
    toArray() {
        const result = [];
        for (let i = this.head; i < this.tail; i++) {
            result.push(this.storage[i]);
        }
        return result;
    }
}


class PriorityQueue {
    constructor() {
        this.nodes = [];
        this.priorities = {};
    }
    
    enqueue(node, priority) {
        this.nodes.push(node);
        this.priorities[node] = priority;
    }
    
    dequeue() {
        if (this.isEmpty()) return null;
        
        let bestPriority = Infinity;
        let bestIndex = -1;
        
        for (let i = 0; i < this.nodes.length; i++) {
            const priority = this.priorities[this.nodes[i]];
            if (priority < bestPriority) {
                bestPriority = priority;
                bestIndex = i;
            }
        }
        
        const bestNode = this.nodes[bestIndex];
        this.nodes.splice(bestIndex, 1);
        return bestNode;
    }
    
    contains(node) {
        return this.nodes.includes(node);
    }
    
    updatePriority(node, priority) {
        this.priorities[node] = priority;
    }
    
    isEmpty() {
        return this.nodes.length === 0;
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
