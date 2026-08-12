import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import AIKameranado from "@/components/sections/AIKameranado";
import FragranceBranding from "@/components/sections/FragranceBranding";
import ClientWork from "@/components/sections/ClientWork";
import KeychainProject from "@/components/sections/KeychainProject";
import Leadership from "@/components/sections/Leadership";
import Skills from "@/components/sections/Skills";
import Strengths from "@/components/sections/Strengths";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import LightWipe from "@/components/ui/LightWipe";
import FilmScrub from "@/components/ui/FilmScrub";

/**
 * The page reads as one film in four acts.
 *
 * Between the acts sit scroll-scrubbed leaders cut from AVÉRIEL "THE WALK" —
 * this portfolio's own AI film. They are not stock transitions: the reader
 * scrubs the actual work at whatever speed they scroll, so the dividers are
 * themselves the strongest argument the page makes.
 *
 * PaperTear is retired here — a second "chapter break" device competing with
 * the film leaders read as two ideas doing one job.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* film-cut into the first reading scene */}
        <LightWipe />
        <About />

        <FilmScrub band="entrance" index="ACT 01" labelKey="film_a1" />
        <AIKameranado />

        <FilmScrub band="ten" index="ACT 02" labelKey="film_a2" />
        <FragranceBranding />
        <ClientWork />
        <KeychainProject />

        <FilmScrub band="ekitai" index="ACT 03" labelKey="film_a3" />
        <Leadership />
        <Skills />
        <Strengths />
        <Education />

        <FilmScrub band="finale" index="ACT 04" labelKey="film_a4" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
