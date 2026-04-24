import { researchPositions, type ResearchPosition } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ResearchCard = ({ pos, visible, delay }: { pos: ResearchPosition; visible: boolean; delay: string }) => {
  const isCyan = pos.variant === 'cyan';
  const accentColor = isCyan ? 'var(--cyan)' : 'var(--gold)';

  return (
    <div
      className={`card-base ${isCyan ? 'card-accent-top' : 'card-accent-top-gold'} reveal ${delay} ${visible ? 'visible' : ''}`}
      style={{ paddingTop: '1.75rem' }}
    >
      {/* Date badge */}
      <p
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.7rem',
          color:         accentColor,
          letterSpacing: '0.08em',
          marginBottom:  '0.6rem',
        }}
      >
        {pos.date}
        {pos.status && (
          <span
            style={{
              marginLeft:  '0.75rem',
              background:  isCyan ? 'rgba(var(--cyan-rgb), 0.1)' : 'rgba(255,209,102,0.1)',
              border:      `1px solid ${isCyan ? 'rgba(var(--cyan-rgb), 0.25)' : 'rgba(255,209,102,0.25)'}`,
              borderRadius:'0.25rem',
              padding:     '0.1rem 0.5rem',
              fontSize:    '0.65rem',
              letterSpacing:'0.06em',
            }}
          >
            {pos.status}
          </span>
        )}
      </p>

      {/* Title */}
      <h3
        style={{
          fontFamily:   'var(--font-display)',
          fontSize:     '1.1rem',
          fontWeight:   700,
          marginBottom: '0.2rem',
        }}
      >
        {pos.title}
      </h3>

      {/* Organisation */}
      <p
        style={{
          fontSize:     '0.9rem',
          color:        accentColor,
          fontWeight:   500,
          marginBottom: '0.2rem',
          opacity:      0.85,
        }}
      >
        {pos.org}
      </p>

      {/* Supervisor + faculty */}
      <p
        style={{
          fontFamily:   'var(--font-mono)',
          fontSize:     '0.72rem',
          color:        'var(--muted)',
          marginBottom: '1.25rem',
          lineHeight:   1.6,
        }}
      >
        {pos.supervisor}
        <br />
        <span style={{ opacity: 0.7 }}>{pos.faculty}</span>
      </p>

      {/* Topic bullets */}
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        {pos.topics.map((topic, i) => (
          <li
            key={i}
            style={{
              display:     'flex',
              gap:         '0.65rem',
              fontSize:    '0.875rem',
              color:       '#a0aec0',
              lineHeight:  1.6,
              paddingBottom:'0.45rem',
              borderBottom: i < pos.topics.length - 1 ? '1px solid var(--border-color)' : 'none',
            }}
          >
            <span style={{ color: accentColor, flexShrink: 0, marginTop: '4px', fontSize: '0.65rem' }}>▸</span>
            <span dangerouslySetInnerHTML={{ __html: topic }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ResearchSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="research" className="section">
      <div className="section-inner">
        <p className="section-label">// Research Experience</p>
        <h2 className="section-title">Research <span>Collaboration</span></h2>

        <div
          ref={ref}
          className="ra-grid"
        >
          {researchPositions.map((pos, i) => (
            <ResearchCard
              key={i}
              pos={pos}
              visible={isVisible}
              delay={i === 1 ? 'reveal-delay-2' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
