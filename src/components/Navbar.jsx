import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">▶</span>
        <span className="logo-text">VideoHub</span>
      </Link>
      <SearchBar />
    </nav>
  );
}

export default Navbar;
