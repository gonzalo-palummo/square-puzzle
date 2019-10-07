import React, { Component } from "react";
import "./Jigsaw.css";
import Piece from "../Piece/Piece";
import { withRouter } from "react-router-dom";

class Jigsaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [],
      shuffled: [],
      size: parseInt(this.props.size),
      jigsawId: parseInt(this.props.jigsawId),
      imageWidth: window.innerWidth - 30
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    const pieces = [...Array(this.state.size * this.state.size)].map(
      (_, i) => ({
        img: require(`../../images/${this.state.jigsawId}/${
          this.state.size
        }/img_${("0" + (i + 1)).substr(-2)}.jpg`),
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

  updateDimensions = () => {
    this.setState({
      imageWidth: window.innerWidth - 30
    });
  };

  render() {
    // Opciones para ponerle alto en píxeles:
    // Otra opción: En el resize del browser/load tomar el ancho de la pantalla,
    // restarle el padding/borde/margin que no sea el puzzle.
    // A eso lo dividís por 3 o 4 (cantidad de fichas), y tenés el ancho de la pieza.
    // A partir de ahí, multiplicás por el ratio (width / height) y tenés el alto en px.

    // ref (react) => cada pieza
    // El ancho sigue con porcentaje
    // Una vez inyectada en la página en el DOM, preguntás al nodo (via ref)
    // el computedWidth final.
    // Eso lo multiplicás por el ratio y te va a dar el alto en px.
    // Con eso, le ponés el alto en px a la imagen.
    const pieceWidth = this.state.imageWidth / this.state.size;
    /*let imgStyle = {
      width: `${pieceWidth}%`,
      height: `${pieceHeight}%`
    };*/

    let imgStyle = {
      width: `${pieceWidth}px`,
      height: `${pieceWidth}px`,
      outline: "1px solid"
    };

    return (
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
    );
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
            this.props.onComplete();
          }
        }
      }
    }
  }

  shufflePieces(pieces) {
    const shuffled = [...pieces];

    shuffle();

    while (!isSolvable(shuffled, this.state.size)) {
      shuffle();
    }

    function shuffle() {
      for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = tmp;
      }
    }

    function isSolvable(shuffledPieces, size) {
      let inversionCount = 0;

      for (let i = 0; i < shuffledPieces.length; i++) {
        for (let j = i + 1; j < shuffledPieces.length; j++) {
          if (shuffledPieces[i].order > shuffledPieces[j].order) {
            inversionCount++;
          }
        }
      }

      console.log(inversionCount);
      if (
        (size % 2 == 1 && inversionCount % 2 == 1) ||
        (size % 2 == 0 && inversionCount % 2 == 0)
      ) {
        return false;
      } else {
        return true;
      }
    }

    return shuffled;
  }
}
export default withRouter(Jigsaw);
