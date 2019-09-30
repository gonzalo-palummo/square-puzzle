import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { elapsed: 0, start: Date.now() };
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
    let elapsed = Math.round(this.state.elapsed / 100);
    let seconds = (elapsed / 10).toFixed(1);
    return { seconds };
  }
}

export default Timer;
