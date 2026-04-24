import { personalInfo } from '../data/portfolio';

const Footer = () => (
  <footer
    style={{
      position:    'relative',
      zIndex:      2,
      textAlign:   'center',
      padding:     '3rem 2rem',
      borderTop:   '1px solid var(--border-color)',
      fontFamily:  'var(--font-mono)',
      fontSize:    '0.78rem',
      color:       'var(--muted)',
    }}
  >
    Designed &amp; built by{' '}
    <span style={{ color: 'var(--cyan)' }}>{personalInfo.nameFirst} {personalInfo.nameLast}</span>
    {' '}· {new Date().getFullYear()}
  </footer>
);

export default Footer;
