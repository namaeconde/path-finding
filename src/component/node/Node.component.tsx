import React, { useRef } from "react";
import Node from '@domain/Node';
import './Node.component.css';

interface NodeComponentProps {
  node: Node,
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const NodeComponent = ({ node, onMouseDown, onMouseEnter, onMouseUp }: NodeComponentProps) => {
  const { row, col } = node;
  const nodeRef = useRef(null);

  const extraClassName = node.isStartNode()
  ? 'node-start'
  : node.isEndNode()
  ? 'node-end'
  : '';

  if (node.wasVisited() && !(node.isStartNode() || node.isEndNode())) {
    setTimeout(() => {
      nodeRef.current.className = "node node-visited";
    }, node.getVisitOrderNumber() * 50);
  }

  return (
    <div
      ref={el => { nodeRef.current = el; }}
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default NodeComponent;
