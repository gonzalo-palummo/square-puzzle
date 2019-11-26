import React from "react";
import "./Advert.css";
import { get } from "../../services/MultilingualService";

function Advert(props) {
  return (
    <>
      <p className="advertTime">{props.counter}</p>
      <img
        src={require("./../../images/advice.jpg")}
        className="advert"
        alt={get("advert")}
      />
    </>
  );
}

export default Advert;
