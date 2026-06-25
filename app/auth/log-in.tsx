import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { obtenerUsuarioPorEmail } from '../../lib/db/usuarios';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  function validar(): boolean {
    if (!email || !contrasena) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return false;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Email invalido');
      return false;
    }
    return true;
  }

function handleLogin() {
  if (!validar()) return;

  const usuario = obtenerUsuarioPorEmail(email);
  if (!usuario) {
    Alert.alert('Error', 'No existe una cuenta con ese email');
    return;
  }
  if (usuario.contrasena !== contrasena) {
    Alert.alert('Error', 'Contrasena incorrecta');
    return;
  }

  Alert.alert('Exito', 'Sesion iniciada', [
    { text: 'OK', onPress: () => router.replace('/menu') }
  ]);
}

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Iniciar Sesion</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contrasena"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />

        <TouchableOpacity style={styles.boton} onPress={handleLogin}>
          <Text style={styles.botonTexto}>Iniciar Sesion</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
          <Text style={styles.link}>No tenes cuenta? Registrate</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
  },
});