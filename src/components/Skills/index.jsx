import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/portfolio';

function SkillBar({ name, level, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(level), delay);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium" style={{ color: 'var(--text2)' }}>{name}</span>
        <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{level}%</span>
      </div>
      <div className="h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${width}%`,
            background: 'linear-gradient(90deg, #00C2FF, #7C3AED)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">02 — Skills</span>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight font-sora">
          Technologies &{' '}
          <span style={{ color: 'var(--accent)' }}>tools</span>.
        </h2>
        <p className="text-base font-light mb-12 max-w-xl" style={{ color: 'var(--text2)' }}>
          A technical set built over real projects — focused on backend, but comfortable across the entire stack.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {skills.map((cat, catIdx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: catIdx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl p-6 relative overflow-hidden transition-all duration-300"
            style={{ background: 'var(--bg3)', border: '0.5px solid var(--border)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,194,255,0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            {/* subtle inner gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(0,194,255,0.015), transparent)' }}
            />
            <div className="text-2xl mb-3">{cat.icon}</div>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-5 font-mono"
              style={{ color: 'var(--accent)' }}
            >
              {cat.category}
            </div>
            <div>
              {cat.items.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={catIdx * 100 + i * 120}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
