import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Contact from "@/components/Contact";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

const Index = () => {
  useDocumentMeta(
    "Iveta Dimitrova — Senior UX Designer",
    "Senior UX designer shipping product strategy backed by research. 7 years across global teams; currently UX Designer at Amadeus.",
  );

  return (
    <main className="min-h-screen">
      <Hero />
      <Philosophy />
      <Contact />
    </main>
  );
};

export default Index;
