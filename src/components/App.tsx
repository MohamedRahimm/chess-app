import Board, { piece } from "./Board/Board";
import { MouseEvent, TouchEvent, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
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
  const [activePiece, setActivePiece] = useState<HTMLElement>();
  function grabPiece(e: MouseEvent) {
    e.preventDefault();
    const element = e.target as HTMLElement;
    if (element.classList.contains("tile")) {
      setActivePiece(element);
    }
  }
  function movePiece(e: MouseEvent) {
    if (activePiece != undefined) {
      const clone = document.querySelector("#moving") as HTMLElement;
      const rect = activePiece.getBoundingClientRect();
      const left = e.clientX - rect.width / 2;
      const top = e.clientY - rect.height / 2;
      activePiece.style.visibility = "hidden";

      clone.style.visibility = "visible";
      clone.style.position = "absolute";
      clone.style.left = `${left}px`;
      clone.style.top = `${top}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.backgroundImage = activePiece.style.backgroundImage;
    }
  }
  function releasePiece(e: MouseEvent) {
    if (activePiece != undefined) {
      const clone = document.querySelector("#moving") as HTMLElement;
      clone.style.pointerEvents = "none";
      const targetElem = document.elementFromPoint(e.pageX, e.pageY);
      if (targetElem?.className !== "tile") {
        clone.style.translate = `0px 0px`;
        clone.style.visibility = "hidden";
        activePiece.style.visibility = "visible";
      } else {
        const newIdx = targetElem?.getAttribute("idx");
        const oldIdx = activePiece?.getAttribute("idx");
        if (newIdx && oldIdx) {
          const oldState = structuredClone(boardState);
          const [newX, newY] = newIdx.split("").map(Number);
          const [oldX, oldY] = oldIdx.split("").map(Number);
          oldState[newX][newY] = oldState[oldX][oldY];
          oldState[oldX][oldY] = "";
          setBoardState(oldState);
        }
      }
      activePiece.style.visibility = "visible";
      clone.style.pointerEvents = "auto";
      clone.style.visibility = "hidden";
      setActivePiece(undefined);
    }
  }
  function touchStart(e: TouchEvent) {
    const app = document.querySelector(".App") as HTMLElement;
    app.style.touchAction = "none";
    const touch = e.touches[0];
    const targetElem = document.elementFromPoint(
      touch.pageX,
      touch.pageY,
    ) as HTMLElement;
    if (targetElem.classList.contains("tile")) {
      setActivePiece(targetElem);
    }
  }
  function touchMove(e: TouchEvent) {
    if (activePiece != undefined) {
      const clone = document.querySelector("#moving") as HTMLElement;
      const rect = activePiece.getBoundingClientRect();
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;
      const left = clientX - rect.width / 2;
      const top = clientY - rect.height / 2;

      activePiece.style.visibility = "hidden";
      clone.style.visibility = "visible";

      clone.style.left = `${left}px`;
      clone.style.top = `${top}px`;
      clone.style.position = "absolute";
      clone.style.height = `${rect.height}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.backgroundImage = activePiece.style.backgroundImage;
    }
  }
  function touchEnd(e: TouchEvent) {
    if (activePiece != undefined) {
      const app = document.querySelector(".App") as HTMLElement;
      const pageX = e.changedTouches[0].pageX;
      const pageY = e.changedTouches[0].pageY;
      const clone = document.querySelector("#moving") as HTMLElement;

      clone.style.pointerEvents = "none";

      const targetElem = document.elementFromPoint(pageX, pageY);
      if (targetElem?.className !== "tile") {
        clone.style.translate = `0px 0px`;
        clone.style.visibility = "hidden";
        activePiece.style.visibility = "visible";
      } else {
        const newIdx = document.elementFromPoint(pageX, pageY)?.getAttribute(
          "idx",
        );
        const oldIdx = activePiece?.getAttribute("idx");
        if (newIdx && oldIdx) {
          const oldState = structuredClone(boardState);
          const [newX, newY] = newIdx.split("").map(Number);
          const [oldX, oldY] = oldIdx.split("").map(Number);
          oldState[newX][newY] = oldState[oldX][oldY];
          oldState[oldX][oldY] = "";
          setBoardState(oldState);
        }
      }
      clone.style.pointerEvents = "auto";
      clone.style.visibility = "hidden";
      app.style.touchAction = "none";
      setActivePiece(undefined);
    }
  }
  return (
    <Routes>
      <Route
        path="/game"
        element={
          <div
            className="App"
            onMouseUp={releasePiece}
            onMouseDown={grabPiece}
            onMouseMove={movePiece}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
          >
            <Board boardState={boardState}>
            </Board>
          </div>
        }
      >
      </Route>
      <Route path="/" element={<Home></Home>}></Route>
    </Routes>
  );
}
