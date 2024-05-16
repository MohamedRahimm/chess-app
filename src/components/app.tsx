import Board, { piece } from "./board";
import { useState } from "react";
export default function App() {
  const initialBoardState: piece[][] = [
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
  ];
  const [boardState, setBoardState] = useState(initialBoardState);
  const handleBoardStateUpdate = (newBoardState: piece[][]) => {
    setBoardState(newBoardState);
  };
  return (
    <div className="App">
      <Board boardState={boardState} updateBoard={handleBoardStateUpdate}>
      </Board>
    </div>
  );
}
