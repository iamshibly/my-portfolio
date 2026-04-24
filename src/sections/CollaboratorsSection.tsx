import { collaborators } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CollaboratorsSection = () => {
  const { ref, isVisible } = useScrollReveal(0.08);

  return (
    <section id="collaborators" className="section">
      <div className="section-inner">
        <p className="section-label">// Joint Work</p>
        <h2 className="section-title">Collabo<span>rators</span></h2>

        <div
          ref={ref}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap:                 '1.5rem',
          }}
        >
          {collaborators.map((collab, idx) => (
            <div
              key={idx}
              className={`collab-card reveal ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <img
                src={collab.image}
                alt=""
                role="presentation"
                loading="lazy"
              />
              <div className="collab-overlay">
                <h4>{collab.name}</h4>
                <p>{collab.title}</p>
                {collab.institution && <span>{collab.institution}</span>}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .collab-card {
            position: relative;
            border-radius: var(--radius);
            overflow: hidden;
            aspect-ratio: 3/4;
            background: var(--bg3);
            border: 1px solid var(--border-color);
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
          }
          
          .collab-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center top;
            transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.6s ease;
            display: block;
            filter: grayscale(70%) brightness(0.85) contrast(1.05) saturate(1.1);
            image-rendering: auto;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }

          .collab-card:hover img {
            transform: scale(1.05);
            filter: grayscale(0%) brightness(1) contrast(1.05) saturate(1.1);
          }

          .collab-card::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: var(--radius);
            box-shadow: inset 0 0 0 1px rgba(var(--cyan-rgb), 0);
            transition: box-shadow 0.4s ease;
            pointer-events: none;
          }

          .collab-card:hover::after {
            box-shadow: inset 0 0 0 1px rgba(var(--cyan-rgb), 0.35),
                        0 0 24px rgba(var(--cyan-rgb), 0.12);
          }

          .collab-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(4,10,8,0.97) 0%, rgba(4,10,8,0.5) 50%, transparent 100%);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 1.5rem;
            opacity: 1;
            transition: background 0.4s ease;
          }

          .collab-card:hover .collab-overlay {
            background: linear-gradient(to top, rgba(4,10,8,0.98) 0%, rgba(4,10,8,0.6) 55%, rgba(4,10,8,0.1) 100%);
          }

          .collab-overlay h4 {
            font-family: var(--font-display);
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--white);
            margin-bottom: 0.25rem;
          }

          .collab-overlay p {
            font-size: 0.8rem;
            line-height: 1.35;
            color: var(--cyan);
            margin-bottom: 0.4rem;
          }

          .collab-overlay span {
            font-family: var(--font-mono);
            font-size: 0.62rem;
            line-height: 1.4;
            color: var(--muted);
            letter-spacing: 0.04em;
            text-transform: uppercase;
            display: block;
          }
        `}</style>
      </div>
    </section>
  );
};

export default CollaboratorsSection;
