import { ArrowUpRight, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { course } from "../data/portfolio";
import { assetPath } from "../utils/assets";
import { fadeUp, softScale, spring, staggerContainer, viewportOnce } from "../utils/motion";

export function Course() {
  return (
    <motion.section
      className="section course-section"
      id="course"
      aria-labelledby="course-title"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="course-card">
        <motion.a
          className="course-cover"
          href={course.href}
          target="_blank"
          rel="noreferrer"
          variants={softScale}
          // The tilt lives here, not in CSS: framer writes an inline transform
          // for the reveal, which would override a CSS rotate.
          style={{ rotate: -2.2 }}
          whileHover={{ y: -6, rotate: 0 }}
          transition={spring}
          aria-label={`${course.title} on ${course.platform}`}
        >
          <img
            src={assetPath(course.image)}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </motion.a>

        <motion.div className="course-copy" variants={fadeUp}>
          <p className="contact-kicker">
            <GraduationCap size={14} aria-hidden="true" />
            Also on {course.platform}
          </p>
          <h2 id="course-title">
            I teach it, <em>too.</em>
          </h2>
          <h3>{course.title}</h3>
          <p>{course.summary}</p>
          <div className="skill-tags" aria-label="What the course covers">
            {course.topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
          <motion.a
            className="button button--primary"
            href={course.href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={spring}
          >
            Check out the course
            <ArrowUpRight size={17} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
