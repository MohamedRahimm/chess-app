import Board, { piece } from "./Board/Board";
import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import NavBar from "./NavBar/NavBar";
import * as helper from "./Board/helpers";
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
  const [activePiece, setActivePiece] = useState<HTMLElement | undefined>();
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      onMouseDown={(e) => helper.grabPiece(e, setActivePiece)}
      onMouseMove={(e) => helper.movePiece(e, activePiece)}
      onMouseUp={(e) =>
        helper.releasePiece(
          e,
          activePiece,
          boardState,
          setBoardState,
          setActivePiece,
        )}
    >
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavBar></NavBar>
              <Home boardState={boardState}></Home>
              <Outlet />
            </div>
          }
        >
          <Route
            path="/game"
            element={
              <div>
                <Board boardState={boardState}></Board>
              </div>
            }
          >
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
