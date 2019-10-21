import React from "react";
import "./JigsawSizes.css";
import { Link } from "react-router-dom";

function JigsawSizes(props) {
  let jigsawId = props.match.params.jigsawId;
  let sizes = [2, 3, 4];
  return (
    <main className="text-center">
      <h1 className="h3 mb-4">Choose size</h1>
      <ul className="list-unstyled w-50 m-auto">
        {sizes.map((size, index) => (
          <li key={index} className="size border-rounded mx-auto my-3">
            <Link
              to={`/jigsaws/${jigsawId}/${size}/start`}
              className="text-white font-weight-light h1"
            >
              {size}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
export default JigsawSizes;
