import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthCard from '@/components/AuthCard/AuthCard';
import { Button } from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { OAuthButton } from '@/components/OAuthButton/OauthButton';
import Separator from '@/components/Separator/Separator';
import { useAuth } from '@/hooks/useAuth';

import styles from './LoginPage.module.scss';

export default function LoginPage() {
  const { signIn, signInWithGoogle, signInWithApple } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) setError(error);
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-page__left-panel']}>
        <div className={styles['login-page__branding']}>
          <h1>Your App</h1>
          <p>Organize everything effortlessly.</p>
        </div>
      </div>

      <div className={styles['login-page__right-panel']}>
        <AuthCard title="Welcome Back" error={error}>
          <form className={styles['login-page__form']} onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Sign In</Button>
          </form>
          <div className={styles['login-page__footer']}>
            <span>Don’t have an account? </span>
            <Link to="/auth/signup" className={styles['login-page__signup-link']}>
              Sign Up
            </Link>
          </div>
          <Separator />
          <OAuthButton provider="google" onClick={signInWithGoogle} />
          <OAuthButton provider="apple" onClick={signInWithApple} />
        </AuthCard>
      </div>
    </div>
  );
}
