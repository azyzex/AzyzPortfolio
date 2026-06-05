import { ArrowUpRight, ExternalLink, Mail, MapPin, Phone, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cvDownloads, profile, socialLinks } from "../data/portfolio";
import { assetPath } from "../utils/assets";
import { fadeUp, softScale, spring, staggerContainer, viewportOnce } from "../utils/motion";

export function Contact() {
  const availableCv = cvDownloads.find((cv) => cv.status !== "needs-file" && cv.href);
  const [emailOpen, setEmailOpen] = useState(false);
  const subject = encodeURIComponent("Portfolio inquiry");
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${subject}`;
  const outlookHref = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
    profile.email,
  )}&subject=${subject}`;

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
            onClick={() => setEmailOpen(true)}
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
          <button type="button" onClick={() => setEmailOpen(true)}>
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

      {emailOpen ? (
        <motion.div
          className="email-modal-backdrop"
          aria-labelledby="email-modal-title"
          aria-modal="true"
          role="dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setEmailOpen(false)}
        >
          <motion.div
            className="email-modal"
            initial={{ opacity: 0, y: 18, rotate: -1.5, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5, scale: 1 }}
            transition={spring}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="email-modal__close"
              type="button"
              aria-label="Close email choices"
              onClick={() => setEmailOpen(false)}
            >
              <X size={17} aria-hidden="true" />
            </button>
            <span className="email-modal__eyebrow">Choose your inbox</span>
            <h3 id="email-modal-title">Send Aziz a message</h3>
            <p>Pick the email app you prefer and I&apos;ll open a fresh compose window with my address ready.</p>
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
          </motion.div>
        </motion.div>
      ) : null}
    </motion.section>
  );
}
