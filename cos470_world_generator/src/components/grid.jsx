import "./grid.css"
import React from 'react';

function Grid(props){


    function flipValue(e){
        if (e.buttons == 1){
            let [y, x] = e.target.className.split(" ")[0].split(",");
            
            let copy = [...props.grid];
            copy[y][x] = 1 - copy[y][x]
            props.setGrid(copy);
        }
        
    }


    return (
        <div>

            {props.grid.map((row, index) => 
                
                ( <div className="row" key={"r" + index}>{row.map((tile, index2) => 
                    <div onMouseOver={flipValue} onMouseDown={flipValue}  key={"r" + index + "c" + index2} className={`${index + "," + index2} gridTile ${tile == 1 ? "filled" : ""}`} style={{width: (30 / props.gridSize) + "vw", height: (30 / props.gridSize) + "vw"}}> </div>
                )} </div> )
            )}
        </div>
    )

}

export default Grid;