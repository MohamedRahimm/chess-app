import { RefObject, useMemo, useRef, useSyncExternalStore } from "react";
import "./board.css"
import boardURL from "../assets/blueBoard.svg"


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
      })
  );
  return useMemo(() => JSON.parse(dimensions), [dimensions]);
}

type pieces = 
    'bR'|'bN'|'bB'|'bQ'|'bK'|'bB'|'bN'|'bR'|'bP'|''|'wP'|
    'wR'| 'wN'| 'wB'| 'wQ'| 'wK'| 'wB' |'wN'| 'wR'

interface TilesProps {
  width: string;
  height: string;
  boardState: pieces[][]; 
}


function Tiles(props: TilesProps) {
    const tiles:React.ReactElement[] = [];
    for (let i = 0; i < 8; i++) {
        for(let j = 0;j<8;j++){
          const url = new URL(`../assets/${props.boardState[i][j]}.png`, import.meta.url).href
          tiles.push(<div key= {`${i}${j}`}
                          className="tile"
                          style={{
                          backgroundImage: `url("${url}")`,
                      }}>
                      </div>);
        }
    }
    return (
        <div id="tiles" style={{width:parseInt(props.width),height:parseInt(props.height)}}>
            {tiles}
        </div>
    );
}

export default function Board() {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useDimensions(ref);
  const boardState: pieces[][] =  [
    ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
    ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
    ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
] 

  return (
    <div>
      <div id="board" ref={ref} style={{backgroundImage: `url("${boardURL}")`}}>

      <Tiles width={width} height={height} boardState={boardState} />
      </div>
    </div>
  );
}
