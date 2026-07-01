import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_7_1: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "FormulariosSinNombre",
  leccion: "7",
  codigoResuelto: `import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const FormNombre: React.FC = () => {
  const [nombre, setNombre] = useState("");
  // estado inicial: vacio

  const enviar = () => {
    if (!nombre.trim()) {
      Alert.alert("Falta el nombre");
      return;
    }
    Alert.alert(\`Hola \${nombre}\`);
  };
};`,
  checkList: [
    {
      id: "1",
      descripcion: "Importa React y useState desde 'react'",
      existe: (codigo) => /import\s+React\s*,\s*\{\s*useState\s*\}\s*from\s*['"]react['"]/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Importa View, Text, TextInput, Button y Alert desde 'react-native'",
      existe: (codigo) => /import\s*\{\s*View\s*,\s*Text\s*,\s*TextInput\s*,\s*Button\s*,\s*Alert\s*\}\s*from\s*['"]react-native['"]/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Declara el componente FormNombre usando React.FC",
      existe: (codigo) => /const\s+FormNombre\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Declara el estado nombre con useState(\"\")",
      dependeDe: ["1", "3"],
      existe: (codigo) => /const\s*\[\s*nombre\s*,\s*setNombre\s*\]\s*=\s*useState\s*\(\s*["']["']\s*\)/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+FormNombre[\s\S]*?const\s*\[\s*nombre\s*,\s*setNombre\s*\]\s*=\s*useState\s*\(\s*["']["']\s*\)/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "Declara la función enviar",
      dependeDe: "4",
      existe: (codigo) => /const\s+enviar\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+FormNombre[\s\S]*?const\s+enviar\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "enviar valida que nombre no esté vacío usando !nombre.trim()",
      dependeDe: "5",
      existe: (codigo) => /if\s*\(\s*!nombre\.trim\(\)\s*\)/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+enviar\s*=\s*\(\s*\)\s*=>\s*\{[\s\S]*?if\s*\(\s*!nombre\.trim\(\)\s*\)[\s\S]*?\}/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "Si el nombre está vacío, llama a Alert.alert(\"Falta el nombre\") y hace return",
      dependeDe: "6",
      existe: (codigo) => /Alert\.alert\s*\(\s*["']Falta el nombre["']\s*\)\s*;\s*return\s*;/.test(codigo || ''),
      dentroDe: (codigo) => /if\s*\(\s*!nombre\.trim\(\)\s*\)\s*\{[\s\S]*?Alert\.alert\s*\(\s*["']Falta el nombre["']\s*\)\s*;\s*return\s*;[\s\S]*?\}/.test(codigo || ''),
    },
    {
      id: "8",
      descripcion: "enviar llama a Alert.alert con template literal `Hola ${nombre}`",
      dependeDe: "5",
      existe: (codigo) => /Alert\.alert\s*\(\s*`Hola \$\{nombre\}`\s*\)/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+enviar\s*=\s*\(\s*\)\s*=>\s*\{[\s\S]*?Alert\.alert\s*\(\s*`Hola \$\{nombre\}`\s*\)/.test(codigo || ''),
    },
    {
      id: "9",
      descripcion: "Cierra el componente FormNombre con };",
      dependeDe: "8",
      existe: (codigo) => /Alert\.alert\s*\(\s*`Hola \$\{nombre\}`\s*\)\s*;\s*\}\s*;\s*\}\s*;/.test(codigo || ''),
    },
  ]
};