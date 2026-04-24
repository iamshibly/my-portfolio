import { useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { publications, type PubType, type PubStatus, type CoreRank } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

type FilterKey = 'All' | PubType | 'Under Review';
const FILTERS: FilterKey[] = [
  'All',
  'Journal',
  'International Conference',
  'Domestic Conference',
  'Under Review',
];

const statusStyle = (status: PubStatus): React.CSSProperties => {
  if (status === 'Accepted' || status === 'Published') return {
    background: 'rgba(var(--cyan-rgb), 0.1)',
    color:      'var(--cyan)',
    border:     '1px solid rgba(var(--cyan-rgb), 0.25)',
  };
  return {
    background: 'rgba(var(--gold-rgb), 0.1)',
    color:      'var(--gold)',
    border:     '1px solid rgba(var(--gold-rgb), 0.25)',
  };
};

const typeStyle = (_type: PubType): React.CSSProperties => ({
  background: 'rgba(var(--pink-rgb), 0.08)',
  color:      'var(--pink)',
  border:     '1px solid rgba(var(--pink-rgb), 0.22)',
});

/* CORE rank → bright, flagship-feeling styles */
const coreStyle = (rank: CoreRank): React.CSSProperties => {
  if (rank === 'A*' || rank === 'A') return {
    background: 'linear-gradient(90deg, rgba(var(--gold-rgb), 0.22), rgba(var(--pink-rgb), 0.18))',
    color:      'var(--gold)',
    border:     '1px solid rgba(var(--gold-rgb), 0.55)',
    boxShadow:  '0 0 12px rgba(var(--gold-rgb), 0.25)',
    fontWeight: 700,
  };
  if (rank === 'B') return {
    background: 'rgba(var(--gold-rgb), 0.14)',
    color:      'var(--gold)',
    border:     '1px solid rgba(var(--gold-rgb), 0.45)',
    fontWeight: 700,
  };
  return {
    background: 'rgba(var(--cyan-rgb), 0.14)',
    color:      'var(--cyan)',
    border:     '1px solid rgba(var(--cyan-rgb), 0.4)',
    fontWeight: 700,
  };
};

const badgeBase: React.CSSProperties = {
  display:       'inline-flex',
  alignItems:    'center',
  gap:           '0.3rem',
  fontFamily:    'var(--font-mono)',
  fontSize:      '0.68rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding:       '0.22rem 0.65rem',
  borderRadius:  '0.25rem',
  whiteSpace:    'nowrap',
  flexShrink:    0,
};

const noteStyle: React.CSSProperties = {
  background: 'rgba(var(--cyan-rgb), 0.06)',
  color:      'var(--muted)',
  border:     '1px dashed rgba(var(--cyan-rgb), 0.28)',
};

const PublicationsSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');
  const { ref, isVisible } = useScrollReveal(0.08);

  /* Filter: "Under Review" matches by status; all others by type. "All" = everything. */
  const filtered = activeFilter === 'All'
    ? publications
    : activeFilter === 'Under Review'
      ? publications.filter(p => p.status === 'Under Review')
      : publications.filter(p => p.type === activeFilter);

  /* Sort: accepted/published first, then under-review. Within each, year desc. */
  const sorted = [...filtered].sort((a, b) => {
    const rank = (s: PubStatus) => (s === 'Under Review' ? 1 : 0);
    const ra = rank(a.status), rb = rank(b.status);
    if (ra !== rb) return ra - rb;
    return b.year - a.year;
  });

  const count = (f: FilterKey) =>
    f === 'All'
      ? publications.length
      : f === 'Under Review'
        ? publications.filter(p => p.status === 'Under Review').length
        : publications.filter(p => p.type === f).length;

  return (
    <section id="publications" className="section">
      <div className="section-inner">
        <p className="section-label">// Research Output</p>
        <h2 className="section-title">Publications &amp; <span>Manuscript</span></h2>

        {/* Filter tabs */}
        <div
          role="tablist"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}
        >
          {FILTERS.map(f => {
            const active = activeFilter === f;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.72rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding:       '0.45rem 1rem',
                  borderRadius:  '0.35rem',
                  border:        `1px solid ${active ? 'var(--cyan)' : 'var(--border-color)'}`,
                  background:    active ? 'rgba(var(--cyan-rgb), 0.12)' : 'transparent',
                  color:         active ? 'var(--cyan)' : 'var(--muted)',
                  cursor:        'none',
                  transition:    'all 0.2s',
                }}
              >
                {f} ({count(f)})
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div
          ref={ref}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {sorted.map((pub, idx) => (
            <article
              key={`${pub.title}-${pub.venue}`}
              className={`pub-card reveal ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${idx * 0.05}s` }}
            >
              {/* Index column — restarts per filter */}
              <div className="pub-num" aria-hidden="true">
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Content column */}
              <div className="pub-body">
                <h3 className="pub-title">{pub.title}</h3>
                <p className="pub-authors">{pub.authors}</p>
                <p className="pub-venue">{pub.venue}, {pub.year}</p>

                {/* Badges + link row */}
                <div className="pub-meta-row">
                  <span style={{ ...badgeBase, ...statusStyle(pub.status) }}>
                    {pub.status}
                  </span>
                  <span style={{ ...badgeBase, ...typeStyle(pub.type) }}>
                    {pub.type}
                  </span>
                  {pub.coreRank && (
                    <span style={{ ...badgeBase, ...coreStyle(pub.coreRank) }}>
                      <Star size={10} strokeWidth={2.5} />
                      CORE {pub.coreRank}
                    </span>
                  )}
                  {pub.note && (
                    <span style={{ ...badgeBase, ...noteStyle }}>
                      {pub.note}
                    </span>
                  )}
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pub-link"
                    >
                      <ExternalLink size={11} />
                      View
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
