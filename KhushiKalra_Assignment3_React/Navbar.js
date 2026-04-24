import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/" style={{ marginRight: "15px" }}>Book List</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
}

export default Navbar;