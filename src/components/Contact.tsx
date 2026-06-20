import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { cvDownloads, profile, socialLinks } from "../data/portfolio";
import { assetPath } from "../utils/assets";
import { fadeUp, softScale, spring, staggerContainer, viewportOnce } from "../utils/motion";

type ModalView = "choice" | "form";
type FormStatus = "idle" | "submitting" | "success" | "error";

const easeOut = [0.22, 1, 0.36, 1] as const;
const viewTransition = { duration: 0.26, ease: easeOut };
// The card morphs between views by tweening its measured content height —
// smoother than framer's `layout` prop, which scale-distorts children.
const heightTransition = { duration: 0.34, ease: easeOut };

export function Contact() {
  const availableCv = cvDownloads.find((cv) => cv.status !== "needs-file" && cv.href);
  const [emailOpen, setEmailOpen] = useState(false);
  const [view, setView] = useState<ModalView>("choice");
  const [status, setStatus] = useState<FormStatus>("idle");
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  // Keep the animated viewport in sync with whichever view is active.
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!emailOpen || !el) {
      return;
    }
    const update = () => setContentHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [emailOpen]);

  const subject = encodeURIComponent("Portfolio inquiry");
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${subject}`;
  const outlookHref = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
    profile.email,
  )}&subject=${subject}`;

  const openModal = () => {
    setView("choice");
    setStatus("idle");
    setContentHeight(null);
    setEmailOpen(true);
  };

  const closeModal = () => setEmailOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    // No Formspree endpoint configured yet: fall back to the visitor's mail
    // client with the message prefilled, so the form still does something.
    if (!endpoint) {
      const name = String(data.get("name") ?? "");
      const replyTo = String(data.get("email") ?? "");
      const message = String(data.get("message") ?? "");
      const body = encodeURIComponent(`${message}\n\n— ${name} (${replyTo})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    try {
      setStatus("submitting");
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.section
      className="section contact-section"
      id="contact"
      aria-labelledby="contact-title"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div className="contact-shell" variants={softScale}>
        <motion.p className="contact-kicker" variants={fadeUp}>
          Like what you see?
        </motion.p>
        <motion.h2 id="contact-title" variants={fadeUp}>
          Let’s build something <em>clear and useful.</em>
        </motion.h2>
        <motion.p className="contact-intro" variants={fadeUp}>
          {profile.availability}
        </motion.p>

        <motion.div className="contact-actions" variants={fadeUp}>
          <motion.button
            className="button button--primary"
            type="button"
            onClick={openModal}
            whileHover={{ y: -3 }}
          >
            Email me
            <Mail size={17} aria-hidden="true" />
          </motion.button>
          {availableCv ? (
            <motion.a
              className="button button--ghost"
              href={assetPath(availableCv.href)}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
            >
              Resume
              <ExternalLink size={16} aria-hidden="true" />
            </motion.a>
          ) : null}
        </motion.div>

        <motion.div className="contact-details" variants={staggerContainer}>
          <button type="button" onClick={openModal}>
            <Mail size={15} aria-hidden="true" />
            {profile.email}
          </button>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            <Phone size={15} aria-hidden="true" />
            {profile.phone}
          </a>
          <span>
            <MapPin size={15} aria-hidden="true" />
            {profile.location}
          </span>
        </motion.div>

        <motion.div className="social-row" variants={staggerContainer}>
          {socialLinks
            .filter((link) => !["Email", "Phone", "Location"].includes(link.label))
            .map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  transition={spring}
                >
                  <Icon size={16} aria-hidden="true" />
                  {link.label}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </motion.a>
              );
            })}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {emailOpen ? (
          <motion.div
            className="email-modal-backdrop"
            aria-labelledby="email-modal-title"
            aria-modal="true"
            role="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="email-modal-tilt"
              initial={{ opacity: 0, y: 18, rotate: -1.5, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, rotate: -1.5, scale: 1 }}
              exit={{ opacity: 0, y: 12, rotate: -1.5, scale: 0.97 }}
              transition={spring}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="email-modal">
                <button
                  className="email-modal__close"
                  type="button"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <X size={17} aria-hidden="true" />
                </button>

                <motion.div
                  className="email-modal__viewport"
                  animate={contentHeight === null ? undefined : { height: contentHeight }}
                  transition={heightTransition}
                >
                  <div className="email-modal__content" ref={contentRef}>
                    <AnimatePresence mode="popLayout" initial={false}>
                      {view === "choice" ? (
                        <motion.div
                          key="choice"
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -14 }}
                          transition={viewTransition}
                        >
                          <span className="email-modal__eyebrow">Choose how to reach me</span>
                          <h3 id="email-modal-title">Send Aziz a message</h3>
                          <p>Write a note right here, or open the conversation in your own inbox.</p>
                          <div className="email-modal__choices">
                            <button
                              type="button"
                              className="email-modal__primary"
                              onClick={() => setView("form")}
                            >
                              <MessageSquare size={17} aria-hidden="true" />
                              Write a message
                              <ArrowRight size={15} aria-hidden="true" />
                            </button>
                            <div className="email-modal__actions">
                              <a href={gmailHref} target="_blank" rel="noreferrer">
                                Gmail
                                <ArrowUpRight size={14} aria-hidden="true" />
                              </a>
                              <a href={outlookHref} target="_blank" rel="noreferrer">
                                Outlook
                                <ArrowUpRight size={14} aria-hidden="true" />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0, x: 14 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 14 }}
                          transition={viewTransition}
                        >
                          <button
                            type="button"
                            className="email-modal__back"
                            onClick={() => setView("choice")}
                          >
                            <ArrowLeft size={14} aria-hidden="true" />
                            Back
                          </button>
                          <span className="email-modal__eyebrow">Write your message</span>
                          <h3 id="email-modal-title">Tell me about your idea</h3>

                          {status === "success" ? (
                            <p className="email-form__status email-form__status--ok">
                              Thanks — your message is on its way. I’ll get back to you soon.
                            </p>
                          ) : (
                            <form className="email-form" onSubmit={handleSubmit}>
                              <label>
                                Name
                                <input type="text" name="name" placeholder="Your name" required />
                              </label>
                              <label>
                                Email
                                <input type="email" name="email" placeholder="you@example.com" required />
                              </label>
                              <label>
                                Message
                                <textarea name="message" placeholder="What can I help you build?" required />
                              </label>
                              <button
                                className="email-form__submit"
                                type="submit"
                                disabled={status === "submitting"}
                              >
                                {status === "submitting" ? "Sending…" : "Send message"}
                                <Send size={15} aria-hidden="true" />
                              </button>
                              <p className="email-form__consent">
                                By sending this, you agree I can use these details to reply. See the{" "}
                                <a href={assetPath("privacy.html")} target="_blank" rel="noreferrer">
                                  privacy notice
                                </a>
                                .
                              </p>
                              {status === "error" ? (
                                <p className="email-form__status email-form__status--err">
                                  Something went wrong. Please try an inbox option instead.
                                </p>
                              ) : null}
                            </form>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
