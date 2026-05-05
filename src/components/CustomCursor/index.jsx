import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const [isLink, setIsLink] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const onEnter = (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (['a', 'button'].includes(tag) || e.target.closest('a, button')) {
        setIsLink(true);
      }
    };
    const onLeave = () => setIsLink(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    let raf;
    const animate = () => {
      outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.1;
      outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.1;
      if (outerRef.current) {
        outerRef.current.style.left = outerPos.current.x + 'px';
        outerRef.current.style.top = outerPos.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200"
        style={{
          width: isLink ? '52px' : '32px',
          height: isLink ? '52px' : '32px',
          border: `1px solid ${isLink ? 'rgba(0,194,255,0.8)' : 'rgba(0,194,255,0.4)'}`,
          background: isLink ? 'rgba(0,194,255,0.05)' : 'transparent',
          mixBlendMode: 'screen',
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '4px',
          height: '4px',
          background: '#00C2FF',
          boxShadow: '0 0 6px rgba(0,194,255,0.8)',
        }}
      />
    </>
  );
}
