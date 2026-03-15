'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: "Xizmatlar",        href: "#xizmatlar" },
  { label: "Jarayon",          href: "#jarayon" },
  { label: "Muvaffaqiyatlar",  href: "#muvaffaqiyatlar" },
  { label: "Universitetlar",   href: "#universitetlar" },
  { label: "Biz haqimizda",    href: "#haqimizda" },
  { label: "FAQ",              href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="flex items-center group"
            aria-label="Nexera Consulting"
          >
            <svg
              viewBox="0 0 158 44"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-auto transition-opacity group-hover:opacity-80"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="xGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#2563eb" />
                  <stop offset="48%"  stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              {/* ne */}
              <text
                x="0" y="30"
                fontFamily="Arial Black, Arial, sans-serif"
                fontWeight="900"
                fontSize="32"
                fill="#1e3a8a"
              >ne</text>
              {/* X — gradient */}
              <text
                x="46" y="30"
                fontFamily="Arial Black, Arial, sans-serif"
                fontWeight="900"
                fontSize="32"
                fill="url(#xGrad)"
              >X</text>
              {/* era */}
              <text
                x="68" y="30"
                fontFamily="Arial Black, Arial, sans-serif"
                fontWeight="900"
                fontSize="32"
                fill="#22c55e"
              >era</text>
              {/* CONSULTING */}
              <text
                x="79" y="42"
                fontFamily="Arial, sans-serif"
                fontWeight="600"
                fontSize="8.5"
                fill="#22c55e"
                textAnchor="middle"
                letterSpacing="2.5"
              >CONSULTING</text>
            </svg>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick('#aloqa')}
              className="btn-primary text-sm"
            >
              Hoziroq murojaat
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Menyu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => handleNavClick('#aloqa')}
                  className="w-full btn-primary justify-center"
                >
                  Hoziroq murojaat
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
