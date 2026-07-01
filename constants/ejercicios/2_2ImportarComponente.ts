import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_2_2: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "Importar y Renderizar Componente",
  leccion: "2",
  codigoResuelto: `import React from 'react'; 
import { View } from 'react-native';
import Bienvenida from './components/Bienvenida';

const App: React.FC = () => { 
  return ( 
     <View>
       <Bienvenida />
     </View>
  ); 
};`,
  checkList: [
    {
      id: "1",
      descripcion: "Importa correctamente el componente Bienvenida desde su ruta relativa",
      existe: (codigo) => /import\s+Bienvenida\s+from\s+['"]\.\/components\/Bienvenida['"]/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Define el componente App usando React.FC",
      existe: (codigo) => /const\s+App\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "App tiene return()",
      dependeDe: "2",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+App[\s\S]*?return\s*\(/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Renderiza el componente contenedor <View>",
      dependeDe: "3",
      existe: (codigo) => /<View\b[^>]*>[\s\S]*?<\/View>/.test(codigo || ''),
      dentroDe: (codigo) => /return\s*\([\s\S]*?<View\b[^>]*>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "Renderiza <Bienvenida /> de forma autoconclusiva dentro de la View",
      dependeDe: "4",
      existe: (codigo) => /<Bienvenida\s*\/>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Bienvenida\s*\/>[\s\S]*?<\/View>/.test(codigo || ''),
    },
  ]
};