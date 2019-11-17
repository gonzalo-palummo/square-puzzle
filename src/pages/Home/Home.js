import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Cards from "../../components/Cards/Cards";

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
      <Link to={`/jigsaws`} className="btn vibrate-2 mt-5 w-75">
        Select Puzzle
      </Link>
      <Link to={`/create`} className="btn mt-2 w-75">
        Create one !
      </Link>
    </main>
  );
}
export default Home;
