import React, { Component } from "react";
import "./RecordsTable.css";
import CSSLoader from "../CSSLoader/CSSLoader";
import { Link } from "react-router-dom";
import RecordService from "../../services/RecordService";

class RecordsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      jigsawId: props.jigsawId,
      size: props.size,
      isLoading: true
    };
  }

  componentDidMount() {
    RecordService.get(this.state.jigsawId, this.state.size).then(records => {
      if (typeof records === "object") {
        this.setState({
          records: records,
          isLoading: false
        })
      }
      else {
        //this.props.history.push("/login"); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return <CSSLoader />;
    }

    return (
      <div className="container-table">
        <img width="80" src={require("./../../images/logo.png")} alt="logo" />
        <table className="table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Time</th>
              <th>Movements</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.length > 0
              ? this.state.records.map((record, index) =>
                index < 5 ? (
                  <tr key={index} className="border-rounded mx-auto my-3">
                    <td>
                      <Link to={`/userprofile/${record.creator.id}`} className="h5">
                        <span className="badge badge-pill badge-primary">{record.creator.user_name}</span>
                      </Link>
                    </td>
                    <td>{record.time}</td>
                    <td>{record.movements}</td>
                  </tr>
                ) : null
              )
              : null}
          </tbody>
        </table>
        {this.state.records.length == 0 ? <p>No records yet</p> : null}
      </div>
    );
  }
}

export default RecordsTable;
