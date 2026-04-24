import { useState } from 'react';
import { ExternalLink, Github, Linkedin, Play, Orbit } from 'lucide-react';
import { personalInfo, heroStats } from '../data/portfolio';
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';
import VideoModal from '../components/VideoModal';

/* ─── Stat item ─────────────────────────────────────────────── */
const StatItem = ({ target, label, isActive }: { target: number; label: string; isActive: boolean }) => {
  const count = useCountUp(target, isActive);
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="stat-num">{count}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

/* ─── Hero ───────────────────────────────────────────────────── */
const HeroSection = () => {
  const [videoOpen,    setVideoOpen]    = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const { ref, isVisible } = useScrollReveal(0.05);

  const hasPoster = !!personalInfo.videoPoster && !posterFailed;

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display:   'flex',
        alignItems:'center',
        padding:   '8rem 2.5rem 5rem',
        position:  'relative',
        zIndex:    2,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>

          {/* ── Left: Text composition ────────────────────────── */}
          <div style={{ flex: '1 1 480px', minWidth: 0 }}>

            {/* Open/research tag */}
            <div
              className="fade-up fade-up-1"
              style={{
                display:     'inline-flex',
                alignItems:  'center',
                gap:         '0.6rem',
                background:  'rgba(var(--cyan-rgb), 0.07)',
                border:      '1px solid var(--border-color)',
                borderRadius:'2rem',
                padding:     '0.4rem 1.1rem',
                marginBottom:'1.75rem',
              }}
            >
              <span className="pulse-dot" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan)', letterSpacing: '0.04em' }}>
                {personalInfo.statusTag}
              </span>
            </div>

            {/* Name block */}
            <h1
              className="fade-up fade-up-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize:   'clamp(2.1rem, 5.5vw, 4.4rem)', /* Smaller max to prevent wrapping of Md. Zubayer Ahmad */
                lineHeight: 1.05,
                marginBottom: '0.8rem',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap', /* Force no wrapping inside the individual lines */
              }}
            >
              {/* Line 1 — tri-color glitch (white base + two accent layers) */}
              <span
                className="glitch"
                data-text={personalInfo.nameFirst}
                style={{ display: 'block', color: 'var(--white)' }}
              >
                {personalInfo.nameFirst}
              </span>

              {/* Line 2 — outline / ghost style, with themed accent period */}
              <span
                style={{
                  display:          'block',
                  color:            'transparent',
                  WebkitTextStroke: '1.5px rgba(var(--cyan-rgb), 0.35)',
                }}
              >
                {personalInfo.nameLast}
                <span style={{ WebkitTextStroke: '1.5px var(--gold)', color: 'transparent' }}>.</span>
              </span>
            </h1>

            {/* Role subtitle */}
            <p
              className="fade-up fade-up-3"
              style={{
                fontSize:    'clamp(1rem, 2vw, 1.15rem)',
                color:       'var(--muted)',
                fontWeight:  300,
                marginBottom:'0.55rem',
              }}
            >
              {personalInfo.tagline}
            </p>

            {/* Description */}
            <p
              className="fade-up fade-up-4"
              style={{
                fontSize:    '0.95rem',
                color:       'var(--muted)',
                lineHeight:  1.65,
                maxWidth:    '520px',
                marginBottom:'2.2rem',
              }}
            >
              {personalInfo.description}
            </p>

            {/* CTA row */}
            <div
              className="fade-up fade-up-5"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}
            >
              <a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink size={14} /> View CV
              </a>
              <a href={personalInfo.socials.orcid} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Orbit size={14} /> ORCID
              </a>
              <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Github size={14} /> GitHub
              </a>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>

            {/* Stat row */}
            <div
              ref={ref}
              className="fade-up fade-up-6"
              style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap:                 '1rem',
                padding:             '1.5rem 1rem',
                background:          'rgba(var(--cyan-rgb), 0.04)',
                border:              '1px solid var(--border-color)',
                borderRadius:        '0.75rem',
                maxWidth:            '520px',
              }}
            >
              {heroStats.map(s => (
                <StatItem key={s.label} target={s.target} label={s.label} isActive={isVisible} />
              ))}
            </div>
          </div>

          {/* ── Right: Video launcher ─────────────────────────── */}
          <div className="fade-up fade-up-7 hero-video-col" style={{ flex: '0 0 280px', maxWidth: '280px' }}>
            <button
              onClick={() => setVideoOpen(true)}
              aria-label={`Play ${personalInfo.videoLabel}`}
              className="hero-video-btn"
            >
              {/* 16:9 launcher frame */}
              <div className="hero-video-frame">

                {/* Optional poster image */}
                {hasPoster && (
                  <img
                    src={personalInfo.videoPoster}
                    alt=""
                    aria-hidden="true"
                    onError={() => setPosterFailed(true)}
                    style={{
                      position:   'absolute',
                      inset:      0,
                      width:      '100%',
                      height:     '100%',
                      objectFit:  'cover',
                      opacity:    0.45,
                    }}
                  />
                )}

                {/* Decorative grid overlay */}
                <div
                  aria-hidden="true"
                  style={{
                    position:        'absolute',
                    inset:           0,
                    backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px),
                                      linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
                    backgroundSize:  '32px 32px',
                    opacity:         hasPoster ? 0.25 : 0.5,
                  }}
                />

                {/* Radial glow */}
                <div
                  aria-hidden="true"
                  style={{
                    position:   'absolute',
                    inset:      0,
                    background: 'radial-gradient(ellipse at center, rgba(var(--cyan-rgb), 0.1) 0%, transparent 65%)',
                  }}
                />

                {/* Play button + label */}
                <div
                  style={{
                    position:       'absolute',
                    inset:          0,
                    display:        'flex',
                    flexDirection:  'column',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            '0.75rem',
                  }}
                >
                  <div className="hero-play-ring">
                    <Play size={28} fill="var(--cyan)" stroke="none" style={{ marginLeft: '4px' }} />
                  </div>
                  <span
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.65rem',
                      color:         'var(--muted)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Watch
                  </span>
                </div>
              </div>

              {/* Caption below frame */}
              <p
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.72rem',
                  color:         'var(--muted)',
                  marginTop:     '0.75rem',
                  textAlign:     'center',
                  letterSpacing: '0.04em',
                }}
              >
                {personalInfo.videoLabel}
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>

      <VideoModal
        url={personalInfo.videoUrl}
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />

      {/* ── Scoped hero styles ────────────────────────────────── */}
      <style>{`
        .hero-video-btn {
          width:      100%;
          background: none;
          border:     none;
          padding:    0;
          cursor:     none;
          display:    block;
          text-align: left;
        }
        .hero-video-frame {
          position:     relative;
          aspect-ratio: 16 / 9;
          background:   var(--bg3);
          border:       1px solid var(--border-color);
          border-radius:1rem;
          overflow:     hidden;
          transition:   border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hero-video-btn:hover .hero-video-frame {
          border-color: rgba(var(--cyan-rgb), 0.45);
          transform:    translateY(-4px);
          box-shadow:   0 12px 40px rgba(var(--cyan-rgb), 0.18);
        }
        .hero-play-ring {
          width:           72px;
          height:          72px;
          border-radius:   50%;
          background:      rgba(var(--cyan-rgb), 0.12);
          border:          1.5px solid rgba(var(--cyan-rgb), 0.5);
          display:         flex;
          align-items:     center;
          justify-content: center;
          box-shadow:      0 0 28px rgba(var(--cyan-rgb), 0.22);
          transition:      transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .hero-video-btn:hover .hero-play-ring {
          transform:  scale(1.12);
          background: rgba(var(--cyan-rgb), 0.22);
          box-shadow: 0 0 44px rgba(var(--cyan-rgb), 0.35);
        }
        /* Hide video column on very small screens */
        @media (max-width: 560px) {
          .hero-video-col { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
