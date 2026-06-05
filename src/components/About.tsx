import {
  Code2,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { focusAreas, profile, proofStats } from "../data/portfolio";
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
            <strong>Master's in Networks</strong>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="about-collage-board" variants={staggerContainer} aria-label="Profile highlights">
        <motion.div className="collage-id-pass" variants={softScale}>
          <span className="collage-lanyard" aria-hidden="true" />
          <div className="collage-id-card">
            <span>{profile.shortName}</span>
            {profile.photo ? <img src={assetPath(profile.photo)} alt="" /> : null}
            <strong>Computer engineering</strong>
            <small>Web / Mobile / AI</small>
          </div>
        </motion.div>

        <motion.div className="collage-torn-strip" variants={fadeUp} aria-hidden="true">
          <span>Design</span>
          <span>Build</span>
          <span>Ship</span>
        </motion.div>

        <motion.div className="collage-signature" variants={fadeUp}>
          <span>{profile.shortName}</span>
          <strong>I think, then I build</strong>
        </motion.div>

        <motion.div className="collage-terminal-note" variants={softScale}>
          <div aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p>$ whoami</p>
          <strong>Full-stack builder with a product designer&apos;s eye.</strong>
          <p>$ focus --now</p>
          <small>AI / web / mobile / networks</small>
        </motion.div>

        <motion.div className="collage-folder-pile" variants={staggerContainer} aria-label="Focus areas">
          {[...focusAreas, "Tunisia"].map((area, index) => (
            <motion.span className={`collage-folder collage-folder--${index + 1}`} key={area} variants={fadeUp}>
              {area === "Tunisia" ? <MapPin size={13} aria-hidden="true" /> : <Sparkles size={13} aria-hidden="true" />}
              {area}
            </motion.span>
          ))}
        </motion.div>

        <motion.div className="collage-yellow-note" variants={fadeUp}>
          <span>working note</span>
          <strong>Useful software, shaped with care.</strong>
        </motion.div>

        <motion.div className="collage-stat-cluster" variants={staggerContainer}>
          {proofStats.map((stat, index) => (
            <motion.div className={`collage-stat collage-stat--${index + 1}`} key={stat.label} variants={fadeUp}>
              {index === 1 ? <GraduationCap size={17} aria-hidden="true" /> : <Code2 size={17} aria-hidden="true" />}
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </motion.div>
          ))}
        </motion.div>

        <div className="collage-doodle collage-doodle--one" aria-hidden="true" />
        <div className="collage-doodle collage-doodle--two" aria-hidden="true" />
      </motion.div>
    </motion.section>
  );
}
