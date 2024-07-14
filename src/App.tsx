import React, { useState, useEffect } from 'react';
import Grid from './domain/Grid';
import Node from '@domain/Node';
import './App.css';
import GridComponent from './component/grid/Grid.component'

function App() {
  const [grid, setGrid] = useState<Grid>(new Grid(50, 50));
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [startNode, setStartNode] = useState<Node>(null);
  const [endNode, setEndNode] = useState<Node>(null);
  const [hasStartNode, setHasStartNode] = useState(false);
  const [hasEndNode, setHasEndNode] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [shortestPath, setShortestPath] = useState<Node[]>(null);

  useEffect(() => {
    setSelectedAlgorithm(Object.keys(grid.searchAlgorithms)?.[0]);
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

  const handleMouseEnter = () => {
    if (!mouseIsPressed) return;
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const findShortestPath = (algorithm: string) => {
    setDisableButton(true);
    const shortestPath = grid.searchAlgorithms[algorithm](startNode, endNode);
    setShortestPath(shortestPath);
  }

  const ControlPanel = () => {
    return (
      <>
        <select 
          style={{ marginBottom: '10px' }}
          value={selectedAlgorithm}
          onChange={e => setSelectedAlgorithm(e.target.value)}
        >
          {
            Object.keys(grid.searchAlgorithms).map((key: string) => (
              <option key={key} value={key}>{key}</option>
            ))
          }
        </select>
        <button 
          disabled={disableButton} 
          onClick={() => findShortestPath(selectedAlgorithm)}>
          Find Shortest Path
        </button>
      </>
    )
  };

  return (
    <>
      { grid && 
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: 24
        }}>
          <ControlPanel />
          <GridComponent
            grid={grid}
            shortestPath={shortestPath}
            onMouseDown={(row, col) => handleMouseDown(row, col)}
            onMouseEnter={() => handleMouseEnter()}
            onMouseUp={() => handleMouseUp()}
          />
        </div>
      }
    </>
  );
}

export default App;
