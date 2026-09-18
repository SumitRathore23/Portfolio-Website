import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <a href="#" className="logo">
          SUMIT<span>.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {links.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            >
              <span>0{index + 1}</span>
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5 }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1 + index * 0.08,
                }}
              >
                <span>0{index + 1}</span>
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;