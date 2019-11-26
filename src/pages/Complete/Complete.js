import React from "react";
import "./Complete.css";
import { Link } from "react-router-dom";
import RecordsTable from "../../components/RecordsTable/RecordsTable";
import { get } from "../../services/MultilingualService";

function Complete(props) {
  return (
    <main className="text-center">
      <h1 className="h3 mb-4 text-dark shadow-none">
        {get("congratulations")} !
      </h1>
      <p className="h5">
        {get("time")}: {props.match.params.time} {get("seconds")}
      </p>
      <p className="h5">
        {get("movements")}: {props.match.params.movements}
      </p>
      <Link
        to={`/jigsaws/${props.match.params.jigsawId}/${props.match.params.size}`}
        className="btn btn-primary w-75 my-2 mt-4 border-rounded"
      >
        {get("playAgain")}
      </Link>
      <Link to="/" className="btn btn-secondary w-75 my-2 border-rounded">
        {get("goHome")}
      </Link>
      <h1 className="h4 d-none">{get("recordsTable")}</h1>
      <RecordsTable
        jigsawId={props.match.params.jigsawId}
        size={props.match.params.size}
      />
    </main>
  );
}
export default Complete;
