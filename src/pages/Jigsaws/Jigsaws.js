import React, { Component } from "react";
import "./Jigsaws.css";
import { Link } from "react-router-dom";
import environment from "../../environment/environment";
import PuzzleService from "../../services/PuzzleService";
import CSSLoader from "../../components/CSSLoader/CSSLoader";

class Jigsaws extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzles: [],
      isLoading: true
    };
  }

  componentDidMount() {
    PuzzleService.getAll().then(puzzles => {
      if (typeof puzzles === "object") {
        this.setState({
          puzzles: puzzles,
          isLoading: false
        });
      } else {
        this.props.history.push("/login"); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return <CSSLoader />;
    }
    return (
      <main className="text-center">
        <h1 className="d-none">Puzzles list</h1>
        <ul className="list-unstyled text-center w-50 m-auto">
          {this.state.puzzles.length > 0
            ? this.state.puzzles.map((puzzle, index) => (
                <li
                  key={index}
                  className="puzzle-item p-2 rounded my-2 text-white"
                >
                  <Link to={`/jigsaws/${puzzle.id}`}>
                    <img
                      src={`${environment.publicUrl}/${puzzle.url}/complete.png`}
                      className="puzzle-preview rounded"
                      alt="Preview of Puzzle"
                    />
                  </Link>
                </li>
              ))
            : null}
        </ul>
        <Link
          to={"/"}
          className="btn btn-icon btn-back mt-2 btn-back-fixed"
        ></Link>
      </main>
    );
  }
}
export default Jigsaws;
