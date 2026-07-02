import { useMemo , useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Switch } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ejercicios } from '../../../ejercicios';
import { ItemCheckListResultado } from '../../../types/verificacion';
import { obtenerUsuarioId, getModoOscuro, setModoOscuro, getEjercicioActual } from '../../../lib/sesion';
import { guardarIntento } from '../../../lib/db/intentos';
import { verificarCheckList } from '../../../lib/dominio/checkList';
import { setTabActual } from '../../../lib/sesion';
import { procesarComplecionEjercicio } from '../../../lib/servicios/calendar';
import { useCodigo } from '../../../context/CodigoContext';

export default function Verificador() {
  const id = getEjercicioActual();
  const ejercicio = ejercicios[id];

  const { codigo, setCodigo } = useCodigo();
  const [checkList, setCheckList] = useState<ItemCheckListResultado[]>(
    ejercicio?.checkList.map((item) => ({ id: item.id, descripcion: item.descripcion, correcto: false })) ?? []
  );
  const [mostrarTiempo, setMostrarTiempo] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [oscuro, setOscuro] = useState(getModoOscuro());
  const intervalo = useRef<ReturnType<typeof setInterval> | null>(null);
  const iniciado = useRef(false);
  const completado = useRef(false);

  const idAnterior = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (intervalo.current) clearInterval(intervalo.current);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setTabActual('verificador');
      setOscuro(getModoOscuro());
      const nuevoId = getEjercicioActual();
      const nuevoEjercicio = ejercicios[nuevoId];
      if (nuevoEjercicio) {
        setCheckList(nuevoEjercicio.checkList.map((item) => ({ id: item.id, descripcion: item.descripcion, correcto: false })));
         if (idAnterior.current !== nuevoId) {
        setCodigo('');       // 👈 solo resetea si cambió de ejercicio
        idAnterior.current = nuevoId;
      }
        iniciado.current = false;
        completado.current = false;
        setTiempo(0);
      }
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
        guardarIntento(id_usuario, id, tiempoFinal);
        // Procesar recordatorios después de guardar
        procesarComplecionEjercicio(id_usuario);
      }
    }
  }

  const checkListOrdenada = useMemo(() => {
    return [...checkList].sort((a, b) => Number(a.correcto) - Number(b.correcto));
  }, [checkList]);

  const handleCambioTexto = useCallback((texto: string) => {
    setCodigo(texto);
    if (texto.length > 0) iniciarCronometro();
    const resultado = verificarCheckList(texto, ejercicio.checkList);
    setCheckList(resultado);
    guardarSiCompleto(resultado, tiempo);
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

  if (!ejercicio) {
    return (
      <View style={styles.container}>
        <Text>Ejercicio no encontrado.</Text>
      </View>
    );
  }

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
        data={checkListOrdenada}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.checkItem}>
            <Text style={styles.icono}>{item.correcto ? '✅' : '❌'}</Text>
            <Text selectable={true} style={[styles.descripcion, { color: colores.checkTexto }]}>{item.descripcion}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 8,
  },
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    paddingTop: 2,
    paddingBottom: 2,
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
    paddingVertical: 2,
    paddingRight: 12,
    gap: 4,
  },
  icono: {
    fontSize: 18,
  },
  descripcion: {
    fontSize: 16,
    flex: 1,
  },
});
