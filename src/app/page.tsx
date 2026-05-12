import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Trips from "@/components/Trips";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <About />
        <Trips />
        <Testimonials />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
