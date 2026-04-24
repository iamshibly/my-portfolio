import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { personalInfo, aboutBio, researchInterests, hobbies } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

const AboutSection = () => {
  const { ref: leftRef,  isVisible: leftVis  } = useScrollReveal(0.1);
  const { ref: rightRef, isVisible: rightVis } = useScrollReveal(0.1);
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="section">
      <div className="section-inner">
        <p className="section-label">// About</p>
        <h2 className="section-title">Who I <span>Am</span></h2>

        <div className="about-grid">
          {/* ── Left: Bio + Contact ──────────────────────────── */}
          <div
            ref={leftRef}
            className={`reveal ${leftVis ? 'visible' : ''}`}
          >
            {aboutBio.map((para, i) => (
              <p
                key={i}
                style={{
                  color:        '#a0aec0',
                  fontSize:     '0.95rem',
                  lineHeight:   1.8,
                  marginBottom: '1rem',
                }}
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}

            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              {[
                { icon: <Mail size={15} />,   text: personalInfo.email },
                { icon: <Phone size={15} />,  text: personalInfo.phone },
                { icon: <MapPin size={15} />, text: personalInfo.location },
              ].map(item => (
                <div
                  key={item.text}
                  style={{
                    display:     'flex',
                    alignItems:  'center',
                    gap:         '1rem',
                    padding:     '0.65rem 0',
                    borderBottom:'1px solid var(--border-color)',
                    color:       'var(--muted)',
                    fontSize:    '0.875rem',
                  }}
                >
                  <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Profile image + Research interests ────── */}
          <div
            ref={rightRef}
            className={`reveal reveal-delay-2 ${rightVis ? 'visible' : ''}`}
          >
            {/* Profile image */}
            <div
              style={{
                borderRadius: '1rem',
                overflow:     'hidden',
                border:       '1px solid var(--border-color)',
                marginBottom: '1.75rem',
                background:   'var(--bg3)',
                aspectRatio:  '3/4',
                display:      'flex',
                alignItems:   'center',
                justifyContent:'center',
                width:        '60%',
                marginLeft:   'auto',
                marginRight:  'auto',
              }}
            >
              {!imgError ? (
                <img
                  src="/portfolio-assets/images/profile-photo.jpg"
                  alt={`${personalInfo.nameFirst} ${personalInfo.nameLast}`}
                  onError={() => setImgError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                /* Placeholder initials fallback */
                <div
                  style={{
                    width:          '100%',
                    height:         '100%',
                    display:        'flex',
                    flexDirection:  'column',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            '0.5rem',
                    background:     'linear-gradient(135deg, rgba(var(--cyan-rgb), 0.08), rgba(255,209,102,0.06))',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize:   '3.5rem',
                      fontWeight: 800,
                      color:      'var(--cyan)',
                      opacity:    0.6,
                    }}
                  >
                    {personalInfo.nameFirst.charAt(0)}{personalInfo.nameLast.charAt(0)}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize:   '0.65rem',
                      color:      'var(--muted)',
                      letterSpacing:'0.1em',
                    }}
                  >
                    {/* Replace /portfolio-assets/images/profile-photo.jpg to update */}
                    Add profile photo
                  </p>
                </div>
              )}
            </div>

            {/* Research interests */}
            <h4
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.72rem',
                color:         'var(--muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom:  '0.85rem',
              }}
            >
              Research Interests
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {researchInterests.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <h4
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.72rem',
                color:         'var(--muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop:     '2rem',
                marginBottom:  '0.85rem',
              }}
            >
              Beyond Research
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {hobbies.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .about-grid p strong {
          color: var(--white);
          font-weight: 600;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
