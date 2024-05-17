import { RefObject, useMemo, useRef, useSyncExternalStore } from "react";
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
  return (
    <div>
      <div
        id="board"
        ref={boardRef}
        style={{ backgroundImage: `url("${boardURL}")` }}
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
