import { mainProjects } from "../utils/projects";
import "./SlideshowBg.css";
import Slideshow from "../components/Slideshow";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { NavigationProvider } from "../utils/NavigationProvider";

export default function SlideshowBg({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLSpanElement | null>;
}) {
  const [curSlide, setCurSlide] = useState<number>(0);

  const customSlides = mainProjects.map((p) => {
    let filter = "blur(4px) brightness(0.94) grayscale(0.45)";
    
    const darkerProjects = ["subnetting-pizza"];
    
    if (darkerProjects.includes(p.id)) {
      filter = "blur(4px) brightness(0.7) grayscale(0.3)";
    }
    
    return {
      name: p.name,
      desc: p.short,
      image: "/" + p.images[0],
      link: "/projects/" + p.id,
      filter: filter
    };
  });

  return (
    <div className="slideshow-bg-container">
      <div className="slideshow-bg-slide-container">
        <Slideshow
          setCurSlide={setCurSlide}
          slides={customSlides}
          isBackground
          autoSwitchTime={8000}
        />
      </div>
      <span className="slideshow-bg-content-container" ref={containerRef}>
        <NavigationProvider
          containerRef={containerRef}
          state={{ transitionProject: curSlide.toString() }}
        >
          <Outlet />
        </NavigationProvider>
      </span>
    </div>
  );
}