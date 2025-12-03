import { mainProjects, miniProjects } from "../utils/projects";
import "./Projects.css";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTransitionNav } from "../utils/NavigationProvider";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function Projects() {
  const location = useLocation();
  const isMini = location.pathname.includes("mini-projects");
  const projects = isMini ? miniProjects : mainProjects;
  const [isAnimating, setIsAnimating] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);
  const [fullscreenStyle, setFullscreenStyle] = useState<any>({});
  
  const transitionProjectIndex = location.state?.transitionProject;
  const transitionProject = typeof transitionProjectIndex === "string" 
    ? projects[parseInt(transitionProjectIndex)]
    : undefined;
  
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const projectCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const { navigate, finishTransition } = useTransitionNav();

  useEffect(() => {
    finishTransition();
  }, [finishTransition]);

  useEffect(() => {
    if (transitionProject && !isMini) {
      setIsAnimating(true);
      setHideOverlay(false);
      setFullscreenStyle({});
      
      setTimeout(() => {
        const index = parseInt(transitionProjectIndex);
        const card = projectCardRefs.current[index];
        if (card && fullscreenRef.current) {
          const cardRect = card.getBoundingClientRect();
          const scrollY = window.scrollY;
          const scrollX = window.scrollX;
          
          setFullscreenStyle({
            position: "absolute",
            top: cardRect.top + scrollY + "px",
            left: cardRect.left + scrollX + "px",
            width: cardRect.width + "px",
            height: cardRect.height + "px",
            transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
            zIndex: 10,
            backgroundColor: "#201c1c",
            filter: "blur(1px)",
          });
          
          setTimeout(() => {
            setHideOverlay(true);
            setIsAnimating(false);
          }, 600);
        }
      }, 50);
    }
  }, [transitionProject, isMini, transitionProjectIndex]);

  return (
    <div className="projects-container">
      <Helmet>
        <title>{isMini ? "Mini " : ""}Projects - Perseus Pfohl</title>
        <meta name="description" content="Explore Perseus Pfohl's various projects" />
      </Helmet>
      
      <button 
        className="link-btn back-button-fixed"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>
      
      {transitionProject && !hideOverlay && (
        <div className="project-fs" ref={fullscreenRef} style={fullscreenStyle}>
          <img
            src={"/" + transitionProject.images[0]}
            alt={transitionProject.name}
            className="project-fs-img"
          />
          <div className="project-info">
            <h2>{transitionProject.name}</h2>
            <p>{transitionProject.short}</p>
          </div>
        </div>
      )}
      
      <div className="projects-header">
        <h1>{isMini ? "Mini" : "My"} Projects</h1>
        <h2>Click on any project to learn more</h2>
      </div>
      
      <div className="projects-content">
        {projects.map((project, index) => (
          <div
            className="project-card"
            key={project.id}
            ref={el => { projectCardRefs.current[index] = el; }}
            style={
              transitionProject && isAnimating && !hideOverlay && 
              index === parseInt(transitionProjectIndex)
                ? { visibility: "hidden" }
                : undefined
            }
            onClick={() => navigate(`/${isMini ? "mini-projects" : "projects"}/${project.id}`)}
          >
            <img
              src={"/" + project.images[0]}
              alt={project.name}
              className="project-image"
            />
            <div className="project-info">
              <h2>{project.name}</h2>
              <p>{project.short}</p>
            </div>
          </div>
        ))}

        <div
          className="project-card"
          onClick={() => navigate(`/${isMini ? "projects" : "mini-projects"}`)}
        >
          <div className="mini-projects">
            <h1>{isMini ? "Main" : "Mini"} Projects</h1>
            <h2>
              {isMini
                ? "See larger, high effort projects with greater polish"
                : "See small, fun, or unfinished projects"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}