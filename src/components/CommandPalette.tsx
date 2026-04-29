import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { siteMeta } from "@content/site-meta";
import { caseStudies } from "@/content/case-studies";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="type a command…" />
      <CommandList>
        <CommandEmpty>// no_match</CommandEmpty>

        <CommandGroup heading="navigate">
          <CommandItem onSelect={() => run(() => navigate("/"))}>
            <span className="font-mono">./home</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/work"))}>
            <span className="font-mono">./work</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/#about"))}>
            <span className="font-mono">./about</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/#contact"))}>
            <span className="font-mono">./contact</span>
          </CommandItem>
        </CommandGroup>

        {caseStudies.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="case_studies">
              {caseStudies.map((cs) => (
                <CommandItem
                  key={cs.frontmatter.slug}
                  value={`open ${cs.frontmatter.title} ${cs.frontmatter.slug}`}
                  onSelect={() =>
                    run(() => navigate(`/work/${cs.frontmatter.slug}`))
                  }
                >
                  <span className="font-mono">
                    open: {cs.frontmatter.title}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading="actions">
          <CommandItem
            value="copy email address"
            onSelect={() =>
              run(() => {
                navigator.clipboard?.writeText(siteMeta.email);
              })
            }
          >
            <span className="font-mono">copy_email()</span>
            <CommandShortcut>{siteMeta.email}</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="open linkedin"
            onSelect={() =>
              run(() => {
                window.open(siteMeta.linkedin, "_blank", "noopener,noreferrer");
              })
            }
          >
            <span className="font-mono">open_linkedin()</span>
          </CommandItem>
          <CommandItem
            value="download cv"
            onSelect={() =>
              run(() => {
                window.open("/cv.pdf", "_blank", "noopener,noreferrer");
              })
            }
          >
            <span className="font-mono">download_cv()</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
