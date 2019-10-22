import React, { Component } from "react";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import NotificationBox from "./../../components/NotificationBox/NotificationBox";
import AuthService from "./../../services/AuthService";
import CSSLoader from "./../../components/CSSLoader/CSSLoader";

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(ev) {
    const elem = ev.target;
    this.setState({
      formData: { ...this.state.formData, [elem.name]: elem.value }
    });
  }

  handleSubmit(ev) {
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

    if (this.state.isLoading) {
      return <CSSLoader />;
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
              value={this.state.formData.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="form-control border-rounded"
              value={this.state.formData.password}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-block my-2 border-rounded"
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
