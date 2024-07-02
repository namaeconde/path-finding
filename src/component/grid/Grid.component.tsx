import Grid from '../../domain/Grid';
import Node from '../../domain/Node';
import NodeComponent from '../node/Node.component';
import './Grid.component.css';

interface GridComponentProps {
  grid: Grid;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const GridComponent = ({ grid, onMouseDown, onMouseEnter, onMouseUp }: GridComponentProps) => {
  return (
    <div className="grid">
      {grid.nodes.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((node, nodeIdx) => (
            <NodeComponent
              key={nodeIdx}
              node={node}
              onMouseDown={() => onMouseDown(node.row, node.col)}
              onMouseEnter={() => onMouseEnter(node.row, node.col)}
              onMouseUp={() => onMouseUp()}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const animateShortestPath = (visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]) => {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-visited';
    }, 10 * i);

    if (visitedNodesInOrder[i].isEnd) {
      setTimeout(() => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
      }, 10 * i);
      return;
    }
  }
};

export default GridComponent;
