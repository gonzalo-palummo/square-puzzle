import React, { Component } from "react";
import "./JigsawRecords.css";
import { Link } from "react-router-dom";
import PuzzleService from "../../services/PuzzleService";
import CSSLoader from "./../../components/CSSLoader/CSSLoader";

class JigsawRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      jigsawId: props.match.params.jigsawId,
      size: props.match.params.size,
      isLoading: true
    };
  }

  componentDidMount() {
    PuzzleService.getOne(this.state.jigsawId).then(puzzle => {
      if (typeof puzzle === "object") {
        this.setState({
          records: puzzle.records.filter(record => {
            return record.size == this.state.size;
          })
        });
        this.setState({ isLoading: false });
      } else {
        this.props.history.push("/login"); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return <CSSLoader />;
    }

    return (
      <main className="text-center">
        <Link to={`/jigsaws/${this.state.jigsawId}/${this.state.size}`}>
          Start Game
        </Link>
        <h1 className="h3 mb-4">Record List</h1>
        <ul className="list-unstyled w-50 m-auto">
          {this.state.records.length > 0
            ? this.state.records.map((record, index) => (
                <li key={index} className="border-rounded mx-auto my-3">
                  <Link to={`/userprofile/${record.creator.id}`}>
                    {record.creator.user_name}
                  </Link>{" "}
                  | {record.time} | {record.movements} | {record.created_at}
                </li>
              ))
            : "No records yet"}
        </ul>
      </main>
    );
  }
}
export default JigsawRecords;
