import { Link } from "react-router-dom";
import siteLogo from "~/assets/svg/gamelog-logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#080E10] border-t border-cyan-500 px-6 py-8 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={siteLogo} alt="GameLog Logo" className="w-20" />
          </Link>
        </div>

        {/* Text Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-2 text-white">Site</h3>
            <p>Games</p>
            <p>About</p>
            <p>Blog</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-white">Support</h3>
            <p>Legal</p>
            <p>Contact Us</p>
            <p>Privacy Policy</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-white">Follow Us</h3>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
