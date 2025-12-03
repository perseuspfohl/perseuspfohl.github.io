import "./Home.css";
import Typewriter from "../components/Typewriter";
import languages from "../utils/languages";
import { useTransitionNav } from "../utils/NavigationProvider";
import { useEffect } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function Home() {
  const { navigate, finishTransition } = useTransitionNav();

  useEffect(() => {
    finishTransition();
  }, [finishTransition]);

  return (
    <>
      <Helmet>
        <title>Home - Perseus Pfohl</title>
        <meta
          name="description"
          content="Perseus Pfohl - Software Developer and Technology Enthusiast"
        />
        <meta property="og:url" content="https://perseus.dev" />
        <meta property="og:title" content="Home - Perseus Pfohl" />
        <meta
          property="og:description"
          content="Perseus Pfohl - Software Developer and Technology Enthusiast"
        />
      </Helmet>
      <h1 className="logo">perseus.dev</h1>
      <Typewriter options={languages} />
      <div className="home-button-container">
        <button onClick={() => navigate("/about")} className="link-btn">
          About
        </button>
        <button onClick={() => navigate("/projects")} className="link-btn">
          My Projects
        </button>
        <button onClick={() => navigate("/contact")} className="link-btn">
          Connect
        </button>
        <a
          href="https://github.com/perseuspfohl"
          target="_blank"
          className="link-btn"
        >
          GitHub
        </a>
      </div>
    </>
  );
}