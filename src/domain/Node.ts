export default class Node {
  row: number;
  col: number;
  distance = Infinity;
  isStart = false;
  isEnd = false;
  isVisited = false;
  isWall = false;
  previousNode: Node | undefined;

  constructor(row: number, col: number) {
    this.row = row
    this.col = col
  }

  markAsStart(): void {
    this.isStart = true;
  }

  markAsEnd(): void {
    this.isEnd = true;
  }
}