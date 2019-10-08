import React, { Component } from "react";
import "./Jigsaw.css";
import JigsawComponent from "../../components/Jigsaw/Jigsaw";
class Jigsaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movements: 0,
      elapsed: 0,
      start: Date.now()
    };
    this.handleMove = this.handleMove.bind(this);
  }

  secondsElapsed() {
    return (Math.round(this.state.elapsed / 100) / 10).toFixed(1);
  }

  handleMove() {
    this.setState({
      movements: this.state.movements + 1
    });
  }

  onComplete() {
    let time = this.secondsElapsed();
    this.props.history.push(`/play/complete/${time}/${this.state.movements}`);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 50);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.setState({ elapsed: new Date() - this.state.start });
  };

  render() {
    return (
      <div>
        <p className="timer mx-auto text-center font-weight-light mt-2 pb-2 rounded">
          <span id="timer">{this.secondsElapsed()}</span> |{" "}
          {this.state.movements}
        </p>
        <JigsawComponent
          size={this.props.match.params.size}
          jigsawId={this.props.match.params.jigsawId}
          onMove={this.handleMove}
          onComplete={() => this.onComplete()}
        />
      </div>
    );
  }
}
export default Jigsaw;
