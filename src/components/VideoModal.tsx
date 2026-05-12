import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink } from 'lucide-react';

interface Props {
  url:     string;
  isOpen:  boolean;
  onClose: () => void;
}

const normalizeUrl = (url: string): string => {
  /* Google Drive: strip sharing params, ensure /preview suffix */
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([^/]+)/);
    if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
};

const isDrive = (url: string) => url.includes('drive.google.com');

const VideoModal = ({ url, isOpen, onClose }: Props) => {
  const embedUrl = normalizeUrl(url);

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKey]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      onClick={onClose}
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          9999,
        background:      'rgba(6,9,15,0.94)',
        backdropFilter:  'blur(18px)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        padding:         '2rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width:    'min(900px, 90vw)',
          display:  'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {/* Close button just above the video */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close video"
          style={{
            marginBottom:    '0.75rem',
            background:      'rgba(0,0,0,0.6)',
            border:          '1px solid var(--border-color)',
            borderRadius:    '0.4rem',
            color:           'var(--white)',
            padding:         '0.5rem',
            display:         'flex',
            alignItems:      'center',
            cursor:          'pointer',
            transition:      'background 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(var(--cyan-rgb), 0.15)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.6)')}
        >
          <X size={20} />
        </button>

        <div
          style={{
            width:       '100%',
            background:  'var(--bg3)',
            border:      '1px solid var(--border-color)',
            borderRadius:'1rem',
            overflow:    'hidden',
          }}
        >
          {/* Video */}
        <div style={{ aspectRatio: '16/9' }}>
          <iframe
            src={embedUrl}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title="Research video"
          />
        </div>

        {/* Drive fallback link */}
        {isDrive(url) && (
          <div
            style={{
              padding:        '0.75rem 1rem',
              display:        'flex',
              justifyContent: 'flex-end',
              borderTop:      '1px solid var(--border-color)',
            }}
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:     'inline-flex',
                alignItems:  'center',
                gap:         '0.4rem',
                fontFamily:  'var(--font-mono)',
                fontSize:    '0.72rem',
                color:       'var(--muted)',
              }}
            >
              <ExternalLink size={13} />
              Open in new tab
            </a>
          </div>
        )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VideoModal;
