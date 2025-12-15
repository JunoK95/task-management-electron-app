import { useEffect, useState, ReactNode } from 'react';

import { ThemeContext } from './ThemeContext';

type Theme = 'light' | 'dark';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  // Apply theme to <body>
  const applyTheme = (t: Theme) => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(t);
  };

  // Safe setter that updates class + state + localStorage
  const setTheme = (t: Theme) => {
    setThemeState(t);
    applyTheme(t);
    localStorage.setItem('theme', t);
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const initial = saved ?? system;

    setTheme(initial);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
