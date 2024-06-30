import React, { useState, useEffect } from 'react';
import Grid from './domain/Grid';
import './App.css';
import GridComponent from './component/grid/Grid.component'

function App() {
  const [grid, setGrid] = useState<Grid>();
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [hasStartNode, setHasStartNode] = useState(false);
  const [hasEndNode, setHasEndNote] = useState(false);

  useEffect(() => {
    setGrid(new Grid(10, 10));
  }, []);

  const handleMouseDown = (row: number, col: number) => {
    console.log("handleMouseDown");
    console.log(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
    console.log("handleMouseEnter");
    console.log(row, col);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const visualizeDijkstra = () => {}

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}>
      <button onClick={() => visualizeDijkstra()}>Visualize Dijkstra's Algorithm</button>
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
