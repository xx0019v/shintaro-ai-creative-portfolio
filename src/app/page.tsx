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

/**
 * The page is one continuous read: sections of text and image over a single
 * quiet ground, with CinemaScroll's silver key light travelling down it as the
 * reader goes.
 *
 * It used to run inside a 477-frame film (ui/FilmBackdrop), which is now
 * retired. app/layout.tsx carries the measurements, but the short version is
 * that the footage sat under a scrim heavy enough to render it indistinguishable
 * from the base colour, and it was borrowed imagery rather than this work.
 *
 * FilmScrub and PaperTear stay retired for their original reason: they divided
 * a page that reads better undivided.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <AIKameranado />
        <FragranceBranding />
        <ClientWork />
        <KeychainProject />
        <Leadership />
        <Skills />
        <Strengths />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
