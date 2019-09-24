import React, { Component } from "react";
import "./Jigsaw.css";
import Piece from "../Piece/Piece";
import ModalDialog from "../ModalDialog/ModalDialog";
import { withRouter } from "react-router-dom";

class Jigsaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [],
      shuffled: [],
      size: parseInt(this.props.size),
      jigsawId: parseInt(this.props.jigsawId),
      isModalOpen: false
    };
    this.handleRequestCloseModal = this.handleRequestCloseModal.bind(this);
  }

  componentDidMount() {
    const pieces = [...Array(this.state.size * this.state.size)].map(
      (_, i) => ({
        img: require(`../../images/${this.state.jigsawId}/${
          this.state.size
        }/img_${("0" + (i + 1)).substr(-2)}.png`),
        order: i - 1
      })
    );
    pieces.shift();
    let shuffleData = this.shufflePieces(pieces);

    this.setState({
      pieces,
      shuffled: [undefined, ...shuffleData]
    });
  }

  render() {
    let imgStyle = {
      width: `${100 / this.state.size}%`
    };
    return (
      <div>
        <div className="jigsaw_shuffled_board">
          {this.state.shuffled.map((piece, index) => (
            <Piece
              key={index}
              piece={piece}
              imgStyle={imgStyle}
              onClickPiece={() => this.handleClickPiece(piece, index)}
            />
          ))}
        </div>
        <ModalDialog
          title="Congratulations!"
          message="You have completed the puzzle."
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleRequestCloseModal}
        ></ModalDialog>
      </div>
    );
  }

  handleRequestCloseModal() {
    this.setState({ isModalOpen: false });
    this.props.history.push("/");
  }

  isComplete() {
    if (this.state.shuffled[0] === undefined) {
      for (let i = 1; i < this.state.shuffled.length; i++) {
        if (this.state.shuffled[i].order !== i - 1) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  handleClickPiece(piece, index) {
    if (piece) {
      const pieceData = this.state.pieces.find(p => p.order === piece.order);
      let shuffledData = this.state.shuffled;
      let undefinedIndex;
      shuffledData.find(function(piece, index) {
        if (piece === undefined) {
          undefinedIndex = index;
        }
      });
      if (
        (undefinedIndex - 1 === index &&
          undefinedIndex % this.state.size !== 0) ||
        (undefinedIndex + 1 === index && index % this.state.size !== 0) ||
        undefinedIndex + this.state.size === index ||
        undefinedIndex - this.state.size === index
      ) {
        if (pieceData) {
          shuffledData[shuffledData.indexOf(pieceData)] = undefined;
          shuffledData[undefinedIndex] = pieceData;
          this.setState({ shuffled: shuffledData });
          this.props.onMove();
          if (this.isComplete()) {
            setTimeout(() => {
              this.setState({ isModalOpen: true });
            }, 0);
          }
        }
      }
    }
  }

  shufflePieces(pieces) {
    const shuffled = [...pieces];

    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = tmp;
    }

    return shuffled;
  }
}
export default withRouter(Jigsaw);
