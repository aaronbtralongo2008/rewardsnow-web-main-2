import { createContext, useContext, useState, useEffect } from 'react';

const ThemeCtx = createContext({ isDark: true, toggleTheme: () => {} });

// ── Casiopea Super Flight palette ─────────────────────────────────────────
// Flight Blue #0B5CAD · Deep Flight #07243A · Sunset Gold #F2B84B
// Sunset Orange #E86F2E · Obi Teal #25B7C8 · Ivory #FFF8EA

const DARK = {
  '--rn-bg':                '#07243A',
  '--rn-nav-bg':            'rgba(7,36,58,0.97)',
  '--rn-nav-border':        'rgba(255,255,255,0.07)',
  '--rn-text':              '#F5F0E8',
  '--rn-text-sub':          'rgba(245,240,232,0.66)',
  '--rn-text-muted':        'rgba(245,240,232,0.42)',
  '--rn-text-faint':        'rgba(245,240,232,0.28)',
  '--rn-card-bg':           'rgba(255,255,255,0.05)',
  '--rn-card-border':       'rgba(255,255,255,0.09)',
  '--rn-card-border-lg':    'rgba(255,255,255,0.12)',
  '--rn-section-alt':       'rgba(0,0,0,0.22)',
  '--rn-section-border':    'rgba(255,255,255,0.07)',
  '--rn-ghost-border':      'rgba(245,240,232,0.28)',
  '--rn-ghost-color':       '#F5F0E8',
  '--rn-ghost-hover-bg':    'rgba(245,240,232,0.06)',
  '--rn-nav-btn-border':    'rgba(245,240,232,0.18)',
  '--rn-nav-btn-color':     '#F5F0E8',
  '--rn-nav-hover-bg':      'rgba(245,240,232,0.06)',
  '--rn-muted-btn-color':   'rgba(245,240,232,0.50)',
  '--rn-orb1':              'transparent',
  '--rn-orb2':              'transparent',
  '--rn-orb3':              'transparent',
  '--rn-emp-orb2':          'transparent',
  '--rn-callout-title':     '#F2B84B',
  '--rn-portal-bg':         '#052030',
  '--rn-portal-surface':    'rgba(255,255,255,0.06)',
  '--rn-portal-topbar':     'rgba(5,32,48,0.97)',
  '--rn-portal-border':     'rgba(255,255,255,0.10)',
  '--rn-portal-text':       '#F5F0E8',
  '--rn-portal-text-sub':   'rgba(245,240,232,0.60)',
  '--rn-portal-text-muted': 'rgba(245,240,232,0.38)',
  '--rn-portal-input-bg':   'rgba(255,255,255,0.07)',
  '--rn-portal-input-border':'rgba(255,255,255,0.15)',
  '--rn-portal-input-color':'#e2e8f0',
  '--rn-form-bg':           '#052030',
  '--rn-form-text':         '#F5F0E8',
  '--rn-form-sub':          'rgba(245,240,232,0.60)',
  '--rn-input-bg':          'rgba(255,255,255,0.07)',
  '--rn-input-border':      'rgba(255,255,255,0.14)',
  '--rn-input-color':       '#e2e8f0',
  '--rn-outline-btn-bg':    'rgba(255,255,255,0.06)',
  '--rn-outline-btn-border':'rgba(255,255,255,0.18)',
  '--rn-outline-btn-color': 'rgba(245,240,232,0.85)',
  '--rn-divider':           'rgba(255,255,255,0.10)',
  '--rn-beam-mid':          'rgba(37,183,200,0.22)',
  '--rn-rail':              'rgba(255,255,255,0.04)',
  '--rn-dark-band':         'rgba(0,0,0,0.38)',
  // VN contextual vars (dark)
  '--vn-bg':                '#07243A',
  '--vn-text':              '#F5F0E8',
  '--vn-text-sub':          'rgba(245,240,232,0.66)',
  '--vn-text-muted':        'rgba(245,240,232,0.42)',
  '--vn-card':              'rgba(255,255,255,0.06)',
  '--vn-card-border':       'rgba(255,255,255,0.10)',
  '--vn-nav-bg':            'rgba(7,36,58,0.97)',
  '--vn-nav-border':        'rgba(255,255,255,0.07)',
  '--vn-section-alt':       'rgba(0,0,0,0.22)',
  '--vn-divider':           'rgba(255,255,255,0.10)',
};

const LIGHT = {
  '--rn-bg':                '#FFF8EA',
  '--rn-nav-bg':            'rgba(255,255,255,0.97)',
  '--rn-nav-border':        'rgba(16,24,32,0.10)',
  '--rn-text':              '#101820',
  '--rn-text-sub':          '#374151',
  '--rn-text-muted':        'rgba(16,24,32,0.48)',
  '--rn-text-faint':        'rgba(16,24,32,0.30)',
  '--rn-card-bg':           '#FFFFFF',
  '--rn-card-border':       'rgba(16,24,32,0.10)',
  '--rn-card-border-lg':    'rgba(16,24,32,0.13)',
  '--rn-section-alt':       '#F7F1E3',
  '--rn-section-border':    'rgba(16,24,32,0.08)',
  '--rn-ghost-border':      '#0B5CAD',
  '--rn-ghost-color':       '#0B5CAD',
  '--rn-ghost-hover-bg':    'rgba(11,92,173,0.06)',
  '--rn-nav-btn-border':    'rgba(16,24,32,0.14)',
  '--rn-nav-btn-color':     '#101820',
  '--rn-nav-hover-bg':      'rgba(16,24,32,0.05)',
  '--rn-muted-btn-color':   'rgba(16,24,32,0.48)',
  '--rn-orb1':              'transparent',
  '--rn-orb2':              'transparent',
  '--rn-orb3':              'transparent',
  '--rn-emp-orb2':          'transparent',
  '--rn-callout-title':     '#07243A',
  '--rn-portal-bg':         '#FFF8EA',
  '--rn-portal-surface':    '#FFFFFF',
  '--rn-portal-topbar':     '#FFFFFF',
  '--rn-portal-border':     'rgba(16,24,32,0.10)',
  '--rn-portal-text':       '#101820',
  '--rn-portal-text-sub':   '#5F6B73',
  '--rn-portal-text-muted': 'rgba(16,24,32,0.38)',
  '--rn-portal-input-bg':   '#FFFFFF',
  '--rn-portal-input-border':'rgba(16,24,32,0.18)',
  '--rn-portal-input-color':'#101820',
  '--rn-form-bg':           '#E8F0FB',
  '--rn-form-text':         '#101820',
  '--rn-form-sub':          '#0B5CAD',
  '--rn-input-bg':          '#FFFFFF',
  '--rn-input-border':      'rgba(11,92,173,0.28)',
  '--rn-input-color':       '#101820',
  '--rn-outline-btn-bg':    'rgba(11,92,173,0.05)',
  '--rn-outline-btn-border':'rgba(11,92,173,0.32)',
  '--rn-outline-btn-color': '#0B5CAD',
  '--rn-divider':           'rgba(16,24,32,0.10)',
  '--rn-beam-mid':          'rgba(11,92,173,0.09)',
  '--rn-rail':              'rgba(11,92,173,0.04)',
  '--rn-dark-band':         '#07243A',
  // VN contextual vars (light)
  '--vn-bg':                '#FFF8EA',
  '--vn-text':              '#101820',
  '--vn-text-sub':          '#374151',
  '--vn-text-muted':        'rgba(16,24,32,0.48)',
  '--vn-card':              '#FFFFFF',
  '--vn-card-border':       'rgba(16,24,32,0.10)',
  '--vn-nav-bg':            'rgba(255,255,255,0.97)',
  '--vn-nav-border':        'rgba(16,24,32,0.10)',
  '--vn-section-alt':       '#F7F1E3',
  '--vn-divider':           'rgba(16,24,32,0.10)',
};

function applyVars(isDark) {
  const vars = isDark ? DARK : LIGHT;
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('rn_theme');
      const dark = saved !== 'light';
      applyVars(dark);
      return dark;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    applyVars(isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      try { localStorage.setItem('rn_theme', next ? 'dark' : 'light'); } catch {}
      return next;
    });
  };

  return (
    <ThemeCtx.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeCtx);
}
