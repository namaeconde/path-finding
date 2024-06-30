export class Node {
  row: number;
  col: number;
  distance = Infinity;
  isVisited = false;
  isWall = false;
  previousNode: Node = null;

  constructor(row: number, col: number) {
    this.row = row
    this.col = col
  }
}