import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "../data/portfolio";
import { assetPath } from "../utils/assets";
import { fadeUp, softScale, spring, staggerContainer } from "../utils/motion";

function ProjectMedia({ project, large }: { project: Project; large?: boolean }) {
  const Icon = project.icon;

  if (project.image) {
    return (
      <img
        src={assetPath(project.image)}
        alt={`${project.title} screenshot`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div className="archive-artboard">
      <Icon size={large ? 40 : 28} aria-hidden="true" />
      <span>{project.title}</span>
    </div>
  );
}

function ArchiveCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      className="archive-card"
      variants={fadeUp}
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.99 }}
      transition={spring}
      onClick={onOpen}
      aria-label={`${project.title} — view details`}
    >
      <span className="archive-card__media">
        <ProjectMedia project={project} />
      </span>

      <span className="archive-card__body">
        <span className="archive-card__meta">{project.category}</span>
        <span className="archive-card__title">{project.title}</span>
        <span className="archive-card__date">{project.date}</span>
        <span className="archive-card__summary">{project.summary}</span>

        <span className="archive-card__tags">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
          {project.tech.length > 3 ? <span>+{project.tech.length - 3}</span> : null}
        </span>

        <span className="archive-card__cue">
          Read the story
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </span>
    </motion.button>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) {
      // Compensate for the vanishing scrollbar so the page behind doesn't jump.
      document.body.style.paddingRight = `${scrollbar}px`;
    }

    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      // preventScroll matters: this runs when the exit animation finishes, and
      // a plain focus() would yank the page back to wherever the card sits.
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <motion.div
      className="project-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Two notes side by side rather than one centred card, so the dialog
          uses the width of the screen instead of a narrow column. */}
      <motion.div
        className="project-modal-split"
        initial={{ opacity: 0, y: 22, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.97 }}
        transition={spring}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="project-note project-note--media">
          <div
            className={`project-modal__media${
              project.image ? "" : " project-modal__media--empty"
            }`}
          >
            <ProjectMedia project={project} large />
          </div>
        </div>

        <div className="project-note project-note--info" ref={dialogRef} tabIndex={-1}>
          <button
            className="project-modal__close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            <X size={17} aria-hidden="true" />
          </button>

          <div className="project-modal__scroll">
            <p className="project-modal__meta">{project.category}</p>
            <h2 id="project-modal-title">{project.title}</h2>
            <p className="project-modal__date">{project.date}</p>

            <p className="project-modal__lead">{project.summary}</p>
            <p className="project-modal__body">{project.details}</p>

            <div className="project-modal__block">
              <h3>What I did</h3>
              <p>{project.role}</p>
            </div>

            <div className="project-modal__block">
              <h3>Built with</h3>
              <div className="skill-tags">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-modal__links">
              {project.links.map((link) =>
                link.href && link.status !== "coming-soon" ? (
                  <a
                    key={link.label}
                    className="project-modal__link"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <span
                    key={link.label}
                    className="project-modal__link project-modal__link--muted"
                  >
                    {link.label} soon
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AllProjects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const active = projects.find((project) => project.slug === openSlug) ?? null;

  return (
    <motion.section
      className="section archive-section"
      aria-labelledby="archive-title"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.a className="archive-back" href="#projects" variants={fadeUp}>
        <ArrowLeft size={15} aria-hidden="true" />
        Back to home
      </motion.a>

      <motion.div className="archive-head" variants={fadeUp}>
        <p className="section-kicker">The full archive</p>
        <h1 id="archive-title">
          Everything I've <em>built.</em>
        </h1>
        <p>
          {projects.length} projects — web platforms, mobile apps, AI tools, real-time systems,
          developer tooling, and connected hardware. Open any card for the full story.
        </p>
      </motion.div>

      <motion.div className="archive-grid" variants={staggerContainer}>
        {projects.map((project) => (
          <ArchiveCard
            key={project.slug}
            project={project}
            onOpen={() => setOpenSlug(project.slug)}
          />
        ))}
      </motion.div>

      <motion.p className="archive-foot" variants={softScale}>
        Older coursework and experiments live on{" "}
        <a href="https://github.com/azyzex" target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </motion.p>

      <AnimatePresence>
        {active ? (
          <ProjectDialog
            key={active.slug}
            project={active}
            onClose={() => setOpenSlug(null)}
          />
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
