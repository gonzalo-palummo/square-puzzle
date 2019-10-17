import React, { Component } from "react";
import "./Jigsaws.css";
import { Link } from "react-router-dom";
import environment from "../../environment/environment";

class Jigsaws extends Component {
  render() {
    return (
      <main>
        <h1 className="d-none">Puzzles list</h1>
        <ul className="list-unstyled text-center w-50 m-auto">
          {this.props.puzzles.map((puzzle, index) => (
            <li key={index} className="puzzle-item p-2 rounded my-2 text-white">
              <Link to={`/jigsaws/${puzzle.id}`}>
                <img
                  src={`${environment.publicUrl}/${puzzle.url}/complete.jpg`}
                  className="puzzle-preview rounded"
                  alt="Preview of Puzzle"
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}
export default Jigsaws;
