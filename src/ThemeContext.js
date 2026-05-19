import { createContext, useContext, useState, useEffect } from 'react';

const ThemeCtx = createContext({ isDark: true, toggleTheme: () => {} });

const DARK = {
  '--rn-bg':                '#08011a',
  '--rn-nav-bg':            'rgba(8,1,26,0.85)',
  '--rn-nav-border':        'rgba(255,255,255,0.07)',
  '--rn-text':              '#ffffff',
  '--rn-text-sub':          'rgba(255,255,255,0.6)',
  '--rn-text-muted':        'rgba(255,255,255,0.45)',
  '--rn-text-faint':        'rgba(255,255,255,0.3)',
  '--rn-card-bg':           'rgba(255,255,255,0.04)',
  '--rn-card-border':       'rgba(255,255,255,0.08)',
  '--rn-card-border-lg':    'rgba(255,255,255,0.1)',
  '--rn-section-alt':       'rgba(255,255,255,0.025)',
  '--rn-section-border':    'rgba(255,255,255,0.06)',
  '--rn-ghost-border':      'rgba(255,255,255,0.25)',
  '--rn-ghost-color':       '#ffffff',
  '--rn-nav-btn-border':    'rgba(255,255,255,0.2)',
  '--rn-nav-btn-color':     '#ffffff',
  '--rn-muted-btn-color':   'rgba(255,255,255,0.5)',
  '--rn-orb1':              'rgba(37,99,235,0.45)',
  '--rn-orb2':              'rgba(6,182,212,0.22)',
  '--rn-orb3':              'rgba(217,70,239,0.15)',
  '--rn-form-bg':           '#0a1628',
  '--rn-form-text':         '#f0f6ff',
  '--rn-form-sub':          'rgba(255,255,255,0.55)',
  '--rn-input-bg':          'rgba(255,255,255,0.07)',
  '--rn-input-border':      'rgba(255,255,255,0.14)',
  '--rn-input-color':       '#e2e8f0',
  '--rn-outline-btn-bg':    'rgba(255,255,255,0.06)',
  '--rn-outline-btn-border':'rgba(255,255,255,0.18)',
  '--rn-outline-btn-color': 'rgba(255,255,255,0.85)',
  '--rn-divider':           'rgba(255,255,255,0.1)',
};

const LIGHT = {
  '--rn-bg':                '#f0f6ff',
  '--rn-nav-bg':            'rgba(240,246,255,0.92)',
  '--rn-nav-border':        'rgba(0,0,0,0.08)',
  '--rn-text':              '#0f172a',
  '--rn-text-sub':          'rgba(15,23,42,0.65)',
  '--rn-text-muted':        'rgba(15,23,42,0.45)',
  '--rn-text-faint':        'rgba(15,23,42,0.3)',
  '--rn-card-bg':           'rgba(0,0,0,0.03)',
  '--rn-card-border':       'rgba(0,0,0,0.08)',
  '--rn-card-border-lg':    'rgba(0,0,0,0.1)',
  '--rn-section-alt':       'rgba(0,0,0,0.025)',
  '--rn-section-border':    'rgba(0,0,0,0.06)',
  '--rn-ghost-border':      'rgba(0,0,0,0.2)',
  '--rn-ghost-color':       '#0f172a',
  '--rn-nav-btn-border':    'rgba(0,0,0,0.18)',
  '--rn-nav-btn-color':     '#0f172a',
  '--rn-muted-btn-color':   'rgba(15,23,42,0.5)',
  '--rn-orb1':              'rgba(37,99,235,0.1)',
  '--rn-orb2':              'rgba(6,182,212,0.07)',
  '--rn-orb3':              'rgba(217,70,239,0.06)',
  '--rn-form-bg':           '#f0f7ff',
  '--rn-form-text':         '#0f172a',
  '--rn-form-sub':          '#64748b',
  '--rn-input-bg':          '#ffffff',
  '--rn-input-border':      '#bfdbfe',
  '--rn-input-color':       '#0f172a',
  '--rn-outline-btn-bg':    '#ffffff',
  '--rn-outline-btn-border':'#bfdbfe',
  '--rn-outline-btn-color': '#374151',
  '--rn-divider':           '#bfdbfe',
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
