import React, { Component } from "react";
import "./Jigsaw.css";
import JigsawComponent from "../../components/Jigsaw/Jigsaw";
import Timer from "react-compound-timer";
class Jigsaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movements: 0
    };
    this.handleMove = this.handleMove.bind(this);
  }
  handleMove() {
    this.setState({
      movements: this.state.movements + 1
    });
  }
  render() {
    return (
      <div>
        <JigsawComponent
          size={this.props.match.params.size}
          jigsawId={this.props.match.params.jigsawId}
          onMove={this.handleMove}
        />
        <p className="timer mx-auto text-center font-weight-light mt-2 rounded">
          <Timer>
            <Timer.Minutes />:
            <Timer.Seconds />
          </Timer>{" "}
          | {this.state.movements}
        </p>
      </div>
    );
  }
}
export default Jigsaw;
