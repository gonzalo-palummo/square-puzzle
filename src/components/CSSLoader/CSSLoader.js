import React from "react";
import "./CSSLoader.css";
import { get } from "../../services/MultilingualService";

function CSSLoader(props) {
  return (
    <>
      <div className="container-loader"></div>
      <img
        className="loader"
        src={require("../../images/logo.png")}
        alt={get("logo")}
      />
    </>
  );
}

export default CSSLoader;
