import React, { useEffect, useRef } from "react";
import "../styles/Intro.css";
import Astronaut from "./Astronaut";
import { gsap } from "gsap";

const Intro = () => {
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const animationRef = useRef(null);
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    
    // Set initial state for fade in
    gsap.set([textRef.current, nameRef.current, subtitleRef.current, descRef.current], {
      opacity: 0,
      y: 20
    });
    
    gsap.set(animationRef.current, {
      opacity: 0,
      scale: 0.95
    });

    // Simple fade in animation for all elements
    const fadeInTl = gsap.timeline();
    
    fadeInTl
      .to([textRef.current, nameRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3")
      .to(animationRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

    return () => {
      gsap.killTweensOf([textRef.current, nameRef.current, subtitleRef.current, descRef.current, animationRef.current]);
    };
  }, []);

  return (
    <div className="intro-section">
      <div className="intro-content">
        <div className="typist-content">
          <div className="text-typing-container">
            <span className="intro-title" ref={textRef}>Hi there! I'm </span>
            <span className="intro-name" ref={nameRef}>Perseus.</span>
          </div>
        </div>
        
        <div className="intro-subtitle" ref={subtitleRef}>
          I'm a <span className="intro-subtitle-name">Robotics Engineer</span> & Software Developer.
        </div>
        
        <div className="intro-desc" ref={descRef}>
          High school sophomore passionate about robotics, AI, and building innovative solutions. 
          I've been immersed in STEM since a young age, working on everything from robot simulations 
          to automation systems and full-stack development.
        </div>
      </div>
      
      <div className="intro-animation" ref={animationRef}>
        <Astronaut />
      </div>
    </div>
  );
};

export default Intro;