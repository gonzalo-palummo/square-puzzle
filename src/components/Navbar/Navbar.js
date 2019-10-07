import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { PlayArrow, Person } from "@material-ui/icons";

function Navbar() {
  return (
    <div className="menu w-100">
      <nav>
        <ul className="row list justify-content-center p-0 m-0">
          <li className="col-xs-6 text-center p-2">
            <NavLink
              to="/"
              className="unlink"
              activeClassName="active"
              exact={true}
            >
              Play <PlayArrow className="d-block m-auto" />
            </NavLink>
          </li>
          <li className="col-xs-6 text-center p-2">
            <NavLink to="/profile/" className="unlink" activeClassName="active">
              Profile <Person className="d-block m-auto" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
