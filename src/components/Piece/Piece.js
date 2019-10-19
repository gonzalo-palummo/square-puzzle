import React from "react";
function Piece(props) {
  if (props.piece) {
    return (
      <img
        onClick={() => props.onClickPiece()}
        className="image"
        alt="Piece of puzzle"
        style={props.imgStyle}
        src={props.piece.img}
        onLoad={() => props.onLoad()}
      />
    );
  } else {
    return <div style={props.imgStyle} className="image"></div>;
  }
}

export default Piece;
