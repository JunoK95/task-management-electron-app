import { useContext } from 'react';
import { AuthContextType } from '../context/auth/types';
import { AuthContext } from '../context/auth/AuthContext';

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return ctx;
}
