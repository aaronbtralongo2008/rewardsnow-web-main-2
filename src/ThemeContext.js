import { createContext, useContext, useState, useEffect } from 'react';

const ThemeCtx = createContext({ isDark: true, toggleTheme: () => {} });

const DARK = {
  '--rn-bg':                '#061A2A',
  '--rn-nav-bg':            'rgba(6,26,42,0.95)',
  '--rn-nav-border':        'rgba(255,255,255,0.08)',
  '--rn-text':              '#ffffff',
  '--rn-text-sub':          'rgba(255,255,255,0.62)',
  '--rn-text-muted':        'rgba(255,255,255,0.42)',
  '--rn-text-faint':        'rgba(255,255,255,0.26)',
  '--rn-card-bg':           '#0C2640',
  '--rn-card-border':       'rgba(255,255,255,0.1)',
  '--rn-card-border-lg':    'rgba(255,255,255,0.12)',
  '--rn-section-alt':       '#051220',
  '--rn-section-border':    'rgba(255,255,255,0.07)',
  '--rn-ghost-border':      'rgba(255,255,255,0.2)',
  '--rn-ghost-color':       '#ffffff',
  '--rn-nav-btn-border':    'rgba(255,255,255,0.18)',
  '--rn-nav-btn-color':     'rgba(255,255,255,0.88)',
  '--rn-muted-btn-color':   'rgba(255,255,255,0.5)',
  '--rn-orb1':              'rgba(21,101,196,0.28)',
  '--rn-orb2':              'rgba(37,183,200,0.14)',
  '--rn-orb3':              'rgba(37,183,200,0.08)',
  '--rn-emp-orb2':          'rgba(37,183,200,0.16)',
  '--rn-callout-title':     '#F2B84B',
  '--rn-portal-bg':         '#061A2A',
  '--rn-portal-surface':    '#0C2640',
  '--rn-portal-topbar':     '#051220',
  '--rn-portal-border':     'rgba(255,255,255,0.1)',
  '--rn-portal-text':       '#ffffff',
  '--rn-portal-text-sub':   'rgba(255,255,255,0.62)',
  '--rn-portal-text-muted': 'rgba(255,255,255,0.40)',
  '--rn-portal-input-bg':   'rgba(255,255,255,0.06)',
  '--rn-portal-input-border':'rgba(255,255,255,0.14)',
  '--rn-portal-input-color':'#e2e8f0',
  '--rn-form-bg':           '#0C2640',
  '--rn-form-text':         '#ffffff',
  '--rn-form-sub':          'rgba(255,255,255,0.6)',
  '--rn-input-bg':          'rgba(255,255,255,0.06)',
  '--rn-input-border':      'rgba(255,255,255,0.14)',
  '--rn-input-color':       '#e2e8f0',
  '--rn-outline-btn-bg':    'rgba(255,255,255,0.06)',
  '--rn-outline-btn-border':'rgba(255,255,255,0.18)',
  '--rn-outline-btn-color': 'rgba(255,255,255,0.85)',
  '--rn-divider':           'rgba(255,255,255,0.1)',
};

const LIGHT = {
  '--rn-bg':                '#FFF8EA',
  '--rn-nav-bg':            'rgba(255,248,234,0.97)',
  '--rn-nav-border':        'rgba(16,24,32,0.1)',
  '--rn-text':              '#101820',
  '--rn-text-sub':          'rgba(16,24,32,0.65)',
  '--rn-text-muted':        'rgba(16,24,32,0.45)',
  '--rn-text-faint':        'rgba(16,24,32,0.28)',
  '--rn-card-bg':           '#ffffff',
  '--rn-card-border':       'rgba(16,24,32,0.1)',
  '--rn-card-border-lg':    'rgba(16,24,32,0.12)',
  '--rn-section-alt':       '#F7F1E3',
  '--rn-section-border':    'rgba(16,24,32,0.08)',
  '--rn-ghost-border':      'rgba(16,24,32,0.22)',
  '--rn-ghost-color':       '#101820',
  '--rn-nav-btn-border':    'rgba(16,24,32,0.18)',
  '--rn-nav-btn-color':     '#101820',
  '--rn-muted-btn-color':   'rgba(16,24,32,0.5)',
  '--rn-orb1':              'rgba(21,101,196,0.07)',
  '--rn-orb2':              'rgba(37,183,200,0.05)',
  '--rn-orb3':              'rgba(37,183,200,0.04)',
  '--rn-emp-orb2':          'rgba(37,183,200,0.06)',
  '--rn-callout-title':     '#92400e',
  '--rn-portal-bg':         '#FFF8EA',
  '--rn-portal-surface':    '#ffffff',
  '--rn-portal-topbar':     '#ffffff',
  '--rn-portal-border':     'rgba(16,24,32,0.1)',
  '--rn-portal-text':       '#101820',
  '--rn-portal-text-sub':   'rgba(16,24,32,0.65)',
  '--rn-portal-text-muted': 'rgba(16,24,32,0.42)',
  '--rn-portal-input-bg':   '#ffffff',
  '--rn-portal-input-border':'rgba(16,24,32,0.18)',
  '--rn-portal-input-color':'#101820',
  '--rn-form-bg':           '#dbeafe',
  '--rn-form-text':         '#101820',
  '--rn-form-sub':          '#3b5a8a',
  '--rn-input-bg':          '#ffffff',
  '--rn-input-border':      'rgba(16,24,32,0.18)',
  '--rn-input-color':       '#101820',
  '--rn-outline-btn-bg':    '#ffffff',
  '--rn-outline-btn-border':'rgba(16,24,32,0.18)',
  '--rn-outline-btn-color': '#101820',
  '--rn-divider':           'rgba(16,24,32,0.1)',
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
