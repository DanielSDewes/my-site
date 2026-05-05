import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolio';

export default function Footer() {
  return (
    <footer
      className="max-w-6xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
      style={{ borderTop: '0.5px solid var(--border)' }}
    >
      <p className="font-mono text-xs" style={{ color: 'var(--text3)' }}>
        Designed & Built by{' '}
        <span style={{ color: 'var(--accent)', textShadow: '0 0 12px rgba(0,194,255,0.4)' }}>
          Daniel Dewes
        </span>{' '}
        — 2025
      </p>
      <div className="flex items-center gap-5">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
          style={{ color: 'var(--text3)', textDecoration: 'none' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text3)')}
        >
          <FiGithub size={13} /> GitHub
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
          style={{ color: 'var(--text3)', textDecoration: 'none' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text3)')}
        >
          <FiLinkedin size={13} /> LinkedIn
        </a>
      </div>
    </footer>
  );
}
