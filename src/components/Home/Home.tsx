import { Link } from "react-router-dom";
import Board from "../Board/Board";
import { piece } from "../Board/Board";
import "./Home.css";
interface BoardProps {
  boardState: piece[][];
}
export default function Home(boardProps: BoardProps) {
  return (
    <div className="test">
      <Board boardState={boardProps.boardState}></Board>
      <div className="index-intro">
        <span>Epic Multiplayer chess app</span>
        <Link to="/" id="comp-button">Play Against Computer</Link>
        <Link to="/" id="friend-button">Play With Friend</Link>
      </div>
    </div>
  );
}
