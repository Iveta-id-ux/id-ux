import { useEffect, useState } from "react";

export interface Section {
  id: string;
  text: string;
}

/**
 * Watches `<h2 id>` elements inside `article[data-case-study-body]` and reports
 * the topmost visible section. Returns empty `sections` outside case-study pages.
 */
export function useActiveSection(): { sections: Section[]; activeId?: string } {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const article = document.querySelector("article[data-case-study-body]");
    if (!article) {
      setSections([]);
      setActiveId(undefined);
      return;
    }

    const headings = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h2[id]"),
    );
    setSections(
      headings.map((h) => ({ id: h.id, text: h.textContent ?? h.id })),
    );

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0% -70% 0%", threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return { sections, activeId };
}
