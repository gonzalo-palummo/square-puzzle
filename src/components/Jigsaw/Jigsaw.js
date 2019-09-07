import React, { Component } from "react";
import "./Jigsaw.css";

export default class Jigsaw extends Component {
  state = {
    pieces: [],
    shuffled: [],
    size: 3
  };

  componentDidMount() {
    const pieces = [...Array(this.state.size * this.state.size)].map(
      (_, i) => ({
        img: require(`./images/img_${("0" + (i + 1)).substr(-2)}.png`),
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
    return (
      <div className="jigsaw_shuffled_board">
        {this.state.shuffled.map((piece, i) =>
          this.renderPieceContainer(piece, i)
        )}
      </div>
    );
  }

  renderPieceContainer(piece, index) {
    let imgStyle = {
      width: `${100 / this.state.size}%`
    };
    if (piece) {
      return (
        <img
          key={index}
          onClick={() => this.clickPiece(piece, index)}
          className="image"
          alt=""
          style={imgStyle}
          src={piece.img}
        />
      );
    } else {
      return <div style={imgStyle} className="image"></div>;
    }
  }

  clickPiece(piece, index) {
    if (piece) {
      const pieceData = this.state.pieces.find(p => p.order === piece.order);
      let shuffledData = this.state.shuffled;
      let undefinedIndex;
      shuffledData.find(function(piece, index) {
        if (piece == undefined) {
          undefinedIndex = index;
        }
      });
      if (
        (undefinedIndex - 1 == index &&
          undefinedIndex % this.state.size != 0) ||
        (undefinedIndex + 1 == index && index % this.state.size != 0) ||
        undefinedIndex + this.state.size == index ||
        undefinedIndex - this.state.size == index
      ) {
        if (pieceData) {
          shuffledData[shuffledData.indexOf(pieceData)] = undefined;
          shuffledData[undefinedIndex] = pieceData;
          this.setState({ shuffled: shuffledData });
          if (this.isComplete()) {
            alert("Congratulations!");
          }
        }
      }
    }
  }

  isComplete() {
    if (this.state.shuffled[0] == undefined) {
      for (let i = 1; i < this.state.shuffled.length; i++) {
        if (this.state.shuffled[i].order != i - 1) {
          return false;
        }
      }
      return true;
    } else {
      return false;
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
