import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_3_3_1: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "FlatList1TarjetaProducto",
  leccion: "3",
  codigoResuelto: `type Producto = {
  id: string;
  precio: number;
};

const productos: Producto[] = [
  { id: "1", precio: 4500 },
  { id: "2", precio: 9800},
  { id: "3", precio: 21000},
];`,
  checkList: [
    {
      id: "1",
      descripcion: "Define el tipo Producto con id (string) y precio (number)",
      existe: (codigo) =>
        /type\s+Producto\s*=\s*\{[\s\S]*?\}/.test(codigo || '') &&
        /id\s*:\s*string/.test(codigo || '') &&
        /precio\s*:\s*number/.test(codigo || ''),
      dentroDe: (codigo) =>
        /type\s+Producto\s*=\s*\{[^}]*?id\s*:\s*string[^}]*?\}/.test(codigo || '') &&
        /type\s+Producto\s*=\s*\{[^}]*?precio\s*:\s*number[^}]*?\}/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Declara productos como un array tipado Producto[]",
      dependeDe: "1",
      existe: (codigo) => /const\s+productos\s*:\s*Producto\s*\[\s*\]\s*=\s*\[/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "productos contiene al menos 3 objetos con id y precio",
      dependeDe: "2",
      existe: (codigo) => {
        const matches = (codigo || '').match(/\{\s*id\s*:\s*['"][^'"]+['"]\s*,\s*precio\s*:\s*\d+\s*\}/g);
        return !!matches && matches.length >= 3;
      },
      dentroDe: (codigo) =>
        /const\s+productos\s*:\s*Producto\s*\[\s*\]\s*=\s*\[[\s\S]*?\{\s*id\s*:\s*['"][^'"]+['"]\s*,\s*precio\s*:\s*\d+\s*\}[\s\S]*?\]/.test(codigo || ''),
    },
  ]
};