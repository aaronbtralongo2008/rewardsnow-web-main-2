import { createContext, useContext, useState, useEffect } from 'react';

const ThemeCtx = createContext({ isDark: true, toggleTheme: () => {} });

// ── Veniar Ocean Breeze — existing --rn-* vars kept for app pages ─────────
// New --vn-* contextual vars follow the Ocean Breeze palette

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
  '--rn-beam-mid':          'rgba(0,169,200,0.18)',
  '--rn-rail':              'rgba(255,255,255,0.04)',
  '--rn-dark-band':         '#07131A',
  // Ocean Breeze VN contextual vars — dark mode
  '--vn-bg':                '#0A1211',
  '--vn-surface':           '#07131A',
  '--vn-panel':             '#0B2B30',
  '--vn-panel-strong':      '#0F3F45',
  '--vn-text':              '#FFF8EA',
  '--vn-text-sub':          '#B8C7CC',
  '--vn-text-muted':        'rgba(184,199,204,0.60)',
  '--vn-card':              '#0B2B30',
  '--vn-card-border':       'rgba(255,248,234,0.16)',
  '--vn-nav-bg':            'rgba(10,18,17,0.97)',
  '--vn-nav-border':        'rgba(255,248,234,0.12)',
  '--vn-section-alt':       '#07131A',
  '--vn-divider':           'rgba(255,248,234,0.12)',
  '--vn-accent':            '#5CB2C9',
  '--vn-accent-hover':      '#1692A2',
  '--vn-gold':              '#F8C922',
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
  '--rn-ghost-border':      '#1677B8',
  '--rn-ghost-color':       '#1677B8',
  '--rn-ghost-hover-bg':    'rgba(22,119,184,0.06)',
  '--rn-nav-btn-border':    'rgba(16,24,32,0.14)',
  '--rn-nav-btn-color':     '#101820',
  '--rn-nav-hover-bg':      'rgba(16,24,32,0.05)',
  '--rn-muted-btn-color':   'rgba(16,24,32,0.48)',
  '--rn-orb1':              'transparent',
  '--rn-orb2':              'transparent',
  '--rn-orb3':              'transparent',
  '--rn-emp-orb2':          'transparent',
  '--rn-callout-title':     '#06445E',
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
  '--rn-form-bg':           '#E6F8F6',
  '--rn-form-text':         '#101820',
  '--rn-form-sub':          '#1677B8',
  '--rn-input-bg':          '#FFFFFF',
  '--rn-input-border':      'rgba(22,119,184,0.28)',
  '--rn-input-color':       '#101820',
  '--rn-outline-btn-bg':    'rgba(22,119,184,0.05)',
  '--rn-outline-btn-border':'rgba(22,119,184,0.30)',
  '--rn-outline-btn-color': '#1677B8',
  '--rn-divider':           'rgba(16,24,32,0.10)',
  '--rn-beam-mid':          'rgba(0,169,200,0.09)',
  '--rn-rail':              'rgba(0,169,200,0.04)',
  '--rn-dark-band':         '#06445E',
  // Ocean Breeze VN contextual vars — light mode
  '--vn-bg':                '#FFF8EA',
  '--vn-surface':           '#F5F5F4',
  '--vn-panel':             '#F7E8CF',
  '--vn-panel-strong':      '#EDD5B0',
  '--vn-text':              '#101820',
  '--vn-text-sub':          '#5F6B73',
  '--vn-text-muted':        'rgba(16,24,32,0.48)',
  '--vn-card':              '#FFFFFF',
  '--vn-card-border':       'rgba(16,24,32,0.14)',
  '--vn-nav-bg':            'rgba(255,248,234,0.97)',
  '--vn-nav-border':        'rgba(16,24,32,0.10)',
  '--vn-section-alt':       '#F5F5F4',
  '--vn-divider':           'rgba(16,24,32,0.10)',
  '--vn-accent':            '#1692A2',
  '--vn-accent-hover':      '#0F7F8F',
  '--vn-gold':              '#EDA81B',
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
