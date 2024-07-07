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
  const [shortestPath, setShortestPath] = useState<Node[]>(null);

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

  const findShortestPath = () => {
    const shortestPath = grid.findShortestPathUsingDjikstra(startNode, endNode);
    setShortestPath(shortestPath);
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
          grid={grid}
          shortestPath={shortestPath}
          onMouseDown={(row, col) => handleMouseDown(row, col)}
          onMouseEnter={(row, col) => handleMouseEnter(row, col)}
          onMouseUp={() => handleMouseUp()}
        />
      }
    </div>
  );
}

export default App;
