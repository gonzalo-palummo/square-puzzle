import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Jigsaw from "./pages/Jigsaw/Jigsaw";
import JigsawSizes from "./pages/JigsawSizes/JigsawSizes";
import Jigsaws from "./pages/Jigsaws/Jigsaws";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Complete from "./pages/Complete/Complete";
import environment from "./environment/environment";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import JigsawRecords from "./pages/JigsawRecords/JigsawRecords";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzles: [],
      isLoading: true,
      userData: {
        id: null,
        email: null,
        user_name: null
      }
    };

    this.handleAuthenticated = this.handleAuthenticated.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    fetch(`${environment.apiUrl}/puzzles`, {
      method: "get",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
      } /*,
      credentials: "include" */ // TODO: CHECK THIS
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          puzzles: res,
          isLoading: false
        });
      }); // TODO: PUT IN A SERVICE
  }

  handleAuthenticated(user) {
    this.setState({
      userData: user
    });
  }

  handleLogout(user) {
    this.setState({
      userData: {
        id: null,
        email: null,
        user_name: null
      }
    });
  }

  render() {
    let navbar = <Navbar />;
    return (
      <BrowserRouter>
        <div className="app container">
          {navbar}

          <AuthRoute
            path="/"
            exact
            render={props => (
              <Jigsaws
                puzzles={this.state.puzzles}
                {...props}
                onLogout={this.handleLogout}
              />
            )}
          />
          <AuthRoute path="/profile/" component={Profile} />
          <AuthRoute path="/jigsaws/:jigsawId/" exact component={JigsawSizes} />
          <AuthRoute path="/jigsaws/:jigsawId/:size" component={Jigsaw} />
          <AuthRoute
            path="/jigsaws/complete/:time/:movements"
            exact
            component={Complete}
          />
          <AuthRoute
            path="/jigsaws/:jigsawId/:size/records"
            exact
            component={JigsawRecords}
          />
          <Route
            path="/login"
            render={props => (
              <Login onAuthenticated={this.handleAuthenticated} />
            )}
          />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
