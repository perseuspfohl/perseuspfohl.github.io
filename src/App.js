import React, { useState } from "react";
import Intro from "./components/Intro";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import SideNavBar from "./components/SideNavBar";
import Project from "./components/Project";
import Contact from "./components/Contact";
import { StarsCanvas } from "./components/StarBackground";
import "./App.css";
import "./styles/Global.css";

function App() {
  const [showStars, setShowStars] = useState(true);
  
  return (
    <div className="App">
      {showStars && <StarsCanvas />}
      <>
        <NavBar showStars={showStars} setShowStars={setShowStars} />
        <SideNavBar showStars={showStars} setShowStars={setShowStars} />
      </>
      
      <div id="content">
        <Intro />
        <About />
        <Project/>
        <TechStack />
        <Contact />
        <Credits />
      </div>
    </div>
  );
}

export default App;