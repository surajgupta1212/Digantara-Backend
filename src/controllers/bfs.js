const bfs = (graph, startNode) => {
    let queue = [startNode], visited = new Set(queue), order = [];
    while (queue.length) {
        let node = queue.shift();
        order.push(node);
        graph[node]?.forEach(neighbor => {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        });
    }
    return order;
};

const bfsController = async (req, res) => {
    const { graph, start } = req.body;
    if (!graph || !graph[start]) {
        return res.status(400).json({ error: "Invalid graph or start node" });
    }

    const startTime = Date.now();
    const result = bfs(graph, start);
    const executionTime = Date.now() - startTime;
    
    res.json({ result, executionTime });
};

module.exports = bfsController;
