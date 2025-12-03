import { Link } from "react-router-dom";
import "./404.css";
import BracketLogo from "../assets/dozer.svg?react";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="lost-dozer">
        <div className="missing-icon">
          <BracketLogo width="80" height="80" />
        </div>
        <h1>?</h1>
      </div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link className="link-btn" to="/">
        Take me home
      </Link>
    </div>
  );
}