// IndiceEditor.tsx
import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

interface IndiceEditorProps {
  totalLineas: number;
  lineaActiva: number;
  scrollRef: React.RefObject<any>;
}

const IndiceEditor: React.FC<IndiceEditorProps> = ({ totalLineas, lineaActiva, scrollRef }) => {
  const lineas = Array.from({ length: Math.max(totalLineas, 10) }, (_, i) => i + 1);

  return (
    <View style={styles.contenedorContenedor}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Lo controla el editor principal
        contentContainerStyle={styles.scrollContainer}
      >
        {lineas.map((numero) => {
          const esActiva = numero === lineaActiva;
          return (
            <Text 
              key={numero} 
              style={[styles.numero, esActiva && styles.numeroActivo]}
            >
              {numero}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorContenedor: {
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  scrollContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'flex-end',
  },
  numero: {
    fontFamily: 'monospace',
    fontSize: 15,
    lineHeight: 22, // Altura exacta por renglón
    color: '#a0a0a0',
    includeFontPadding: false,
  },
  numeroActivo: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default IndiceEditor;