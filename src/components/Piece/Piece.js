import React, { Component } from "react";
export default class Piece extends Component {
  render() {
    if (this.props.piece) {
      return (
        <img
          onClick={() => this.props.onClickPiece()}
          className="image"
          alt="Piece of puzzle"
          style={this.props.imgStyle}
          src={this.props.piece.img}
        />
      );
    } else {
      return <div style={this.props.imgStyle} className="image"></div>;
    }
  }
}
