import React, { Component } from "react";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import NotificationBox from "./../../components/NotificationBox/NotificationBox";
import AuthService from "./../../services/AuthService";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: {
        header: null,
        text: null,
        type: null
      },
      success: false,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(ev) {
    const elem = ev.target;
    this.setState({
      ...this.state,
      [elem.name]: elem.value
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    AuthService.login({
      email: this.state.email,
      password: this.state.password
    }).then(userData => {
      if (typeof userData === "object") {
        this.setState({
          success: true
        });
        this.props.onAuthenticated(userData);
      } else {
        this.setState({
          message: {
            header: "Error",
            text: "The credentials are invalid.",
            type: "error"
          }
        });
      }
    });
  }
  render() {
    if (this.state.success) {
      return <Redirect to="/" />;
    }

    const message = this.state.message;
    let notif = "";
    if (message.text !== null) {
      notif = (
        <NotificationBox
          type={message.type}
          header={message.header}
          text={message.text}
        />
      );
    }
    return (
      <main>
        {notif}
        <h1 className="h4">Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control border-rounded"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control border-rounded"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block my-2 border-rounded"
          >
            Login
          </button>
        </form>
        <Link
          to="/register"
          className="btn btn-secondary btn-block my-2 border-rounded"
        >
          Go to Register
        </Link>
      </main>
    );
  }
}
export default Login;
