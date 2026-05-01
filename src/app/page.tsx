import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ServiceGrid from "@/components/service-grid";
import Legends from "@/components/legends";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceGrid />
        <Legends />
      </main>
      <Footer />
    </>
  );
}
