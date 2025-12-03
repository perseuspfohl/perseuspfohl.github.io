import { useEffect } from "react";
import TechIcon from "../components/TechIcon";
import { useTransitionNav } from "../utils/NavigationProvider";
import "./About.css";
import { Helmet } from "@dr.pogodin/react-helmet";

const technologies = [
  "TypeScript",
  "C++",
  "Python", 
  "Java",
  "React",
  "CSS3",
  "HTML5",
  "Docker",
  "PyTorch",
  "Git",
  "GitHub",
  "Linux",
];

export default function About() {
  const { navigate, finishTransition } = useTransitionNav();

  useEffect(() => {
    finishTransition();
  }, [finishTransition]);

  return (
    <div className="about-container">
      <Helmet>
        <title>About - Perseus Pfohl</title>
        <meta
          name="description"
          content="Learn more about Perseus Pfohl, his background, and skills."
        />
      </Helmet>
      
      <button 
        className="link-btn back-button-fixed"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>
      
      <div className="about-content">
        <div className="about-header">
          <h2>About Me</h2>
          <h1>Hi, I'm Perseus.</h1>
          <p>
            I'm a passionate software developer who loves building innovative solutions 
            and exploring the intersection of technology and creativity.
          </p>
          <ul className="about-list">
            <li>
              I specialize in full-stack development with a focus on scalable 
              architectures and user-centric design
            </li>
            <li>
              I enjoy working on projects that combine technical challenges with 
              meaningful impact
            </li>
            <li>I'm constantly learning and experimenting with emerging technologies</li>
          </ul>
        </div>
        <div className="technologies">
          {technologies.map((tech) => (
            <div key={tech} className="tech-item">
              <p>{tech}</p>
              <TechIcon tech={tech} size={36} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}