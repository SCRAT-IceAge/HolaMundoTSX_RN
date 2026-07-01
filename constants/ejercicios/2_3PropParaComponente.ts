import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_2_3: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "Componente con Props",
  leccion: "2",
  codigoResuelto: `type BienvenidaProps = { 
  nombre?: string; 
};

const Bienvenida: React.FC<BienvenidaProps> = ({ nombre = 'mundo' }) => { 
  return (
    <Text>¡Hola, {nombre}!</Text>
  ); 
};`,
  checkList: [
    {
      id: "1",
      descripcion: "Define el tipo BienvenidaProps con la propiedad opcional nombre",
      existe: (codigo) => /type\s+BienvenidaProps\s*=\s*\{\s*nombre\s*\?\s*:\s*string\s*;?\s*\}/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Asigna el tipo BienvenidaProps al componente React.FC",
      dependeDe: "1",
      existe: (codigo) => /const\s+Bienvenida\s*:\s*React\.FC\s*<\s*BienvenidaProps\s*>\s*=/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Desestructura 'nombre' con el valor por defecto 'mundo'",
      dependeDe: "2",
      existe: (codigo) => /\{\s*nombre\s*=\s*['"]mundo['"]\s*\}/.test(codigo || ''),
      dentroDe: (codigo) =>
        /const\s+Bienvenida\s*:\s*React\.FC\s*<\s*BienvenidaProps\s*>\s*=\s*\(\s*\{\s*nombre\s*=\s*['"]mundo['"]\s*\}/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Bienvenida tiene return()",
      dependeDe: "2",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+Bienvenida[\s\S]*?return\s*\(/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "Renderiza el saludo dentro de <Text>",
      dependeDe: "4",
      existe: (codigo) => /<Text\b[^>]*>[\s\S]*?<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /return\s*\([\s\S]*?<Text\b[^>]*>[\s\S]*?<\/Text>/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "Renderiza el saludo dinámico usando {nombre}",
      dependeDe: "5",
      existe: (codigo) => /¡Hola,\s*\{\s*nombre\s*\}\s*!/.test(codigo || ''),
      dentroDe: (codigo) => /<Text\b[^>]*>[^<]*¡Hola,\s*\{\s*nombre\s*\}\s*![^<]*<\/Text>/.test(codigo || ''),
    },
  ]
};