import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Pricing from "@/components/Pricing";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Stack />
      <Pricing />
      <Portfolio />
      <About />
      <FAQ />
      <Contact />
    </>
  );
}