import React, { Component } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import CSSLoader from "../CSSLoader/CSSLoader";
import { get } from "../../services/MultilingualService";

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
            recordTime2: this.getBestRecordSize(2, userData.records),
            recordTime3: this.getBestRecordSize(3, userData.records),
            userName: userData.user_name
          }
        });
      } else {
        this.props.history.push("/login"); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
  }

  getBestRecordSize(size, records) {
    records = records.filter(record => {
      return record.size == size;
    });

    let bestRecord = get("none");
    records.forEach((record, index) => {
      if (index == 0) {
        bestRecord = parseFloat(record.time) + " s.";
        return;
      }
      if (record.time < bestRecord) {
        bestRecord = parseFloat(record.time) + " s.";
      }
    });

    return bestRecord;
  }

  onLogout = () => {
    this.props.onLogout();
    this.props.history.push("/login");
  };

  render() {
    if (this.state.isLoading) {
      return <CSSLoader />;
    }

    return (
      <main className="text-center">
        <div className="row align-items-center">
          <div className="col">
            <h1 className="h4 m-0">
              {this.props.myProfile
                ? get("my") + " " + get("profile")
                : this.state.userData.userName}
            </h1>
          </div>

          {this.props.myProfile ? (
            <div className="col">
              <button
                onClick={this.onLogout}
                className="btn btn-sm border-rounded col-sm-4"
              >
                {get("logOut")}
              </button>
            </div>
          ) : null}
        </div>

        <ul className="list-unstyled mt-5 row">
          <li className="col-6">
            <h2 className="h5">{get("played")}</h2>
            <p className="h4 profileNumbers">{this.state.userData.plays}</p>
          </li>
          <li className="col-6">
            <h2 className="h5 dots">{get("completed")}</h2>
            <p className="h4 profileNumbers">{this.state.userData.completed}</p>
          </li>
          <li className="col-6 bg-record py-4 px-0">
            <h2 className="h6">
              {get("record")} {get("size")} 2
            </h2>
            <p className="m-0 h6 profileNumbers">
              {this.state.userData.recordTime2}
            </p>
          </li>
          <li className="col-6 bg-record py-4 px-0">
            <h2 className="h6">
              {" "}
              {get("record")} {get("size")} 3
            </h2>
            <p className="m-0 h6 profileNumbers">
              {this.state.userData.recordTime3}
            </p>
          </li>
        </ul>
        {this.state.userData.plays > 0 ? (
          <>
            <h2 className="h5 mt-5 mb-0">{get("effectiveness")}</h2>
            <Chart
              width={"250px"}
              style={{ margin: "auto" }}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Puzzles", "Completed puzzles"],
                ["Win", this.state.userData.completed],
                ["Lost", this.state.userData.lost]
              ]}
              options={{
                pieHole: 0.4,
                legend: "none",
                pieStartAngle: 100
              }}
              rootProps={{ "data-testid": "3" }}
            />
          </>
        ) : null}

        <Link to={"/"} className="btn btn-icon btn-back mt-2"></Link>
      </main>
    );
  }
}
export default Profile;
