import { AuthContext } from '@renderer/context/auth/AuthContext';
import { AuthContextType } from '@renderer/context/auth/types';
import { useContext } from 'react';

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return ctx;
}
