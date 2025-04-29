import { ChangeEvent } from "react";
import { cols, rows } from "./constants";
type InputFunc = (e: ChangeEvent<HTMLInputElement>) => void;

export function createGrid(color?: string): string[][] {
  const initialCanvas = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      if (color) row.push(color);
      else row.push("#ffffff");
    }
    initialCanvas.push(row);
  }
  // console.log(initialCanvas);
  return initialCanvas;
}

export function throttledOnChange(func: InputFunc, delay: number) {
  let interval = 0;
  return function (e: ChangeEvent<HTMLInputElement>) {
    const now = Date.now();
    if (now - interval >= delay) {
      func(e);
      interval = now;
    }
  };
}
