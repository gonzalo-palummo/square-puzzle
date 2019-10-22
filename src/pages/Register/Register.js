import React, { Component } from "react";
import "./Register.css";
import { Link, Redirect } from "react-router-dom";
import UserService from "../../services/UserService";
import NotificationBox from "./../../components/NotificationBox/NotificationBox";
import CSSLoader from "./../../components/CSSLoader/CSSLoader";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        user_name: "",
        email: "",
        password: "",
        confirm_password: ""
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
    this.setState({
      isLoading: true
    });
    UserService.register({
      user_name: this.state.formData.user_name,
      email: this.state.formData.email,
      password: this.state.formData.password,
      plays: 0
    }).then(success => {
      if (success) {
        this.setState({
          success: true
        });
      } else {
        this.setState({
          message: {
            header: "Error",
            text: "An error was ocurred. Try again",
            type: "error"
          },
          isLoading: false
        });
      }
    });
  };
  render() {
    if (this.state.success) {
      return <Redirect to="/login" />;
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
        <h1 className="h4">Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="user_name">User Name</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="form-control border-rounded"
              value={this.state.formData.user_name}
              onChange={this.handleChange}
              required
            />
          </div>
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
              className="form-control border-rounded"
              value={this.state.formData.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              className="form-control border-rounded"
              value={this.state.formData.confirm_password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-block my-2 border-rounded"
          >
            Register
          </button>
          <Link
            to="/login"
            className="btn btn-secondary btn-block my-2 border-rounded text-white"
          >
            Go to Login
          </Link>
        </form>
      </main>
    );
  }
}

export default Register;
