import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub } from "react-icons/si";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import "../styles/Project.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Modern Robotics Projects",
    description: "A collection of robotics projects including robot simulation, control systems, path planning algorithms, and computer vision applications. Features implementations of fundamental robotics concepts using Python and ROS.",
    image: "/assets/projects/robotics-screenshot.png",
    githubUrl: "https://github.com/perseuspfohl/Modern-Robotics-Projects",
    liveUrl: null,
    date: "12/28/2025",
    tags: ["Robotics", "Python", "ROS", "Simulation", "Control Systems", "Computer Vision"]
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "My personal portfolio website built with React, featuring smooth animations and interactive elements to showcase my projects and skills. Uses GSAP for animations and modern CSS for responsive design.",
    image: "/assets/projects/portfolio-screenshot.png",
    githubUrl: "https://github.com/perseuspfohl/perseuspfohl.github.io",
    liveUrl: "https://perseuspfohl.github.io",
    date: "12/30/2025",
    tags: ["React", "JavaScript", "CSS3", "GSAP", "HTML5", "GitHub Pages"]
  }
];

const Projects = () => { // Changed from Project to Projects
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const slideshowRef = useRef(null);
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);
  const slideTextRefs = useRef([]);
  const titleRef = useRef(null);
  const controlsRef = useRef(null);

  // Initialize refs
  useEffect(() => {
    slidesRef.current = slidesRef.current.slice(0, projects.length);
    dotsRef.current = dotsRef.current.slice(0, projects.length);
    slideTextRefs.current = slideTextRefs.current.slice(0, projects.length);
  }, []);

  // Main animation setup with ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current;
    
    // Simple section entrance animation
    const sectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    sectionTl
      .fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
      .fromTo(
        slideshowRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      );
    
    // Initial slide setup - standard positioning
    gsap.set(slidesRef.current, { 
      opacity: 0,
      x: "100%"
    });
    
    gsap.set(slidesRef.current[0], { 
      opacity: 1,
      x: "0%"
    });

    // Set active indicator
    gsap.set(dotsRef.current[0], { 
      backgroundColor: "var(--green-bright)",
      width: 20,
      borderRadius: '4px'
    });

    // Animate first slide content - simple fade in
    const firstSlideText = slideTextRefs.current[0];
    if (firstSlideText) {
      const firstSlideElements = [
        firstSlideText.querySelector('.article-date'),
        firstSlideText.querySelector('.article-title'),
        firstSlideText.querySelector('.article-description'),
        firstSlideText.querySelector('.article-links')
      ].filter(Boolean);
      
      gsap.fromTo(
        firstSlideElements,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power1.out",
          delay: 0.2
        }
      );
    }

    // Clean up ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!slideshowRef.current) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isSwiping = true;
    };
    
    const handleTouchMove = (e) => {
      if (!isSwiping) return;
      e.preventDefault(); // Prevent page scrolling while swiping
    };
    
    const handleTouchEnd = (e) => {
      if (!isSwiping) return;
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      isSwiping = false;
    };
    
    const handleSwipe = () => {
      if (isAnimating) return;
      
      const swipeThreshold = 50; // Minimum distance for a swipe
      
      if (touchEndX < touchStartX - swipeThreshold) {
        goToNextSlide();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        goToPrevSlide();
      }
    };
    
    const container = slideshowRef.current;
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAnimating]);

  const changeSlide = (newIndex) => {
    if (isAnimating || newIndex === currentSlide) return;
    setIsAnimating(true);

    const direction = newIndex > currentSlide ? 1 : -1;
    const outgoing = slidesRef.current[currentSlide];
    const incoming = slidesRef.current[newIndex];
    const outgoingText = slideTextRefs.current[currentSlide];
    const incomingText = slideTextRefs.current[newIndex];

    // Update indicators
    gsap.to(dotsRef.current[currentSlide], { 
      backgroundColor: "var(--lightest-slate)",
      width: 8,
      borderRadius: "50%",
      duration: 0.3,
      ease: "power1.inOut"
    });
    
    gsap.to(dotsRef.current[newIndex], { 
      backgroundColor: "var(--green-bright)",
      width: 20,
      borderRadius: '4px',
      duration: 0.3,
      ease: "power1.inOut"
    });

    // Standard transition timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(newIndex);
        setIsAnimating(false);
        
        // Reset position of the outgoing slide
        gsap.set(outgoing, { 
          x: direction > 0 ? "-100%" : "100%"
        });
      }
    });

    // Fade out current text content
    if (outgoingText && outgoingText.children) {
      tl.to(Array.from(outgoingText.children), { 
        opacity: 0, 
        y: -10, 
        duration: 0.4, 
        stagger: 0.05,
        ease: "power1.in"
      }, 0);
    }

    // Standard slide transition
    tl.to(outgoing, { 
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      duration: 0.8,
      ease: "power1.inOut"
    }, 0);

    // Prepare incoming slide
    gsap.set(incoming, { 
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    });

    // Bring in new slide
    tl.to(incoming, { 
      x: "0%",
      opacity: 1,
      duration: 0.8, 
      ease: "power1.out"
    }, 0.1);

    // Bring in new text
    if (incomingText && incomingText.children) {
      const incomingElements = Array.from(incomingText.children);
      
      tl.fromTo(
        incomingElements,
        { 
          opacity: 0, 
          y: 10 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.08, 
          ease: "power1.out" 
        }, 
        0.4
      );
    }
  };

  const goToNextSlide = () => {
    const newIndex = (currentSlide + 1) % projects.length;
    changeSlide(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = (currentSlide - 1 + projects.length) % projects.length;
    changeSlide(newIndex);
  };

  return (
    <section ref={sectionRef} className="blog-slideshow-section" id="projects"> {/* Added id="projects" */}
      <h2 ref={titleRef} className="blog-section-title">Projects</h2>
      
      <div ref={slideshowRef} className="blog-slideshow-container">
        {/* Slides */}
        {projects.map((project, index) => (
          <div 
            key={project.id}
            ref={el => slidesRef.current[index] = el}
            className={`blog-slide ${index === currentSlide ? 'active' : index < currentSlide ? 'prev' : ''}`}
            style={{ backgroundImage: `url(${project.image})` }}
          >
            <div className="slide-overlay">
            </div>
            <div 
              ref={el => slideTextRefs.current[index] = el}
              className="slide-content"
            >
              <span className="article-date">{project.date}</span>
              <h3 className="article-title">{project.title}</h3>
              <p className="article-description">{project.description}</p>
              
              {/* Add tags */}
              {project.tags && (
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="article-links">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="github-link btn-effect"
              >
                <SiGithub /> View on GitHub
              </a>
              
              {/* Optional: Add live demo link */}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-demo-link btn-effect"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}

        <div ref={controlsRef} className="slideshow-controls">
          <button 
            className="slide-arrow prev-arrow" 
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            <IoArrowBack />
          </button>
          <button 
            className="slide-arrow next-arrow" 
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <IoArrowForward />
          </button>

          {/* Slide Indicators */}
          <div className="slide-indicators">
            {projects.map((_, index) => (
              <button
                key={index}
                ref={el => dotsRef.current[index] = el}
                className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => changeSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; // Changed from ProjectBlogs to Projects