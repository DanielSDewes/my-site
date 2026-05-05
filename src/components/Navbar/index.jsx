import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../../data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-10 py-5 transition-all duration-300"
        style={
          scrolled
            ? {
                background: 'rgba(5,5,5,0.85)',
                backdropFilter: 'blur(20px)',
                borderBottom: '0.5px solid rgba(255,255,255,0.06)',
              }
            : {}
        }
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
          className="font-mono text-sm tracking-widest"
          style={{ color: '#00C2FF' }}
        >
          <span style={{ color: 'var(--text3)' }}>//</span> danieldewes
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="relative text-xs font-semibold tracking-widest uppercase transition-colors duration-200 group"
              style={{ color: 'var(--text2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text2)')}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: 'var(--accent)' }}
              />
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="px-5 py-2 text-xs font-bold tracking-widest uppercase rounded border transition-all duration-200"
            style={{
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent)';
              e.currentTarget.style.color = 'var(--bg)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,194,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Let's talk
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              background: 'var(--text)',
              transform: menuOpen ? 'rotate(45deg) translateY(4px)' : '',
            }}
          />
          <span
            className="block h-px transition-all duration-300"
            style={{
              background: 'var(--text)',
              width: menuOpen ? '24px' : '16px',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              background: 'var(--text)',
              transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : '',
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[800] flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-bold tracking-tight transition-colors duration-200"
                style={{ color: 'var(--text2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text2)')}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 }}
              onClick={() => scrollTo('#contact')}
              className="mt-4 px-8 py-3 text-base font-bold tracking-widest uppercase rounded"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
              Let's talk
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
