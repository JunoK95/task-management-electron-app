import { useState } from 'react';

import styles from './SignupPage.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthCard from '../../components/AuthCard/AuthCard';
import Input from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import Separator from '../../components/Separator/Separator';
import { OAuthButton } from '../../components/OAuthButton/OauthButton';

export default function SignupPage() {
  const { signIn, signInWithGoogle, signInWithApple } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Confirm password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const { error } = await signIn(email, password);
    if (error) setError(error);
  };

  return (
    <div className={styles['signup-page']}>
      <div className={styles['signup-page__left-panel']}>
        <div className={styles['signup-page__branding']}>
          <h1>Your App</h1>
          <p>Organize everything effortlessly.</p>
        </div>
      </div>

      <div className={styles['signup-page__right-panel']}>
        <AuthCard title="Create Account" error={error}>
          <form className={styles['signup-page__form']} onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button type="submit">Sign Up</Button>

            <div className={styles['signup-page__footer']}>
              <span>Already have an account? </span>
              <Link to="/login" className={styles['signup-page__login-link']}>
                Sign In
              </Link>
            </div>
          </form>

          <Separator />

          <OAuthButton provider="google" onClick={signInWithGoogle} />
          <OAuthButton provider="apple" onClick={signInWithApple} />
        </AuthCard>
      </div>
    </div>
  );
}
