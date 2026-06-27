// EditorDeTexto.tsx
import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, ScrollView, NativeSyntheticEvent } from 'react-native';
import IndiceEditor from './IndiceEditor';

export default function EditorDeTexto() {
  const [codigo, setCodigo] = useState('');
  const [lineaActiva, setLineaActiva] = useState(1);
  
  const scrollIndiceRef = useRef<ScrollView>(null);
  const scrollFondoRef = useRef<ScrollView>(null);

  const lineasArray = codigo.split('\n');
  const totalLineas = lineasArray.length;
  const ALTO_RENGLON = 22;

  const handleSelectionChange = (e: NativeSyntheticEvent<any>) => {
    const { start } = e.nativeEvent.selection;
    const textoHastaCursor = codigo.substring(0, start);
    setLineaActiva(textoHastaCursor.split('\n').length);
  };

  // Sincroniza el scroll de todo el bloque al mismo tiempo
  const handleScroll = (e: NativeSyntheticEvent<any>) => {
    const y = e.nativeEvent.contentOffset.y;
    scrollIndiceRef.current?.scrollTo({ y, animated: false });
    scrollFondoRef.current?.scrollTo({ y, animated: false });
  };

  // Generamos un array con la misma cantidad de renglones que el texto para el fondo
  const renglonesFondo = Array.from({ length: Math.max(totalLineas, 10) }, (_, i) => i + 1);

  return (
    <View style={styles.editorGroup}>
      {/* Índice izquierdo */}
      <IndiceEditor 
        totalLineas={totalLineas} 
        lineaActiva={lineaActiva} 
        scrollRef={scrollIndiceRef} 
      />

      {/* Contenedor del área de escritura */}
      <View style={styles.inputWrapper}>
        
        {/* CAPA DE FONDO ESTRUCTURAL: Renglones físicos reales */}
        <ScrollView
          ref={scrollFondoRef}
          style={StyleSheet.absoluteFill}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.scrollFondoContainer}
        >
          {renglonesFondo.map((num) => (
            <View 
              key={num} 
              style={[
                styles.renglonBase, 
                num === lineaActiva && styles.renglonActivo
              ]} 
            />
          ))}
        </ScrollView>

        {/* CAPA SUPERIOR: El TextInput nativo */}
        <TextInput
          style={styles.editor}
          multiline
          placeholder="Escribí tu código acá..."
          placeholderTextColor="#888"
          value={codigo}
          onChangeText={setCodigo}
          onSelectionChange={handleSelectionChange}
          onScroll={handleScroll}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editorGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    height: 250,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  scrollFondoContainer: {
    paddingVertical: 12, // Coincide exactamente con el del TextInput
  },
  renglonBase: {
    height: 22, // ALTO_RENGLON
    width: '100%',
    backgroundColor: 'transparent',
  },
  renglonActivo: {
    backgroundColor: 'rgba(0, 122, 255, 0.08)', // Solo se pinta el renglón activo
  },
  editor: {
    flex: 1,
    paddingVertical: 12, 
    paddingHorizontal: 12,
    fontSize: 15,
    fontFamily: 'monospace',
    lineHeight: 22, // ALTO_RENGLON
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,

    // 🌟 ESTAS DOS LÍNEAS ARREGLAN EL DESFASAJE EN ANDROID:
    includeFontPadding: false, // Desactiva el espacio extra que mete Android arriba/abajo
    textAlign: 'left',
  },
  
});