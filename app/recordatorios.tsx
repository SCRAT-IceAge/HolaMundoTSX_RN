import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { router } from 'expo-router';
import { obtenerRecordatoriosNoVistos, marcarRecordatorioVisto } from '../lib/db/recordatorios';
import { obtenerUsuarioId, getModoOscuro, setModoOscuro } from '../lib/sesion';
import type { Recordatorio } from '../lib/db/recordatorios';

export default function RecordatoriosPantalla() {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([]);
  const [oscuro, setOscuro] = useState(getModoOscuro());

  useFocusEffect(
    useCallback(() => {
      cargarRecordatorios();
    }, [])
  );

  function cargarRecordatorios() {
    const id_usuario = obtenerUsuarioId();
    if (id_usuario !== null) {
      const recs = obtenerRecordatoriosNoVistos(id_usuario);
      setRecordatorios(recs);
      console.log(`📝 Cargados ${recs.length} recordatorios`);
    }
  }

  function marcarVisto(id: number) {
    marcarRecordatorioVisto(id);
    cargarRecordatorios();
  }

  function toggleModo(valor: boolean) {
    setModoOscuro(valor);
    setOscuro(valor);
  }

  function formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const colores = {
    fondo: oscuro ? '#1e1e1e' : '#fff',
    texto: oscuro ? '#fff' : '#000',
    borde: oscuro ? '#444' : '#ccc',
    tarjeta: oscuro ? '#2d2d2d' : '#f5f5f5',
    subtitulo: oscuro ? '#aaa' : '#666',
  };

  return (
    <View style={[styles.container, { backgroundColor: colores.fondo }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.volverTexto, { color: colores.texto }]}>← Volver</Text>
        </TouchableOpacity>
        <Text style={[styles.titulo, { color: colores.texto }]}>Mis Recordatorios</Text>
        <View style={styles.controles}>
          <Text style={[styles.label, { color: colores.texto }]}>Oscuro</Text>
          <Switch value={oscuro} onValueChange={toggleModo} />
        </View>
      </View>

      {recordatorios.length === 0 ? (
        <View style={styles.vacio}>
          <Text style={[styles.vacioTexto, { color: colores.subtitulo }]}>
            📭 No hay recordatorios pendientes
          </Text>
          <Text style={[styles.vacioSubtexto, { color: colores.subtitulo }]}>
            Completa ejercicios para crear recordatorios
          </Text>
        </View>
      ) : (
        <FlatList
          data={recordatorios}
          keyExtractor={(item) => item.id.toString()}
          style={styles.lista}
          renderItem={({ item }) => (
            <View
              style={[
                styles.tarjeta,
                {
                  backgroundColor: colores.tarjeta,
                  borderColor: colores.borde,
                },
              ]}
            >
              <View style={styles.contenidoTarjeta}>
                <Text style={[styles.tituloTarjeta, { color: colores.texto }]}>
                  {item.titulo}
                </Text>
                <Text style={[styles.descripcion, { color: colores.subtitulo }]}>
                  {item.descripcion}
                </Text>
                <Text style={[styles.fecha, { color: colores.subtitulo }]}>
                  📅 {formatearFecha(item.fecha_recordatorio)}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.botonMarcar}
                onPress={() => marcarVisto(item.id)}
              >
                <Text style={styles.botonTexto}>✓</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={[styles.footer, { borderTopColor: colores.borde }]}>
        <Text style={[styles.footerTexto, { color: colores.subtitulo }]}>
          Total: {recordatorios.length} recordatorio{recordatorios.length !== 1 ? 's' : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  volverTexto: {
    fontSize: 16,
    fontWeight: '600',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 12,
  },
  lista: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tarjeta: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
  },
  contenidoTarjeta: {
    flex: 1,
  },
  tituloTarjeta: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    marginBottom: 6,
  },
  fecha: {
    fontSize: 12,
  },
  botonMarcar: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  vacio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  vacioTexto: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  vacioSubtexto: {
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  footerTexto: {
    fontSize: 12,
    textAlign: 'center',
  },
});
