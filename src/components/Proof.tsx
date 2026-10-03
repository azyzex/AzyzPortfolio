import { ExternalLink, FileSearch, MessageSquareQuote } from "lucide-react";
import { motion } from "framer-motion";
import { certificates, recommendations } from "../data/portfolio";
import { assetPath } from "../utils/assets";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/motion";
import { SectionHeader } from "./SectionHeader";

function isImageAsset(path?: string) {
  return Boolean(path && /\.(png|jpe?g|jfif|webp|gif|avif)$/i.test(path));
}

// The marquee card is at most ~350px wide, so it loads the 720px copy that
// `npm run optimize:images` writes to certificates/thumbs/. The link still
// opens the full-size file.
function certificateThumb(path: string) {
  return path.replace("assets/certificates/", "assets/certificates/thumbs/");
}

function CertificateCard({ certificate }: { certificate: (typeof certificates)[number] }) {
  const href = certificate.file ? assetPath(certificate.file) : certificate.credentialUrl;
  // An explicit preview wins (used when `file` is a PDF); otherwise the file
  // itself is the picture when it is an image.
  const preview = certificate.image ?? (isImageAsset(certificate.file) ? certificate.file : undefined);

  const content = (
    <>
      {preview ? (
        <img
          className="certificate-sheet__image"
          src={assetPath(certificateThumb(preview))}
          alt={`${certificate.title} certificate`}
          decoding="async"
        />
      ) : (
        <div className="certificate-sheet__fallback">
          <FileSearch size={22} aria-hidden="true" />
          <span>Add certificate file</span>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a
        className="certificate-sheet"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${certificate.title} certificate`}
        title={`${certificate.issuer} - ${certificate.title}`}
      >
        {content}
      </a>
    );
  }

  return (
    <article className="certificate-sheet" aria-label={`${certificate.issuer} - ${certificate.title}`}>
      {content}
    </article>
  );
}

function RecommendationCard({
  recommendation,
}: {
  recommendation: (typeof recommendations)[number];
}) {
  const initials = recommendation.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <a
      className="recommendation-message"
      href={recommendation.profileUrl}
      target="_blank"
      rel="noreferrer"
    >
      {recommendation.image ? (
        <img
          className="recommendation-avatar"
          src={assetPath(recommendation.image)}
          alt={`${recommendation.name} profile`}
        />
      ) : (
        <div className="recommendation-avatar" aria-hidden="true">
          {initials}
        </div>
      )}
      <div className="recommendation-bubble">
        <div className="recommendation-bubble__header">
          <div>
            <p>{recommendation.date || recommendation.source}</p>
            <h3>{recommendation.name}</h3>
          </div>
          <ExternalLink size={14} aria-hidden="true" />
        </div>
        <blockquote>
          <MessageSquareQuote size={16} aria-hidden="true" />
          <span>
            {recommendation.quote || "Quote pending: add the exact recommendation text before publishing."}
          </span>
        </blockquote>
        <span>{recommendation.role}</span>
      </div>
    </a>
  );
}

export function Proof() {
  const certificateLoop = [...certificates, ...certificates];
  const recommendationLoop = [...recommendations, ...recommendations];
  const certificateMotion = {
    x: ["0%", "-50%"],
  };
  const recommendationMotion = {
    x: ["-50%", "0%"],
  };
  const certificateTravelPx = 335;
  const recommendationTravelPx = 440;
  const proofCarouselSpeedPx = 62;
  const sharedSpeedTransition = {
    ease: "linear" as const,
    repeat: Infinity,
  };
  const certificateTransition = {
    ...sharedSpeedTransition,
    duration: (certificates.length * certificateTravelPx) / proofCarouselSpeedPx,
  };
  const recommendationTransition = {
    ...sharedSpeedTransition,
    duration: (recommendations.length * recommendationTravelPx) / proofCarouselSpeedPx,
  };

  return (
    <motion.section
      className="section proof-section"
      id="certificates"
      aria-labelledby="proof-title"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <SectionHeader
        id="proof-title"
        title="Proof that travels lightly."
        description="A quiet stream of verified work and kind words, drifting across the page without taking over."
      />

      <motion.div className="proof-carousel-stack" variants={staggerContainer}>
        <motion.article
          className="proof-carousel-panel proof-carousel-panel--floating"
          variants={fadeUp}
          aria-label="Certificates carousel"
        >
          <div className="proof-carousel-wrap" aria-label="Certificates carousel">
            <motion.div
              className="proof-carousel-track proof-carousel-track--left"
              animate={certificateMotion}
              transition={certificateTransition}
            >
              {certificateLoop.map((certificate, index) => (
                <CertificateCard
                  certificate={certificate}
                  key={`${certificate.title}-${index}`}
                />
              ))}
            </motion.div>
          </div>
        </motion.article>

        <motion.article
          className="proof-carousel-panel proof-carousel-panel--floating"
          variants={fadeUp}
          aria-label="Recommendations carousel"
        >
          <div className="proof-carousel-wrap" aria-label="Recommendations carousel">
            <motion.div
              className="proof-carousel-track proof-carousel-track--right"
              animate={recommendationMotion}
              transition={recommendationTransition}
            >
              {recommendationLoop.map((recommendation, index) => (
                <RecommendationCard
                  recommendation={recommendation}
                  key={`${recommendation.name}-${index}`}
                />
              ))}
            </motion.div>
          </div>
        </motion.article>
      </motion.div>
    </motion.section>
  );
}
