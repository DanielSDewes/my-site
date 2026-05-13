import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

function LucideIcon({ name, ...props }) {
  const Icon = LucideIcons[name];
  return Icon ? <Icon {...props} /> : null;
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const SNIPPETS = [
  {
    id: 'python',
    lang: 'Python',
    color: '#3B82F6',
    difficulty: 'Medium',
    description: 'Fibonacci generator using yield',
    code: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

list(fibonacci(10))`,
  },
  {
    id: 'fastapi',
    lang: 'FastAPI',
    color: '#00C2FF',
    difficulty: 'Hard',
    description: 'User creation endpoint with auth',
    code: `@app.post("/users", status_code=201)
async def create_user(
    user: UserSchema,
    db: Session = Depends(get_db),
    token: str = Depends(verify_token)
):
    return await user_service.create(db, user)`,
  },
  {
    id: 'sql',
    lang: 'SQL',
    color: '#10B981',
    difficulty: 'Medium',
    description: 'Aggregation with JOIN and ranking',
    code: `SELECT u.name,
       COUNT(o.id) AS total_orders,
       SUM(o.amount) AS revenue
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.name
ORDER BY revenue DESC
LIMIT 10;`,
  },
  {
    id: 'react',
    lang: 'React',
    color: '#61DAFB',
    difficulty: 'Easy',
    description: 'Custom useFetch hook',
    code: `const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); });
  }, [url]);

  return { data, loading };
};`,
  },
  {
    id: 'js',
    lang: 'JavaScript',
    color: '#F59E0B',
    difficulty: 'Easy',
    description: 'Debounce utility function',
    code: `const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const search = debounce(query, 300);`,
  },
  {
    id: 'docker',
    lang: 'Dockerfile',
    color: '#2496ED',
    difficulty: 'Hard',
    description: 'Production FastAPI container',
    code: `FROM python:3.11-slim AS base
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
  },
];

const RANKS = [
  { min: 0,   label: 'Intern',        icon: 'Baby', color: '#94a3b8' },
  { min: 25,  label: 'Junior Dev',    icon: 'Leaf', color: '#F59E0B' },
  { min: 45,  label: 'Mid-Level',     icon: 'Laptop', color: '#8B5CF6' },
  { min: 65,  label: 'Senior Dev',    icon: 'Zap', color: '#00C2FF' },
  { min: 90,  label: 'Tech Lead',     icon: 'Rocket', color: '#00FFC8' },
  { min: 120, label: 'Elite Coder',   icon: 'Trophy', color: '#FFD700' },
];

const getRank = (wpm) => [...RANKS].reverse().find(r => wpm >= r.min) || RANKS[0];

const DIFFICULTY_COLOR = { Easy: '#00FFC8', Medium: '#F59E0B', Hard: '#ef4444' };

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const fmtTime = (ms) => {
  const s = ms / 1000;
  return s < 60 ? `${s.toFixed(1)}s` : `${Math.floor(s/60)}m ${(s%60).toFixed(0)}s`;
};

const calcWpm = (charsTyped, startMs) => {
  const elapsed = (Date.now() - startMs) / 60000;
  return elapsed > 0 ? Math.round((charsTyped / 5) / elapsed) : 0;
};

const calcAccuracy = (typed, target) => {
  if (!typed.length) return 100;
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === target[i]) correct++;
  }
  return Math.round((correct / typed.length) * 100);
};

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

/** Blinking cursor caret */
function Caret() {
  return (
    <span
      className="inline-block w-0.5 h-4 relative top-0.5 align-middle animate-blink"
      style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)', marginLeft: 1 }}
    />
  );
}

/** Code display with per-char coloring */
function CodeDisplay({ target, typed, shake }) {
  return (
    <pre
      className={`font-mono text-sm leading-7 whitespace-pre-wrap select-none ${shake ? 'animate-shake' : ''}`}
      style={{ fontFamily: "'JetBrains Mono', monospace", tabSize: 4 }}
    >
      {target.split('').map((char, i) => {
        const isTyped = i < typed.length;
        const isCursor = i === typed.length;
        const isCorrect = isTyped && typed[i] === char;
        const isError = isTyped && typed[i] !== char;

        return (
          <span
            key={i}
            className={isCorrect ? 'char-correct' : isError ? 'char-error' : 'char-pending'}
            style={isCursor ? { position: 'relative' } : {}}
          >
            {isCursor && <Caret />}
            {char === '\n' ? (
              <span style={{ opacity: 0.2 }}>↵{'\n'}</span>
            ) : (
              char
            )}
          </span>
        );
      })}
      {typed.length === target.length && <Caret />}
    </pre>
  );
}

/** Stat pill */
function StatPill({ label, value, highlight }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl px-5 py-3 min-w-[80px]"
      style={{
        background: highlight ? 'rgba(0,194,255,0.06)' : 'var(--bg4)',
        border: `0.5px solid ${highlight ? 'rgba(0,194,255,0.25)' : 'var(--border)'}`,
      }}
    >
      <span
        className="text-xl font-extrabold font-mono leading-none"
        style={{ color: highlight ? 'var(--accent)' : 'var(--text)' }}
      >
        {value}
      </span>
      <span className="text-xs uppercase tracking-widest font-mono mt-1" style={{ color: 'var(--text3)' }}>
        {label}
      </span>
    </div>
  );
}

/** Language tab button */
function LangTab({ snippet, active, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0"
      style={{
        background: active ? `${snippet.color}18` : 'transparent',
        border: `0.5px solid ${active ? snippet.color : 'var(--border)'}`,
        color: active ? snippet.color : 'var(--text3)',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: active ? snippet.color : 'var(--text3)' }}
      />
      {snippet.lang}
      <span
        className="hidden sm:inline px-1.5 py-0.5 rounded text-xs"
        style={{
          background: `${DIFFICULTY_COLOR[snippet.difficulty]}18`,
          color: DIFFICULTY_COLOR[snippet.difficulty],
          fontSize: 9,
          border: `0.5px solid ${DIFFICULTY_COLOR[snippet.difficulty]}40`,
        }}
      >
        {snippet.difficulty}
      </span>
    </button>
  );
}

/** Keyboard shortcut hint */
function KbdHint({ keys, label }) {
  return (
    <span className="flex items-center gap-1 text-xs font-mono" style={{ color: 'var(--text3)' }}>
      {keys.map(k => (
        <kbd
          key={k}
          className="px-1.5 py-0.5 rounded text-xs"
          style={{ background: 'var(--bg3)', border: '0.5px solid var(--border)', color: 'var(--text2)' }}
        >
          {k}
        </kbd>
      ))}
      <span>{label}</span>
    </span>
  );
}

/** Floating +score particle */
function ScoreParticle({ id, text, x, y, color }) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="absolute pointer-events-none font-mono font-bold text-sm z-50"
      style={{ left: x, top: y, color }}
    >
      {text}
    </motion.div>
  );
}

/** Combo display */
function ComboDisplay({ combo }) {
  if (combo < 5) return null;
  const colors = combo >= 20 ? '#FFD700' : combo >= 10 ? '#00FFC8' : 'var(--accent)';
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={combo}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="flex items-center gap-2 font-mono text-sm font-bold"
        style={{ color: colors }}
      >
        <LucideIcon name="Flame" size={18} />
        <span>{combo}x COMBO</span>
      </motion.div>
    </AnimatePresence>
  );
}

/** Progress bar */
function ProgressBar({ pct, wpm }) {
  return (
    <div className="relative">
      <div className="flex justify-between text-xs font-mono mb-1.5" style={{ color: 'var(--text3)' }}>
        <span>{Math.round(pct)}% complete</span>
        <span style={{ color: 'var(--accent)' }}>{wpm} WPM</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #00C2FF, #7C3AED, #00FFC8)' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.12 }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function CodeRacer() {
  const [screen, setScreen] = useState('intro');       // intro | countdown | playing | result
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [shake, setShake] = useState(false);
  const [particles, setParticles] = useState([]);
  const [score, setScore] = useState(0);
  const [bestWpm, setBestWpm] = useState(() => {
    try { return parseInt(localStorage.getItem('cr_best') || '0'); } catch { return 0; }
  });
  const [totalErrors, setTotalErrors] = useState(0);

  const codeAreaRef = useRef(null);
  const timerRef = useRef(null);
  const particleId = useRef(0);
  const lastComboRef = useRef(0);

  const snippet = SNIPPETS[snippetIdx];
  const target = snippet.code;
  const progress = Math.min((typed.length / target.length) * 100, 100);

  // ── Focus code area on click anywhere in it
  useEffect(() => {
    if (screen === 'playing') codeAreaRef.current?.focus();
  }, [screen]);

  // ── Live WPM ticker
  useEffect(() => {
    if (screen !== 'playing' || !startTime) return;
    timerRef.current = setInterval(() => {
      setWpm(calcWpm(typed.length, startTime));
      setElapsedMs(Date.now() - startTime);
    }, 150);
    return () => clearInterval(timerRef.current);
  }, [screen, startTime, typed.length]);

  // ── Countdown
  useEffect(() => {
    if (screen !== 'countdown') return;
    setCountdown(3);
    const iv = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(iv);
          setScreen('playing');
          setStartTime(Date.now());
          setTimeout(() => codeAreaRef.current?.focus(), 60);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [screen]);

  // ── Spawn particle at cursor
  const spawnParticle = useCallback((text, color = 'var(--accent3)') => {
    if (!codeAreaRef.current) return;
    const rect = codeAreaRef.current.getBoundingClientRect();
    setParticles(p => [...p.slice(-6), {
      id: particleId.current++,
      text,
      x: Math.random() * 80 + 40,
      y: Math.random() * 20,
      color,
    }]);
    setTimeout(() => setParticles(p => p.slice(1)), 800);
  }, []);

  // ── Triggerred shake
  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 320);
  }, []);

  // ── Core keydown handler
  const handleKeyDown = useCallback((e) => {
    if (screen !== 'playing') return;

    const expected = target[typed.length];
    if (expected === undefined) return;

    if (e.key === 'Escape') { e.preventDefault(); resetGame(); return; }
    if (e.key === 'Tab') { e.preventDefault(); processChar('    '); return; }
    if (e.key === 'Backspace') {
      e.preventDefault();
      setTyped(t => t.slice(0, -1));
      setCombo(0);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (expected === '\n') processChar('\n');
      else errorChar();
      return;
    }
    if (e.key.length === 1) {
      e.preventDefault();
      processChar(e.key);
    }
  }, [screen, typed, target]);

  const processChar = useCallback((input) => {
    let newTyped = typed;
    let newErrors = totalErrors;
    let newCombo = combo;
    let newScore = score;

    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      const exp = target[newTyped.length];
      if (!exp) break;

      if (ch === exp) {
        newTyped += ch;
        newCombo++;
        // Bonus scoring
        const bonus = newCombo >= 20 ? 3 : newCombo >= 10 ? 2 : 1;
        newScore += 10 * bonus;
        if (newCombo > 0 && newCombo % 10 === 0) spawnParticle(`🔥 +${newCombo}`, '#FFD700');
        else if (newCombo > 0 && newCombo % 5 === 0) spawnParticle('+' + (10 * bonus), 'var(--accent3)');
      } else {
        newErrors++;
        newCombo = 0;
        newTyped += ch;
        triggerShake();
        spawnParticle('✕', '#ef4444');
      }
    }

    setTyped(newTyped);
    setCombo(newCombo);
    setMaxCombo(m => Math.max(m, newCombo));
    setTotalErrors(newErrors);
    setScore(newScore);
    setAccuracy(calcAccuracy(newTyped, target));

    // Finished?
    if (newTyped.length >= target.length) {
      clearInterval(timerRef.current);
      const elapsed = (Date.now() - startTime) / 60000;
      const finalWpm = Math.round((target.length / 5) / elapsed);
      setWpm(finalWpm);
      const finalAcc = calcAccuracy(newTyped, target);
      setAccuracy(finalAcc);
      const finalScore = newScore + Math.round(finalWpm * (finalAcc / 100) * 10);
      setScore(finalScore);
      if (finalWpm > bestWpm) {
        setBestWpm(finalWpm);
        try { localStorage.setItem('cr_best', String(finalWpm)); } catch {}
      }
      setTimeout(() => setScreen('result'), 300);
    }
  }, [typed, target, combo, score, totalErrors, startTime, bestWpm, triggerShake, spawnParticle]);

  const errorChar = useCallback(() => {
    setTotalErrors(e => e + 1);
    setCombo(0);
    triggerShake();
  }, [triggerShake]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const resetGame = () => {
    clearInterval(timerRef.current);
    setTyped(''); setErrors(0); setAccuracy(100); setWpm(0);
    setElapsedMs(0); setStartTime(null); setCombo(0);
    setMaxCombo(0); setScore(0); setTotalErrors(0);
    setParticles([]);
    setScreen('intro');
  };
  // alias for internal use
  const setErrors = setTotalErrors;

  const startGame = (idx = snippetIdx) => {
    clearInterval(timerRef.current);
    setTyped(''); setTotalErrors(0); setAccuracy(100); setWpm(0);
    setElapsedMs(0); setStartTime(null); setCombo(0);
    setMaxCombo(0); setScore(0); setParticles([]);
    setSnippetIdx(idx);
    setScreen('countdown');
  };

  const nextSnippet = () => startGame((snippetIdx + 1) % SNIPPETS.length);

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <section id="game" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <span className="section-label">07 — Mini Game</span>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight font-sora mb-3">
          Code<span style={{ color: 'var(--accent)' }}>Racer</span>.
        </h2>
        <p className="text-base font-light max-w-xl leading-relaxed" style={{ color: 'var(--text2)' }}>
          How fast can you type real code? Race through actual snippets from my stack,
          earn combos, and find out your developer speed rank.
        </p>
      </motion.div>

      {/* Game shell */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg3)', border: '0.5px solid var(--border)' }}
      >
        {/* Top gradient bar */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, #00C2FF, #7C3AED, #00FFC8)' }} />

        {/* ── TOOLBAR ── */}
        <div
          className="flex items-center justify-between gap-3 px-5 py-3 overflow-x-auto"
          style={{ background: 'var(--bg4)', borderBottom: '0.5px solid var(--border)' }}
        >
          {/* Language tabs */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {SNIPPETS.map((s, i) => (
              <LangTab
                key={s.id}
                snippet={s}
                active={snippetIdx === i}
                disabled={screen !== 'intro'}
                onClick={() => setSnippetIdx(i)}
              />
            ))}
          </div>

          {/* Best WPM badge */}
          <div
            className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs"
            style={{ background: 'rgba(0,194,255,0.05)', border: '0.5px solid rgba(0,194,255,0.15)' }}
          >
            <span style={{ color: 'var(--text3)' }}>🏆 Best</span>
            <span className="font-bold" style={{ color: 'var(--accent)' }}>{bestWpm} WPM</span>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="p-5 md:p-8">
          <AnimatePresence mode="wait">

            {/* ─────── INTRO ─────── */}
            {screen === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Snippet info bar */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: snippet.color }}
                    />
                    <span className="font-mono text-sm font-semibold" style={{ color: snippet.color }}>
                      {snippet.lang}
                    </span>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-mono font-semibold"
                    style={{
                      background: `${DIFFICULTY_COLOR[snippet.difficulty]}15`,
                      color: DIFFICULTY_COLOR[snippet.difficulty],
                      border: `0.5px solid ${DIFFICULTY_COLOR[snippet.difficulty]}40`,
                    }}
                  >
                    {snippet.difficulty}
                  </span>
                  <span className="text-xs font-mono" style={{ color: 'var(--text3)' }}>
                    {snippet.description}
                  </span>
                  <span className="text-xs font-mono ml-auto" style={{ color: 'var(--text3)' }}>
                    {snippet.code.length} chars
                  </span>
                </div>

                {/* Code preview */}
                <div
                  className="rounded-xl p-5 mb-6 relative overflow-hidden"
                  style={{ background: 'var(--bg4)', border: '0.5px solid var(--border)' }}
                >
                  <div className="scanline" />
                  {/* Window dots */}
                  <div className="flex gap-1.5 mb-4">
                    {['#ef4444','#F59E0B','#00C2FF'].map(c => (
                      <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.6 }} />
                    ))}
                  </div>
                  <pre
                    className="font-mono text-sm leading-7 whitespace-pre-wrap"
                    style={{ color: 'var(--text3)', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {snippet.code}
                  </pre>
                </div>

                {/* How to play */}
                <div
                  className="rounded-xl p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3"
                  style={{ background: 'var(--bg4)', border: '0.5px solid var(--border)' }}
                >
                  {[
                    { icon: 'Keyboard', title: 'Type the code', desc: 'Reproduce every character exactly' },
                    { icon: 'Flame', title: 'Build combos', desc: 'Consecutive hits = score multiplier' },
                    { icon: 'Clock', title: 'WPM counted', desc: 'Words per minute tracked live' },
                    { icon: 'Award', title: 'Earn your rank', desc: 'From Intern to Elite Coder' },
                  ].map(item => (
                    <div key={item.title} className="flex flex-col gap-1">
                      <span className="text-base"><LucideIcon name={item.icon} size={18} /></span>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{item.title}</span>
                      <span className="text-xs font-light" style={{ color: 'var(--text3)' }}>{item.desc}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => startGame(snippetIdx)}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #00C2FF, #7C3AED)', color: 'white' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,194,255,0.3)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <span>▶</span> Start Race
                  </button>
                  <p className="text-xs font-mono" style={{ color: 'var(--text3)' }}>
                    Pick a snippet above, then race
                  </p>
                </div>
              </motion.div>
            )}

            {/* ─────── COUNTDOWN ─────── */}
            {screen === 'countdown' && (
              <motion.div
                key="countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 gap-5"
              >
                <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text3)' }}>
                  Get ready to type…
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={countdown}
                    initial={{ scale: 0.4, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
                    className="font-extrabold font-mono"
                    style={{
                      fontSize: 'clamp(5rem, 15vw, 9rem)',
                      color: 'var(--accent)',
                      textShadow: '0 0 60px rgba(0,194,255,0.5)',
                      lineHeight: 1,
                    }}
                  >
                    {countdown}
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: snippet.color }}
                  />
                  <span className="font-mono text-sm" style={{ color: snippet.color }}>
                    {snippet.lang} · {snippet.difficulty}
                  </span>
                </div>
              </motion.div>
            )}

            {/* ─────── PLAYING ─────── */}
            {screen === 'playing' && (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Live stats row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <StatPill label="WPM" value={wpm} highlight />
                    <StatPill label="ACC" value={`${accuracy}%`} />
                    <StatPill label="TIME" value={fmtTime(elapsedMs)} />
                    <StatPill label="SCORE" value={score} />
                  </div>
                  <ComboDisplay combo={combo} />
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <ProgressBar pct={progress} wpm={wpm} />
                </div>

                {/* Code area */}
                <div
                  className="rounded-xl p-5 mb-4 relative overflow-hidden"
                  style={{
                    background: 'var(--bg4)',
                    border: `0.5px solid ${shake ? 'rgba(239,68,68,0.4)' : 'var(--border)'}`,
                    transition: 'border-color 0.15s',
                    outline: 'none',
                  }}
                  ref={codeAreaRef}
                  tabIndex={0}
                  onClick={() => codeAreaRef.current?.focus()}
                >
                  <div className="scanline" />
                  {/* Window dots */}
                  <div className="flex gap-1.5 mb-4">
                    {['#ef4444','#F59E0B','#00C2FF'].map(c => (
                      <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.6 }} />
                    ))}
                    <span className="ml-auto font-mono text-xs" style={{ color: snippet.color }}>
                      {snippet.lang}
                    </span>
                  </div>

                  {/* Score particles */}
                  {particles.map(p => <ScoreParticle key={p.id} {...p} />)}

                  <CodeDisplay target={target} typed={typed} shake={shake} />
                </div>

                {/* Bottom controls bar */}
                <div
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3"
                  style={{ background: 'var(--bg4)', border: '0.5px solid var(--border)' }}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <KbdHint keys={['Tab']} label="= 4 spaces" />
                    <KbdHint keys={['Enter']} label="= new line" />
                    <KbdHint keys={['←']} label="= backspace" />
                    <KbdHint keys={['Esc']} label="= quit" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: 'var(--text3)' }}>
                      {typed.length}<span style={{ color: 'var(--text3)', opacity: 0.5 }}>/{target.length}</span>
                    </span>
                    <button
                      onClick={resetGame}
                      className="text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5"
                      style={{ color: 'var(--text3)', border: '0.5px solid var(--border)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                      <LucideIcon name="X" size={14} /> Quit
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─────── RESULT ─────── */}
            {screen === 'result' && (() => {
              const rank = getRank(wpm);
              const isNewBest = wpm >= bestWpm;
              return (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Rank hero */}
                  <div
                    className="rounded-2xl p-6 md:p-8 mb-6 text-center relative overflow-hidden"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${rank.color}12 0%, transparent 70%), var(--bg4)`,
                      border: `0.5px solid ${rank.color}40`,
                    }}
                  >
                    <div className="scanline" />
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, delay: 0.1 }}
                      className="text-6xl mb-3"
                    >
                      <LucideIcon name={rank.icon} size={52} />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl font-extrabold font-mono mb-1"
                      style={{ color: rank.color }}
                    >
                      {rank.label}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="font-mono text-sm"
                      style={{ color: 'var(--text3)' }}
                    >
                      {isNewBest ? (
                        <span className="inline-flex items-center gap-1">
                          <LucideIcon name="Trophy" size={14} /> New personal best! Keep it up!
                        </span>
                      ) : (
                        `Personal best: ${bestWpm} WPM — keep pushing!`
                      )}
                    </motion.p>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: 'WPM',       value: wpm,           color: 'var(--accent)' },
                      { label: 'Accuracy',  value: `${accuracy}%`, color: accuracy >= 95 ? '#00FFC8' : accuracy >= 80 ? '#F59E0B' : '#ef4444' },
                      { label: 'Time',      value: fmtTime(elapsedMs), color: 'var(--text)' },
                      { label: 'Score',     value: score,         color: '#FFD700' },
                      { label: 'Errors',    value: totalErrors,   color: totalErrors === 0 ? '#00FFC8' : '#ef4444' },
                      { label: 'Max Combo', value: `${maxCombo}x`, color: maxCombo >= 20 ? '#FFD700' : maxCombo >= 10 ? '#00FFC8' : 'var(--text2)' },
                      { label: 'Chars',     value: target.length, color: 'var(--text2)' },
                      { label: 'Snippet',   value: snippet.lang,  color: snippet.color },
                    ].map(({ label, value, color }) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + Math.random() * 0.2 }}
                        className="rounded-xl p-4 text-center"
                        style={{ background: 'var(--bg4)', border: '0.5px solid var(--border)' }}
                      >
                        <div className="text-xl font-extrabold font-mono mb-1" style={{ color }}>
                          {value}
                        </div>
                        <div className="text-xs uppercase tracking-widest font-mono" style={{ color: 'var(--text3)' }}>
                          {label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Rank progress bar */}
                  <div
                    className="rounded-xl p-4 mb-6"
                    style={{ background: 'var(--bg4)', border: '0.5px solid var(--border)' }}
                  >
                    <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--text3)' }}>
                      Developer speed rank
                    </p>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      {RANKS.map(r => (
                        <span key={r.label} style={{ color: wpm >= r.min ? r.color : 'var(--text3)' }}>
                          <LucideIcon name={r.icon} size={16} />
                        </span>
                      ))}
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, #00C2FF, #7C3AED, ${rank.color})` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((wpm / 140) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-mono mt-1.5" style={{ color: 'var(--text3)' }}>
                      {RANKS.map(r => (
                        <span key={r.label} style={{ color: wpm >= r.min ? r.color : 'var(--text3)', fontSize: 9 }}>
                          {r.min}+
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => startGame(snippetIdx)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200"
                      style={{ background: 'linear-gradient(135deg, #00C2FF, #7C3AED)', color: 'white' }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.boxShadow = '0 0 25px rgba(0,194,255,0.3)'; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <LucideIcon name="RotateCcw" size={16} /> Retry
                    </button>
                    <button
                      onClick={nextSnippet}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-200"
                      style={{ border: '0.5px solid rgba(0,194,255,0.3)', color: 'var(--accent)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,194,255,0.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <LucideIcon name="ArrowRight" size={16} /> Next Snippet
                    </button>
                    <button
                      onClick={resetGame}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-200"
                      style={{ border: '0.5px solid var(--border)', color: 'var(--text3)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                      <LucideIcon name="Menu" size={16} /> Menu
                    </button>
                  </div>
                </motion.div>
              );
            })()}

          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
