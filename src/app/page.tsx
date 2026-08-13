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
 * The whole page is one continuous film (see ui/FilmBackdrop): a fixed canvas
 * behind everything, scrubbed by scroll progress across the entire document,
 * running backstage → entrance → the seven looks → finale → the empty water.
 *
 * So the sections carry no background of their own. They are text and image
 * floating over a world that keeps moving underneath them — which is the
 * point. The earlier arrangement, film only in the gaps between opaque
 * sections, made the footage read as decoration between paragraphs.
 *
 * FilmScrub and PaperTear are both retired for the same reason: with the film
 * running continuously there is nothing left for a divider to divide.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative z-10">
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
