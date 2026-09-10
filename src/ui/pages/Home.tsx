import React from "react";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { BackToTop } from "../components/globalStyledComponents";
import Footer from "../components/Footer";
import { useGitHubUser } from "../../hooks/useGitHubData";

export default function Home() {
  const { data: user } = useGitHubUser();
  const name = user?.name ?? "Portfolio";

  React.useEffect(() => {
    document.title = `${name} | Portfolio`;
  }, [name]);

  return (
    <>
      <Hero />
      <main>
        <AboutMe />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <BackToTop home="Home" />
      <Footer />
    </>
  );
}
