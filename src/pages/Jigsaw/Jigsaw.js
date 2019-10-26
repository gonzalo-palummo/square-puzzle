import React, { Component } from "react";
import "./Jigsaw.css";
import JigsawComponent from "../../components/Jigsaw/Jigsaw";
import UserService from "./../../services/UserService";
import { getUserData } from "./../../services/AuthService";
import CSSLoader from "./../../components/CSSLoader/CSSLoader";
import RecordService from "../../services/RecordService";
import { Link } from "react-router-dom";

class Jigsaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movements: 0,
      elapsed: 0,
      start: Date.now(),
      isLoading: true,
      totalPieces:
        this.props.match.params.size * this.props.match.params.size - 1,
      countLoadedPieces: 1
    };
  }

  secondsElapsed = () => {
    return (Math.round(this.state.elapsed / 100) / 10).toFixed(1);
  };

  handleMove = () => {
    this.setState({
      movements: this.state.movements + 1
    });
  };

  handleLoad = () => {
    this.setState({ countLoadedPieces: this.state.countLoadedPieces + 1 });
    if (this.state.totalPieces == this.state.countLoadedPieces) {
      this.setState({
        start: Date.now(),
        isLoading: false
      });
    }
  };

  onComplete = () => {
    let time = this.secondsElapsed();
    this.setState({
      isLoading: true
    });

    RecordService.create({
      puzzle_id: this.props.match.params.jigsawId,
      size: this.props.match.params.size,
      time: time,
      movements: this.state.movements,
      created_by: getUserData().id
    }).then(success => {
      if (success) {
        this.setState({
          isLoading: false
        });
        this.props.history.push(
          `/jigsaws/${this.props.match.params.jigsawId}/${this.props.match.params.size}/complete/${time}/${this.state.movements}`
        );
      } else {
        this.props.history.push("/login"); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 50);
    UserService.incrementPlays(getUserData().id).then(success => {
      if (success) {
      } else {
        this.props.history.push("/login"); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.setState({ elapsed: new Date() - this.state.start });
  };

  render() {
    return (
      <main className="text-center">
        {this.state.isLoading ? <CSSLoader /> : ""}
        <div className="header">
          <div className="row">
            <div className="col-6">
              <button className="btn btn-icon btn-eye mt-1"></button>
            </div>
            <div className="col-6">
              <p className="timer font-weight-light">
                <span id="timer">{this.secondsElapsed()}</span> |{" "}
                {this.state.movements}
              </p>
            </div>
          </div>
        </div>

        <JigsawComponent
          size={this.props.match.params.size}
          jigsawId={this.props.match.params.jigsawId}
          onLoad={this.handleLoad}
          onMove={this.handleMove}
          onComplete={this.onComplete}
        />
        <Link to={"/"} className="btn btn-icon btn-back mt-2"></Link>
      </main>
    );
  }
}
export default Jigsaw;
