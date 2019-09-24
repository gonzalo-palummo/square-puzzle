import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div>
      <h1 className="h4">Profile</h1>
      <Link to="/login" className="btn btn-primary border-rounded">
        Log out
      </Link>
    </div>
  );
}
export default Profile;
