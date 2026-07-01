import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_1_1: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "Hola Mundo",
  leccion: "1",
  codigoResuelto: `import React from 'react';
import {View, Text} from 'react-native'

const App: React.FC = () =>{
   return(
     <View>
       <Text>HolaMundo</Text>
     </View>
  )
}

export default App`,
  checkList: [
    {
      id: "1",
      descripcion: "Import React from 'react'",
      existe: (codigo) => /import\s+React\s+from\s+['"]react['"]\s*;?/.test(codigo),
    },
    {
      id: "2",
      descripcion: "Import {View, Text} from 'react-native'",
      existe: (codigo) =>
        /import\s*\{(?=[^}]*\bView\b)(?=[^}]*\bText\b)[^}]*\}\s*from\s*['"]react-native['"]\s*;?/.test(codigo),
    },
    {
      id: "3",
      descripcion: "const App: React.FC = () => {}",
      dependeDe: "1",
      existe: (codigo) => /const\s+App\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>\s*\{/.test(codigo),
    },
    {
      id: "4",
      descripcion: "App tiene return()",
      dependeDe: "3",
      existe: (codigo) => /return\s*\(/.test(codigo),
    },
    {
      id: "5",
      descripcion: "return contiene <View></View>",
      dependeDe: "4",
      existe: (codigo) => /<View\b[^>]*>[\s\S]*?<\/View>/.test(codigo),
      dentroDe: (codigo) =>
        /return\s*\(\s*[\s\S]*?<View\b[^>]*>[\s\S]*?<\/View>[\s\S]*?\)/.test(codigo),
    },
    {
      id: "6",
      descripcion: "<View></View> contiene <Text></Text>",
      dependeDe: "5",
      existe: (codigo) => /<Text\b[^>]*>[\s\S]*?<\/Text>/.test(codigo),
      dentroDe: (codigo) =>
        /<View\b[^>]*>[\s\S]*<Text\b[^>]*>[\s\S]*?<\/Text>[\s\S]*<\/View>/.test(codigo),
    },
    {
      id: "7",
      descripcion: "<Text> contiene HolaMundo",
      dependeDe: "6",
      existe: (codigo) => /HolaMundo/.test(codigo),
      dentroDe: (codigo) => /<Text\b[^>]*>\s*HolaMundo\s*<\/Text>/.test(codigo),
    },
    {
      id: "8",
      descripcion: "export default App",
      dependeDe: "3",
      existe: (codigo) => /export\s+default\s+App\s*;?/.test(codigo),
    },
  ]
};