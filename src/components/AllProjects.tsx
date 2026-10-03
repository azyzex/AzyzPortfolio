import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Play,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
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

// WebM first: some systems (Windows "N" editions, Electron-based browsers)
// cannot decode H.264 at all. The MP4 covers older Safari.
function VideoSources({ base }: { base: string }) {
  return (
    <>
      <source src={assetPath(`${base}.webm`)} type="video/webm" />
      <source src={assetPath(`${base}.mp4`)} type="video/mp4" />
    </>
  );
}

/**
 * The card's clip: the thumbnail stays underneath as the poster, and the video
 * fades in over it once it is actually playing, so a slow network shows the
 * still rather than a black box. Nothing is downloaded until the first hover —
 * the grid would otherwise fetch every clip on page load.
 */
function CardVideo({ src, active }: { src: string; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (active) {
      setArmed(true);
    }
  }, [active]);

  // <source> children added after mount are ignored until load() is called.
  useEffect(() => {
    if (armed) {
      videoRef.current?.load();
    }
  }, [armed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !armed) {
      return;
    }
    if (active) {
      // play() rejects if the pointer leaves before it starts; that's fine.
      video.play().catch(() => undefined);
      return;
    }
    // Fade out on the frame it was showing, and only rewind once it's
    // invisible — rewinding first would visibly jump mid-fade.
    video.pause();
    setPlaying(false);
    const rewind = window.setTimeout(() => {
      video.currentTime = 0;
    }, 520);
    return () => window.clearTimeout(rewind);
  }, [active, armed]);

  return (
    <video
      ref={videoRef}
      className={`archive-card__video${playing ? " is-playing" : ""}`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
    >
      {armed ? <VideoSources base={src} /> : null}
    </video>
  );
}

function ArchiveCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  // Deliberately NOT gated on prefers-reduced-motion: playback only ever
  // starts because the visitor pointed at the card, which is their choice.

  return (
    <motion.button
      type="button"
      className="archive-card"
      variants={fadeUp}
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.99 }}
      transition={spring}
      onClick={onOpen}
      // Mouse only: on touch, a tap opens the dialog, which plays the clip.
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`${project.title} — view details`}
    >
      <span className="archive-card__media">
        <ProjectMedia project={project} />
        {project.video ? <CardVideo src={project.video} active={hovered} /> : null}
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

/**
 * The dialog's media for a project with a video: two pages, image then video,
 * on a sliding track. Both stay mounted so the video keeps its position when
 * you page away and back. The video plays WITH sound when you page to it and
 * pauses when you leave — only the archive card's hover preview is muted.
 * play() is called synchronously inside the click/keypress handler: that is
 * the one moment every browser (including embedded ones like VS Code's) is
 * guaranteed to allow audio. Calling it later from an effect can be refused.
 * ←/→ also page, except while the video itself has focus, where the native
 * controls use them to seek.
 */
function MediaGallery({ project, video }: { project: Project; video: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [page, setPage] = useState(0);
  const pageRef = useRef(0);
  const pages = [
    { label: "Image", icon: ImageIcon },
    { label: "Video", icon: Play },
  ];
  const last = pages.length - 1;

  // Must be called from a user-gesture handler (click / keydown).
  const goTo = (next: number) => {
    const target = Math.max(0, Math.min(next, last));
    pageRef.current = target;
    setPage(target);
    const el = videoRef.current;
    if (!el) {
      return;
    }
    if (target === 1) {
      el.muted = false;
      el.play().catch(() => undefined);
    } else {
      el.pause();
    }
  };
  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  // Safety net: never leave audio running once the gallery is gone.
  useEffect(() => {
    const el = videoRef.current;
    return () => el?.pause();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLVideoElement) {
        return;
      }
      if (event.key === "ArrowRight") {
        goToRef.current(pageRef.current + 1);
      } else if (event.key === "ArrowLeft") {
        goToRef.current(pageRef.current - 1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="media-gallery">
      <div className="project-modal__media project-modal__media--gallery">
        <div className="media-gallery__track" style={{ transform: `translateX(-${page * 100}%)` }}>
          <div className="media-gallery__slide" aria-hidden={page !== 0}>
            <ProjectMedia project={project} large />
          </div>
          <div className="media-gallery__slide media-gallery__slide--video" aria-hidden={page !== 1}>
            <video
              ref={videoRef}
              poster={project.image ? assetPath(project.image) : undefined}
              controls
              loop
              playsInline
              preload="metadata"
              tabIndex={page === 1 ? 0 : -1}
              aria-label={`${project.title} video`}
            >
              <VideoSources base={video} />
            </video>
          </div>
        </div>
      </div>

      <div className="media-gallery__pager" role="group" aria-label="Media">
        <button
          type="button"
          className="media-gallery__arrow"
          onClick={() => goTo(page - 1)}
          disabled={page === 0}
          aria-label="Previous"
        >
          <ChevronLeft size={17} aria-hidden="true" />
        </button>

        <div className="media-gallery__tabs">
          {pages.map(({ label, icon: TabIcon }, index) => (
            <button
              key={label}
              type="button"
              className={`media-gallery__tab${page === index ? " is-active" : ""}`}
              onClick={() => goTo(index)}
              aria-pressed={page === index}
            >
              <TabIcon size={13} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="media-gallery__arrow"
          onClick={() => goTo(page + 1)}
          disabled={page === last}
          aria-label="Next"
        >
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </div>
    </div>
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
          {project.video ? (
            <MediaGallery project={project} video={project.video} />
          ) : (
            <div
              className={`project-modal__media${
                project.image ? "" : " project-modal__media--empty"
              }`}
            >
              <ProjectMedia project={project} large />
            </div>
          )}
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

  // The dialog stays mounted while its exit animation plays, so silence any
  // video the instant it is dismissed rather than when it finally unmounts.
  // Every way out (Escape, backdrop, × button) comes through here.
  const closeDialog = useCallback(() => {
    document.querySelectorAll<HTMLVideoElement>(".project-modal-backdrop video").forEach((video) => {
      video.pause();
    });
    setOpenSlug(null);
  }, []);

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
            onClose={closeDialog}
          />
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
