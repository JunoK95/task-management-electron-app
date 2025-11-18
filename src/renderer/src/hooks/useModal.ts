import { ModalContext } from '@renderer/context/modal/ModalContext';
import { useContext } from 'react';

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
};
