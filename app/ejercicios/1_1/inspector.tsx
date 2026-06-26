import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ejercicios } from '../../../constants/ejercicios';

const ejercicio = ejercicios["1_1"];

export default function Inspector() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{ejercicio.nombre}</Text>
      <Text style={styles.subtitulo}>Leccion {ejercicio.leccion}</Text>

      <Text style={styles.label}>Codigo a escribir:</Text>
      <View style={styles.codigoContainer}>
        <Text style={styles.codigo}>{ejercicio.codigoResuelto}</Text>
      </View>

      <Text style={styles.label}>Que debe contener:</Text>
      {ejercicio.checkList.map((item) => (
        <View key={item.id} style={styles.checkItem}>
          <Text style={styles.checkTexto}>• {item.descripcion}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 12,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  codigoContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 16,
  },
  codigo: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 16,
  },
  checkItem: {
    paddingVertical: 4,
  },
  checkTexto: {
    fontSize: 15,
    color: '#333',
  },
});