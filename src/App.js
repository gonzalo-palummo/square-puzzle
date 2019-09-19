import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Jigsaw from "./components/Jigsaw/Jigsaw";
import JigsawSizes from "./components/JigsawSizes/JigsawSizes";
import Play from "./pages/Play";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path="/play" exact component={Play} />
        <Route path="/profile/" component={Profile} />
        <Route path="/play/sizes/:jigsawId/" exact component={JigsawSizes} />
        <Route path="/play/sizes/:jigsawId/:size" component={Jigsaw} />
      </Router>
    </div>
  );
}

export default App;
