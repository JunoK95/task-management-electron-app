// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'

import SettingsModal from './components/settings/SettingsModal/SettingsModal';
import { useModal } from './hooks/useModal';
import AppRouter from './routes/AppRouter';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // const handleNotify = (): void => {
  //   window.electronAPI.notify('Hello from React', 'This is a node-notifier alert!');
  // };
  const { isSettingsOpen } = useModal();

  return (
    <>
      <AppRouter />
      {isSettingsOpen && <SettingsModal />}
    </>
  );
}

export default App;
