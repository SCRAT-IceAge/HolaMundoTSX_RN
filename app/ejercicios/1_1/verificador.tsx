import { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
import { ejercicios } from '../../../constants/ejercicios';
import { generarAST } from '../../../lib/ast/generarAST';
import { verificarCheckList } from '../../../lib/ast/compararAST';
import { NodoAST } from '../../../types/ast';

const ejercicio = ejercicios["1_1"];

type ItemCheckList = {
  id: string;
  descripcion: string;
  correcto: boolean;
};

export default function Verificador() {
  const [codigo, setCodigo] = useState('');
  const [checkList, setCheckList] = useState<ItemCheckList[]>(
    ejercicio.checkList.map((item) => ({ ...item, correcto: false }))
  );

  const handleCambioTexto = useCallback((texto: string) => {
    setCodigo(texto);
    try {
      const astUsuario = generarAST(texto) as NodoAST;
      const astReferencia = ejercicio.astReferencia as NodoAST;
      const resultado = verificarCheckList(astUsuario, astReferencia, ejercicio.checkList);
      setCheckList(resultado);
    } catch {
      setCheckList(ejercicio.checkList.map((item) => ({ ...item, correcto: false })));
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.editor}
        multiline
        placeholder="Escribi tu codigo aca..."
        value={codigo}
        onChangeText={handleCambioTexto}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
      />
      <FlatList
        data={checkList}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.checkItem}>
            <Text style={styles.icono}>{item.correcto ? '✅' : '❌'}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  editor: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    fontFamily: 'monospace',
    minHeight: 150,
    textAlignVertical: 'top',
  },
  lista: {
    flex: 1,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  icono: {
    fontSize: 18,
  },
  descripcion: {
    fontSize: 15,
    color: '#333',
  },
});
