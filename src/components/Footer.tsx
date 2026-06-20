import { profile } from "../data/portfolio";
import { assetPath } from "../utils/assets";

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with care.
      </p>
      <div className="footer-links">
        <a href={assetPath("privacy.html")}>Privacy</a>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
