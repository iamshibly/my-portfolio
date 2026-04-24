import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Orbit, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { personalInfo, references } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

/*
 * ── Contact form ─────────────────────────────────────────────────
 * The form delivers email through Formspree if VITE_FORMSPREE_ID is
 * configured at build time; otherwise it falls back to a local
 * `mailto:` handoff that works for every visitor out of the box.
 *
 * To enable Formspree delivery later:
 *   1. Sign up free at https://formspree.io and create a form.
 *   2. Set VITE_FORMSPREE_ID=<your-id> in .env (or your host's env vars).
 *   3. Redeploy — no code change required.
 * ───────────────────────────────────────────────────────────────── */
const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID as string | undefined)?.trim();
const HAS_FORMSPREE = !!FORMSPREE_ID && FORMSPREE_ID.length > 0 && FORMSPREE_ID !== 'YOUR_FORMSPREE_ID';

type Status = 'idle' | 'sending' | 'success' | 'error';

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const submitViaMailto = () => {
    const subject = `Portfolio contact from ${form.name || 'a visitor'}`;
    const body =
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `${form.message}\n`;
    const href =
      `mailto:${personalInfo.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!HAS_FORMSPREE) {
      // Open the visitor's default mail client with the message pre-filled.
      submitViaMailto();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({
          name:     form.name,
          email:    form.email,
          message:  form.message,
          _replyto: form.email,
          _subject: `Portfolio contact from ${form.name || 'a visitor'}`,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="section contact-bg">
      <div className="section-inner">
        <p className="section-label">// Get In Touch</p>
        <h2 className="section-title">Con<span>tact</span></h2>

        <div ref={ref} className="contact-grid">

          {/* ── Left: Info + socials + references ──────────── */}
          <div className={`reveal ${isVisible ? 'visible' : ''}`}>
            <p className="contact-intro">
              I'm actively looking for Graduate Research Associate opportunities and research collaborations.
              Feel free to reach out — I usually respond within 24 hours.
            </p>

            <div className="contact-items">
              {[
                { icon: <Mail size={16} />,   text: personalInfo.email,    href: `mailto:${personalInfo.email}` },
                { icon: <Phone size={16} />,  text: personalInfo.phone,    href: `tel:${personalInfo.phone}` },
                { icon: <MapPin size={16} />, text: personalInfo.location, href: undefined },
              ].map(item => (
                <div key={item.text} className="contact-item">
                  <span className="contact-item-icon">{item.icon}</span>
                  {item.href
                    ? <a href={item.href} className="contact-item-text contact-item-link">{item.text}</a>
                    : <span className="contact-item-text">{item.text}</span>
                  }
                </div>
              ))}
            </div>

            <div className="social-row">
              {[
                { icon: <Github size={18} />,   href: personalInfo.socials.github,   label: 'GitHub' },
                { icon: <Linkedin size={18} />, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
                { icon: <Orbit size={18} />,    href: personalInfo.socials.orcid,    label: 'ORCID' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                   aria-label={s.label} className="social-btn">
                  {s.icon}
                </a>
              ))}
            </div>

            <p className="subsection-label" style={{ marginTop: '2rem' }}>References</p>
            <div className="ref-list">
              {references.map(r => (
                <div key={r.name} className="ref-card">
                  <img src={r.image} alt={r.name} className="ref-photo" loading="lazy" />
                  <div className="ref-body">
                    <div className="ref-name">{r.name}</div>
                    <div className="ref-role">{r.title} · {r.institution}</div>
                    {r.note && <div className="ref-note">{r.note}</div>}
                    <a href={`mailto:${r.email}`} className="ref-email">{r.email}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Formspree-powered form ──────────────── */}
          <div className={`reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
            <form onSubmit={handleSubmit} className="contact-form">

              {/* Name */}
              <div className="form-field">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  id="name" type="text" required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Dr. Jane Smith"
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div className="form-field">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input
                  id="email" type="email" required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane@university.edu"
                  className="form-input"
                />
              </div>

              {/* Message — no character limit enforced, but 5000 char soft guide */}
              <div className="form-field">
                <label htmlFor="message" className="form-label">
                  Message
                  <span style={{ float:'right', fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--muted)', fontWeight:400 }}>
                    {form.message.length} / 5000
                  </span>
                </label>
                <textarea
                  id="message" required rows={7}
                  maxLength={5000}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="I'd love to discuss a potential Graduate Research Associate role or collaboration..."
                  className="form-input form-textarea"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'sending'}
                style={{ alignSelf: 'flex-start', marginTop: '0.25rem', opacity: status === 'sending' ? 0.7 : 1 }}
              >
                <Send size={14} />
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>

              {/* Feedback banners */}
              {status === 'success' && (
                <div style={{
                  display:'flex', alignItems:'center', gap:'0.5rem',
                  marginTop:'1rem', padding:'0.75rem 1rem',
                  background:'rgba(var(--cyan-rgb), 0.08)', border:'1px solid rgba(var(--cyan-rgb), 0.3)',
                  borderRadius:'0.5rem', color:'var(--cyan)',
                  fontFamily:'var(--font-mono)', fontSize:'0.8rem',
                }}>
                  <CheckCircle size={16} />
                  {HAS_FORMSPREE
                    ? "Message sent! I'll reply within 24 hours."
                    : 'Opening your email client — hit send there and I\u2019ll reply within 24 hours.'}
                </div>
              )}
              {status === 'error' && (
                <div style={{
                  display:'flex', alignItems:'center', gap:'0.5rem',
                  marginTop:'1rem', padding:'0.75rem 1rem',
                  background:'rgba(255,107,107,0.08)', border:'1px solid rgba(255,107,107,0.3)',
                  borderRadius:'0.5rem', color:'#ff6b6b',
                  fontFamily:'var(--font-mono)', fontSize:'0.8rem',
                }}>
                  <AlertCircle size={16} />
                  Failed to send. Please email directly: {personalInfo.email}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
