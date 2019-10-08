import React, { Component } from "react";
import "./Play.css";
import { Link } from "react-router-dom";
import environment from "./../../environment/environment.js";

class Play extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 className="d-none">Puzzles list</h1>
        <ul className="list-unstyled text-center w-50 m-auto">
          {this.props.puzzles.map((puzzle, index) => (
            <li key={index} className="puzzle-item p-2 rounded my-2 text-white">
              <Link to={`/play/sizes/${puzzle.id}`}>
                <img
                  src={`require(${environment.apiUrl}/${puzzle.url}/complete.jpg)`}
                  className="puzzle-preview rounded"
                  alt="Preview of Puzzle"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Play;
