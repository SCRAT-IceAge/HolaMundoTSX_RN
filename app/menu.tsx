import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Menu() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Menu</Text>

      <TouchableOpacity style={styles.boton} onPress={() => router.push('/ejercicios/1_1')}>
        <Text style={styles.botonTexto}>Hola Mundo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boton} onPress={() => router.push('/auth/sign-up')}>
        <Text style={styles.botonTexto}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boton} onPress={() => router.push('/auth/log-in')}>
        <Text style={styles.botonTexto}>Iniciar Sesion</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boton} onPress={() => router.push('/historial')}>
        <Text style={styles.botonTexto}>Historial</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  boton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});