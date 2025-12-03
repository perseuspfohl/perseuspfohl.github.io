import { useLocation, useNavigate } from "react-router-dom";
import { transition } from "../utils/NavigationProvider";
import { useEffect, useState } from "react";
import BracketLogo from "../assets/logo.svg?react";

export default function Header({
  children,
  containerRef,
  containerRef2,
}: {
  children?: React.ReactNode;
  containerRef: React.RefObject<HTMLSpanElement | null>;
  containerRef2: React.RefObject<HTMLDivElement | null>;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMain = ["/", "/about", "/contact"].includes(location.pathname);
  const realContainerRef = isMain ? containerRef : containerRef2;

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem("firstVisit");
    if (!firstVisit) {
      localStorage.setItem("firstVisit", "true");
      setTimeout(() => {
        setModalOpen(true);
      }, 1000);
    }
  }, []);

  return (
    <>
      <div className="logo-container">
        <BracketLogo 
          className="logo-home-button"
          onClick={() => {
            transition("/", realContainerRef, navigate, location);
          }}
        />
      </div>
      {modalOpen && (
        <div className="welcome-modal">
          <div className="welcome-modal-content">
            <h2 style={{ fontFamily: 'SUSE Mono, monospace' }}>Welcome to My Portfolio! 🚀</h2>
            <p>
              Thanks for visiting! This site showcases my projects and experience 
              in software development. Feel free to explore and get in touch if 
              you'd like to collaborate.
            </p>
            <button onClick={() => setModalOpen(false)}>Let's Explore</button>
          </div>
        </div>
      )}
      {children}
    </>
  );
}