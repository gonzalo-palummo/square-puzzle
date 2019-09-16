import React from "react";
import "./Navbar.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PlayArrow, Person } from "@material-ui/icons";
import Play from "../../pages/Play";
import Profile from "../../pages/Profile";

function Navbar() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">
                Game <PlayArrow />
              </Link>
            </li>
            <li>
              <Link to="/profile/">
                Profile <Person />
              </Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Play} />
        <Route path="/profile/" component={Profile} />
      </div>
    </Router>
  );
}
export default Navbar;
