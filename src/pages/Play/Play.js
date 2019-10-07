import React, { Component } from "react";
import "./Play.css";
import { Link } from "react-router-dom";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzles: []
    };
  }

  componentDidMount() {
    // TODO: AJAX REQUEST
    this.setState({
      puzzles: [
        {
          imgUrl: require("../../images/1834/complete.jpg"),
          jigsawId: 1834
        },
        {
          imgUrl: require("../../images/1835/complete.jpg"),
          jigsawId: 1835
        },
        {
          imgUrl: require("../../images/1836/complete.jpg"),
          jigsawId: 1836
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <h1 className="d-none">Puzzles list</h1>
        <ul className="list-unstyled text-center w-50 m-auto">
          {this.state.puzzles.map((puzzle, index) => (
            <li key={index} className="puzzle-item p-2 rounded my-2 text-white">
              <Link to={`/play/sizes/${puzzle.jigsawId}`}>
                <img
                  src={puzzle.imgUrl}
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
