import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { useNavigate, type To } from "react-router-dom";
import { navigateWithTransition } from "@/lib/navigateWithTransition";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: To;
}

/**
 * Drop-in for react-router's <Link> that wraps the navigation in
 * document.startViewTransition where supported.
 */
export const TransitionLink = forwardRef<HTMLAnchorElement, Props>(
  ({ to, onClick, ...rest }, ref) => {
    const navigate = useNavigate();

    const href = typeof to === "string" ? to : (to.pathname ?? "") + (to.search ?? "");

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(e);
      if (e.defaultPrevented) return;
      // Let modified clicks (cmd/ctrl/shift/middle) behave normally
      if (
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      e.preventDefault();
      navigateWithTransition(navigate, to);
    };

    return <a ref={ref} href={href} onClick={handleClick} {...rest} />;
  },
);

TransitionLink.displayName = "TransitionLink";
