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
              className="nav-button"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/game"
              className="nav-button"
            >
              Play
            </Link>
          </li>
          <li>
            <Link to="" className="nav-button">Login</Link>
          </li>
          <li>
            <Link to="/" className="nav-button">Settings</Link>
          </li>
          <li>
            <Link
              to="https://github.com/MohamedRahimm"
              className="nav-button"
            >
              GitHub
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
