import { Slot } from 'expo-router';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </AuthProvider>
  );
}
