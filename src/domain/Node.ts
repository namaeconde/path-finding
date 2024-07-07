export default class Node {
  row: number;
  col: number;
  distance = Infinity;
  private isStart = false;
  private isEnd = false;
  private isVisited = false;
  private isWall = false;
  previousNode: Node | undefined;

  constructor(row: number, col: number) {
    this.row = row
    this.col = col
  }

  markAsStart(): void {
    this.isStart = true;
  }

  isStartNode(): boolean {
    return this.isStart;
  }

  markAsEnd(): void {
    this.isEnd = true;
  }

  isEndNode(): boolean {
    return this.isEnd;
  }

  markAsWall(): void {
    this.isWall = true;
  }

  isWallNode(): boolean {
    return this.isWall;
  }

  markAsVisited(): void {
    this.isVisited = true;
  }

  wasVisited(): boolean {
    return this.isVisited;
  }
}