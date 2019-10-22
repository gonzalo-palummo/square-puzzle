import React, { Component } from "react";
import "./App.css";
import "./styles/buttons.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Jigsaw from "./pages/Jigsaw/Jigsaw";
import JigsawSizes from "./pages/JigsawSizes/JigsawSizes";
import Jigsaws from "./pages/Jigsaws/Jigsaws";
import Profile from "./components/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Complete from "./pages/Complete/Complete";
import environment from "./environment/environment";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import JigsawStart from "./pages/JigsawStart/JigsawStart";
import Home from "./pages/Home/Home";

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
    return (
      <BrowserRouter>
        <div className="app container">
          <AuthRoute
            path="/jigsaws"
            exact
            render={props => (
              <Jigsaws
                puzzles={this.state.puzzles}
                {...props}
                onLogout={this.handleLogout}
              />
            )}
          />
          <AuthRoute
            path="/myprofile/"
            exact
            render={props => <Profile myProfile={true} {...props} />}
          />
          <AuthRoute
            path="/userprofile/:userId"
            exact
            render={props => <Profile myProfile={false} {...props} />}
          />
          <AuthRoute path="/jigsaws/:jigsawId" exact component={JigsawSizes} />
          <AuthRoute path="/jigsaws/:jigsawId/:size" exact component={Jigsaw} />
          <AuthRoute
            path="/jigsaws/:jigsawId/:size/complete/:time/:movements"
            exact
            component={Complete}
          />
          <AuthRoute
            path="/jigsaws/:jigsawId/:size/start"
            exact
            component={JigsawStart}
          />
          <AuthRoute path="/" exact component={Home} />
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
