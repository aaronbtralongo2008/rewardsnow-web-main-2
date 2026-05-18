import { createContext, useContext, useState } from 'react';

const ThemeCtx = createContext({ isDark: true, toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('rn_theme') !== 'light';
    } catch {
      return true;
    }
  });

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
