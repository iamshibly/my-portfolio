import { useEffect, useState, useRef } from 'react';
import { Palette, Check } from 'lucide-react';

/* ── Theme presets ────────────────────────────────────────────────
   Each preset lists the three accent colors so the switcher buttons
   can preview the palette without the page having to repaint first.
   ──────────────────────────────────────────────────────────────── */
interface Preset {
  id:      string;
  label:   string;
  swatch:  [string, string, string]; // [primary, secondary, tertiary]
}

const PRESETS: Preset[] = [
  { id: 'academic-navy',  label: 'Academic Navy',  swatch: ['#38bdf8', '#f59e0b', '#a78bfa'] },
  { id: 'scholar-indigo', label: 'Scholar Indigo', swatch: ['#818cf8', '#fbbf24', '#34d399'] },
  { id: 'oxford-maroon',  label: 'Oxford Maroon',  swatch: ['#f0b67f', '#f5e6d3', '#e11d48'] },
  { id: 'bangladesh',     label: 'Bangladesh',     swatch: ['#10b981', '#f59e0b', '#f43f5e'] },
  { id: 'mono-slate',     label: 'Mono Slate',     swatch: ['#94a3b8', '#e2e8f0', '#64748b'] },
];

const STORAGE_KEY = 'portfolio-theme';
const DEFAULT_THEME = 'academic-navy';

const readStoredTheme = (): string => {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    if (t && PRESETS.some(p => p.id === t)) return t;
  } catch { /* ignore */ }
  return DEFAULT_THEME;
};

const PaletteSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(DEFAULT_THEME);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Apply theme on mount */
  useEffect(() => {
    const stored = readStoredTheme();
    document.documentElement.setAttribute('data-theme', stored);
    setActive(stored);
  }, []);

  /* Close on outside click / Esc */
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const applyTheme = (id: string) => {
    document.documentElement.setAttribute('data-theme', id);
    try { localStorage.setItem(STORAGE_KEY, id); } catch { /* ignore */ }
    setActive(id);
  };

  return (
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        right: '1.25rem',
        bottom: '1.25rem',
        zIndex: 9997,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem',
      }}
    >
      {open && (
        <div
          role="dialog"
          aria-label="Color palette"
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border-color)',
            borderRadius: '0.9rem',
            padding: '0.85rem',
            minWidth: '240px',
            boxShadow: 'var(--glow), 0 12px 40px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--cyan)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            // Color Palette
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {PRESETS.map(p => {
              const isActive = active === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyTheme(p.id)}
                  aria-pressed={isActive}
                  className="palette-option"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.55rem 0.7rem',
                    background: isActive ? 'rgba(var(--cyan-rgb), 0.1)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--cyan)' : 'var(--border-color)'}`,
                    borderRadius: '0.55rem',
                    cursor: 'none',
                    color: 'var(--white)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    textAlign: 'left',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <span style={{ display: 'flex', gap: '0.25rem' }}>
                    {p.swatch.map((c, i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: c,
                          boxShadow: `0 0 0 1px rgba(0,0,0,0.25) inset`,
                        }}
                      />
                    ))}
                  </span>
                  <span style={{ flex: 1 }}>{p.label}</span>
                  {isActive && <Check size={14} style={{ color: 'var(--cyan)' }} />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label="Change color palette"
        aria-expanded={open}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'var(--bg2)',
          border: '1px solid var(--border-color)',
          color: 'var(--cyan)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'none',
          boxShadow: 'var(--glow)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <Palette size={18} />
      </button>
    </div>
  );
};

export default PaletteSwitcher;
