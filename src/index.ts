const findShortestPath = (graph: Record<string, Record<string, number>>, start: string, target: string) => {
  const visited = new Set();
  let unvisited = Object.keys(graph);
  const distances: Record<string, number> = {};
  unvisited.forEach((v) => {
    distances[v] = Infinity;
  });

  const getClosestNeighbor = (unvisited:string[], distances: Record<string, number>) => {
    unvisited.sort((a, b) => distances[a] - distances[b]);
    return unvisited.at(0);
  };

  distances[start] = 0;
  while (unvisited.length) {
    const closestNeighbor = getClosestNeighbor(unvisited, distances);
    unvisited.shift();

    if (distances[closestNeighbor] === Infinity) break;

    visited.add(closestNeighbor);
    if (closestNeighbor === target) break;

    for (let neighbor in graph[closestNeighbor]) {
      if (visited.has(neighbor)) continue;
      const newDistance = distances[closestNeighbor] + graph[closestNeighbor][neighbor];
      distances[neighbor] = Math.min(newDistance, distances[neighbor]);
    }

  }

  return visited;
};

const main = () => {
  const graph = {
    A: { B: 6, D: 1 },
    D: { B: 2, E: 1 },
    B: { E: 2, C: 5},
    E: { C: 5 },
    C: { }
  }
  const start = 'A', target = 'E';
  const path = findShortestPath(graph, start, target);
  console.log(path);
};

main();