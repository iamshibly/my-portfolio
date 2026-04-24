import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    if ('ontouchstart' in window) return;

    const dot  = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;
      rafId = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      dot.classList.add('expanded');
      ring.classList.add('expanded');
    };

    const onLeave = () => {
      dot.classList.remove('expanded');
      ring.classList.remove('expanded');
    };

    const bindInteractive = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    window.addEventListener('mousemove', onMove);
    bindInteractive();
    rafId = requestAnimationFrame(tick);

    /* re-bind after any DOM mutation (new links added) */
    const observer = new MutationObserver(bindInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
    </>
  );
};

export default CustomCursor;
