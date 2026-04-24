import { projects } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Github, ExternalLink } from 'lucide-react';

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollReveal(0.08);

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <p className="section-label">// Built Work</p>
        <h2 className="section-title">Pro<span>jects</span></h2>

        <div
          ref={ref}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap:                 '1.5rem',
          }}
        >
          {projects.map((proj, idx) => (
            <article
              key={idx}
              className={`card-base card-accent-top reveal ${isVisible ? 'visible' : ''}`}
              style={{
                transitionDelay: `${idx * 0.08}s`,
                display:         'flex',
                flexDirection:   'column',
                paddingTop:      '2rem',
              }}
            >
              {/* Title in white/display */}
              <h3
                style={{
                  fontFamily:   'var(--font-display)',
                  fontSize:     '1.15rem',
                  fontWeight:   700,
                  color:        'var(--white)',
                  marginBottom: '0.75rem',
                  lineHeight:   1.3,
                }}
              >
                {proj.title}
              </h3>

              {/* Description in warm creamy/muted */}
              <p
                style={{
                  fontSize:     '0.88rem',
                  color:        'var(--muted)',
                  lineHeight:   1.7,
                  marginBottom: '1.5rem',
                  flexGrow:     1,
                }}
              >
                {proj.description}
              </p>

              {/* Tech tags — cyan-tinted mono */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                {proj.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.67rem',
                      letterSpacing: '0.04em',
                      padding:       '0.22rem 0.65rem',
                      borderRadius:  '0.25rem',
                      background:    'rgba(var(--cyan-rgb), 0.08)',
                      color:         'var(--cyan)',
                      border:        '1px solid rgba(var(--cyan-rgb), 0.2)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action links — gold for Code, pink for Demo */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:       'inline-flex',
                      alignItems:    'center',
                      gap:           '0.4rem',
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.72rem',
                      letterSpacing: '0.05em',
                      color:         'var(--gold)',
                      textDecoration:'none',
                      borderBottom:  '1px solid rgba(255,209,102,0.3)',
                      paddingBottom: '1px',
                      transition:    'color 0.2s, border-color 0.2s',
                    }}
                  >
                    <Github size={13} /> Code
                  </a>
                )}
                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:       'inline-flex',
                      alignItems:    'center',
                      gap:           '0.4rem',
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.72rem',
                      letterSpacing: '0.05em',
                      color:         'var(--pink)',
                      textDecoration:'none',
                      borderBottom:  '1px solid rgba(255,182,193,0.3)',
                      paddingBottom: '1px',
                      transition:    'color 0.2s, border-color 0.2s',
                    }}
                  >
                    <ExternalLink size={13} /> Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
