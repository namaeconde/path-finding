import Node from '@domain/Node';
import React from 'react';
import './Node.component.css';

interface NodeComponentProps {
  id: string;
  node: Node,
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const NodeComponent = ({ id, node, onMouseDown, onMouseEnter, onMouseUp }: NodeComponentProps) => {
  const { isStart, isEnd, isWall, isVisited, row, col } = node;

  const extraClassName = isStart
    ? 'node-start'
    : isEnd
    ? 'node-end'
    : isWall
    ? 'node-wall'
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
