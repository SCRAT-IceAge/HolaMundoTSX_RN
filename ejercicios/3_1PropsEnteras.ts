import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_3_1: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "PropsEnteras",
  leccion: "3",
  codigoResuelto: `import { View,Text, StyleSheet } from "react-native";
import React from "react";
type SaludoProps = {
  nombre: string;
  edad: number;
};
const Saludo: React.FC<SaludoProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hola, {props.nombre}!</Text>
      <Text style={styles.text}>Edad: {props.edad}</Text>
    </View>
  );
};`,
  checkList: [
    {
      id: "1",
      descripcion: "Import React from 'react'",
      existe: (codigo) => /import\s+React\s+from\s+['"]react['"]\s*;?/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Import { View, Text, StyleSheet } from 'react-native'",
      existe: (codigo) =>
        /import\s*\{(?=[^}]*\bView\b)(?=[^}]*\bText\b)(?=[^}]*\bStyleSheet\b)[^}]*\}\s*from\s*['"]react-native['"]\s*;?/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Define el tipo SaludoProps con nombre (string) y edad (number)",
      existe: (codigo) =>
        /type\s+SaludoProps\s*=\s*\{[\s\S]*?\}/.test(codigo || '') &&
        /nombre\s*:\s*string/.test(codigo || '') &&
        /edad\s*:\s*number/.test(codigo || ''),
      dentroDe: (codigo) =>
        /type\s+SaludoProps\s*=\s*\{[^}]*?nombre\s*:\s*string[^}]*?\}/.test(codigo || '') &&
        /type\s+SaludoProps\s*=\s*\{[^}]*?edad\s*:\s*number[^}]*?\}/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Asigna el tipo SaludoProps al componente React.FC",
      dependeDe: "3",
      existe: (codigo) => /const\s+Saludo\s*:\s*React\.FC\s*<\s*SaludoProps\s*>\s*=/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "Saludo tiene return()",
      dependeDe: "4",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+Saludo[\s\S]*?return\s*\(/.test(codigo || ''),
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
      descripcion: "<View> contiene <Text> que muestra props.nombre",
      dependeDe: "6",
      existe: (codigo) => /<Text\s+style\s*=\s*\{\s*styles\.text\s*\}\s*>[^<]*\{\s*props\.nombre\s*\}[^<]*<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\s+style\s*=\s*\{\s*styles\.text\s*\}\s*>[^<]*\{\s*props\.nombre\s*\}[^<]*<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "8",
      descripcion: "<View> contiene <Text> que muestra props.edad",
      dependeDe: "6",
      existe: (codigo) => /<Text\s+style\s*=\s*\{\s*styles\.text\s*\}\s*>[^<]*\{\s*props\.edad\s*\}[^<]*<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\s+style\s*=\s*\{\s*styles\.text\s*\}\s*>[^<]*\{\s*props\.edad\s*\}[^<]*<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
  ]
};