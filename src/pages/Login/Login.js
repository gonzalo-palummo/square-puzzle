import React, { Component } from "react";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import AuthService from "./../../services/AuthService";
import CSSLoader from "../../components/CSSLoader/CSSLoader";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import { get } from "../../services/MultilingualService";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: "",
        password: ""
      },
      message: {
        header: null,
        text: null,
        type: null
      },
      success: false,
      errors: {},
      isLoading: false
    };
  }
  handleChange = ev => {
    const elem = ev.target;
    this.setState({
      formData: { ...this.state.formData, [elem.name]: elem.value }
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({ isLoading: true });
    AuthService.login({
      email: this.state.formData.email,
      password: this.state.formData.password
    }).then(userData => {
      this.setState({ isLoading: false });
      if (typeof userData === "object") {
        this.setState({
          success: true
        });
        this.props.onAuthenticated(userData);
      } else {
        this.setState({
          message: {
            header: "Oops!",
            text: get("invalidCredentials") + ".",
            type: "error"
          }
        });
      }
    });
  };

  handleRequestClose = () => {
    this.setState({
      message: {
        header: null,
        text: null,
        type: null
      }
    });
  };

  render() {
    if (this.state.success) {
      return <Redirect to="/" />;
    }

    if (this.state.isLoading) {
      return <CSSLoader />;
    }

    const message = this.state.message;
    let modal = "";
    if (message.text !== null) {
      modal = (
        <ModalDialog
          isOpen={true}
          onRequestClose={this.handleRequestClose}
          title={this.state.message.header}
          message={this.state.message.text}
        ></ModalDialog>
      );
    }
    return (
      <main>
        {modal}
        <h1 className="h2 text-center">{get("login")}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <div className="btn btn-icon btn-email"></div>
              {get("email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={this.state.formData.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <div className="btn btn-icon btn-password"></div>
              {get("password")}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="form-control"
              value={this.state.formData.password}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-block my-2 border-rounded w-75 mx-auto"
          >
            {get("login")}
          </button>
        </form>
        <Link
          to="/register"
          className="btn btn-secondary my-2 w-75 btn-block border-rounded mx-auto"
        >
          {get("goRegister")}
        </Link>
      </main>
    );
  }
}
export default Login;
