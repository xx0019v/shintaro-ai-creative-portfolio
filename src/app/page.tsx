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

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
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
