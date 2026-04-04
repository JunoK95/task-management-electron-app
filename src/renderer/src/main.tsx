import 'juno-ui-library/dist/juno-ui-library.css';
import './styles/index.scss';

// Apply theme based on system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = prefersDark ? 'dark' : 'light';
document.body.classList.add(initialTheme);
document.documentElement.setAttribute('data-theme', initialTheme);

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { AuthProvider } from './context/auth/AuthProvider';
import { ModalProvider } from './context/modal/ModalProvider';
import ThemeProvider from './context/theme/ThemeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      retry: 1
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
