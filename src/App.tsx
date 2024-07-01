import React, { useState, useEffect } from 'react';
import Grid from './domain/Grid';
import Node from './domain/Node';
import './App.css';
import GridComponent from './component/grid/Grid.component'

function App() {
  const [grid, setGrid] = useState<Grid>();
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [startNode, setStartNode] = useState<Node>(null);
  const [endNode, setEndNode] = useState<Node>(null);
  const [hasStartNode, setHasStartNode] = useState(false);
  const [hasEndNode, setHasEndNode] = useState(false);

  useEffect(() => {
    setGrid(new Grid(100, 100));
  }, []);

  const handleMouseDown = (row: number, col: number) => {
    if (!hasStartNode && !hasEndNode) {
      const startNode = grid.setStartNode(row, col);
      setStartNode(startNode);
      setHasStartNode(true);
    } else if (hasStartNode && !hasEndNode) {
      const endNode = grid.setEndNode(row, col);
      setEndNode(endNode);
      setHasEndNode(true);
      setDisableButton(false);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const animateResults = (visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]) => {
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

  const findShortestPath = () => {
    const nodesInShortestPathOrder = grid.findShortestPath(startNode, endNode);
    animateResults(grid.visitedNodesInOrder, nodesInShortestPathOrder);
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      margin: 24
    }}>
      <button disabled={disableButton} onClick={() => findShortestPath()}>Find Shortest Path</button>
      { grid && 
        <GridComponent
          nodes={grid.nodes}
          onMouseDown={(row, col) => handleMouseDown(row, col)}
          onMouseEnter={(row, col) => handleMouseEnter(row, col)}
          onMouseUp={() => handleMouseUp()}
        />
      }
    </div>
  );
}

export default App;
