import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/Astronaut.css";

export default function Astronaut() {
  const astronautRef = useRef(null);

  useEffect(() => {
    const astronaut = astronautRef.current;
    if (!astronaut) return;

    // Create floating animation
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    
    floatTl
      .to(astronaut, {
        y: -20,
        duration: 2,
        ease: "sine.inOut"
      })
      .to(astronaut, {
        y: 0,
        duration: 2,
        ease: "sine.inOut"
      });

    // Rotate astronaut slowly
    gsap.to(astronaut, {
      rotation: 360,
      duration: 30,
      ease: "none",
      repeat: -1
    });

    // Create stars
    const starsContainer = document.querySelector('.stars-container');
    if (starsContainer) {
      for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 3 + Math.random() * 4;
        
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(star);
      }
    }

    return () => {
      floatTl.kill();
    };
  }, []);

  return (
    <div className="astronaut-container">
      <div className="stars-container"></div>
      <div className="astronaut" ref={astronautRef}>
        <div className="schoolbag"></div>
        <div className="head">
          <div className="helmet"></div>
        </div>
        <div className="body">
          <div className="panel"></div>
        </div>
        <div className="arm arm-left"></div>
        <div className="arm arm-right"></div>
        <div className="leg leg-left"></div>
        <div className="leg leg-right"></div>
      </div>
    </div>
  );
}