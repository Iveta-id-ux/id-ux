import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Contact from "@/components/Contact";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

const Index = () => {
  useDocumentMeta(
    "Iveta Dimitrova — Senior UX Designer",
    "Senior UX designer shipping product strategy backed by research. 10 years across global teams.",
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
