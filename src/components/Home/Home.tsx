import { Link } from "react-router-dom";
import Board from "../Board/Board";
import { piece } from "../Board/Board";
import "./Home.css";
import { useEffect, useState } from "react";
interface BoardProps {
  boardState: piece[][];
}
interface TyperProps {
  speed: number;
  text: String;
}
function Typer(typerProps: TyperProps) {
  const [idx, setidx] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setidx((v) => v + 1),
      typerProps.speed,
    );
    return () => window.clearInterval(timer);
  }, []);

  return <p id="text">{typerProps.text.substring(0, idx)}</p>;
}
export default function Home(boardProps: BoardProps) {
  return (
    <div className="home">
      <Board boardState={boardProps.boardState}></Board>
      <div className="index-intro">
        <Typer speed={100} text="Multiplayer Chess App Made in React"></Typer>
        <Link to="/" id="comp-button" className="button">
          Play Against Computer
        </Link>
        <Link to="/" id="friend-button" className="button">
          Play With Friend
        </Link>
      </div>
      <div
        id="test"
        onClick={() => {
          const element = document.querySelector("#test") as HTMLDivElement;
          console.log(element.style.color, element.style.backgroundColor);
          element.style.transition = "all 700ms linear";
          element.style.color = "black";
          element.style.backgroundColor = "transparent";
        }}
      >
        <i>pssst.. you can move the pieces!</i>
      </div>
    </div>
  );
}
