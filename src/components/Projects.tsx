import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { projects, socialLinks, type LinkItem, type Project } from "../data/portfolio";
import { assetPath } from "../utils/assets";
import { projectHref, routes } from "../utils/router";
import { fadeUp, softScale, spring, staggerContainer, viewportOnce } from "../utils/motion";
import { CardVideo } from "./CardVideo";
import { SectionHeader } from "./SectionHeader";

function ProjectLink({ link }: { link: LinkItem }) {
  if (!link.href || link.status === "coming-soon") {
    return <span className="project-link project-link--muted">{link.label} soon</span>;
  }

  return (
    <motion.a
      className="project-link"
      href={link.href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ x: 3 }}
      transition={spring}
    >
      {link.label}
      <ArrowUpRight size={15} aria-hidden="true" />
    </motion.a>
  );
}

function WorkPiece({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  // Same hover preview as the archive cards (and, like there, not gated on
  // reduced motion: it only plays because the visitor pointed at it).
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className={`work-piece work-piece--${index % 2 ? "reverse" : "normal"}`}
      variants={staggerContainer}
    >
      <motion.a
        className="work-media"
        href={projectHref(project.slug)}
        aria-label={`${project.title} — open in the projects page`}
        variants={softScale}
        whileHover={{ y: -8, rotate: index % 2 ? -0.6 : 0.6 }}
        onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {project.image ? (
          <img
            src={assetPath(project.image)}
            alt={`${project.title} screenshot`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="work-placeholder">
            <Icon size={42} aria-hidden="true" />
            <strong>{project.title}</strong>
            <span>Add screenshot</span>
            <code>{project.assetHint}</code>
          </div>
        )}
        {project.video ? <CardVideo src={project.video} active={hovered} /> : null}
      </motion.a>

      <motion.div className="work-copy" variants={fadeUp}>
        <p className="work-category">{project.category}</p>
        <h3>
          <a href={projectHref(project.slug)}>{project.title}</a>
        </h3>
        <p>{project.summary}</p>
        <div className="skill-tags skill-tags--compact" aria-label={`${project.title} technologies`}>
          {project.tech.slice(0, 5).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="work-actions">
          {project.links.map((link) => (
            <ProjectLink key={`${project.slug}-${link.label}`} link={link} />
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Projects() {
  const featured = projects.filter((project) => project.featured).slice(0, 4);
  const github = socialLinks.find((link) => link.label === "GitHub");

  return (
    <motion.section
      className="section projects-section"
      id="projects"
      aria-labelledby="projects-title"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="section-heading-row">
        <SectionHeader
          id="projects-title"
          title="Selected work, shaped like product stories."
          description="A few selected products, shown large and up close — the work I'm most proud of."
        />
        {github?.href ? (
          <motion.a
            className="text-link"
            href={github.href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            transition={spring}
          >
            View GitHub
            <ArrowUpRight size={15} aria-hidden="true" />
          </motion.a>
        ) : null}
      </div>

      <motion.div className="work-list" variants={staggerContainer}>
        {featured.map((project, index) => (
          <WorkPiece key={project.slug} project={project} index={index} />
        ))}
      </motion.div>

      <motion.div className="work-more" variants={fadeUp}>
        <motion.a
          className="button button--primary"
          href={routes.projects}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={spring}
        >
          See all {projects.length} projects
          <ArrowRight size={17} aria-hidden="true" />
        </motion.a>
      </motion.div>
    </motion.section>
  );
}
