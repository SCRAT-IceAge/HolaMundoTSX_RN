import { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Switch } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ejercicios } from '../../../constants/ejercicios';
import { generarAST } from '../../../lib/ast/generarAST';
import { verificarCheckList } from '../../../lib/ast/compararAST';
import { NodoAST, ItemCheckListResultado } from '../../../types/verificacion';
import { obtenerUsuarioId, getModoOscuro, setModoOscuro } from '../../../lib/sesion';
import { guardarIntento } from '../../../lib/db/intentos';

const ejercicio = ejercicios["1_1"];

export default function Verificador() {
  const [codigo, setCodigo] = useState('');
  const [checkList, setCheckList] = useState<ItemCheckListResultado[]>(
    ejercicio.checkList.map((item) => ({ ...item, correcto: false }))
  );
  const [mostrarTiempo, setMostrarTiempo] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [oscuro, setOscuro] = useState(getModoOscuro());
  const intervalo = useRef<ReturnType<typeof setInterval> | null>(null);
  const iniciado = useRef(false);
  const completado = useRef(false);

  useEffect(() => {
    return () => {
      if (intervalo.current) clearInterval(intervalo.current);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setOscuro(getModoOscuro());
    }, [])
  );

  function toggleModo(valor: boolean) {
    setModoOscuro(valor);
    setOscuro(valor);
  }

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

  const colores = {
    fondo: oscuro ? '#1e1e1e' : '#fff',
    texto: oscuro ? '#fff' : '#000',
    borde: oscuro ? '#444' : '#ccc',
    editorFondo: oscuro ? '#2d2d2d' : '#fff',
    checkTexto: oscuro ? '#ccc' : '#333',
  };

  return (
    <View style={[styles.container, { backgroundColor: colores.fondo }]}>
      <View style={styles.controles}>
        <Text style={[styles.label, { color: colores.texto }]}>Modo oscuro</Text>
        <Switch value={oscuro} onValueChange={toggleModo} />
        <Text style={[styles.label, { color: colores.texto, marginLeft: 16 }]}>Tiempo</Text>
        <Switch value={mostrarTiempo} onValueChange={setMostrarTiempo} />
        {mostrarTiempo && (
          <Text style={[styles.tiempo, { color: colores.texto }]}>{formatearTiempo(tiempo)}</Text>
        )}
      </View>

      <TextInput
        style={[styles.editor, { borderColor: colores.borde, backgroundColor: colores.editorFondo, color: colores.texto }]}
        multiline
        placeholder="Escribi tu codigo aca..."
        placeholderTextColor={oscuro ? '#666' : '#aaa'}
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
            <Text style={[styles.descripcion, { color: colores.checkTexto }]}>{item.descripcion}</Text>
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
    gap: 8,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 14,
  },
  tiempo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  editor: {
    borderWidth: 1,
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
    paddingVertical: 0,
    gap: 2,
  },
  icono: {
    fontSize: 18,
  },
  descripcion: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});