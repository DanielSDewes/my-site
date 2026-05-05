import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, aboutHighlights, aboutStats } from '../../data/portfolio';

function AnimatedNumber({ target }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        const num = parseInt(target);
        if (isNaN(num)) { setValue(target); return; }
        let start = 0;
        const step = () => {
          start += Math.ceil(num / 50);
          if (start >= num) { setValue(target); return; }
          setValue(start);
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value}</span>;
}

export default function About() {
  const sectionRef = useRef(null);

  return (
    <section id="about" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">01 — Sobre</span>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16 items-start mt-2">
        {/* Left - text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight font-sora">
            Code with <span style={{ color: 'var(--accent)' }}>purpose</span>.
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed font-light" style={{ color: 'var(--text2)' }}>
              I'm <strong className="font-semibold" style={{ color: 'var(--text)' }}>Daniel Dewes</strong>, a full-stack developer passionate about creating efficient and scalable solutions. I have solid experience with technologies such as <strong className="font-semibold" style={{ color: 'var(--text)' }}>Python, JavaScript, React, Typescript, Java and C#</strong>, combining robust backend development, well-architected APIs, and interfaces that deliver real value.
            </p>
            <p className="leading-relaxed font-light" style={{ color: 'var(--text2)' }}>
              My expertise spans various <strong className="font-semibold" style={{ color: 'var(--text)' }}>DBMSs including PostgreSQL, Oracle, SQL Server, MySQL, and Firebird</strong>. I have extensive experience working with APIs in both personal projects and professional environments, leveraging tools like <strong className="font-semibold" style={{ color: 'var(--text)' }}>Postman</strong> to ensure quality and reliability.
            </p>
            <p className="leading-relaxed font-light" style={{ color: 'var(--text2)' }}>
              I thrive in <strong className="font-semibold" style={{ color: 'var(--text)' }}>agile environments</strong> such as Scrum and Kanban, using tools like Jira to collaborate effectively. I'm constantly seeking to improve my technical skills and deliver scalable, maintainable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {aboutHighlights.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200"
                style={{
                  background: 'var(--bg3)',
                  border: '0.5px solid var(--border)',
                  color: 'var(--text2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,194,255,0.3)';
                  e.currentTarget.style.color = 'var(--accent)';
                  e.currentTarget.style.background = 'rgba(0,194,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text2)';
                  e.currentTarget.style.background = 'var(--bg3)';
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="rounded-xl p-8 relative overflow-hidden gradient-border-top"
            style={{ background: 'var(--bg3)', border: '0.5px solid var(--border)' }}
          >
            <div className="grid grid-cols-2 gap-6 mb-8">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <span
                    className="text-4xl font-extrabold block leading-none font-mono"
                    style={{ color: 'var(--accent)' }}
                  >
                    <AnimatedNumber target={stat.num} />
                  </span>
                  <span
                    className="text-xs uppercase tracking-widest block mt-1 font-mono"
                    style={{ color: 'var(--text3)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '1.25rem' }}>
              <p
                className="text-xs uppercase tracking-widest mb-3 font-mono"
                style={{ color: 'var(--text3)' }}
              >
                Working with:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker', 'Git', 'Tailwind', 'TypeScript'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded text-xs font-mono"
                    style={{
                      background: 'rgba(0,194,255,0.06)',
                      border: '0.5px solid rgba(0,194,255,0.2)',
                      color: 'var(--accent)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
