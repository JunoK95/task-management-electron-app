// src/renderer/src/components/AuthCard/AuthCard.test.tsx
import { render, screen } from '@testing-library/react';

import AuthCard from './AuthCard';

describe('AuthCard', () => {
  it('renders children', () => {
    render(
      <AuthCard>
        <p>Child content</p>
      </AuthCard>
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <AuthCard title="Test Title">
        <p>Child content</p>
      </AuthCard>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    render(
      <AuthCard error="Test Error">
        <p>Child content</p>
      </AuthCard>
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
    // Optionally check that the error class is applied
    const cardDiv = screen.getByText('Test Error').parentElement;
    expect(cardDiv).toHaveClass('auth-card--error');
  });

  it('renders both title and error together', () => {
    render(
      <AuthCard title="Title" error="Error">
        <p>Child content</p>
      </AuthCard>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
