import { useEffect, useCallback, useState, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { news } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

const NewsSection = () => {
  const { ref, isVisible } = useScrollReveal(0.08);
  const [isPaused, setIsPaused] = useState(false);

  // Parse a date string into a sortable number (YYYYMMDD).
  // Tolerates: "Month YYYY", "DD Month YYYY",
  // and ranges like "DD – DD Month YYYY" or "DD Month – DD Month YYYY".
  // Strategy: locate the first known month name and the last 4-digit year in the string,
  // and use the first numeric token as day (1 if absent).
  const parseDate = (dateStr: string) => {
    const months: Record<string, number> = {
      January:1, February:2, March:3, April:4, May:5, June:6,
      July:7, August:8, September:9, October:10, November:11, December:12,
    };
    const tokens = dateStr.replace(/[,]/g, '').trim().split(/\s+/);
    const month = tokens.find((t) => months[t] !== undefined) ?? '';
    const yearToken = [...tokens].reverse().find((t) => /^\d{4}$/.test(t)) ?? '';
    const dayToken = tokens.find((t) => /^\d{1,2}$/.test(t)) ?? '';
    const year = parseInt(yearToken) || 0;
    const day = parseInt(dayToken) || 1;
    return year * 10000 + (months[month] ?? 0) * 100 + day;
  };

  // Sort all news items chronologically (oldest → newest)
  // Then build: [...older_than_featured, featured, ...newer_than_featured]
  // This gives: left = past, center = featured, right = future
  const orderedNews = useMemo(() => {
    const sorted = [...news].sort((a, b) => parseDate(a.date) - parseDate(b.date));
    const featuredIdx = sorted.findIndex(n => n.featured);
    if (featuredIdx === -1) return sorted;
    return sorted; // already: older items at 0..featuredIdx-1, featured at featuredIdx, newer at featuredIdx+1..
  }, []);

  // Featured index in the sorted array — used to set startIndex so featured lands in center slot
  const featuredStartIndex = useMemo(() => {
    return orderedNews.findIndex(n => n.featured);
  }, [orderedNews]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop:       true,
    // On desktop 3 slides are visible: prev | center | next
    // So startIndex = featuredIdx - 1 puts featured in the middle slot
    startIndex: Math.max(0, featuredStartIndex - 1),
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Autoplay every 6 seconds
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), 6000);
    return () => window.clearInterval(id);
  }, [emblaApi, isPaused]);

  return (
    <section id="news" className="section">
      <div className="section-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <p className="section-label">// Latest Activity</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>News &amp; <span>Updates</span></h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="carousel-btn" onClick={scrollPrev} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-btn" onClick={scrollNext} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'visible' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="news-embla" ref={emblaRef}>
            <div className="news-embla__container">
              {orderedNews.map((item) => (
                <div className="news-embla__slide" key={item.id}>
                  <div className={`news-card ${item.featured ? 'news-card--featured' : ''}`}>
                    <div className="news-image-wrapper">
                      <img src={item.image} alt={item.title} className="news-image" loading="lazy" />
                      {item.featured && (
                        <div className="news-featured-badge">Featured</div>
                      )}
                    </div>
                    <div className="news-content">
                      <p className="news-date">{item.date}</p>
                      <h3 className="news-title">
                        {item.titleUrl ? (
                          <a
                            href={item.titleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="news-title-link"
                          >
                            {item.title}
                          </a>
                        ) : (
                          item.title
                        )}
                      </h3>
                      {item.links && item.links.length > 0 && (
                        <div className="news-links">
                          {item.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="news-chip"
                            >
                              <ExternalLink size={10} style={{ marginRight: '0.25rem' }} />
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                      <p className="news-summary">{item.summary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .news-embla { overflow: hidden; border-radius: var(--radius); }
          .news-embla__container {
            display: flex;
            gap: 1.5rem;
            align-items: stretch;
          }
          /* Mobile: 1 slide */
          .news-embla__slide { flex: 0 0 100%; min-width: 0; }
          /* Tablet: 2 slides */
          @media (min-width: 640px) {
            .news-embla__slide { flex: 0 0 calc(50% - 0.75rem); }
          }
          /* Desktop: 3 slides */
          @media (min-width: 1024px) {
            .news-embla__slide { flex: 0 0 calc(33.333% - 1rem); }
          }

          .news-card {
            background:    var(--bg3);
            border:        1px solid var(--border-color);
            border-radius: var(--radius);
            overflow:      hidden;
            display:       flex;
            flex-direction: column;
            height:        100%;
            transition:    border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .news-card:hover {
            border-color: rgba(var(--cyan-rgb), 0.4);
            box-shadow:   0 8px 30px rgba(0,0,0,0.4);
          }
          .news-card--featured {
            border-color: rgba(var(--cyan-rgb), 0.35);
            box-shadow:   0 0 0 1px rgba(var(--cyan-rgb), 0.2), 0 8px 30px rgba(var(--cyan-rgb), 0.1);
          }

          .news-image-wrapper {
            position:     relative;
            width:        100%;
            aspect-ratio: 16/9;
            overflow:     hidden;
          }
          .news-image {
            width:      100%;
            height:     100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          .news-card:hover .news-image { transform: scale(1.05); }

          .news-featured-badge {
            position:      absolute;
            top:           1rem;
            left:          1rem;
            background:    var(--cyan);
            color:         #040a08;
            font-family:   var(--font-mono);
            font-size:     0.65rem;
            font-weight:   700;
            text-transform: uppercase;
            padding:       0.25rem 0.65rem;
            border-radius: 0.25rem;
            letter-spacing: 0.06em;
          }

          .news-content {
            padding:        1.5rem;
            display:        flex;
            flex-direction: column;
            flex-grow:      1;
          }
          .news-date {
            font-family:    var(--font-mono);
            font-size:      0.72rem;
            color:          var(--cyan);
            margin-bottom:  0.5rem;
            letter-spacing: 0.05em;
          }
          .news-title {
            font-family:  var(--font-display);
            font-size:    1.05rem;
            font-weight:  700;
            color:        var(--white);
            margin-bottom:0.75rem;
            line-height:  1.35;
          }
          .news-title-link {
            color:           inherit;
            text-decoration: none;
            border-bottom:   1px dashed rgba(var(--cyan-rgb), 0.45);
            transition:      color 0.2s ease, border-color 0.2s ease;
          }
          .news-title-link:hover {
            color:         var(--cyan);
            border-color:  var(--cyan);
          }
          .news-links {
            display:        flex;
            flex-wrap:      wrap;
            gap:            0.4rem;
            margin-bottom:  0.75rem;
          }
          .news-chip {
            display:         inline-flex;
            align-items:     center;
            font-family:     var(--font-mono);
            font-size:       0.62rem;
            font-weight:     700;
            text-transform:  uppercase;
            letter-spacing:  0.06em;
            padding:         0.2rem 0.55rem;
            border-radius:   0.25rem;
            background:      rgba(var(--cyan-rgb), 0.12);
            border:          1px solid rgba(var(--cyan-rgb), 0.35);
            color:           var(--cyan);
            text-decoration: none;
            transition:      background 0.2s ease, border-color 0.2s ease;
          }
          .news-chip:hover {
            background:   rgba(var(--cyan-rgb), 0.22);
            border-color: rgba(var(--cyan-rgb), 0.55);
          }
          .news-summary {
            font-size:   0.87rem;
            color:       var(--muted);
            line-height: 1.65;
            flex-grow:   1;
          }

          .carousel-btn {
            background:    rgba(255,255,255,0.05);
            border:        1px solid var(--border-color);
            color:         var(--white);
            width:         40px;
            height:        40px;
            border-radius: 50%;
            display:       flex;
            align-items:   center;
            justify-content: center;
            cursor:        pointer;
            transition:    all 0.2s ease;
          }
          .carousel-btn:hover {
            background:   rgba(var(--cyan-rgb), 0.15);
            border-color: rgba(var(--cyan-rgb), 0.4);
            color:        var(--cyan);
            transform:    scale(1.05);
          }
        `}</style>
      </div>
    </section>
  );
};

export default NewsSection;
