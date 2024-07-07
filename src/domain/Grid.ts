import Node from './Node';

export default class Grid {
  nodes: Node[][] = [];
  visitedNodesInOrder: Node[] = [];

  constructor(rows: number, cols: number) {
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        const newNode = new Node(row, col);
        currentRow.push(newNode);
      }
      this.nodes.push(currentRow);
    }
  }

  setStartNode(row: number, col: number): Node {
    this.nodes[row][col].markAsStart();
    return this.nodes[row][col];
  }

  setEndNode(row: number, col: number): Node {
    this.nodes[row][col].markAsEnd();
    return this.nodes[row][col];
  }

  getAllNodes(): Node[] {
    return this.nodes.flat();
  }

  /**
   * Sorts nodes by their distance property.
   * @param {Array} nodes - The array of nodes to be sorted.
   */
  sortNodesByDistance(nodes: Node[]) {
    nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }

  /**
   * Gets the surrounding neighbors of a node.
   * @param {Node} node - The node whose neighbors are being checked.
   * @returns {Array} An array of unvisited neighboring nodes.
   */
  getNeighbors(node: Node) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(this.nodes[row - 1][col]);
    if (row < this.nodes.length - 1) neighbors.push(this.nodes[row + 1][col]);
    if (col > 0) neighbors.push(this.nodes[row][col - 1]);
    if (col < this.nodes[0].length - 1) neighbors.push(this.nodes[row][col + 1]);
    return neighbors
  }

  /**
   * Updates the distances of unvisited neighbors of a node.
   * @param {Node} node - The current node being evaluated.
   */
  updateUnvisitedNeighbors(node: Node) {
    const unvisitedNeighbors = this.getNeighbors(node).filter((neighbor) => !neighbor.isVisited);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }

  /**
   * Backtracks from the finish node to get the shortest path.
   * @param {Node} endNode - The end node of the path.
   * @returns {Array} An array of nodes representing the shortest path.
   */
  getNodesInShortestPathOrder(endNode: Node) {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while (currentNode) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  /**
   * Finds the shortest path between the start and end nodes using Dijkstra's algorithm.
   * @param {Node} start - The start node of the path.
   * @param {Node} end - The end node of the path.
   * @returns {Array} An array of nodes representing the shortest path. 
   */
  findShortestPathUsingDjikstra(start: Node, end: Node) {
    start.distance = 0;
    const unvisitedNodes = this.getAllNodes();
    while(unvisitedNodes.length) {
      this.sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();

      if (!closestNode) break;
      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) return this.getNodesInShortestPathOrder(end);
      closestNode.isVisited = true;
      this.visitedNodesInOrder.push(closestNode);
      if (closestNode === end) {
        return this.getNodesInShortestPathOrder(end)
      };
      this.updateUnvisitedNeighbors(closestNode);
    }
  }
}