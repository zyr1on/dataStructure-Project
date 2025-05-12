

    const nodes = Array.from(legacyGraph.nodes).map(node => ({ id: node, label: node }));

    const edges = [];
    for (const from in legacyGraph.edges) {
        for (const to in legacyGraph.edges[from]) {
            const distance = legacyGraph.edges[from][to];
            edges.push({
                from,
                to,
                label: distance.toString() + 'm',
                arrows: 'to'
            });
        }
    }

    // Visualize with vis-network
    const container = document.getElementById('mynetwork');
    const data = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges)
    };
    const options = {
        nodes: {
            shape: 'dot',
            size: 10,
            color: {
                background: '#0077be',
                border: '#003366'
            },
            font: {
                size: 12,
                color: '#000'
            }
        },
        edges: {
            color: '#666',
            smooth: {
                type: 'dynamic'
            },
            font: {
                size: 10,
                color: '#333',
                strokeWidth: 2,
                strokeColor: '#fff'
            },
            arrows: {
                to: { enabled: true, scaleFactor: 0.5 }
            }
        },
        layout: {
            randomSeed: 12,
            improvedLayout: true
        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -2000,
                centralGravity: 0.3,
                springLength: 200,
                springConstant: 0.01,
                damping: 0.09
            },
            stabilization: {
                iterations: 200
            }
        },
        interaction: {
            hover: true,
            navigationButtons: true,
            zoomView: true
        }
    };
    const network = new vis.Network(container, data, options);
