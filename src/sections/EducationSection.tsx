import { education } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

const EducationSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="education" className="section">
      <div className="section-inner">
        <p className="section-label">// Education</p>
        <h2 className="section-title">Academic <span>Background</span></h2>

        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {education.map((edu, i) => (
            <div
              key={i}
              className={`card-base card-accent-left reveal ${isVisible ? 'visible' : ''}`}
              style={{ paddingLeft: '2rem' }}
            >
              {/* Year */}
              <p
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.72rem',
                  color:         'var(--cyan)',
                  letterSpacing: '0.08em',
                  marginBottom:  '0.5rem',
                }}
              >
                {edu.year}
              </p>

              {/* Degree */}
              <h3
                style={{
                  fontFamily:   'var(--font-display)',
                  fontSize:     'clamp(1.1rem, 2vw, 1.3rem)',
                  fontWeight:   700,
                  lineHeight:   1.2,
                  marginBottom: '0.3rem',
                }}
              >
                {edu.degree}
              </h3>

              {/* Institution */}
              <p
                style={{
                  color:        'var(--muted)',
                  fontSize:     '0.9rem',
                  marginBottom: '1.25rem',
                }}
              >
                {edu.institution}
              </p>

              {/* GPA badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: edu.ielts ? '1.5rem' : 0 }}>
                <span
                  style={{
                    display:     'inline-flex',
                    alignItems:  'center',
                    gap:         '0.4rem',
                    fontFamily:  'var(--font-mono)',
                    fontSize:    '0.78rem',
                    background:  'rgba(255,209,102,0.1)',
                    color:       'var(--gold)',
                    border:      '1px solid rgba(255,209,102,0.25)',
                    borderRadius:'0.3rem',
                    padding:     '0.3rem 0.8rem',
                  }}
                >
                  ★ CGPA {edu.cgpa}
                </span>
                {edu.cgpaRecent && (
                  <span
                    style={{
                      display:     'inline-flex',
                      alignItems:  'center',
                      fontFamily:  'var(--font-mono)',
                      fontSize:    '0.78rem',
                      background:  'rgba(255,107,157,0.08)',
                      color:       'var(--pink)',
                      border:      '1px solid rgba(255,107,157,0.2)',
                      borderRadius:'0.3rem',
                      padding:     '0.3rem 0.8rem',
                    }}
                  >
                    ↑ {edu.cgpaRecent}
                  </span>
                )}
              </div>

              {/* IELTS row */}
              {edu.ielts && (
                <div
                  style={{
                    borderTop:   '1px solid var(--border-color)',
                    paddingTop:  '1.25rem',
                    display:     'flex',
                    alignItems:  'center',
                    gap:         '2.5rem',
                    flexWrap:    'wrap',
                  }}
                >
                  {/* Overall score */}
                  <div>
                    <p
                      style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '0.68rem',
                        color:         'var(--muted)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom:  '0.3rem',
                      }}
                    >
                      IELTS Academic
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize:   '2.8rem',
                        fontWeight: 800,
                        color:      'var(--gold)',
                        lineHeight: 1,
                      }}
                    >
                      {edu.ielts.overall}
                    </p>
                  </div>

                  {/* Sub-scores */}
                  <div style={{ display: 'flex', gap: '1.8rem', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Listening', score: edu.ielts.listening },
                      { label: 'Reading',   score: edu.ielts.reading },
                      { label: 'Writing',   score: edu.ielts.writing },
                      { label: 'Speaking',  score: edu.ielts.speaking },
                    ].map(({ label, score }) => (
                      <div key={label}>
                        <p
                          style={{
                            fontFamily:    'var(--font-mono)',
                            fontSize:      '0.68rem',
                            color:         'var(--muted)',
                            letterSpacing: '0.08em',
                            marginBottom:  '0.2rem',
                          }}
                        >
                          {label}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize:   '1.1rem',
                            fontWeight: 700,
                            color:      'var(--white)',
                          }}
                        >
                          {score}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
