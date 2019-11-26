import React, { Component } from "react";
import "./Jigsaw.css";
import Piece from "../Piece/Piece";
import { withRouter } from "react-router-dom";
import environment from "../../environment/environment";

class Jigsaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [],
      shuffled: [],
      size: parseInt(this.props.size),
      jigsawId: parseInt(this.props.jigsawId),
      imageWidth: window.innerWidth >= 576 ? 480 : window.innerWidth - 30
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
    const pieces = [...Array(this.state.size * this.state.size)].map(
      (_, i) => ({
        img: `${environment.publicUrl}/images/puzzles/${this.state.jigsawId}/${
          this.state.size
        }/img_${("0" + (i + 1)).substr(-2)}.jpg`,
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
      imageWidth: window.innerWidth >= 576 ? 480 : window.innerWidth - 30
    });
  };

  render() {
    const pieceWidth = this.state.imageWidth / this.state.size;

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
            onLoad={() => this.props.onLoad()}
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

    var whileCont = 0; // FOR TEST

    shuffle();
    /*
    while (isCompleteStart(shuffled) || whileCont == 5) {
      console.log("shuffle again");
      whileCont++;
      shuffle();
    }
    */
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
    /*
    function isCompleteStart(shuffledPieces) {
      console.log(shuffledPieces);
      for (let i = 0; i < shuffledPieces.length; i++) {
        console.log(shuffledPieces[i].order);
        console.log(i);
        if (shuffledPieces[i].order !== i) {
          console.log(
            "Is complete on start function. Order: " +
              shuffledPieces[i].order +
              " | Counter: " +
              i
          );
          return false;
        }
      }
      return true;
    }
*/
    function isSolvable(shuffledPieces, size) {
      let inversionCount = 0;

      for (let i = 0; i < shuffledPieces.length; i++) {
        for (let j = i + 1; j < shuffledPieces.length; j++) {
          if (shuffledPieces[i].order > shuffledPieces[j].order) {
            inversionCount++;
          }
        }
      }

      if (size == 2) {
        if (inversionCount % 2 == 0) {
          return true;
        } else {
          return false;
        }
      } else if (
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
