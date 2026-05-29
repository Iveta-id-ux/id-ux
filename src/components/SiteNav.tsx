import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function useSmartHeader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleHide = () => {
      if (hideTimer) clearTimeout(hideTimer);
      // Stay visible while parked at the top of the page.
      if (window.scrollY <= 8) return;
      hideTimer = setTimeout(() => setVisible(false), 3000);
    };

    const onScroll = () => {
      const y = window.scrollY;

      if (y <= 8) {
        // At or near the top: always visible, kill any pending hide.
        setVisible(true);
        if (hideTimer) clearTimeout(hideTimer);
      } else if (y < lastY) {
        // Any upward flick: show + restart the 3s idle timer.
        setVisible(true);
        scheduleHide();
      } else if (y > lastY) {
        // Downward scroll: hide immediately, no idle timer needed.
        setVisible(false);
        if (hideTimer) clearTimeout(hideTimer);
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // If the page lands already scrolled (deep link with hash), start the idle timer.
    scheduleHide();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  return visible;
}

export function SiteNav() {
  const visible = useSmartHeader();

  return (
    <motion.div
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
