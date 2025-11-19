import { ThemeContext } from '@renderer/context/theme/ThemeContext';
import { useContext } from 'react';

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
