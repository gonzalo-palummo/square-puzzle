import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Play({ match }) {
  console.log(match.url);
  console.log(match.url);
  // TODO: USE STATE
  let puzzles = [
    {
      jigsawId: 1834
    }
  ];
  return (
    <div>
      <ul>
        {puzzles.map((puzzle, index) => (
          <li key={index}>
            <Link to={`/play/sizes/${puzzle.jigsawId}`}>
              Puzzle {`${puzzle.jigsawId}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Play;
