import clsx from 'clsx';
import styles from './OAuthButton.module.scss';

interface OAuthButtonProps {
  provider: 'google' | 'apple';
  onClick?: () => void;
}

export function OAuthButton({ provider, onClick }: OAuthButtonProps) {
  return (
    <button
      className={clsx(styles['oauth-button'], styles[`oauth-button--${provider}`])}
      onClick={onClick}
    >
      {provider === 'google' ? 'Continue with Google' : 'Continue with Apple'}
    </button>
  );
}
