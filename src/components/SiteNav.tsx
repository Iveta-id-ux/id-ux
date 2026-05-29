import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function SiteNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 flex justify-between items-center"
    >
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
          to="/#about"
          className="font-mono text-mono-regular text-sm text-display hover:text-code transition-colors"
        >
          ./about
        </Link>
        <Link
          to="/#contact"
          className="font-mono text-mono-regular text-sm text-display hover:text-code transition-colors"
        >
          ./contact
        </Link>
      </div>
    </motion.nav>
  );
}
