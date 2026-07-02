import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { inicializarDB } from '../lib/db/cliente';
import { CodigoProvider } from '../context/CodigoContext';

export default function RootLayout() {
  useEffect(() => {
    inicializarDB();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CodigoProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="menu" options={{ title: 'Menu' }} />
          <Stack.Screen name="historial" options={{ title: 'Historial' }} />
          <Stack.Screen name="auth/sign-up" options={{ title: 'Registrarse' }} />
          <Stack.Screen name="auth/log-in" options={{ title: 'Iniciar Sesion' }} />
          <Stack.Screen name="ejercicios/detalle" options={{ headerShown: false }} />
        </Stack>
      </CodigoProvider>
    </GestureHandlerRootView>
  );
}
