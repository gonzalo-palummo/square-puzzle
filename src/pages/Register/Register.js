import React, { Component } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      email: "",
      password: "",
      confirm_password: ""
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
    this.props.history.push("/login");
  }
  render() {
    return (
      <main>
        <h1 className="h4">Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="user_name">User Name</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="form-control border-rounded"
              value={this.state.user_name}
              onChange={this.handleChange}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              className="form-control border-rounded"
              value={this.state.confirm_password}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block my-2 border-rounded"
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
