import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Trips from "@/components/Trips";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { getReviews } from "@/lib/reviews";

export default async function Home() {
  // Fetched once on the server and shared, so the About stats, the Testimonials
  // header and the schema.org markup all quote the same Google numbers. Server
  // rendering also puts the rating in the HTML for crawlers instead of popping
  // in after hydration.
  const { reviews, aggregateRating, totalReviewCount } = await getReviews();

  return (
    <>
      <StructuredData
        reviews={reviews}
        aggregateRating={aggregateRating}
        totalReviewCount={totalReviewCount}
      />
      <Header />
      <main>
        <Hero />
        <About aggregateRating={aggregateRating} />
        <Trips />
        <Testimonials
          reviews={reviews}
          aggregateRating={aggregateRating}
          totalReviewCount={totalReviewCount}
        />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
