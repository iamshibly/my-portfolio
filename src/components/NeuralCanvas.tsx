import { useEffect, useRef } from 'react';

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  phase: number;
  type: 'dot' | 'star' | 'square';
}

interface Comet {
  x: number; y: number;
  vx: number; vy: number;
  length: number;
  opacity: number;
  thickness: number;
  active: boolean;
}

interface Props {
  fixed?: boolean;
  nodeCount?: number;
  connectionDistance?: number;
  opacity?: number;
}

const NeuralCanvas = ({
  fixed = false,
  nodeCount = 100,
  connectionDistance = 140,
  opacity = 0.5,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let nodes: Node[] = [];
    const comet: Comet = { x: 0, y: 0, vx: 0, vy: 0, length: 0, opacity: 0, thickness: 2, active: false };
    let animId: number;
    let lastCometTime = 0;

    // Read the active theme's primary accent color (RGB triple) so the
    // canvas stays in sync with the palette switcher at runtime.
    const readCyanRgb = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--cyan-rgb')
        .trim();
      return raw || '56, 189, 248';
    };
    let cyanRgb = readCyanRgb();
    const themeObserver = new MutationObserver(() => { cyanRgb = readCyanRgb(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const types: ('dot' | 'star' | 'square')[] = ['dot', 'dot', 'dot', 'star', 'square'];
      
      nodes = Array.from({ length: nodeCount }, (_, idx) => {
        const isLarge = idx < Math.floor(nodeCount * 0.3);
        const types: ('dot' | 'star' | 'square')[] = ['dot', 'dot', 'dot', 'star', 'square'];
        return {
          x:     Math.random() * canvas.width,
          y:     Math.random() * canvas.height,
          vx:    (Math.random() - 0.5) * 0.35,
          vy:    (Math.random() - 0.5) * 0.35,
          r:     isLarge ? Math.random() * 2.5 + 2.5 : Math.random() * 1.5 + 0.5,
          phase: Math.random() * Math.PI * 2,
          type:  isLarge ? 'star' : types[Math.floor(Math.random() * types.length)],
        };
      });
    };

    const triggerComet = () => {
      comet.active = true;
      comet.x = Math.random() * canvas.width;
      comet.y = 0;
      comet.vx = 4 + Math.random() * 4;
      comet.vy = 4 + Math.random() * 4;
      comet.length = 100 + Math.random() * 150;
      comet.opacity = 1;
      comet.thickness = 1 + Math.random() * 2.5;
    };

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Comet Logic
      if (comet.active) {
        comet.x += comet.vx;
        comet.y += comet.vy;
        comet.opacity -= 0.005;

        if (comet.opacity <= 0 || comet.x > canvas.width || comet.y > canvas.height) {
          comet.active = false;
        } else {
          const grad = ctx.createLinearGradient(comet.x, comet.y, comet.x - comet.vx * 10, comet.y - comet.vy * 10);
          grad.addColorStop(0, `rgba(240, 248, 255, ${comet.opacity})`); // white-ish core
          grad.addColorStop(1, `rgba(${cyanRgb}, 0)`); // accent tail fade

          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = comet.thickness;
          ctx.lineCap = "round";
          ctx.moveTo(comet.x, comet.y);
          ctx.lineTo(comet.x - comet.vx * (comet.length / 10), comet.y - comet.vy * (comet.length / 10));
          ctx.stroke();
          
          // Comet head glow
          ctx.beginPath();
          ctx.arc(comet.x, comet.y, comet.thickness * 1.5 + 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 248, 255, ${comet.opacity})`;
          ctx.fill();
        }
      } else {
        // Trigger randomly every 7-15 seconds
        if (time - lastCometTime > 7000 + Math.random() * 8000) {
          triggerComet();
          lastCometTime = time;
        }
      }

      // Nodes movement
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * opacity * 0.8; // Brighter lines
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${cyanRgb}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = 0.6 + 0.5 * Math.sin(time * 0.002 + n.phase);
        const isLargeNode = n.r > 2.4;

        if (n.type === 'dot') {
          ctx.fillStyle = `rgba(${cyanRgb}, ${opacity * pulse * 1.5})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
          ctx.fill();
        } else if (n.type === 'square') {
          ctx.fillStyle = `rgba(${cyanRgb}, ${opacity * pulse * 1.5})`;
          ctx.fillRect(n.x - n.r, n.y - n.r, n.r * 2 * pulse, n.r * 2 * pulse);
        } else if (n.type === 'star') {
          if (isLargeNode) {
            // Large stars: bright white-cyan, with a glow effect
            const starAlpha = Math.min(1, 0.6 + 0.4 * pulse);
            ctx.fillStyle = `rgba(210, 240, 255, ${starAlpha})`;
            drawStar(n.x, n.y, 4, n.r * 1.6 * pulse, n.r * 0.55 * pulse);
            ctx.fill();
            // Add subtle glow around large stars
            const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
            grd.addColorStop(0, `rgba(${cyanRgb}, ${0.18 * pulse})`);
            grd.addColorStop(1, `rgba(${cyanRgb}, 0)`);
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = `rgba(${cyanRgb}, ${opacity * pulse * 1.5})`;
            drawStar(n.x, n.y, 4, n.r * 1.5 * pulse, n.r * 0.5 * pulse);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      themeObserver.disconnect();
    };
  }, [nodeCount, connectionDistance, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      fixed ? 'fixed' : 'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        fixed ? 0 : -1,
      }}
    />
  );
};

export default NeuralCanvas;
