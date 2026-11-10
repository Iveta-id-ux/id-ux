import { useEffect, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteMeta } from "@content/site-meta";

const buttonClass =
  "glow-button inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded font-mono text-sm font-medium transition-all";

const mailto = `mailto:${siteMeta.email}`;

/** True on devices with a real hover (mouse/trackpad); false on touch screens. */
function useCanHover() {
  const query = "(hover: hover) and (pointer: fine)";
  const [canHover, setCanHover] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setCanHover(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return canHover;
}

async function copyEmail(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(siteMeta.email);
    return true;
  } catch {
    // Fallback for non-secure origins (e.g. a phone previewing the dev server over LAN).
    const el = document.createElement("textarea");
    el.value = siteMeta.email;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    el.remove();
    return ok;
  }
}

/** Same envelope as the original send_email() button. */
const MailIcon = () => (
  <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

function ButtonLabel() {
  return (
    <>
      <MailIcon />
      send_email()
    </>
  );
}

/**
 * Contact email CTA.
 * - Desktop: the button opens the mail app; hovering shows the address with a copy action.
 * - Touch: tapping opens a small menu with "Copy email" and "Send email".
 */
export function EmailButton() {
  const canHover = useCanHover();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    const ok = await copyEmail();
    if (ok) {
      setCopied(true);
      toast("email copied", { description: siteMeta.email });
    } else {
      toast("couldn't copy — select the address instead", { description: siteMeta.email });
    }
  };

  if (!canHover) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={buttonClass}>
          <ButtonLabel />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" sideOffset={8} className="min-w-[220px] font-mono">
          <DropdownMenuItem onSelect={handleCopy} className="gap-2 py-2.5 text-sm">
            <Copy className="w-4 h-4" aria-hidden="true" />
            Copy email
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="gap-2 py-2.5 text-sm">
            <a href={mailto}>
              <Mail className="w-4 h-4" aria-hidden="true" />
              Send email
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <HoverCard openDelay={120} closeDelay={200}>
      <HoverCardTrigger asChild>
        <a href={mailto} className={buttonClass}>
          <ButtonLabel />
        </a>
      </HoverCardTrigger>
      <HoverCardContent side="bottom" sideOffset={10} className="w-auto px-3 py-2 font-mono text-sm">
        <div className="flex items-center gap-3">
          <span>
            <span className="text-muted-foreground">// </span>
            <span className="text-terminal-yellow">{siteMeta.email}</span>
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Email copied" : "Copy email"}
            className="inline-flex items-center gap-1.5 rounded border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
            {copied ? "copied" : "copy"}
          </button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
