import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { githubStats, languages, personalInfo } from '../../data/portfolio';
import { FiGithub } from 'react-icons/fi';

function LangBar({ lang, delay }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(lang.pct), delay);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [lang.pct, delay]);

  return (
    <div ref={ref} className="flex items-center gap-4">
      <span className="font-mono text-xs min-w-[80px]" style={{ color: 'var(--text2)' }}>
        {lang.name}
      </span>
      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${lang.color} transition-all duration-1200`}
          style={{
            width: `${width}%`,
            transition: 'width 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      <span className="font-mono text-xs min-w-[32px] text-right" style={{ color: 'var(--text3)' }}>
        {lang.pct}%
      </span>
    </div>
  );
}

export default function GithubStats() {
  return (
    <section id="github" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">05 — GitHub</span>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 leading-tight font-sora">
          Activities &{' '}
          <span style={{ color: 'var(--accent)' }}>Contributions</span>.
        </h2>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {githubStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-xl p-5 text-center transition-all duration-300"
            style={{ background: 'var(--bg3)', border: '0.5px solid var(--border)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,194,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
          >
            <span className="block text-4xl font-extrabold font-mono mb-1" style={{ color: 'var(--accent)' }}>
              {stat.num}
            </span>
            <span className="text-xs uppercase tracking-widest font-mono" style={{ color: 'var(--text3)' }}>
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Languages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="rounded-xl p-7 relative overflow-hidden gradient-border-top"
        style={{ background: 'var(--bg3)', border: '0.5px solid var(--border)' }}
      >
        <p className="text-xs uppercase tracking-widest font-mono mb-6" style={{ color: 'var(--text3)' }}>
          Languages Used
        </p>
        <div className="flex flex-col gap-5">
          {languages.map((lang, i) => (
            <LangBar key={lang.name} lang={lang} delay={i * 150} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded transition-all duration-200"
            style={{
              border: '0.5px solid rgba(0,194,255,0.25)',
              color: 'var(--accent)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,194,255,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <FiGithub size={13} />
            View complete profile on GitHub →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
