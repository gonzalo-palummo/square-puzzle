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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzles: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(`${environment.apiUrl}/puzzles`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          puzzles: res.data,
          isLoading: false
        });
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app container">
          <Navbar />
          <Route
            path="/"
            exact
            render={() => <Play puzzles={this.state.puzzles} />}
          />
          <Route path="/profile/" component={Profile} />
          <Route path="/play/sizes/:jigsawId/" exact component={JigsawSizes} />
          <Route path="/play/sizes/:jigsawId/:size" component={Jigsaw} />
          <Route
            path="/play/complete/:time/:movements"
            exact
            component={Complete}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
