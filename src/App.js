import React from "react";
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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={Play} />
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

export default App;
