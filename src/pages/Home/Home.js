import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Cards from "../../components/Cards/Cards";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import { get, setLanguage } from "../../services/MultilingualService";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showSettings: false
    };
  }

  handleClickSettings = () => {
    this.setState({
      showSettings: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      showSettings: false
    });
  };

  render() {
    return (
      <main className="text-center">
        <ModalDialog
          isOpen={this.state.showSettings}
          onRequestClose={this.handleRequestClose}
          title={get("settings")}
          message={
            <div className="text-center">
              <h2 className="h5 text-black shadow-none">{get("language")}</h2>
              <button
                className="btn btn-xs m-2"
                onClick={() => {
                  setLanguage("en");
                  this.setState({ showSettings: false });
                }}
              >
                {get("english")}
              </button>
              <button
                className="btn btn-xs m-2"
                onClick={() => {
                  setLanguage("es");
                  this.setState({ showSettings: false });
                }}
              >
                {get("spanish")}
              </button>
            </div>
          }
        ></ModalDialog>
        <Link
          to={"/myprofile"}
          className="btn btn-icon btn-user mb-5 mx-3"
        ></Link>
        <button
          to={"/settings"}
          className="btn btn-icon btn-settings mb-5 mx-3"
          onClick={this.handleClickSettings}
        ></button>
        <img
          src={require("../../images/logofull.png")}
          alt={get("logo")}
          width={150}
          className="d-block mx-auto"
        />
        <Link to={`/jigsaws`} className="btn vibrate-2 mt-5 w-75">
          {get("select")} {get("puzzle")}
        </Link>
        <Link to={`/create`} className="btn btn-secondary mt-2 w-75">
          {get("create")} {get("one")} !
        </Link>
      </main>
    );
  }
}
export default Home;
