// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'

import { useModal } from './hooks/useModal';
import SettingsLayout from './layouts/SettingsLayout/SettingsLayout';
import AppRouter from './routes/AppRouter';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // const handleNotify = (): void => {
  //   window.electronAPI.notify('Hello from React', 'This is a node-notifier alert!');
  // };
  const { isSettingsOpen, closeSettings } = useModal();

  return (
    <>
      <AppRouter />
      <SettingsLayout open={isSettingsOpen} onClose={() => closeSettings()} />
    </>
  );
}

export default App;
