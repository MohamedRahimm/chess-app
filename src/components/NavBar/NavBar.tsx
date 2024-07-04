import { Link } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  return (
    <>
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
              to="/game"
              className="button"
            >
              Play
            </Link>
          </li>
          <li>
            <Link to="" className="button">Login</Link>
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
    </>
  );
}
