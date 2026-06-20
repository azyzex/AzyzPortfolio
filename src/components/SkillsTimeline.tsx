import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { techItems } from "../data/portfolio";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/motion";
import { SectionHeader } from "./SectionHeader";

const techRows = Array.from({ length: 5 }, (_, rowIndex) =>
  techItems.filter((_, itemIndex) => itemIndex % 5 === rowIndex),
);

const techCarouselTransition = (rowIndex: number) => ({
  duration: 26 + rowIndex * 3,
  ease: "linear" as const,
  repeat: Infinity,
});

export function SkillsTimeline() {
  return (
    <motion.section
      className="section skills-section"
      id="skills"
      aria-labelledby="skills-title"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
        <SectionHeader
          id="skills-title"
          title="Tech & tools I use."
          description="The languages, frameworks, and tools I reach for across web, mobile, AI, and connected systems."
          align="center"
        />

        <motion.div className="tech-cloud tech-marquee-cloud" variants={fadeUp} aria-label="Technology stack">
          {techRows.map((row, rowIndex) => {
            const rowMotion = rowIndex % 2 === 0 ? { x: ["0%", "-50%"] } : { x: ["-50%", "0%"] };
            return (
              <div
                className={`tech-marquee-row ${rowIndex % 2 === 1 ? "tech-marquee-row--reverse" : ""}`}
                key={`tech-row-${rowIndex}`}
              >
                <motion.div
                  className="tech-marquee-track"
                  animate={rowMotion}
                  transition={techCarouselTransition(rowIndex)}
                >
                  {[row, row].map((group, groupIndex) => (
                    <div className="tech-marquee-group" key={`tech-row-${rowIndex}-group-${groupIndex}`}>
                      {group.map((item) => (
                        <motion.div
                          className="tech-float"
                          key={`${item.name}-${groupIndex}`}
                          aria-hidden={groupIndex > 0 ? "true" : undefined}
                          whileHover={{ y: -6, scale: 1.05 }}
                          style={{ "--accent": item.accent } as CSSProperties & Record<"--accent", string>}
                        >
                          <span className="tech-logo" aria-hidden="true">
                            {item.icon ? <img className="tech-logo-image" src={item.icon} alt="" /> : item.logo}
                          </span>
                          <span className="tech-name">{item.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            );
          })}
          <div className="tech-thread tech-thread--one" aria-hidden="true" />
          <div className="tech-thread tech-thread--two" aria-hidden="true" />
        </motion.div>
    </motion.section>
  );
}
