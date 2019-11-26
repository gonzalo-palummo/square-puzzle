import React, { Component } from "react";
import "./JigsawStart.css";
import { Link } from "react-router-dom";
import RecordsTable from "../../components/RecordsTable/RecordsTable";
import { get } from "../../services/MultilingualService";

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
          {get("start")} {get("game")}
        </Link>
        <RecordsTable
          {...this.props}
          jigsawId={this.state.jigsawId}
          size={this.state.size}
        />
        <Link
          to={`/jigsaws/${this.state.jigsawId}`}
          className="btn btn-icon btn-back mt-4"
        ></Link>
      </main>
    );
  }
}
export default JigsawStart;
