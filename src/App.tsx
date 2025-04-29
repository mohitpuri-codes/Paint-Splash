import { ChangeEvent, Fragment, useState, MouseEvent } from "react";
import DrawOrErase from "./components/DrawOrErase";
import { createGrid } from "./utils";
import { MOUSE_CLICK } from "./constants";

function App() {
  const [defaultColor] = useState("#ffffff");
  const [color, setColor] = useState("#ffffff");
  const [drawOrErase] = useState(true);
  const [initialGrid, setInitialGrid] = useState(createGrid(color));
  const [canDraw, setCanDraw] = useState(false);
  const [mouseClick, setMouseClick] = useState(false);
  const [rightClickColor, setRightClickColor] = useState("#000");
  const [mouseButton, setMouseButton] = useState<
    MOUSE_CLICK.LeftClick | MOUSE_CLICK.RightClick | null
  >(null);

  function handleColorChange(e: ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value);
  }

  // throttled and debounce

  // appply on btn
  function handleDraw() {
    setCanDraw(true);
  }

  function handleMouseDown(e: MouseEvent<HTMLButtonElement>) {
    if (e.button === MOUSE_CLICK.RightClick) {
      setMouseButton(MOUSE_CLICK.RightClick);
    } else {
      setMouseButton(MOUSE_CLICK.LeftClick);
    }
    setMouseClick(true);
  }

  function handleMouseUp() {
    setMouseClick(false);
  }

  function handleMouseDrag(row: number, col: number) {
    if (canDraw && mouseClick) {
      setInitialGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]);
        newGrid[row][col] =
          mouseButton === MOUSE_CLICK.LeftClick ? color : rightClickColor;
        return newGrid;
      });
    } else if (!canDraw && mouseClick) {
      setInitialGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]);
        newGrid[row][col] = defaultColor;
        return newGrid;
      });
    }
  }

  function handleErase() {
    setCanDraw(false);
  }

  function handleRightClickColorChange(e: ChangeEvent<HTMLInputElement>) {
    setRightClickColor(e.target.value);
  }

  function handleClick(
    e: MouseEvent<HTMLButtonElement>,
    row: number,
    col: number
  ) {
    setInitialGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      newGrid[row][col] = rightClickColor;
      return newGrid;
    });
    console.log(e.button);
  }

  return (
    <>
      <div className="grid">
        {initialGrid.map((row, rowIndex: number) => (
          <Fragment key={rowIndex}>
            {row.map((col, colIndex: number) => (
              <button
                key={rowIndex + colIndex}
                className="grid-item"
                onClick={(e: MouseEvent<HTMLButtonElement>) =>
                  handleClick(e, rowIndex, colIndex)
                }
                onMouseDown={handleMouseDown}
                onMouseOver={() => handleMouseDrag(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
                onContextMenu={(e) => e.preventDefault()}
                style={{ backgroundColor: col }}
              >
                {undefined}
              </button>
            ))}
          </Fragment>
        ))}
      </div>

      <p>Color: {color}</p>
      <div className="user-selection">
        <input type="color" onChange={handleColorChange} value={color} />
        <input type="color" onChange={handleRightClickColorChange} />
        <div>
          <DrawOrErase
            title={canDraw ? "Erase" : "Draw"}
            btnState={drawOrErase}
            onClick={canDraw ? () => handleErase() : () => handleDraw()}
            isActive={canDraw}
          />
        </div>
      </div>
    </>
  );
}

export default App;
