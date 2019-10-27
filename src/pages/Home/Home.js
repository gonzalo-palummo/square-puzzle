import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <main className="text-center">
      <Link to={"/myprofile"} className="btn btn-icon btn-user mb-5"></Link>
      <img
        src={require("../../images/logofull.png")}
        alt={"logo"}
        width={150}
        className="d-block mx-auto"
      />
      <Link
        to={`/jigsaws`}
        className="btn vibrate-2 p-1 mt-5 d-block w-75 mx-auto"
      >
        Select Puzzle
      </Link>
    </main>
  );
}
export default Home;
