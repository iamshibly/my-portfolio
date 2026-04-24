import { skillGroups } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SkillsSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <p className="section-label">// Technical Proficiency</p>
        <h2 className="section-title">Skills &amp; <span>Tools</span></h2>

        {/* Two-column grid: Core & ML | Tools & Platforms */}
        <div
          ref={ref}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap:                 '4rem 5rem',
            marginTop:           '2rem',
          }}
        >
          {skillGroups.map((group, gi) => (
            <div
              key={group.groupTitle}
              className={`reveal ${gi > 0 ? 'reveal-delay-2' : ''} ${isVisible ? 'visible' : ''}`}
            >
              {/* Column header label */}
              <p
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.68rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color:         'var(--muted)',
                  marginBottom:  '2rem',
                  paddingBottom: '0.6rem',
                  borderBottom:  '1px solid var(--border-color)',
                }}
              >
                {group.groupTitle}
              </p>

              {/* Each skill: name + bar + tags below */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    {/* Name row with percentage */}
                    <div
                      style={{
                        display:        'flex',
                        justifyContent: 'space-between',
                        alignItems:     'baseline',
                        marginBottom:   '0.6rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize:   '1.05rem',
                          fontWeight: 600,
                          color:      'var(--white)',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontFamily:    'var(--font-mono)',
                          fontSize:      '0.8rem',
                          color:         'var(--cyan)',
                          letterSpacing: '0.04em',
                          flexShrink:    0,
                          marginLeft:    '1rem',
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div
                      style={{
                        height:       '2px',
                        background:   'rgba(255,255,255,0.07)',
                        borderRadius: '2px',
                        overflow:     'hidden',
                        marginBottom: '0.85rem',
                      }}
                    >
                      <div
                        style={{
                          height:       '100%',
                          width:        isVisible ? `${skill.level}%` : '0%',
                          background:   `linear-gradient(90deg, var(--cyan) 0%, rgba(var(--cyan-rgb), 0.5) 100%)`,
                          borderRadius: '2px',
                          transition:   `width 1.3s cubic-bezier(0.4,0,0.2,1) ${gi * 0.1 + si * 0.12}s`,
                          position:     'relative',
                        }}
                      >
                        {/* glowing dot at bar tip */}
                        <span
                          style={{
                            position:  'absolute',
                            right:     0,
                            top:       '50%',
                            transform: 'translateY(-50%)',
                            width:     '8px',
                            height:    '8px',
                            borderRadius: '50%',
                            background: 'var(--cyan)',
                            boxShadow: '0 0 6px var(--cyan)',
                            opacity:   isVisible ? 1 : 0,
                            transition:`opacity 0.3s ease ${gi * 0.1 + si * 0.12 + 1.2}s`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Per-skill tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {skill.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontFamily:    'var(--font-mono)',
                            fontSize:      '0.68rem',
                            letterSpacing: '0.02em',
                            padding:       '0.22rem 0.65rem',
                            borderRadius:  '0.25rem',
                            background:    'rgba(255,255,255,0.04)',
                            color:         'rgba(200,225,240,0.75)',
                            border:        '1px solid rgba(255,255,255,0.1)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
