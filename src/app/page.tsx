import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import BrandPartnersSection from "@/components/brand-partners-section";
import ServiceGrid from "@/components/service-grid";
import StorySection from "@/components/story-section";
import Lookbook, { type LookbookSlide } from "@/components/lookbook";
import Legends from "@/components/legends";
import Footer from "@/components/footer";
import NshrSection from "@/components/nshr-section";
import ContactSection from "@/components/contact-section";
import Testimonials from "@/components/testimonials";
import { TESTIMONIALS } from "@/lib/constants";
import { fetchLatestResultPublicIds } from "@/lib/cloudinary-search";
import { getLookbookGridUrl } from "@/components/ui/media-assets";

function buildLookbookSlides(ids: string[]): LookbookSlide[] {
  return ids.filter((id): id is string => typeof id === "string" && id.trim() !== "").map((publicId, i) => ({
    id: `result-${i}-${publicId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12)}`,
    src: getLookbookGridUrl(publicId),
    alt: `Hoosier Boy Barbershop haircut result ${i + 1} — Noblesville, Indiana`,
    caption: `Editorial Entry · ${String(i + 1).padStart(2, "0")}`,
    style: "Noblesville Precision · Hoosier Boy",
  }));
}

export default async function Home() {
  const resultIds = await fetchLatestResultPublicIds(6);
  const lookbookSlides = buildLookbookSlides(resultIds);

  return (
    <>
      <Navbar />
      <main className="pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
        <Hero />
        <ServiceGrid />
        {false && <BrandPartnersSection />}
        <NshrSection />
        <StorySection />
        <Lookbook slides={lookbookSlides} />
        <Testimonials reviews={TESTIMONIALS} />
        <Legends />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
