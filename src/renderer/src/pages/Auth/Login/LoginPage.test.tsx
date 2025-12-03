import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/auth/AuthProvider';
import LoginPage from '../LoginPage';
import { act } from 'react';

jest.mock('../../services/supabase/env', () => ({
  SUPABASE_URL: 'https://fake.supabase.url',
  SUPABASE_ANON_KEY: 'fake-key'
}));

describe('LoginPage', () => {
  it('renders email, password, and sign in button', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </AuthProvider>
      );
    });

    // Use findBy* queries for async rendering
    expect(await screen.findByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(await screen.findByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
});
