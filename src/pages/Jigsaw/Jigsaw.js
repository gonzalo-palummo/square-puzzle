import React, { Component } from "react";
import "./Jigsaw.css";
import JigsawComponent from "../../components/Jigsaw/Jigsaw";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
class Jigsaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movements: 0,
      isModalOpen: false,
      elapsed: 0,
      start: Date.now()
    };
    this.handleMove = this.handleMove.bind(this);
    this.handleRequestCloseModal = this.handleRequestCloseModal.bind(this);
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
    setTimeout(() => {
      this.setState({ isModalOpen: true });
    }, 0);
  }

  handleRequestCloseModal() {
    this.setState({ isModalOpen: false });
    this.props.history.push("/");
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
        <JigsawComponent
          size={this.props.match.params.size}
          jigsawId={this.props.match.params.jigsawId}
          onMove={this.handleMove}
          onComplete={() => this.onComplete()}
        />
        <p className="timer mx-auto text-center font-weight-light mt-2 pb-2 rounded">
          <span id="timer">{this.secondsElapsed()}</span> |{" "}
          {this.state.movements}
        </p>

        <ModalDialog
          title="Congratulations!"
          message="You have completed the puzzle."
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleRequestCloseModal}
        ></ModalDialog>
      </div>
    );
  }
}
export default Jigsaw;
