import { Tabs } from 'expo-router';

export default function EjercicioLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="inspector" options={{ title: 'Inspector' }} />
      <Tabs.Screen name="verificador" options={{ title: 'Verificador' }} />
    </Tabs>
  );
}