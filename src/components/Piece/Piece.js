import React from "react";
import { get } from "../../services/MultilingualService";
function Piece(props) {
  if (props.piece) {
    return (
      <img
        onClick={() => props.onClickPiece()}
        className="image"
        alt={get("puzzlePiece")}
        style={props.imgStyle}
        src={props.piece.img}
        onLoad={() => props.onLoad()}
      />
    );
  } else {
    return <div style={props.imgStyle} className="image bg-light"></div>;
  }
}

export default Piece;
