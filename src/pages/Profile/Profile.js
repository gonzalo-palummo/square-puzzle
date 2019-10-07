import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";

function Profile() {
  return (
    <div className="text-center">
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
          <p>12</p>
        </li>
        <li className="col-6">
          <h2 className="h6">Completed</h2>
          <p>3</p>
        </li>
        <li className="col-6">
          <h2 className="h6">Lost</h2>
          <p className="m-0">9</p>
        </li>
        <li className="col-6">
          <h2 className="h6">Record Time</h2>
          <p className="m-0">186.7</p>
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
          ["Completed Puzzles", 3],
          ["Lost Puzzles", 9]
        ]}
        options={{
          pieHole: 0.4,
          legend: "none",
          pieStartAngle: 100
        }}
        rootProps={{ "data-testid": "3" }}
      />
    </div>
  );
}
export default Profile;
