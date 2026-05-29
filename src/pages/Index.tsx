import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import Practices from "@/components/Practices";
import Contact from "@/components/Contact";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

const Index = () => {
  useDocumentMeta(
    "Iveta Dimitrova — Senior UX Designer",
    "Senior UX designer shipping product strategy backed by research. 7 years across global teams; currently UX Designer at Amadeus.",
  );

  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [hash, pathname]);

  return (
    <main className="min-h-screen">
      <Hero />
      <Practices />
      <Contact />
    </main>
  );
};

export default Index;
