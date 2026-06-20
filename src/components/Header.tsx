import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cvDownloads, navItems, profile } from "../data/portfolio";
import { assetPath } from "../utils/assets";
import { spring } from "../utils/motion";

export function Header() {
  const [open, setOpen] = useState(false);
  const primaryCv = cvDownloads[0];

  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
    >
      <motion.a className="brand" href="#top" aria-label="Back to top" whileHover={{ y: -1 }}>
        <span className="brand-mark" aria-hidden="true">
          A
        </span>
        <span>{profile.shortName}</span>
      </motion.a>

      <nav className={`nav ${open ? "nav--open" : ""}`} aria-label="Primary">
        {navItems.map((item) => (
          <motion.a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            whileHover={{ y: -1 }}
            transition={spring}
          >
            {item.label}
          </motion.a>
        ))}
      </nav>

      <div className="header-actions">
        {primaryCv.href && primaryCv.status !== "needs-file" ? (
          <motion.a
            className="resume-link"
            href={assetPath(primaryCv.href)}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -1 }}
            transition={spring}
          >
            Resume
          </motion.a>
        ) : null}
        <motion.button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          whileTap={{ scale: 0.96 }}
          transition={spring}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </motion.button>
      </div>
    </motion.header>
  );
}
