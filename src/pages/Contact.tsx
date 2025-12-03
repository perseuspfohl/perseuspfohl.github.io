import "./Contact.css";
import { useEffect, useState } from "react";
import { useTransitionNav } from "../utils/NavigationProvider";
import { Helmet } from "@dr.pogodin/react-helmet";
import { FaGithub, FaLinkedin, FaDiscord, FaYoutubeSquare } from "react-icons/fa";

export default function Contact() {
  const { navigate, finishTransition } = useTransitionNav();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    finishTransition();
  }, [finishTransition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: "", email: "", message: "" });
    alert("Message sent! I'll get back to you soon.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-container">
      <Helmet>
        <title>Connect - Perseus Pfohl</title>
        <meta name="description" content="Get in touch with Perseus Pfohl and connect on social media." />
      </Helmet>
      
      <button 
        className="link-btn back-button-fixed"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>
      
      <div className="contact-main">
        <div className="contact-card">
          <div className="contact-header">
            <h1>Connect</h1>
            <h2>Let's build something amazing together!</h2>
          </div>
          
          <form 
            className="contact-form"
            action="https://formspree.io/f/xgvrvdwn" 
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_subject" value="New contact form submission from perseus.dev" />
            <input type="hidden" name="_format" value="plain" />
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="link-btn form-submit">
              Send Message
            </button>
          </form>
        </div>

        <div className="socials-section">
          <h3>Find me elsewhere</h3>
          <div className="social-links">
            <a href="https://github.com/PerseusPfohl" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub size={24} />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/PerseusPfohl" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin size={24} />
              <span>LinkedIn</span>
            </a>
            <a href="https://discord.gg/VSh3JBADQf" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaDiscord size={24} />
              <span>Discord</span>
            </a>
            <a href="https://www.youtube.com/@perseuspfohl" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaYoutubeSquare size={24} />
              <span>YouTube</span>
            </a>
          </div>
          
          <div className="contact-message">
            <p>
              Feel free to reach out for collaborations, questions, 
              or just general inquiries! I'm always open to discussing new 
              projects and opportunities. Please note I may take some 
              time to respond, so please be patient. Thank you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}