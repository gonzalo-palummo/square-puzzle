import React from "react";
import "./CSSLoader.css";

function CSSLoader(props) {
  return (
    <>
      <div className="container-loader"></div>
      <img className="loader" src={require("../../images/logo.png")} />
    </>
  );
}

export default CSSLoader;
