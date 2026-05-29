import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function useSmartHeader() {
  const [visible, setVisible] = useState(true);
  const hoveredRef = useRef(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  const lastYRef = useRef(typeof window === "undefined" ? 0 : window.scrollY);

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    // Stay open while parked at the top or while the cursor is hovering the nav.
    if (window.scrollY <= 8) return;
    if (hoveredRef.current) return;
    hideTimerRef.current = setTimeout(() => {
      if (hoveredRef.current) return;
      setVisible(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (y <= 8) {
        // At or near the top: always visible, kill any pending hide.
        setVisible(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      } else if (y < lastYRef.current) {
        // Upward flick: show + restart the 3s idle timer.
        setVisible(true);
        scheduleHide();
      } else if (y > lastYRef.current) {
        // Downward scroll: hide immediately, unless cursor is over the nav.
        if (!hoveredRef.current) {
          setVisible(false);
          if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        }
      }

      lastYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // If the page lands already scrolled (deep link with hash), start the idle timer.
    scheduleHide();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [scheduleHide]);

  const onMouseEnter = useCallback(() => {
    hoveredRef.current = true;
    setVisible(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, []);

  const onMouseLeave = useCallback(() => {
    hoveredRef.current = false;
    // Resume normal idle behaviour the moment the cursor leaves.
    scheduleHide();
  }, [scheduleHide]);

  return { visible, onMouseEnter, onMouseLeave };
}

export function SiteNav() {
  const { visible, onMouseEnter, onMouseLeave } = useSmartHeader();

  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -80,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`sticky top-7 z-30 bg-background/85 backdrop-blur-md ${
        visible ? "" : "pointer-events-none"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7 flex justify-between items-center">
        <Link
          to="/"
          className="font-mono text-mono-medium text-base sm:text-lg text-display hover:text-code transition-colors"
        >
          Iveta Dimitrova
        </Link>
        <div className="flex gap-3 sm:gap-6 md:gap-8">
          <Link
            to="/work"
            className="font-mono text-mono-regular text-sm text-display hover:text-code transition-colors"
          >
            ./work
          </Link>
          <Link
            to="#contact"
            className="font-mono text-mono-regular text-sm text-display hover:text-code transition-colors"
          >
            ./contact
          </Link>
        </div>
      </nav>
    </motion.div>
  );
}
