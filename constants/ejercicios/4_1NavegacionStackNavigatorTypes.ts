import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_4_1: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorTypes",
  leccion: "4",
  codigoResuelto: `export type RootStackParamList = {
  Inicio: undefined;
  Detalle: { productId: number; userName: string };
};`,
  checkList: [
    {
      id: "1",
      descripcion: "Exporta el tipo RootStackParamList",
      existe: (codigo) => /export\s+type\s+RootStackParamList\s*=\s*\{/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "RootStackParamList tiene Inicio: undefined",
      dependeDe: "1",
      existe: (codigo) => /Inicio\s*:\s*undefined/.test(codigo || ''),
      dentroDe: (codigo) => /RootStackParamList\s*=\s*\{[^}]*?Inicio\s*:\s*undefined[^}]*?\}/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "RootStackParamList tiene Detalle con productId (number) y userName (string)",
      dependeDe: "1",
      existe: (codigo) =>
        /Detalle\s*:\s*\{[\s\S]*?\}/.test(codigo || '') &&
        /productId\s*:\s*number/.test(codigo || '') &&
        /userName\s*:\s*string/.test(codigo || ''),
      dentroDe: (codigo) =>
        /Detalle\s*:\s*\{[^}]*?productId\s*:\s*number[^}]*?\}/.test(codigo || '') &&
        /Detalle\s*:\s*\{[^}]*?userName\s*:\s*string[^}]*?\}/.test(codigo || ''),
    },
  ]
};