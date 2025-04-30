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
