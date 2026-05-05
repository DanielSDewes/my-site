import { motion } from 'framer-motion';
import { experience } from '../../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">03 — Experience</span>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight font-sora">
          Career{' '}
          <span style={{ color: 'var(--accent)' }}>journey</span>.
        </h2>
        <p className="text-base font-light mb-14 max-w-xl" style={{ color: 'var(--text2)' }}>
          Real projects, modern technologies and deliveries that make a difference.
        </p>
      </motion.div>

      <div className="relative pl-8" style={{ borderLeft: '1px solid rgba(0,194,255,0.15)' }}>
        {/* Animated line gradient overlay */}
        <motion.div
          className="absolute left-0 top-0 w-px"
          style={{ background: 'linear-gradient(to bottom, #00C2FF, #7C3AED, transparent)' }}
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {experience.map((item, i) => (
          <motion.div
            key={i}
            className="relative mb-12 last:mb-0"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Timeline dot */}
            <div
              className="absolute -left-10 top-1.5 rounded-full"
              style={{
                width: 12,
                height: 12,
                background: item.current ? 'var(--accent)' : 'var(--bg)',
                border: `2px solid ${item.current ? 'var(--accent)' : 'rgba(0,194,255,0.4)'}`,
                boxShadow: item.current ? '0 0 14px rgba(0,194,255,0.5)' : 'none',
              }}
            />

            <span
              className="font-mono text-xs tracking-widest uppercase block mb-2"
              style={{ color: 'var(--accent)' }}
            >
              {item.period}
            </span>
            <h3 className="text-lg font-bold mb-1">{item.role}</h3>
            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--accent2)' }}>
              {item.company}
            </p>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded text-xs font-mono"
                  style={{
                    background: 'rgba(124,58,237,0.08)',
                    border: '0.5px solid rgba(124,58,237,0.25)',
                    color: '#a78bfa',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
