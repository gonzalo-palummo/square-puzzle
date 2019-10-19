import React, { Component } from "react";
import "./MyProfile.css";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";
import environment from "../../environment/environment";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        plays: null,
        completed: null,
        lost: null,
        recordTime: null
      },
      isLoading: true
    };
  }

  componentDidMount() {
    UserService.getOne(AuthService.getUserData().id).then(userData => {
      if (typeof userData === "object") {
        this.setState({
          isLoading: false,
          userData: {
            plays: userData.plays,
            completed: userData.records.length,
            lost: userData.plays - userData.records.length,
            recordTime: userData.records.length
              ? this.getBestRecord(userData.records)
              : "None"
          }
        });
      } else {
        this.props.history.push("/login"); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
  }

  getBestRecord(records) {
    let bestRecord;
    records.forEach((record, index) => {
      if (index == 0) {
        bestRecord = parseFloat(record.time);
        return;
      }
      if (record.time < bestRecord) {
        bestRecord = parseFloat(record.time);
      }
    });
    return bestRecord;
  }

  render() {
    if (this.state.isLoading) {
      return <CSSLoader />;
    }

    return (
      <main className="text-center">
        <div className="row">
          <div className="col-7">
            <h1 className="h4">Profile</h1>
          </div>
          <div className="col-5">
            <Link
              to="/login"
              className="btn btn-sm btn-primary border-rounded col-sm-4"
            >
              Log out
            </Link>
          </div>
        </div>

        <ul className="list-unstyled mt-4 row">
          <li className="col-6">
            <h2 className="h6">Played</h2>
            <p>{this.state.userData.plays}</p>
          </li>
          <li className="col-6">
            <h2 className="h6">Completed</h2>
            <p>{this.state.userData.completed}</p>
          </li>
          <li className="col-6">
            <h2 className="h6">Lost</h2>
            <p className="m-0">{this.state.userData.lost}</p>
          </li>
          <li className="col-6">
            <h2 className="h6">Record Time</h2>
            <p className="m-0">{this.state.userData.recordTime}</p>
          </li>
        </ul>
        <h2 className="h5 mt-4 mb-0">Effectiveness</h2>
        <Chart
          width={"250px"}
          style={{ margin: "auto" }}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Task", "Hours per Day"],
            ["Completed Puzzles", this.state.userData.completed],
            ["Lost Puzzles", this.state.userData.lost]
          ]}
          options={{
            pieHole: 0.4,
            legend: "none",
            pieStartAngle: 100
          }}
          rootProps={{ "data-testid": "3" }}
        />
      </main>
    );
  }
}
export default MyProfile;
