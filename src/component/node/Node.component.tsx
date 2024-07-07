import Node from '@domain/Node';
import './Node.component.css';

interface NodeComponentProps {
  id: string;
  node: Node,
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const NodeComponent = ({ id, node, onMouseDown, onMouseEnter, onMouseUp }: NodeComponentProps) => {
  const { row, col } = node;

  if (node.wasVisited()) {
    console.log('visited', id);
  }

  const extraClassName = node.isStartNode()
    ? 'node-start'
    : node.isEndNode()
    ? 'node-end'
    : '';

  return (
    <div
      id={id}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default NodeComponent;
