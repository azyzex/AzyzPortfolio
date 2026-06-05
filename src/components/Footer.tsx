import { profile } from "../data/portfolio";

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with care.
      </p>
      <a href="#top">Back to top</a>
    </footer>
  );
}
