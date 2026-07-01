import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_7_5: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "FormulariosSwitchBooleanoPreparacion",
  leccion: "7",
  codigoResuelto: `import React, { useState } from "react";
import { View, Text, Switch, Button, Alert } from "react-native";
const FormSwitch: React.FC = () => {
  const [acepta, setAcepta] = useState(false);
  const enviar = () => {
    if (!acepta) {
      Alert.alert("Debes aceptar terminos");
      return;
    }
    Alert.alert("OK");
  };`,
  checkList: [
    {
      id: "1",
      descripcion: "Importa useState desde react",
      existe: (codigo) => /import\s*\{\s*useState\s*\}\s*from\s*["']react["']/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Importa View, Text, Switch, Button y Alert desde react-native",
      existe: (codigo) => /import\s*\{\s*View\s*,\s*Text\s*,\s*Switch\s*,\s*Button\s*,\s*Alert\s*\}\s*from\s*["']react-native["']/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Declara el componente FormSwitch usando React.FC",
      existe: (codigo) => /const\s+FormSwitch\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Declara el estado acepta con useState(false)",
      dependeDe: "3",
      existe: (codigo) => /const\s*\[\s*acepta\s*,\s*setAcepta\s*\]\s*=\s*useState\s*\(\s*false\s*\)/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+FormSwitch[\s\S]*?const\s*\[\s*acepta\s*,\s*setAcepta\s*\]\s*=\s*useState\s*\(\s*false\s*\)/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "Declara la función enviar",
      dependeDe: "3",
      existe: (codigo) => /const\s+enviar\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+FormSwitch[\s\S]*?const\s+enviar\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "Dentro de enviar, verifica if (!acepta) y llama a Alert.alert con mensaje de terminos",
      dependeDe: ["4", "5"],
      existe: (codigo) => /if\s*\(\s*!acepta\s*\)\s*\{[\s\S]*?Alert\.alert\s*\(\s*["']Debes aceptar terminos["']\s*\)[\s\S]*?return\s*;[\s\S]*?\}/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+enviar\s*=\s*\(\s*\)\s*=>\s*\{[\s\S]*?if\s*\(\s*!acepta\s*\)\s*\{[\s\S]*?Alert\.alert\s*\(\s*["']Debes aceptar terminos["']\s*\)[\s\S]*?return\s*;[\s\S]*?\}/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "Al final de enviar, llama a Alert.alert(\"OK\")",
      dependeDe: "5",
      existe: (codigo) => /Alert\.alert\s*\(\s*["']OK["']\s*\)/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+enviar\s*=\s*\(\s*\)\s*=>\s*\{[\s\S]*?Alert\.alert\s*\(\s*["']OK["']\s*\)[\s\S]*?\}/.test(codigo || ''),
    },
  ]
};