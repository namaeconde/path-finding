import { Grid } from "./Grid";

const main = () => {
  const grid = new Grid(10, 10);
  const START_NODE_ROW = 2;
  const START_NODE_COL = 2;
  const END_NODE_ROW = 2;
  const END_NODE_COL = 4;

  const startNode = grid.nodes[START_NODE_ROW][START_NODE_COL];
  const endNode = grid.nodes[END_NODE_ROW][END_NODE_COL];
  const path = grid.findShortestPath(startNode, endNode);
  console.log(path);
};

main();