import { View, Text, FlatList, StyleSheet } from 'react-native';
import { obtenerCadenciaPromedioPorAlumno } from '../lib/db/intentos';

export default function Admin() {
  const datos = obtenerCadenciaPromedioPorAlumno();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadencia por alumno</Text>
      <FlatList
        data={datos}
        keyExtractor={(item) => String(item.id_usuario)}
        renderItem={({ item }) => (
          <View style={styles.fila}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.dato}>
              {item.cadencia_promedio.toFixed(2)} caract/seg — {item.cantidad_intentos} intentos
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay datos todavía.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fila: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dato: {
    fontSize: 14,
    color: '#666',
  },
});