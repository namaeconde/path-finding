import Node from '../../domain/Node';
import NodeComponent from '../node/Node.component';
import './Grid.component.css';

interface GridComponentProps {
  nodes: Node[][];
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const GridComponent = ({ nodes, onMouseDown, onMouseEnter, onMouseUp }: GridComponentProps) => {
  return (
    <div className="grid">
      {nodes.map((row, rowIdx) => (
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

export default GridComponent;
