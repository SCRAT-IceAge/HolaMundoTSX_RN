import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { crearUsuario } from '../../lib/db/usuarios';

export default function SignUp() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');

  function validar(): boolean {
    if (!nombre || !email || !contrasena || !confirmar) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return false;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Email invalido');
      return false;
    }
    if (contrasena.length < 8) {
      Alert.alert('Error', 'La contrasena debe tener al menos 8 caracteres');
      return false;
    }
    if (contrasena !== confirmar) {
      Alert.alert('Error', 'Las contrasenas no coinciden');
      return false;
    }
    return true;
  }

function handleRegistrar() {
  if (!validar()) return;
  const exito = crearUsuario(nombre, email, contrasena);
  if (!exito) {
    Alert.alert('Error', 'Ya existe una cuenta con ese email');
    return;
  }
  Alert.alert('Exito', 'Usuario registrado', [
    { text: 'OK', onPress: () => router.replace('/menu') }
  ]);
}

  return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>Registrarse</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar contrasena"
        value={confirmar}
        onChangeText={setConfirmar}
        secureTextEntry
      />

      <TouchableOpacity style={styles.boton} onPress={handleRegistrar}>
        <Text style={styles.botonTexto}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/log-in')}>
        <Text style={styles.link}>Ya tenes cuenta? Inicia sesion</Text>
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