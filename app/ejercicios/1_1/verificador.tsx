import { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Switch } from 'react-native';
import { ejercicios } from '../../../constants/ejercicios';
import { generarAST } from '../../../lib/ast/generarAST';
import { verificarCheckList } from '../../../lib/ast/compararAST';
import { NodoAST, ItemCheckListResultado } from '../../../types/ast';
import { obtenerUsuarioId } from '../../../lib/sesion';
import { guardarIntento } from '../../../lib/db/intentos';

const ejercicio = ejercicios["1_1"];

export default function Verificador() {
  const [codigo, setCodigo] = useState('');
  const [checkList, setCheckList] = useState<ItemCheckListResultado[]>(
    ejercicio.checkList.map((item) => ({ ...item, correcto: false }))
  );
  const [mostrarTiempo, setMostrarTiempo] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const intervalo = useRef<ReturnType<typeof setInterval> | null>(null);
  const iniciado = useRef(false);
  const completado = useRef(false);

  useEffect(() => {
    return () => {
      if (intervalo.current) clearInterval(intervalo.current);
    };
  }, []);

  function iniciarCronometro() {
    if (iniciado.current) return;
    iniciado.current = true;
    intervalo.current = setInterval(() => {
      setTiempo((t) => t + 1);
    }, 10);
  }

  function detenerCronometro() {
    if (intervalo.current) {
      clearInterval(intervalo.current);
      intervalo.current = null;
    }
  }

  function guardarSiCompleto(resultado: ItemCheckListResultado[], tiempoFinal: number) {
    if (completado.current) return;
    const todosCorrecto = resultado.every((item) => item.correcto);
    if (todosCorrecto) {
      completado.current = true;
      detenerCronometro();
      const id_usuario = obtenerUsuarioId();
      if (id_usuario !== null) {
        guardarIntento(id_usuario, '1_1', tiempoFinal);
      }
    }
  }

  const handleCambioTexto = useCallback((texto: string) => {
    setCodigo(texto);
    if (texto.length > 0) iniciarCronometro();

    try {
      const astUsuario = generarAST(texto) as NodoAST;
      const resultado = verificarCheckList(astUsuario, ejercicio.checkList, texto);
      setCheckList(resultado);
      guardarSiCompleto(resultado, tiempo);
    } catch {
      setCheckList(ejercicio.checkList.map((item) => ({ ...item, correcto: false })));
    }
  }, [tiempo]);

  function formatearTiempo(centesimas: number): string {
    const m = Math.floor(centesimas / 6000).toString().padStart(2, '0');
    const s = Math.floor((centesimas % 6000) / 100).toString().padStart(2, '0');
    const cs = (centesimas % 100).toString().padStart(2, '0');
    return `${m}:${s}.${cs}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.controles}>
        <Text style={styles.labelSwitch}>Mostrar tiempo</Text>
        <Switch value={mostrarTiempo} onValueChange={setMostrarTiempo} />
        {mostrarTiempo && (
          <Text style={styles.tiempo}>{formatearTiempo(tiempo)}</Text>
        )}
      </View>

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
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  labelSwitch: {
    fontSize: 15,
    color: '#333',
  },
  tiempo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
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