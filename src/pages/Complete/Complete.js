import React from "react";
import "./Complete.css";
import { Link } from "react-router-dom";
import RecordsTable from "../../components/RecordsTable/RecordsTable";

function Complete(props) {
  return (
    <main className="text-center">
      <h1 className="h2 mb-4 text-dark shadow-none">Congratulations !</h1>
      <p className="h4">Time: {props.match.params.time} seconds</p>
      <p className="h4">Movements: {props.match.params.movements}</p>
      <Link
        to="/"
        className="btn btn-secondary btn-block my-2 mt-4 border-rounded"
      >
        Go to Home
      </Link>
      <h1 className="h4 d-none">Records table</h1>
      <RecordsTable
        jigsawId={props.match.params.jigsawId}
        size={props.match.params.size}
      />
    </main>
  );
}
export default Complete;
