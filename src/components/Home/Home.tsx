import "./Home.css";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/"
            className="button"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="button"
          >
            Play
          </Link>
        </li>
        <li>
          <Link to="/" className="button">Login</Link>
        </li>
        <li>
          <Link to="/" className="button">Setting</Link>
        </li>
        <li>
          <Link
            to="https://github.com/MohamedRahimm"
            className="button"
          >
            GitHub
          </Link>
        </li>
      </ul>
    </nav>
  );
}
