import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <main className="text-center">
      <Link to={`/myprofile`} className="btn mb-5">
        &#9787;
      </Link>
      <Link to={`/jigsaws`} className="btn vibrate-2 mt-5">
        Select Puzzle
      </Link>
    </main>
  );
}
export default Home;
