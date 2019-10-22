import React, { Component } from "react";
import "./JigsawStart.css";
import { Link } from "react-router-dom";
import RecordsTable from "../../components/RecordsTable/RecordsTable";

class JigsawStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jigsawId: props.match.params.jigsawId,
      size: props.match.params.size
    };
  }

  render() {
    return (
      <main className="text-center">
        <Link
          to={`/jigsaws/${this.state.jigsawId}/${this.state.size}`}
          className="btn vibrate-2"
        >
          Start Game
        </Link>
        <RecordsTable jigsawId={this.state.jigsawId} size={this.state.size} />
        <Link to={`/jigsaws/sizes`} className="btn mt-2">
          <span className="icon-back">&larr;</span>
        </Link>
      </main>
    );
  }
}
export default JigsawStart;
