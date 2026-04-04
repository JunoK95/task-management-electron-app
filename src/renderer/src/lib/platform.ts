export const isElectron = (): boolean =>
  typeof window !== 'undefined' && 'electron' in window
