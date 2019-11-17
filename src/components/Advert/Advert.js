import React from "react";
import "./Advert.css";

function Advert(props) {
  return (
    <>
      <p className="advertTime">{props.counter}</p>
      <img
        src={require("./../../images/advice.jpg")}
        className="advert"
        alt="advert"
      />
    </>
  );
}

export default Advert;
