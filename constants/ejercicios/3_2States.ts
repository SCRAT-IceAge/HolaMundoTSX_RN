import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_3_2: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "States",
  leccion: "3",
  codigoResuelto: `import { View, Text, StyleSheet} from "react-native";
import React, { useState } from "react";
const Saludo: React.FC = () => {
	const [edad, setEdad] = useState(25);
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Edad: {edad}</Text>
		</View>
	);
};`,
  checkList: [
    {
      id: "1",
      descripcion: "Import { View, Text, StyleSheet } from 'react-native'",
      existe: (codigo) =>
        /import\s*\{(?=[^}]*\bView\b)(?=[^}]*\bText\b)(?=[^}]*\bStyleSheet\b)[^}]*\}\s*from\s*['"]react-native['"]\s*;?/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Import React y useState desde 'react'",
      existe: (codigo) =>
        /import\s+React\s*,\s*\{(?=[^}]*\buseState\b)[^}]*\}\s*from\s*['"]react['"]\s*;?/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Declara el componente Saludo usando React.FC",
      existe: (codigo) => /const\s+Saludo\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Declara el estado edad con useState(25)",
      dependeDe: "3",
      existe: (codigo) => /const\s*\[\s*edad\s*,\s*setEdad\s*\]\s*=\s*useState\s*\(\s*25\s*\)/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+Saludo[\s\S]*?const\s*\[\s*edad\s*,\s*setEdad\s*\]\s*=\s*useState\s*\(\s*25\s*\)/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "Saludo tiene return()",
      dependeDe: "4",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
      dentroDe: (codigo) => /useState\s*\(\s*25\s*\)[\s\S]*?return\s*\(/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "El return contiene <View> con style={styles.container}",
      dependeDe: "5",
      existe: (codigo) => /<View\s+style\s*=\s*\{\s*styles\.container\s*\}/.test(codigo || ''),
      dentroDe: (codigo) => /return\s*\([\s\S]*?<View\s+style\s*=\s*\{\s*styles\.container\s*\}[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "<View> contiene <Text> que muestra el estado edad",
      dependeDe: "6",
      existe: (codigo) => /<Text\s+style\s*=\s*\{\s*styles\.text\s*\}\s*>[^<]*\{\s*edad\s*\}[^<]*<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\s+style\s*=\s*\{\s*styles\.text\s*\}\s*>[^<]*\{\s*edad\s*\}[^<]*<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
  ]
};