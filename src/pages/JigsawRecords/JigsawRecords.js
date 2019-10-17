import React, { Component } from "react";
import "./JigsawRecords.css";
import { Link } from "react-router-dom";
import PuzzleService from "../../services/PuzzleService";

class JigsawRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null,
      jigsawId: props.match.params.jigsawId,
      size: props.match.params.size,
      loading: true
    };
  }

  componentDidMount() {
    PuzzleService.getOne(this.state.jigsawId).then(puzzle => {
      if (typeof puzzle === "object") {
        this.setState({
          records: puzzle.records.filter(
            record => record.size === this.state.size
          )
        });
      } else {
        this.props.history.push("/login"); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
  }

  render() {
    return (
      <main className="text-center">
        <h1 className="h3 mb-4">Record List</h1>
        <ul className="list-unstyled w-50 m-auto">
          {this.state.records.map((record, index) => (
            <li key={index} className="border-rounded mx-auto my-3">
              <Link
                to={`/profiles/${record.created_by.id}`}
                className="text-white font-weight-light h1"
              >
                {record.created_by.user_name}
              </Link>{" "}
              | {record.time} | {record.movements} | {record.created_at}
            </li>
          ))}
        </ul>
      </main>
    );
  }
}
export default JigsawRecords;
