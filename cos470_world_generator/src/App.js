import logo from './logo.svg';
import './App.css';

import Grid from "./components/grid.jsx"
import React from "react";

function App() {

  React.useEffect(() => {
    document.title = 'Cos470 Search World Generator';
  }, []);

  //                                            Rows                           Columns
  let [grid, setGrid] = React.useState(new Array(10).fill(0).map(() => new Array(10).fill(0)));
  let [gridSize, setGridSize] = React.useState(10);
  let [sliderValue, setSliderValue] = React.useState(10);

  let [showExport, setShowExport] = React.useState(false);
  let [exportValue, setExportValue] = React.useState("");

  function generateNewGrid(size){
    setGridSize(size);
    let newGrid = new Array(size).fill(0).map(() => new Array(size).fill(0));

    setGrid(newGrid);
  }

  function exportGrid(){
    let exportString = `(create-simulator :size '(${gridSize} ${gridSize}) :obstacle-locations '(`;

    for (let j = 0; j < grid.length; j++){
      for (let i = 0; i < grid[j].length; i++){
        if (grid[j][i] == 1){

          let x = i + 1;
          let y = gridSize - j;
          
          exportString += `(${x} ${y}) `


        }
      }
    }

    exportString += "))"
    setExportValue(exportString);
    setShowExport(true);
  }

  return (
    <div className="App">
      
      <div>
        <h1>COS470 Search Assignment World Generator</h1>
        <h4>By Sophie Walden</h4>
      </div>

      {showExport == true && 
        <div id="exportObstaclesPopup">

          
          <button id="cancelExportButton" onClick={() => setShowExport(false)}>X</button>
          <h2>Export</h2>

          <h4>Copy this code to create the simulator with the same shape and obstacles</h4>

          <textarea value={exportValue} readOnly/>

        </div>}

      <div id="baseScreenMiddleRow">

        <div className="worldGeneratorDiv">
          <h2>Create Empty Grid</h2>

          <input type="range" value={sliderValue} step="1" min="1" max="50" className="slider" id="gridSize" onChange={(e) => setSliderValue(parseInt(e.target.value))} />
          <h3>Grid Size: {sliderValue} x {sliderValue}</h3>
          <button className="optionsButton" onClick={() => {generateNewGrid(sliderValue)}}>Generate</button>
        </div>
        <Grid className="DrawingGrid" gridSize={gridSize} grid={grid} setGrid={setGrid}/>

        <div className="customSettingsDiv">
          <h2>Settings</h2>
          <button className="optionsButton" onClick={() => generateNewGrid(gridSize)}>Clear</button>
          <button className="optionsButton" onClick={exportGrid}>Export</button>

        </div>

      </div>
    </div>
  );
}

export default App;
