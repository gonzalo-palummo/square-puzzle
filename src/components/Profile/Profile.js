import React, { Component } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import CSSLoader from "./../../components/CSSLoader/CSSLoader";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        plays: null,
        completed: null,
        lost: null,
        recordTime: null,
        userName: null
      },
      isLoading: true
    };
  }

  componentDidMount() {
    let userId = this.props.myProfile
      ? AuthService.getUserData().id
      : this.props.match.params.userId;
    UserService.getOne(userId).then(userData => {
      if (typeof userData === "object") {
        this.setState({
          isLoading: false,
          userData: {
            plays: userData.plays,
            completed: userData.records.length,
            lost: userData.plays - userData.records.length,
            recordTime: userData.records.length
              ? this.getBestRecord(userData.records)
              : "None",
            userName: userData.user_name
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
          <div className="col">
            <h1 className="h4 shadow-none font-weight-bold text-dark">
              {this.props.myProfile
                ? "My Profile"
                : this.state.userData.userName}
            </h1>
          </div>

          {this.props.myProfile ? (
            <div className="col">
              <Link to="/login" className="btn btn-sm border-rounded col-sm-4">
                Log out
              </Link>
            </div>
          ) : null}
        </div>

        <ul className="list-unstyled mt-4 row">
          <li className="col-6">
            <h2 className="h3">Played</h2>
            <p className="h3">{this.state.userData.plays}</p>
          </li>
          <li className="col-6">
            <h2 className="h3">Completed</h2>
            <p className="h3">{this.state.userData.completed}</p>
          </li>
          <li className="col-6">
            <h2 className="h3">Lost</h2>
            <p className="m-0 h3">{this.state.userData.lost}</p>
          </li>
          <li className="col-6">
            <h2 className="h3">Record Time</h2>
            <p className="m-0 h3">{this.state.userData.recordTime} s.</p>
          </li>
        </ul>
        <h2 className="h3 mt-4 mb-0">Effectiveness</h2>
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
        <Link to={"/"} className="btn btn-icon btn-back mt-2"></Link>
      </main>
    );
  }
}
export default Profile;
