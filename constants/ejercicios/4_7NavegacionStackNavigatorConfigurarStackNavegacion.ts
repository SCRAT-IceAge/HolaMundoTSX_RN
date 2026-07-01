import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_4_7: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorConfigurarStackNavegacion",
  leccion: "4",
  codigoResuelto: `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();`,
  checkList: [
    {
      id: "1",
      descripcion: "Importa React desde 'react'",
      existe: (codigo) => /import\s+React\s+from\s*['"]react['"]/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Importa NavigationContainer desde '@react-navigation/native'",
      existe: (codigo) => /import\s*\{\s*NavigationContainer\s*\}\s*from\s*['"]@react-navigation\/native['"]/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Importa createNativeStackNavigator desde '@react-navigation/native-stack'",
      existe: (codigo) => /import\s*\{\s*createNativeStackNavigator\s*\}\s*from\s*['"]@react-navigation\/native-stack['"]/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Importa HomeScreen desde './screens/HomeScreen'",
      existe: (codigo) => /import\s+HomeScreen\s+from\s*['"]\.\/screens\/HomeScreen['"]/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "Importa DetailScreen desde './screens/DetailScreen'",
      existe: (codigo) => /import\s+DetailScreen\s+from\s*['"]\.\/screens\/DetailScreen['"]/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "Declara Stack usando createNativeStackNavigator()",
      dependeDe: "3",
      existe: (codigo) => /const\s+Stack\s*=\s*createNativeStackNavigator\s*\(\s*\)/.test(codigo || ''),
    },
  ]
};