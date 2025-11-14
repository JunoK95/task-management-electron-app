// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const handleNotify = (): void => {
    window.electronAPI.notify('Hello from React', 'This is a node-notifier alert!')
  }

  console.log('window.electronAPI', window.electronAPI)

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Electron + Vite + React Notification</h1>
      <button onClick={handleNotify}>Show Notification</button>
    </div>
  )
}

export default App
