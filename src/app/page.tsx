import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Trips from "@/components/Trips";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import MobileCallBar from "@/components/MobileCallBar";
import RevealObserver from "@/components/RevealObserver";
import { getReviews } from "@/lib/reviews";
import { getTides } from "@/lib/tides";

export default async function Home() {
  // Fetched once on the server and shared, so the hero, the About stats, the
  // Testimonials header and the schema.org markup all quote the same Google
  // numbers. Server rendering also puts the rating in the HTML for crawlers
  // instead of popping in after hydration.
  const [{ reviews, aggregateRating, totalReviewCount }, tides] = await Promise.all([getReviews(), getTides()]);

  return (
    <>
      <StructuredData />
      <Header />
      {/* Order follows the questions a visitor asks: what is it, what does it
          cost, who runs it, is it good, what does it look like, the details,
          and how do I book. */}
      <main id="main">
        <Hero aggregateRating={aggregateRating} totalReviewCount={totalReviewCount} />
        <Trips />
        <About aggregateRating={aggregateRating} />
        <Testimonials reviews={reviews} aggregateRating={aggregateRating} totalReviewCount={totalReviewCount} />
        <Gallery />
        <FAQ />
        <CTA tides={tides} />
      </main>
      <Footer />
      <MobileCallBar />
      <RevealObserver />
    </>
  );
}
