import { piece } from "./Board";
import { Dispatch, MouseEvent, SetStateAction } from "react";
export function grabPiece(
  e: MouseEvent,
  setActivePiece: Dispatch<SetStateAction<HTMLElement | undefined>>,
) {
  e.preventDefault();
  const element = e.target as HTMLElement;
  if (element.classList.contains("tile")) {
    setActivePiece(element);
  }
}
export function movePiece(e: MouseEvent, activePiece: HTMLElement | undefined) {
  if (activePiece != undefined) {
    // Create a clone of the piece to manipulate instead of moving the actual piece (this is much simplier rather than the amount of CSS needed to move original piece)
    const clone = document.querySelector("#moving") as HTMLElement;
    const rect = activePiece.getBoundingClientRect();
    // Offset the piece so it follows the mouse smoothly
    const left = e.clientX - rect.width / 2;
    const top = e.clientY - rect.height / 2;
    activePiece.style.visibility = "hidden";
    clone.style.cssText = `
      visibility : visible;
      position:absolute;
      left:${left}px;
      top:${top}px;
      height:${rect.height}px;
      width:${rect.width}px;
      background-image:${activePiece.style.backgroundImage};`;
  }
}
export function releasePiece(
  e: MouseEvent,
  activePiece: HTMLElement | undefined,
  boardState: piece[][],
  setBoardState: Dispatch<SetStateAction<piece[][]>>,
  setActivePiece: Dispatch<SetStateAction<HTMLElement | undefined>>,
) {
  if (activePiece != undefined) {
    const clone = document.querySelector("#moving") as HTMLElement;

    // Basically hides the clone from elementFromPoint
    clone.style.pointerEvents = "none";
    // Might need to be e.pageX (not sure)
    const targetElem = document.elementFromPoint(e.clientX, e.clientY);

    if (targetElem?.className !== "tile") {
      clone.style.translate = `0px 0px`;
    } else {
      const newIdx = targetElem.getAttribute("idx");
      const oldIdx = activePiece.getAttribute("idx");
      if (newIdx && oldIdx) {
        const updatedBoard = structuredClone(boardState);
        const [newX, newY] = newIdx.split("").map(Number);
        const [oldX, oldY] = oldIdx.split("").map(Number);
        updatedBoard[newX][newY] = updatedBoard[oldX][oldY];
        updatedBoard[oldX][oldY] = "";
        setBoardState(updatedBoard);
      }
    }
    activePiece.style.visibility = "visible";
    clone.style.pointerEvents = "auto";
    clone.style.visibility = "hidden";
    setActivePiece(undefined);
  }
}
export function touchStart(
  e: TouchEvent,
  setActivePiece: Dispatch<SetStateAction<HTMLElement | undefined>>,
) {
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
export function touchMove(e: TouchEvent, activePiece: HTMLElement) {
  if (activePiece != undefined) {
    const clone = document.querySelector("#moving") as HTMLElement;
    const rect = activePiece.getBoundingClientRect();
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    const left = clientX - rect.width / 2;
    const top = clientY - rect.height / 2;

    activePiece.style.visibility = "hidden";
    clone.style.cssText = `
    visibility : visible;
    position:absolute;
    left:${left}px;
    top:${top}px;
    height:${rect.height}px;
    width:${rect.width}px;
    background-image:${activePiece.style.backgroundImage};`;
  }
}
export function touchEnd(
  e: TouchEvent,
  activePiece: HTMLElement,
  boardState: piece[][],
  setBoardState: Dispatch<SetStateAction<piece[][]>>,
  setActivePiece: Dispatch<SetStateAction<HTMLElement | undefined>>,
) {
  if (activePiece != undefined) {
    const app = document.querySelector(".App") as HTMLElement;
    const pageX = e.changedTouches[0].clientX;
    const pageY = e.changedTouches[0].clientY;
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
