import React, { Component } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
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
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
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
      </div>
    );
  }
}
export default Login;
