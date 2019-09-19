import React from "react";
import "./Navbar.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PlayArrow, Person } from "@material-ui/icons";

function Navbar() {
  return (
    <div className="menu w-100">
      <nav>
        <ul className="row list justify-content-center p-0">
          <li className="col-xs-6 text-center p-2">
            <Link to="/play" className="unlink">
              Play <PlayArrow className="d-block m-auto" />
            </Link>
          </li>
          <li className="col-xs-6 text-center p-2">
            <Link to="/profile/" className="unlink">
              Profile <Person className="d-block m-auto" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
