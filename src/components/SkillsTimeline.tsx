import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { education, experience } from "../data/portfolio";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/motion";
import { SectionHeader } from "./SectionHeader";

type TechItem = {
  accent: string;
  icon?: string;
  logo: string;
  name: string;
};

const devicon = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

const techItems: TechItem[] = [
  { name: "C", logo: "C", icon: devicon("c"), accent: "#00599c" },
  { name: "HTML5", logo: "H5", icon: devicon("html5"), accent: "#e34f26" },
  { name: "CSS3", logo: "C3", icon: devicon("css3"), accent: "#1572b6" },
  { name: "JavaScript", logo: "JS", icon: devicon("javascript"), accent: "#caa70a" },
  { name: "TypeScript", logo: "TS", icon: devicon("typescript"), accent: "#3178c6" },
  { name: "Python", logo: "Py", icon: devicon("python"), accent: "#3776ab" },
  { name: "Java", logo: "Ja", icon: devicon("java"), accent: "#f89820" },
  { name: "PHP", logo: "PHP", icon: devicon("php"), accent: "#777bb4" },
  { name: "Dart", logo: "D", icon: devicon("dart"), accent: "#0175c2" },
  { name: "Bash", logo: "Sh", icon: devicon("linux"), accent: "#15191d" },
  { name: "React", logo: "R", icon: devicon("react"), accent: "#149eca" },
  { name: "Next.js", logo: "N", icon: devicon("nextjs"), accent: "#15191d" },
  { name: "Vue.js", logo: "Vue", icon: devicon("vuejs"), accent: "#42b883" },
  { name: "React Native", logo: "RN", icon: devicon("react"), accent: "#149eca" },
  { name: "Expo", logo: "E", icon: devicon("expo"), accent: "#15191d" },
  { name: "React Router", logo: "RR", icon: devicon("reactrouter"), accent: "#ca4245" },
  { name: "React Query", logo: "RQ", accent: "#ff4154" },
  { name: "Redux", logo: "Rx", icon: devicon("redux"), accent: "#764abc" },
  { name: "Framer Motion", logo: "FM", accent: "#6f4cff" },
  { name: "Material UI", logo: "MUI", icon: devicon("materialui"), accent: "#007fff" },
  { name: "Chakra UI", logo: "Ch", accent: "#38b2ac" },
  { name: "Tailwind CSS", logo: "TW", icon: devicon("tailwindcss"), accent: "#06b6d4" },
  { name: "Bootstrap", logo: "B", icon: devicon("bootstrap"), accent: "#7952b3" },
  { name: "Vite", logo: "V", icon: devicon("vitejs"), accent: "#8b5cf6" },
  { name: "Node.js", logo: "N", icon: devicon("nodejs"), accent: "#3c873a" },
  { name: "Express.js", logo: "EX", icon: devicon("express"), accent: "#15191d" },
  { name: "FastAPI", logo: "FA", icon: devicon("fastapi"), accent: "#009688" },
  { name: "Flask", logo: "Fl", icon: devicon("flask"), accent: "#15191d" },
  { name: "Tkinter", logo: "Tk", accent: "#3776ab" },
  { name: "Socket.IO", logo: "IO", icon: devicon("socketio"), accent: "#15191d" },
  { name: "Flutter", logo: "F", icon: devicon("flutter"), accent: "#02569b" },
  { name: "Firebase", logo: "Fb", icon: devicon("firebase"), accent: "#f5820d" },
  { name: "Supabase", logo: "Sb", icon: devicon("supabase"), accent: "#3ecf8e" },
  { name: "MongoDB", logo: "M", icon: devicon("mongodb"), accent: "#47a248" },
  { name: "MySQL", logo: "SQL", icon: devicon("mysql"), accent: "#00758f" },
  { name: "PostgreSQL", logo: "PG", icon: devicon("postgresql"), accent: "#336791" },
  { name: "SQL", logo: "SQL", accent: "#057584" },
  { name: "Oracle", logo: "Ora", icon: devicon("oracle"), accent: "#f80000" },
  { name: "Pandas", logo: "Pd", icon: devicon("pandas"), accent: "#150458" },
  { name: "NumPy", logo: "NP", icon: devicon("numpy"), accent: "#4dabcf" },
  { name: "Jupyter", logo: "Jp", icon: devicon("jupyter"), accent: "#f37626" },
  { name: "Google Colab", logo: "Colab", accent: "#f9ab00" },
  { name: "Gemini API", logo: "AI", icon: devicon("googlecloud"), accent: "#8b5cf6" },
  { name: "OpenAI", logo: "AI", accent: "#15191d" },
  { name: "Ollama", logo: "Ol", accent: "#15191d" },
  { name: "Hugging Face", logo: "HF", accent: "#f4b400" },
  { name: "Google Maps API", logo: "Map", accent: "#0f9d58" },
  { name: "Web3.js", logo: "W3", accent: "#f16822" },
  { name: "Docker", logo: "Dk", icon: devicon("docker"), accent: "#2496ed" },
  { name: "Git", logo: "Git", icon: devicon("git"), accent: "#f05032" },
  { name: "GitLab", logo: "GL", icon: devicon("gitlab"), accent: "#fc6d26" },
  { name: "GitHub CLI", logo: "GH", icon: devicon("github"), accent: "#15191d" },
  { name: "CI/CD", logo: "CI", accent: "#0699a8" },
  { name: "Vercel", logo: "V", icon: devicon("vercel"), accent: "#15191d" },
  { name: "Cloudflare", logo: "CF", icon: devicon("cloudflare"), accent: "#f38020" },
  { name: "Cloud", logo: "Cloud", icon: devicon("googlecloud"), accent: "#4285f4" },
  { name: "Apache", logo: "Ap", icon: devicon("apache"), accent: "#d22128" },
  { name: "Virtualization", logo: "VM", accent: "#66737b" },
  { name: "Windows Terminal", logo: "WT", icon: devicon("windows11"), accent: "#0078d4" },
  { name: "Active Directory", logo: "AD", accent: "#0078d4" },
  { name: "VS Code", logo: "VS", icon: devicon("vscode"), accent: "#007acc" },
  { name: "npm", logo: "npm", icon: devicon("npm", "original-wordmark"), accent: "#cb3837" },
  { name: "Postman", logo: "Pm", icon: devicon("postman"), accent: "#ff6c37" },
  { name: "Jira", logo: "Ji", icon: devicon("jira"), accent: "#0052cc" },
  { name: "SCRUM", logo: "Sc", accent: "#0699a8" },
  { name: "Kanban", logo: "Kb", accent: "#f3bd55" },
  { name: "ClickUp", logo: "Cu", accent: "#7b68ee" },
  { name: "Notion", logo: "No", icon: devicon("notion"), accent: "#15191d" },
  { name: "Canva", logo: "Ca", accent: "#00c4cc" },
  { name: "Figma", logo: "Fg", icon: devicon("figma"), accent: "#f24e1e" },
  { name: "Android Studio", logo: "AS", icon: devicon("androidstudio"), accent: "#3ddc84" },
  { name: "Microsoft Teams", logo: "MT", accent: "#6264a7" },
  { name: "Cisco", logo: "Ci", accent: "#1ba0d7" },
  { name: "Raspberry Pi", logo: "RP", icon: devicon("raspberrypi"), accent: "#c51a4a" },
  { name: "Microcontrollers", logo: "MCU", accent: "#057584" },
  { name: "Zigbee", logo: "Zb", accent: "#eb0443" },
  { name: "LaTeX", logo: "TeX", icon: devicon("latex"), accent: "#008080" },
  { name: "SEO", logo: "SEO", accent: "#0699a8" },
  { name: "Adobe", logo: "Ad", accent: "#ff0000" },
];

const techRows = Array.from({ length: 5 }, (_, rowIndex) =>
  techItems.filter((_, itemIndex) => itemIndex % 5 === rowIndex),
);

const techCarouselTransition = (rowIndex: number) => ({
  duration: 26 + rowIndex * 3,
  ease: "linear" as const,
  repeat: Infinity,
});

export function SkillsTimeline() {
  const pathItems = [...experience, ...education].slice(0, 5);

  return (
    <>
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
          description="No boxes here, just the stack floating around the canvas like the working materials they are."
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

      <motion.section
        className="section path-section"
        id="experience"
        aria-labelledby="path-title"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <SectionHeader
          id="path-title"
          title="A practical path through product work."
          description="Experience, education, and build history arranged as a quiet timeline."
        />

        <motion.div className="path-list" variants={staggerContainer}>
          {pathItems.map((item) => (
            <motion.article className="path-item" key={`${item.title}-${item.organization}`} variants={fadeUp}>
              <span>{item.date}</span>
              <div>
                <h3>{item.title}</h3>
                <strong>{item.organization}</strong>
                <p>{item.summary}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>
    </>
  );
}
