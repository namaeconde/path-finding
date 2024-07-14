import { useEffect } from 'react';
import Grid from '../../domain/Grid';
import Node from '@domain/Node';
import NodeComponent from '../node/Node.component';
import './Grid.component.css';

interface GridComponentProps {
  grid: Grid;
  shortestPath?: Node[];
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
}

const GridComponent = ({ grid, shortestPath, onMouseDown, onMouseEnter, onMouseUp }: GridComponentProps) => {
  useEffect(() => {
    if (shortestPath?.length > 0) {
      animateShortestPath(grid.visitedNodesCount, shortestPath);
      grid.visitedNodesCount = 0;
    }
  }, [shortestPath]);

  return (
    <div className="grid">
      {grid.nodes.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((node, nodeIdx) => (
            <NodeComponent
              key={`node-${rowIdx}-${nodeIdx}`}
              node={node}
              onMouseDown={() => onMouseDown(node.row, node.col)}
              onMouseEnter={() => onMouseEnter()}
              onMouseUp={() => onMouseUp()}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const animateShortestPath = (visitedNodesCount: number, nodesInShortestPathOrder: Node[]) => {
  setTimeout(() => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, i * 50);
    }
  }, visitedNodesCount * 50);
};

export default GridComponent;
