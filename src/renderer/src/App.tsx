// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'

import { useEffect, useState } from 'react';
import LoginPage from './pages/auth/LoginPage';
import { supabase } from './services/supabase/client';
import { Session } from '@supabase/supabase-js';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const handleNotify = (): void => {
    window.electronAPI.notify('Hello from React', 'This is a node-notifier alert!');
  };

  console.log('window.electronAPI', window.electronAPI);
  console.log('VITE_SUPABASE_URL', import.meta.env.VITE_SUPABASE_URL);

  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  console.log('Current session:', session);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Electron + Vite + React Notification</h1>
      <button onClick={handleNotify}>Show Notification</button>
      <LoginPage />
    </div>
  );
}

export default App;
