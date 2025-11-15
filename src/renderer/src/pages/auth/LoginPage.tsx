import { signIn, signOut, signUp } from '@renderer/services/auth/email';
import logError from '@renderer/utils/logError';
import { JSX, useState } from 'react';

function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (): Promise<void> => {
    try {
      const data = await signUp(email, password);
      console.log('Sign up success:', data);
    } catch (error) {
      logError(error);
    }
  };

  const handleSignIn = async (): Promise<void> => {
    try {
      const data = await signIn(email, password);
      console.log('Sign in success:', data);
    } catch (error) {
      logError(error);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
      console.log('Signed out');
    } catch (error) {
      logError(error);
    }
  };

  return (
    <div>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default LoginPage;
