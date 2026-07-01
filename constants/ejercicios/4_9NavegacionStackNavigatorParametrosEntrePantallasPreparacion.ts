import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_4_9: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorParametrosEntrePantallasPreparacion",
  leccion: "4",
  codigoResuelto: `import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Inicio'>;
type Props = { navigation: HomeNavProp; };`,
  checkList: [
    {
      id: "1",
      descripcion: "Importa React desde 'react'",
      existe: (codigo) => /import\s+React\s+from\s*['"]react['"]/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Importa View, Text y Button desde 'react-native'",
      existe: (codigo) => /import\s*\{\s*View\s*,\s*Text\s*,\s*Button\s*\}\s*from\s*['"]react-native['"]/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Importa NativeStackNavigationProp desde '@react-navigation/native-stack'",
      existe: (codigo) => /import\s*\{\s*NativeStackNavigationProp\s*\}\s*from\s*['"]@react-navigation\/native-stack['"]/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Importa RootStackParamList desde '../types/navigation'",
      existe: (codigo) => /import\s*\{\s*RootStackParamList\s*\}\s*from\s*['"]\.\.\/types\/navigation['"]/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "Declara el type HomeNavProp usando NativeStackNavigationProp<RootStackParamList, 'Inicio'>",
      dependeDe: ["3", "4"],
      existe: (codigo) => /type\s+HomeNavProp\s*=\s*NativeStackNavigationProp\s*<\s*RootStackParamList\s*,\s*['"]Inicio['"]\s*>/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "Declara el type Props con la propiedad navigation: HomeNavProp",
      dependeDe: "5",
      existe: (codigo) => /navigation\s*:\s*HomeNavProp/.test(codigo || ''),
      dentroDe: (codigo) => /type\s+Props\s*=\s*\{[\s\S]*?navigation\s*:\s*HomeNavProp[\s\S]*?\}/.test(codigo || ''),
    },
  ]
};