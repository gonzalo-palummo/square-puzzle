import React, { Component } from "react";
import "./Jigsaw.css";
import Piece from "../Piece/Piece";

export default class Jigsaw extends Component {
  state = {
    pieces: [],
    shuffled: []
  };

  componentDidMount() {
    const pieces = [...Array(this.props.size * this.props.size)].map(
      (_, i) => ({
        img: require(`../../../public/images/${this.props.id}/${
          this.props.size
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
      width: `${100 / this.props.size}%`
    };
    return (
      <div className="jigsaw_shuffled_board">
        {this.state.shuffled.map((piece, index) => (
          <Piece
            key={index}
            piece={piece}
            imgStyle={imgStyle}
            onClickPiece={() => this.clickPiece(piece, index)}
          />
        ))}
      </div>
    );
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
          undefinedIndex % this.props.size != 0) ||
        (undefinedIndex + 1 == index && index % this.props.size != 0) ||
        undefinedIndex + this.props.size == index ||
        undefinedIndex - this.props.size == index
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
