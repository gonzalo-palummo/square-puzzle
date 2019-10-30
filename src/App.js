import React, { Component } from "react";
import "./App.css";
import "./styles/buttons.css";
import "./styles/forms.css";
import { BrowserRouter, Route } from "react-router-dom";
import Jigsaw from "./pages/Jigsaw/Jigsaw";
import JigsawSizes from "./pages/JigsawSizes/JigsawSizes";
import Jigsaws from "./pages/Jigsaws/Jigsaws";
import Profile from "./components/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Complete from "./pages/Complete/Complete";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import JigsawStart from "./pages/JigsawStart/JigsawStart";
import Home from "./pages/Home/Home";
import JigsawCreate from "./pages/JigsawCreate/JigsawCreate";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        id: null,
        email: null,
        user_name: null
      }
    };

    this.handleAuthenticated = this.handleAuthenticated.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {}

  handleAuthenticated(user) {
    this.setState({
      userData: user
    });
  }

  handleLogout() {
    localStorage.clear();
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
            render={props => <Jigsaws {...props} />}
          />
          <AuthRoute
            path="/myprofile/"
            exact
            render={props => (
              <Profile
                myProfile={true}
                onLogout={this.handleLogout}
                {...props}
              />
            )}
          />
          <AuthRoute
            path="/userprofile/:userId"
            exact
            render={props => <Profile myProfile={false} {...props} />}
          />
          <AuthRoute path="/create" exact component={JigsawCreate} />
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
              <Login onAuthenticated={this.handleAuthenticated} {...props} />
            )}
          />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
