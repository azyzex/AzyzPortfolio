/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form endpoint used by the contact form. Optional: when unset, the
   *  form falls back to opening the visitor's mail client via mailto. */
  readonly VITE_FORMSPREE_ENDPOINT?: string;
}
