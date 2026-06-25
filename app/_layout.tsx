import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { inicializarDB } from '../lib/db/cliente';

export default function RootLayout() {
  useEffect(() => {
    inicializarDB();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="menu" options={{ title: 'Menú' }} />
      <Stack.Screen name="historial" options={{ title: 'Historial' }} />
      <Stack.Screen name="auth/sign-up" options={{ title: 'Registrarse' }} />
      <Stack.Screen name="auth/log-in" options={{ title: 'Iniciar Sesión' }} />
    </Stack>
  );
}
