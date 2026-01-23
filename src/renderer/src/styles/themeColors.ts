// themeColors.ts

// Light theme colors
export const lightColors = {
  bg: '#ffffff',
  sidebar: '#f0f0f0',
  sidebarActive: '#c0c0c0',
  text: '#333333',
  accent: '#0078d4',
  hover: '#e0e0e0'
};

// Dark theme colors
export const darkColors = {
  bg: '#252526',
  sidebar: '#1e1e1e',
  sidebarActive: '#333333',
  text: '#e0e0e0',
  accent: '#0a84ff',
  hover: '#2a2a2a'
};

// Define color tokens for CSS variables
export const themeVariables = {
  surfaceMenu: '#fafafa',
  surface: '#f6f7f8',
  border: '#dedede',
  text: '#222',
  textMuted: '#666',
  textStrong: '#000',
  textOnAccent: '#fff',
  hover: 'rgba(0, 0, 0, 0.05)',
  selected: 'rgba(0, 0, 0, 0.08)',

  // Status colors
  error: '#ff3b30',
  success: '#34c759',
  warning: '#ffcc00',
  low: '#3b82f6', // Blue
  normal: '#10b981', // Green
  high: '#f97316', // Orange
  pending: '#facc15', // Yellow
  inProgress: '#6366f1', // Indigo
  completed: '#6b7280' // Gray
};

// Dark theme variables
export const darkThemeVariables = {
  surfaceMenu: '#2b2d31',
  surface: '#1f2024',
  border: '#333',
  text: '#f2f2f2',
  textMuted: '#b7b7b7',
  textStrong: '#fff',
  textOnAccent: '#111',
  hover: 'rgba(255, 255, 255, 0.08)',
  selected: 'rgba(255, 255, 255, 0.14)',

  // Status colors (same as above)
  error: '#ff453a',
  success: '#30d158',
  warning: '#ffd60a'
};

export const accentOptions = [
  // Red
  { id: 'crimson', label: 'Crimson', value: '#E5484D' },

  // Orange
  { id: 'orange', label: 'Orange', value: '#F97316' },

  // Yellow
  { id: 'amber', label: 'Amber', value: '#F59E0B' },

  // Green
  { id: 'emerald', label: 'Emerald', value: '#10B981' },

  // Blue
  { id: 'blue', label: 'Blue', value: '#0A84FF' },

  // Indigo
  { id: 'indigo', label: 'Indigo', value: '#6366F1' },

  // Violet
  { id: 'purple', label: 'Purple', value: '#8B5CF6' },

  // Pink
  { id: 'pink', label: 'Pink', value: '#EC4899' },

  // Neutral
  { id: 'slate', label: 'Slate', value: '#475569' }
];
