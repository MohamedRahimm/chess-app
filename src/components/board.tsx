import {
  MouseEvent,
  RefObject,
  TouchEvent,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import "./board.css";
import React from "react";

function subscribe(callback: (e: Event) => void) {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
}

function useDimensions(ref: RefObject<HTMLElement>) {
  const dimensions = useSyncExternalStore(
    subscribe,
    () =>
      JSON.stringify({
        width: ref.current?.offsetWidth ?? 0,
        height: ref.current?.offsetHeight ?? 0,
      }),
  );
  return useMemo(() => JSON.parse(dimensions), [dimensions]);
}

export type piece =
  | "bR"
  | "bN"
  | "bB"
  | "bQ"
  | "bK"
  | "bB"
  | "bN"
  | "bR"
  | "bP"
  | ""
  | "wP"
  | "wR"
  | "wN"
  | "wB"
  | "wQ"
  | "wK"
  | "wB"
  | "wN"
  | "wR";

interface TilesProps {
  width: string;
  height: string;
  boardState: piece[][];
}
interface boardProps {
  boardState: piece[][];
  updateBoard: (newBoardState: piece[][]) => void;
}

function Tiles(props: TilesProps) {
  const width = parseInt(props.width);
  const height = parseInt(props.height);
  const tiles: React.ReactElement[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const url =
        new URL(`../assets/${props.boardState[i][j]}.png`, import.meta.url)
          .href;
      tiles.push(
        <div
          key={`row${i} col${j}`}
          className="tile"
          //@ts-ignore
          idx={`${i}${j}`}
          piecetype={props.boardState[i][j]}
          style={{
            backgroundImage: `url("${url}")`,
          }}
        >
        </div>,
      );
    }
  }
  return (
    <div id="tiles" style={{ width, height }}>
      {tiles}
    </div>
  );
}

export default function Board(boardProps: boardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const { width, height } = useDimensions(boardRef);
  const boardURL = new URL(`../assets/blueBoard.svg`, import.meta.url).href;
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
          const oldState = structuredClone(boardProps.boardState);
          const [newX, newY] = newIdx.split("").map(Number);
          const [oldX, oldY] = oldIdx.split("").map(Number);
          oldState[newX][newY] = oldState[oldX][oldY];
          oldState[oldX][oldY] = "";
          boardProps.updateBoard(oldState);
        }
      }
      clone.style.pointerEvents = "auto";
      clone.style.visibility = "hidden";
      setActivePiece(undefined);
    }
  }
  function touchStart(e: TouchEvent) {
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
          const oldState = structuredClone(boardProps.boardState);
          const [newX, newY] = newIdx.split("").map(Number);
          const [oldX, oldY] = oldIdx.split("").map(Number);
          oldState[newX][newY] = oldState[oldX][oldY];
          oldState[oldX][oldY] = "";
          boardProps.updateBoard(oldState);
        }
      }
      clone.style.pointerEvents = "auto";
      clone.style.visibility = "hidden";
      setActivePiece(undefined);
    }
  }

  return (
    <div>
      <div
        id="board"
        ref={boardRef}
        style={{ backgroundImage: `url("${boardURL}")` }}
        onMouseUp={releasePiece}
        onMouseDown={grabPiece}
        onMouseMove={movePiece}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        <div
          id="moving"
          style={{
            visibility: "hidden",
          }}
        >
        </div>
        <Tiles
          width={width}
          height={height}
          boardState={boardProps.boardState}
        />
      </div>
    </div>
  );
}
