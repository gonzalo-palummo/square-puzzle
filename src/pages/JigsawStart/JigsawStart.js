import React, { Component } from "react";
import "./JigsawStart.css";
import { Link } from "react-router-dom";
import RecordsTable from "../../components/RecordsTable/RecordsTable";
import { AwesomeButton } from "react-awesome-button";

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
        <AwesomeButton type="primary" size="large" className="vibrate-2">
          <Link to={`/jigsaws/${this.state.jigsawId}/${this.state.size}`}>
            Start Game
          </Link>
        </AwesomeButton>
        <RecordsTable jigsawId={this.state.jigsawId} size={this.state.size} />
      </main>
    );
  }
}
export default JigsawStart;
