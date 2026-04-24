import { ShieldCheck, Trophy, Medal, GraduationCap, Star, Sparkles, ExternalLink } from 'lucide-react';
import { certifications, awards } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

const AwardIcon = ({ icon }: { icon: string }) => {
  const props = { size: 20, strokeWidth: 1.5 };
  if (icon === 'trophy')     return <Trophy {...props} />;
  if (icon === 'medal')      return <Medal {...props} />;
  if (icon === 'graduation') return <GraduationCap {...props} />;
  if (icon === 'star')       return <Star {...props} />;
  return <Sparkles {...props} />;
};

const CertificationsSection = () => {
  const { ref: certsRef,  isVisible: certsVis  } = useScrollReveal(0.1);
  const { ref: awardsRef, isVisible: awardsVis } = useScrollReveal(0.1);

  return (
    <section id="certifications" className="section">
      <div className="section-inner">
        <p className="section-label">// Achievements</p>
        <h2 className="section-title">Certifications and <span>Awards</span></h2>

        {/* ── Certifications FIRST ─────────────────────────────── */}
        <p className="subsection-label">Certifications</p>
        <div ref={certsRef} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
          {certifications.map((cert, i) => (
            <div
              key={i}
              className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 4)}` : ''} ${certsVis ? 'visible' : ''}`}
              style={{
                display:             'grid',
                gridTemplateColumns: '2.5rem 1fr',
                gap:                 '1.25rem',
                alignItems:          'center',
                padding:             '1.25rem 1.5rem',
                background:          'rgba(var(--cyan-rgb), 0.04)',
                border:              '1px solid rgba(var(--cyan-rgb), 0.14)',
                borderLeft:          '3px solid rgba(var(--cyan-rgb), 0.6)',
                borderRadius:        'var(--radius)',
              }}
            >
              <div style={{
                width: '2rem', height: '2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(var(--cyan-rgb), 0.12)',
                borderRadius: '50%',
                color: 'var(--cyan)',
                flexShrink: 0,
              }}>
                <ShieldCheck size={14} />
              </div>
              <div className="cert-link-wrapper">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link"
                    style={{ textDecoration: 'none' }}
                  >
                    <p style={{
                      fontFamily:   'var(--font-display)',
                      fontWeight:   600,
                      fontSize:     '0.95rem',
                      marginBottom: '0.2rem',
                      display:      'flex',
                      alignItems:   'center',
                      gap:          '0.4rem',
                    }}>
                      {cert.name}
                      <ExternalLink size={12} className="cert-link-icon" />
                    </p>
                  </a>
                ) : (
                  <p style={{
                    fontFamily:   'var(--font-display)',
                    fontWeight:   600,
                    fontSize:     '0.95rem',
                    color:        'var(--white)',
                    marginBottom: '0.2rem',
                  }}>
                    {cert.name}
                  </p>
                )}
                <p style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.72rem',
                  color:         'var(--cyan)',
                  letterSpacing: '0.05em',
                }}>
                  {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Honors & Awards BELOW ────────────────────────────── */}
        <p className="subsection-label">Honors &amp; Awards</p>
        <div
          ref={awardsRef}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap:                 '1.25rem',
          }}
        >
          {awards.map((award, i) => (
            <div
              key={i}
              className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 4)}` : ''} ${awardsVis ? 'visible' : ''}`}
              style={{
                padding:      '1.75rem',
                background:   'rgba(255,209,102,0.04)',
                border:       '1px solid rgba(255,209,102,0.18)',
                borderTop:    '3px solid rgba(255,209,102,0.55)',
                borderRadius: 'var(--radius)',
              }}
            >
              <div style={{
                width: '2.5rem', height: '2.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,209,102,0.12)',
                borderRadius: '50%',
                color: 'var(--gold)',
                marginBottom: '1rem',
              }}>
                <AwardIcon icon={award.icon} />
              </div>
              <p style={{
                fontFamily:   'var(--font-display)',
                fontSize:     '1rem',
                fontWeight:   700,
                color:        'var(--white)',
                marginBottom: '0.5rem',
                lineHeight:   1.4,
              }}>
                {award.name}
              </p>
              <p style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.72rem',
                color:         'var(--gold)',
                letterSpacing: '0.05em',
              }}>
                {award.org} · {award.year}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cert-link p {
          color: var(--white);
          transition: color 0.2s ease;
        }
        .cert-link-icon {
          opacity: 0.4;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .cert-link:hover p {
          color: var(--cyan);
        }
        .cert-link:hover .cert-link-icon {
          opacity: 1;
          transform: translateY(-1px) translateX(1px);
        }
      `}</style>
    </section>
  );
};

export default CertificationsSection;
