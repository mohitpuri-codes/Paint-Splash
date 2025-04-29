import { MouseEvent, ReactNode } from "react";

interface GridGeneratorProps {
  onHandleClick: (e: MouseEvent<HTMLDivElement>) => void;
  initialGrid: ReactNode;
}

function GridGenerator({ onHandleClick, initialGrid }: GridGeneratorProps) {
  return (
    <div className="grid" onClick={onHandleClick}>
      {initialGrid}
    </div>
  );
}

export default GridGenerator;
