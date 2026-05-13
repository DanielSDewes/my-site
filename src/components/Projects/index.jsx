import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { projects } from '../../data/portfolio';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

function LucideIcon({ name, ...props }) {
  const Icon = LucideIcons[name];
  return Icon ? <Icon {...props} /> : null;
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      cardRef.current.style.boxShadow = 'none';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        background: 'var(--bg3)',
        border: '0.5px solid var(--border)',
        transition: 'transform 0.15s ease, border-color 0.3s, box-shadow 0.3s',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,194,255,0.2)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,194,255,0.04)';
      }}
    >
      {/* Header */}
      <div className="p-7 pb-4 flex-1 relative">
        <div
          className="absolute top-5 right-5 w-9 h-9 rounded-lg flex items-center justify-center text-lg"
          style={{ background: `${project.accent}12`, color: project.accent }}
        >
          <LucideIcon name={project.icon} size={18} />
        </div>
        <div
          className="text-xs font-mono uppercase tracking-widest mb-2"
          style={{ color: 'var(--accent2)' }}
        >
          {project.type}
        </div>
        <h3 className="text-lg font-bold mb-3">{project.name}</h3>
        <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text2)' }}>
          {project.description}
        </p>
      </div>

      {/* Tech stack */}
      <div className="px-7 pb-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 rounded text-xs font-mono"
            style={{
              background: 'rgba(0,194,255,0.05)',
              border: '0.5px solid rgba(0,194,255,0.15)',
              color: 'rgba(0,194,255,0.7)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Footer links */}
      <div
        className="px-7 py-4 flex gap-3"
        style={{ borderTop: '0.5px solid var(--border)' }}
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-2 rounded transition-all duration-200"
          style={{
            color: 'var(--text2)',
            border: '0.5px solid var(--border)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <FiGithub size={13} /> GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-2 rounded transition-all duration-200"
            style={{
              color: 'var(--accent)',
              border: '0.5px solid rgba(0,194,255,0.25)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,194,255,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <FiExternalLink size={13} /> Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">04 — Projects</span>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight font-sora">
          What was{' '}
          <span style={{ color: 'var(--accent)' }}>built</span>.
        </h2>
        <p className="text-base font-light mb-12 max-w-xl" style={{ color: 'var(--text2)' }}>
          Projects that solve real problems — from production APIs to complete fullstack systems.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}

        {/* More projects card */}
        <motion.a
          href="https://github.com/DanielSDewes"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.4, duration: 0.65 }}
          className="rounded-xl flex flex-col items-center justify-center min-h-[200px] p-8 text-center transition-all duration-300 group"
          style={{
            border: '0.5px dashed rgba(0,194,255,0.15)',
            background: 'transparent',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,194,255,0.3)'; e.currentTarget.style.background = 'rgba(0,194,255,0.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0,194,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
        >
          <FiGithub size={28} style={{ color: 'var(--text3)', marginBottom: '0.75rem' }} />
          <p className="text-sm mb-3" style={{ color: 'var(--text3)' }}>Mais projetos no GitHub</p>
          <span
            className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded"
            style={{ border: '0.5px solid var(--border2)', color: 'var(--accent)' }}
          >
            View all →
          </span>
        </motion.a>
      </div>
    </section>
  );
}
