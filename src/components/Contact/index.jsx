import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../config/emailjs';
import { personalInfo } from '../../data/portfolio';
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );
      setStatus('success');
      setForm({ from_name: '', from_email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const links = [
    { icon: <FiGithub size={16} />, label: 'github.com/DanielSDewes', href: personalInfo.github },
    { icon: <FiLinkedin size={16} />, label: 'linkedin.com/in/danieldewes', href: personalInfo.linkedin },
    { icon: <FiMail size={16} />, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
  ];

  const inputStyle = {
    width: '100%',
    background: 'var(--bg4)',
    border: '0.5px solid var(--border)',
    color: 'var(--text)',
    fontFamily: 'inherit',
    fontSize: '14px',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const btnConfig = {
    idle:    { bg: 'linear-gradient(135deg, #00C2FF, #7C3AED)', color: 'white',        icon: <FiSend size={14} />,         text: 'Send Message' },
    loading: { bg: 'rgba(255,255,255,0.06)',                    color: 'var(--text2)',  icon: null,                         text: 'Sending...' },
    success: { bg: 'linear-gradient(135deg, #00FFC8, #00C2FF)', color: 'var(--bg)',    icon: <FiCheck size={14} />,        text: 'Message sent!' },
    error:   { bg: 'linear-gradient(135deg, #ef4444, #b91c1c)', color: 'white',        icon: <FiAlertCircle size={14} />,  text: 'Error sending message. Please try again.' },
  };

  const btn = btnConfig[status];

  return (
    <section id="contact" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">06 — Contact</span>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16 items-start mt-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight font-sora">
            Let's build something amazing.
          </h2>
          <p className="text-sm font-light leading-relaxed mb-8" style={{ color: 'var(--text2)' }}>
            Open to freelance projects, full-time opportunities, and discussions about technology.
            If you have an interesting problem, I'd be happy to discuss solutions.
          </p>
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors duration-200 py-1"
                style={{ color: 'var(--text2)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text2)')}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ border: '0.5px solid var(--border)' }}
                >
                  {link.icon}
                </div>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl p-8 relative overflow-hidden gradient-border-top"
          style={{ background: 'var(--bg3)', border: '0.5px solid var(--border)' }}
        >
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-mono" style={{ color: 'var(--text3)' }}>
                Name
              </label>
              <input
                type="text"
                name="from_name"
                placeholder="Your full name"
                value={form.from_name}
                onChange={(e) => setForm({ ...form, from_name: e.target.value })}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(0,194,255,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,194,255,0.05)'; }}
                onBlur={(e)  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                required
                disabled={status === 'loading'}
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-mono" style={{ color: 'var(--text3)' }}>
                Email
              </label>
              <input
                type="email"
                name="from_email"
                placeholder="your@email.com"
                value={form.from_email}
                onChange={(e) => setForm({ ...form, from_email: e.target.value })}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(0,194,255,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,194,255,0.05)'; }}
                onBlur={(e)  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                required
                disabled={status === 'loading'}
              />
            </div>

            {/* Mensagem */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-mono" style={{ color: 'var(--text3)' }}>
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell me about the project or opportunity..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, height: '130px', resize: 'none' }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(0,194,255,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,194,255,0.05)'; }}
                onBlur={(e)  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                required
                disabled={status === 'loading'}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 rounded font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: btn.bg,
                color: btn.color,
                opacity: status === 'loading' ? 0.7 : 1,
                cursor: status === 'loading' ? 'not-allowed' : 'none',
              }}
              onMouseEnter={(e) => {
                if (status === 'idle') {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,194,255,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Loading spinner */}
              {status === 'loading' && (
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              )}
              {btn.icon && status !== 'loading' && btn.icon}
              {btn.text}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
