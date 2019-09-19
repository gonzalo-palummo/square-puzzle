import React from "react";
import "./JigsawSizes.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function JigsawSizes({ match }) {
  let jigsawId = match.params.jigsawId;
  let puzzles = [
    {
      jigsawId: jigsawId,
      size: 2
    },
    {
      jigsawId: jigsawId,
      size: 3
    }
  ];
  return (
    <div>
      <ul>
        {puzzles.map((puzzle, index) => (
          <li key={index}>
            <Link to={`/play/sizes/${puzzle.jigsawId}/${puzzle.size}`}>
              <ul>
                <li>Id: {puzzle.jigsawId}</li>
                <li>Size: {puzzle.size}</li>
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default JigsawSizes;
