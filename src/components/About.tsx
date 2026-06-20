import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import { assetPath } from "../utils/assets";
import { fadeUp, softScale, staggerContainer, viewportOnce } from "../utils/motion";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <motion.section
      className="section about-section"
      id="about"
      aria-labelledby="about-title"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div className="about-layout" variants={staggerContainer}>
        <motion.div className="about-copy" variants={fadeUp}>
          <SectionHeader
            id="about-title"
            title="I care about the shape of useful things."
            description="A little product thinking, a little engineering grit, and a lot of attention to how people actually use software."
          />
          <p>{profile.bio}</p>
          <p>{profile.personalNote}</p>
        </motion.div>

        <motion.div className="about-photo-stack" variants={softScale}>
          {profile.photo ? (
            <img className="about-photo" src={assetPath(profile.photo)} alt={profile.name} />
          ) : null}
          <div className="about-note">
            <span>currently</span>
            <strong>doing master's</strong>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
