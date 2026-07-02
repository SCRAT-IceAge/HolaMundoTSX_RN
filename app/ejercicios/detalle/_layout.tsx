import { useState, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { Tabs, router } from 'expo-router';
import { ejercicios } from '../../../constants/ejercicios';
import { setEjercicioActual, getEjercicioActual, getTabActual } from '../../../lib/sesion';

const EJERCICIOS = Object.keys(ejercicios);

export default function EjercicioLayout() {

  const [posicion, setPosicion] = useState(0);
  const [mostrarEtiqueta, setMostrarEtiqueta] = useState(false);
  const [nombreEjercicio, setNombreEjercicio] = useState('');
  const barraRef = useRef<View>(null);
  const alturaBarraRef = useRef(0);
  const [ejercicioKey, setEjercicioKey] = useState(getEjercicioActual());
  const [altoEtiqueta, setAltoEtiqueta] = useState(0);
  const [altoContenedor, setAltoContenedor] = useState(0);

  function calcularEjercicio(y: number) {
    const porcentaje = Math.max(0, Math.min(1, y / alturaBarraRef.current));
    const indice = Math.min(
      Math.floor(porcentaje * EJERCICIOS.length),
      EJERCICIOS.length - 1
    );
    const id = EJERCICIOS[indice];
    const ej = ejercicios[id];
    setPosicion(porcentaje);
    setNombreEjercicio(`Leccion ${ej.leccion} · ${id} - ${ej.nombre}`);
    setEjercicioActual(id);
  }

  function navegar() {
    const tab = getTabActual();
    console.log('navegando a tab:', tab, 'ejercicio:', getEjercicioActual());
    router.push(`./${tab}`);
  }
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      setMostrarEtiqueta(true);
      barraRef.current?.measure((x, y, width, height, pageX, pageY) => {
        alturaBarraRef.current = height;
        calcularEjercicio(e.nativeEvent.pageY - pageY);
      });
    },
    onPanResponderMove: (e) => {
      barraRef.current?.measure((x, y, width, height, pageX, pageY) => {
        alturaBarraRef.current = height;
        calcularEjercicio(e.nativeEvent.pageY - pageY);
      });
    },
    onPanResponderRelease: () => {
      setMostrarEtiqueta(false);
      setEjercicioKey(getEjercicioActual());
    },
  });

  return (
    <View key={ejercicioKey} style={styles.container} onLayout={(e) => setAltoContenedor(e.nativeEvent.layout.height)}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="inspector" options={{ title: 'Inspector' }} />
        <Tabs.Screen name="verificador" options={{ title: 'Verificador' }} />
      </Tabs>

      {/* Barra superpuesta */}
      <View
        ref={barraRef}
        style={styles.barra}
        {...panResponder.panHandlers}
      >
        <View style={[styles.indicador, { top: `${posicion * 100}%` }]} />
      </View>

      {/* Etiqueta flotante */}
      {mostrarEtiqueta && (
        <View
          style={[
            styles.etiqueta,
            {
              top: Math.min(
                Math.max(posicion * altoContenedor, 0),           // no menos de 0
                altoContenedor - altoEtiqueta                       // no más que (alto total - alto etiqueta)
              ),
            },
          ]}
          onLayout={(e) => setAltoEtiqueta(e.nativeEvent.layout.height)}
        >
          <Text style={styles.etiquetaTexto}>{nombreEjercicio}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barra: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    zIndex: 100,
  },
  indicador: {
    position: 'absolute',
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#000',
  },
  etiqueta: {
    position: 'absolute',
    right: 35,
    backgroundColor: '#44469c',
    borderRadius: 8,
    padding: 8,
    zIndex: 101,
    maxWidth: '80%',
  },
  etiquetaTexto: {
    color: '#fff',
    fontSize: 40,
  },
});