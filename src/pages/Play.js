import React from "react";
import Jigsaw from "../components/Jigsaw/Jigsaw";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Play({ match }) {
  console.log(match.url);
  console.log(match.url);
  let jigsawId = 1834;
  let size = 3;
  return (
    <div>
      <ul>
        <li>
          <Link to={`${match.url}/${jigsawId}/${size}`}>Go to puzzle</Link>
        </li>
      </ul>

      {/* <Route path={`${match.path}:jigsawId/:size`} component={Jigsaw} /> */}
      <Route path={"/play/:jigsawId/:size"} component={Jigsaw} />
    </div>
  );
}
export default Play;
