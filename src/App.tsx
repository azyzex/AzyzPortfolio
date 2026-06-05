import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Proof } from "./components/Proof";
import { SkillsTimeline } from "./components/SkillsTimeline";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <SkillsTimeline />
        <Projects />
        <Proof />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
