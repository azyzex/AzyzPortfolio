import { useEffect, useRef, useState } from "react";
import { assetPath } from "../utils/assets";

// WebM first: some systems (Windows "N" editions, Electron-based browsers)
// cannot decode H.264 at all. The MP4 covers older Safari.
export function VideoSources({ base }: { base: string }) {
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
export function CardVideo({ src, active }: { src: string; active: boolean }) {
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
