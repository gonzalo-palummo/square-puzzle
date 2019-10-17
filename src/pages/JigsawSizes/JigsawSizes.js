import React from "react";
import "./JigsawSizes.css";
import { Link } from "react-router-dom";

function JigsawSizes(props) {
  let jigsawId = props.match.params.jigsawId;
  let puzzles = [
    {
      jigsawId: jigsawId,
      size: 2
    },
    {
      jigsawId: jigsawId,
      size: 3
    },
    {
      jigsawId: jigsawId,
      size: 4
    }
  ];
  return (
    <main className="text-center">
      <h1 className="h3 mb-4">Choose size</h1>
      <ul className="list-unstyled w-50 m-auto">
        {puzzles.map((puzzle, index) => (
          <li key={index} className="size border-rounded mx-auto my-3">
            <Link
              to={`/jigsaws/${puzzle.jigsawId}/${puzzle.size}`}
              className="text-white font-weight-light h1"
            >
              {puzzle.size}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
export default JigsawSizes;
