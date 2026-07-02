import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { obtenerIntentosPorUsuario } from '../lib/db/intentos';
import { obtenerUsuarioId } from '../lib/sesion';
import { Intento } from '../types/intento';

export default function Historial() {
  const [intentos, setIntentos] = useState<Intento[]>([]);

  useEffect(() => {
    const id = obtenerUsuarioId();
    if (id !== null) {
      const data = obtenerIntentosPorUsuario(id);
      setIntentos(data);
    }
  }, []);

  function formatearTiempo(centesimas: number): string {
    const m = Math.floor(centesimas / 6000).toString().padStart(2, '0');
    const s = Math.floor((centesimas % 6000) / 100).toString().padStart(2, '0');
    const cs = (centesimas % 100).toString().padStart(2, '0');
    return `${m}:${s}.${cs}`;
  }

  function formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Historial</Text>
      {intentos.length === 0 ? (
        <Text style={styles.vacio}>No hay intentos registrados.</Text>
      ) : (
        <FlatList
          data={intentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.ejercicio}>Ejercicio: {item.id_ejercicio}</Text>
              <Text style={styles.detalle}>Tiempo: {formatearTiempo(item.tiempo)}</Text>
              <Text style={styles.detalle}>Fecha: {formatearFecha(item.fecha)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  vacio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 48,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    gap: 4,
  },
  ejercicio: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detalle: {
    fontSize: 14,
    color: '#555',
  },
});
