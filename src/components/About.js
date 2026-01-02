import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "./Icons";
import "../styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const textRefs = useRef([]);
  
  useEffect(() => {
    gsap.fromTo(".about-title",
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    gsap.from(textRefs.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="about" ref={aboutRef}>
      <div className="section-header">
        <span className="section-title about-title">About Me</span>
      </div>
      
      <div className="about-content">
        <div className="about-description">
          <p ref={el => textRefs.current[0] = el}>
            Hi, I'm Perseus Pfohl—a high school sophomore passionate about robotics, 
            AI, and software development. My journey in STEM started at a young age 
            with simple programming projects, which quickly evolved into a deep interest 
            in robotics and automation systems.
          </p>
          
          <p ref={el => textRefs.current[1] = el}>
            I have hands-on experience with <span className="highlight">ROS, Python, C++, robotics simulation, 
            embedded systems, and computer vision</span>. From building my first simple robots 
            to developing complex simulation environments, I've continuously challenged 
            myself to learn and apply new technologies in the robotics space.
          </p>
          
          <p ref={el => textRefs.current[2] = el}>
            What excites me most is the intersection of hardware and software—creating 
            intelligent systems that can perceive, decide, and act autonomously. I believe 
            in building solutions that combine mechanical design, electronics, and 
            programming to solve real-world problems.
          </p>

          <p ref={el => textRefs.current[3] = el}>
            Beyond technical skills, I've developed strong problem-solving abilities 
            through robotics competitions and projects. I enjoy the process of taking 
            an idea from concept to prototype, learning from failures, and iterating 
            toward better solutions.
          </p>

          <p ref={el => textRefs.current[4] = el}>
            When I'm not coding or building robots, you can find me exploring new 
            technologies, contributing to open-source projects, or mentoring younger 
            students interested in STEM. I'm always open to collaborating on interesting 
            projects or discussing robotics and technology.
          </p>
        </div>
         
        <div className="about-actions" ref={el => textRefs.current[5] = el}>
          <a href="#contact" className="resume-button btn-effect">
            Get in Touch <Icon name="Mail" className="button-icon" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About; // This line must exist!