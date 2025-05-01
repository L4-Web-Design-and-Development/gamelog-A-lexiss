import { Link } from "react-router-dom";
import siteLogo from "~/assets/svg/gamelog-logo.svg";

export default function Footer() {
  return (
    <nav className="container mx-auto flex items-center justify-between p-4">
      <div>
        <Link to="/">
          <img src={siteLogo} alt="GameLog Logo" />
        </Link>
      </div>

      <div className="flex items-center gap-10">
        <Link to="/games">Games</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </div>
    </nav>
  );
}
