import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

function OrbCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 340, H = 340, CX = W / 2, CY = H / 2;
    const particles = [];

    for (let i = 0; i < 150; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 100 + Math.random() * 25;
      particles.push({
        theta, phi, r,
        speed: 0.002 + Math.random() * 0.004,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.2,
      });
    }

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - CX) / CX;
      mouseY = (e.clientY - rect.top - CY) / CY;
    };
    document.addEventListener('mousemove', onMouseMove);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Core glow
      const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, 130);
      grad.addColorStop(0, 'rgba(0,194,255,0.07)');
      grad.addColorStop(0.5, 'rgba(124,58,237,0.04)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Wireframe rings
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(CX, CY, 50 + i * 22, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,194,255,${0.035 - i * 0.005})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Particles
      particles.forEach((p) => {
        p.theta += p.speed + mouseX * 0.001;
        const x3 = p.r * Math.sin(p.phi) * Math.cos(p.theta);
        const y3 = p.r * Math.sin(p.phi) * Math.sin(p.theta);
        const z3 = p.r * Math.cos(p.phi);
        const scale = 1 + z3 / 280;
        const px = CX + x3 * scale;
        const py = CY + y3 * scale;
        const depth = (z3 + p.r) / (p.r * 2);
        ctx.beginPath();
        ctx.arc(px, py, p.size * depth, 0, Math.PI * 2);
        ctx.fillStyle = z3 > 0
          ? `rgba(0,194,255,${p.opacity * depth})`
          : `rgba(124,58,237,${p.opacity * depth * 0.6})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative" style={{ width: 340, height: 340 }}>
      {/* Rings */}
      <div className="absolute animate-spin-slow rounded-full pointer-events-none"
        style={{ inset: '-20px', border: '1px solid rgba(0,194,255,0.08)' }} />
      <div className="absolute animate-spin-rev rounded-full pointer-events-none"
        style={{ inset: '-40px', border: '1px solid rgba(124,58,237,0.06)' }} />
      <div className="absolute rounded-full pointer-events-none"
        style={{ inset: '-10px', border: '1px solid rgba(0,255,200,0.05)', animation: 'spin-slow 15s linear infinite' }} />

      {/* Glow */}
      <div className="absolute rounded-full pointer-events-none"
        style={{ inset: 20, background: 'radial-gradient(circle, rgba(0,194,255,0.12) 0%, rgba(124,58,237,0.06) 50%, transparent 70%)', filter: 'blur(20px)' }} />

      <canvas ref={canvasRef} width={340} height={340} className="relative z-10 rounded-full" />

      {/* Floating code snippets */}
      {[
        { text: 'FastAPI.post("/users")', style: { top: '8%', right: '-8%' }, delay: 0 },
        { text: 'async def handle():', style: { bottom: '12%', left: '-8%' }, delay: 1.5 },
        { text: 'return {"status": 200}', style: { top: '55%', right: '-20%' }, delay: 0.8 },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs pointer-events-none whitespace-nowrap"
          style={{ color: 'rgba(0,194,255,0.45)', ...item.style }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Hero() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 md:px-10"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,194,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.025) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute pointer-events-none"
          style={{ top: '-15%', right: '-5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(0,194,255,0.07) 0%, transparent 65%)' }}
        />
        <div className="absolute pointer-events-none"
          style={{ bottom: '-20%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center pt-20">
        {/* Left */}
        <div>
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="section-label mb-6"
          >
            {personalInfo.role}
          </motion.div>

          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 font-sora"
          >
            Building{' '}
            <span style={{ color: 'var(--accent)' }}>scalable</span>, fast,{' '}
            and elegant software.
          </motion.h1>

          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="text-base md:text-lg mb-10 font-light leading-relaxed"
            style={{ color: 'var(--text2)', maxWidth: 480 }}
          >
            {personalInfo.subtitle}
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex gap-4 flex-wrap">
            <button
              onClick={() => scrollTo('#projects')}
              className="px-7 py-3 rounded font-bold text-sm tracking-wide transition-all duration-200"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(0,194,255,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
            >
              View Projects →
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="px-7 py-3 rounded font-semibold text-sm tracking-wide transition-all duration-200"
              style={{ border: '1px solid rgba(0,194,255,0.3)', color: 'var(--text)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'rgba(0,194,255,0.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0,194,255,0.3)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'transparent'; }}
            >
              Get in Touch
            </button>
          </motion.div>
        </div>

        {/* Right - Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex justify-center items-center"
        >
          <OrbCanvas />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div
          className="animate-scroll"
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, var(--accent))' }}
        />
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text3)' }}>scroll</span>
      </motion.div>
    </section>
  );
}
