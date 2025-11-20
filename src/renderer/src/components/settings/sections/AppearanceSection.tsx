import { useTheme } from '../../../hooks/useTheme';

export default function AppearanceSection() {
  const { toggleTheme } = useTheme();

  return (
    <div>
      <h3>Appearance</h3>
      <p>Theme, dark mode, layout density…</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
