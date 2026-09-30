import { About } from "./components/About";
import { AllProjects } from "./components/AllProjects";
import { Contact } from "./components/Contact";
import { Course } from "./components/Course";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Proof } from "./components/Proof";
import { SkillsTimeline } from "./components/SkillsTimeline";
import { useHashRoute, useRouteScroll } from "./utils/router";

export default function App() {
  const route = useHashRoute();
  useRouteScroll(route);

  return (
    <>
      <Header />
      <main>
        {route === "projects" ? (
          <AllProjects />
        ) : (
          <>
            <Hero />
            <About />
            <SkillsTimeline />
            <Projects />
            <Course />
            <Proof />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
