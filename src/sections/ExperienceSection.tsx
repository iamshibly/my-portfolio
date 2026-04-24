import { experience } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Briefcase, ExternalLink } from 'lucide-react';

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <p className="section-label">// Professional Experience</p>
        <h2 className="section-title">Industry <span>Experience</span></h2>

        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {experience.map((exp, i) => (
            <div
              key={i}
              className={`card-base card-accent-left reveal ${i > 0 ? `reveal-delay-${Math.min(i, 4)}` : ''} ${isVisible ? 'visible' : ''}`}
              style={{ paddingLeft: '2rem' }}
            >
              {/* Date — mono cyan */}
              <p
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.72rem',
                  color:         'var(--cyan)',
                  letterSpacing: '0.08em',
                  marginBottom:  '0.6rem',
                }}
              >
                {exp.date}
              </p>

              {/* Role — large white display font */}
              <h3
                style={{
                  fontFamily:   'var(--font-display)',
                  fontSize:     'clamp(1.1rem, 2vw, 1.3rem)',
                  fontWeight:   700,
                  color:        'var(--white)',
                  marginBottom: '0.25rem',
                  lineHeight:   1.25,
                }}
              >
                {exp.role}
              </h3>

              {/* Organisation — gold accent; clickable when orgUrl present. Optional inline chips (e.g. Offer Letter) */}
              <p
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      '0.95rem',
                  fontWeight:    500,
                  color:         'var(--gold)',
                  marginBottom:  '1rem',
                  letterSpacing: '-0.01em',
                  display:       'flex',
                  flexWrap:      'wrap',
                  alignItems:    'center',
                  gap:           '0.5rem',
                }}
              >
                <Briefcase size={13} style={{ display: 'inline', marginRight: '0.25rem', opacity: 0.7 }} />
                {exp.orgUrl ? (
                  <a
                    href={exp.orgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px dashed rgba(230, 200, 120, 0.45)' }}
                  >
                    {exp.org}
                  </a>
                ) : (
                  <span>{exp.org}</span>
                )}
                {exp.links?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exp-chip"
                  >
                    <ExternalLink size={10} style={{ marginRight: '0.25rem' }} />
                    {link.label}
                  </a>
                ))}
              </p>

              {/* Description — creamy warm muted */}
              <p
                style={{
                  fontSize:   '0.9rem',
                  color:      'var(--muted)',
                  lineHeight: 1.75,
                }}
              >
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          .exp-chip {
            display:         inline-flex;
            align-items:     center;
            font-family:     var(--font-mono);
            font-size:       0.65rem;
            font-weight:     700;
            text-transform:  uppercase;
            letter-spacing:  0.06em;
            padding:         0.2rem 0.55rem;
            border-radius:   0.25rem;
            background:      rgba(var(--cyan-rgb), 0.12);
            border:          1px solid rgba(var(--cyan-rgb), 0.35);
            color:           var(--cyan);
            text-decoration: none;
            transition:      background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          }
          .exp-chip:hover {
            background:   rgba(var(--cyan-rgb), 0.22);
            border-color: rgba(var(--cyan-rgb), 0.55);
          }
        `}</style>
      </div>
    </section>
  );
};

export default ExperienceSection;
