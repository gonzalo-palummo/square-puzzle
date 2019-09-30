import React from "react";
import "./Complete.css";
import { Link } from "react-router-dom";

function Complete(props) {
  return (
    <div className="text-center">
      <h1 className="h4 mb-4">Results</h1>
      <p>Time: {props.match.params.time} seconds</p>
      <p>Movements: {props.match.params.movements}</p>
      <Link
        to="/"
        className="btn btn-secondary btn-block my-2 mt-4 border-rounded"
      >
        Go to Home
      </Link>
    </div>
  );
}
export default Complete;
