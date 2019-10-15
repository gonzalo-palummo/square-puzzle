import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Jigsaw from "./pages/Jigsaw/Jigsaw";
import JigsawSizes from "./pages/JigsawSizes/JigsawSizes";
import Play from "./pages/Play/Play";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Complete from "./pages/Complete/Complete";
import environment from "./environment/environment";
import AuthRoute from "./components/AuthRoute/AuthRoute";

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
    fetch(`${environment.apiUrl}/puzzles`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          puzzles: res.data,
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
        mail: null,
        usuario: null
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
            render={props => <Play puzzles={this.state.puzzles} {...props} onLogout={this.handleLogout} />}
          />
          <AuthRoute path="/profile/" component={Profile} />
          <AuthRoute
            path="/play/sizes/:jigsawId/"
            exact
            component={JigsawSizes}
          />
          <AuthRoute path="/play/sizes/:jigsawId/:size" component={Jigsaw} />
          <AuthRoute
            path="/play/complete/:time/:movements"
            exact
            component={Complete}
          />
          <Route path="/login" render={props => <Login onAuthenticated={this.handleAuthenticated} />} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
