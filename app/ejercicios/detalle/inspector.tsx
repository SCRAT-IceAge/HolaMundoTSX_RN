import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ejercicios } from '../../../constants/ejercicios';
import { getModoOscuro, setModoOscuro, getEjercicioActual } from '../../../lib/sesion';
import { setTabActual } from '../../../lib/sesion';

export default function Inspector() {
  const id = getEjercicioActual();
  const ejercicio = (ejercicios as Record<string, any>)[id];

	const [oscuro, setOscuro] = useState(getModoOscuro());

	useFocusEffect(
		useCallback(() => {
			setTabActual('inspector');
			setOscuro(getModoOscuro());
		}, [])
	);

	function toggleModo(valor: boolean) {
		setModoOscuro(valor);
		setOscuro(valor);
	}

	const colores = {
		fondo: oscuro ? '#1e1e1e' : '#fff',
		texto: oscuro ? '#fff' : '#000',
		subtitulo: oscuro ? '#aaa' : '#666',
		codigoFondo: oscuro ? '#2d2d2d' : '#1e1e1e',
		checkTexto: oscuro ? '#ccc' : '#333',
	};

	if (!ejercicio) {
		return (
			<View style={styles.container}>
				<Text>Ejercicio no encontrado: {id}</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={[styles.container, { backgroundColor: colores.fondo }]}>
			<View style={styles.switchRow}>
				<Text style={[styles.switchLabel, { color: colores.texto }]}>Modo oscuro</Text>
				<Switch value={oscuro} onValueChange={toggleModo} />
			</View>

			<Text style={[styles.titulo, { color: colores.texto }]}>{ejercicio.nombre}</Text>
			<Text style={[styles.subtitulo, { color: colores.subtitulo }]}>Leccion {ejercicio.leccion}</Text>

			<Text style={[styles.label, { color: colores.texto }]}>Codigo a escribir:</Text>
			<View style={[styles.codigoContainer, { backgroundColor: colores.codigoFondo }]}>
				<Text style={styles.codigo} selectable={true}>
					{ejercicio.codigoResuelto}
				</Text>
			</View>

			<Text style={[styles.label, { color: colores.texto }]}>Que debe contener:</Text>
			{ejercicio.checkList.map((item: any) => (
				<View key={item.id} style={styles.checkItem}>
					<Text style={[styles.checkTexto, { color: colores.checkTexto }]}>• {item.descripcion}</Text>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 24,
		gap: 12,
		flexGrow: 1,
	},
	switchRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	switchLabel: {
		fontSize: 15,
	},
	titulo: {
		fontSize: 28,
		fontWeight: 'bold',
	},
	subtitulo: {
		fontSize: 14,
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 8,
	},
	codigoContainer: {
		borderRadius: 8,
		padding: 16,
	},
	codigo: {
		color: '#fff',
		fontFamily: 'monospace',
		fontSize: 16,
	},
	checkItem: {
		paddingVertical: 4,
	},
	checkTexto: {
		fontSize: 15,
	},
});