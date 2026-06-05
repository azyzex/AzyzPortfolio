import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { cvDownloads, profile } from "../data/portfolio";
import { assetPath } from "../utils/assets";
import { fadeUp, softScale, spring, staggerContainer } from "../utils/motion";

export function Hero() {
  const primaryCv = cvDownloads[0];

  return (
    <motion.section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="hero-artifact hero-artifact--wire" variants={softScale} aria-hidden="true">
        <span />
        <span />
        <span />
      </motion.div>

      <motion.div className="hero-copy" variants={staggerContainer}>
        <motion.h1 id="hero-title" variants={fadeUp}>
          Hi, I'm{" "}
          <span className="hero-photo-word">
            {profile.photo ? (
              <img src={assetPath(profile.photo)} alt={profile.name} />
            ) : null}
          </span>{" "}
          Aziz.
        </motion.h1>
        <motion.p className="hero-role" variants={fadeUp}>
          {profile.title}
        </motion.p>
        <motion.p className="hero-intro" variants={fadeUp}>
          I design and build web, mobile, and AI products that feel clear, useful, and easy to trust.
        </motion.p>

        <motion.div className="hero-actions" aria-label="Primary actions" variants={fadeUp}>
          <motion.a
            className="button button--primary"
            href="#projects"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={spring}
          >
            View work
            <ArrowRight size={17} aria-hidden="true" />
          </motion.a>

          {primaryCv.status === "needs-file" ? (
            <span className="button button--ghost button--disabled">
              Resume
              <ExternalLink size={16} aria-hidden="true" />
            </span>
          ) : (
            <motion.a
              className="button button--ghost"
              href={assetPath(primaryCv.href)}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={spring}
            >
              Resume
              <ExternalLink size={16} aria-hidden="true" />
            </motion.a>
          )}
        </motion.div>
      </motion.div>

      <motion.a className="scroll-cue" href="#projects" variants={fadeUp} aria-label="Scroll to work">
        <ArrowDown size={24} aria-hidden="true" />
      </motion.a>
    </motion.section>
  );
}
