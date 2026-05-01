import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ServiceGrid from "@/components/service-grid";
import StorySection from "@/components/story-section";
import Lookbook from "@/components/lookbook";
import Legends from "@/components/legends";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceGrid />
        <StorySection />
        <Lookbook />
        <Legends />
      </main>
      <Footer />
    </>
  );
}
