import { useContext } from 'react';

import { AuthContext } from '../context/auth/AuthContext';
import { AuthContextType } from '../context/auth/types';

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return ctx;
}
