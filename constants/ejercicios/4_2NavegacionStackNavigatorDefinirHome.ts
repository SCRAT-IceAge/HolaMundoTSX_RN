import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_4_2: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorDefinirHome",
  leccion: "4",
  codigoResuelto: `import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Inicio'>;`,
  checkList: [
    {
      id: "1",
      descripcion: "Import React from 'react'",
      existe: (codigo) => /import\s+React\s+from\s+['"]react['"]\s*;?/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Import { View, Text, Button } from 'react-native'",
      existe: (codigo) =>
        /import\s*\{(?=[^}]*\bView\b)(?=[^}]*\bText\b)(?=[^}]*\bButton\b)[^}]*\}\s*from\s*['"]react-native['"]\s*;?/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Import { NativeStackNavigationProp } from '@react-navigation/native-stack'",
      existe: (codigo) =>
        /import\s*\{[^}]*\bNativeStackNavigationProp\b[^}]*\}\s*from\s*['"]@react-navigation\/native-stack['"]\s*;?/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Import { RootStackParamList } desde el archivo de tipos de navegación",
      existe: (codigo) =>
        /import\s*\{[^}]*\bRootStackParamList\b[^}]*\}\s*from\s*['"][^'"]*navigation['"]\s*;?/.test(codigo || ''),
    },
    {
  id: "5",
  descripcion: "Define HomeNavProp usando NativeStackNavigationProp<RootStackParamList, 'Inicio'>",
  dependeDe: ["3", "4"],
  existe: (codigo) =>
    /type\s+HomeNavProp\s*=\s*NativeStackNavigationProp\s*<\s*RootStackParamList\s*,\s*['"]Inicio['"]\s*>/.test(codigo || ''),
},
  ]
};