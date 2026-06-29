import { ItemCheckList } from '../types/verificacion';

export const ejercicios: Record<string, {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
}> = {
  "1_1": {
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
    existe: (codigo) => /import\s+React\s+from\s+['"]react['"]/.test(codigo),
  },
  {
    id: "2",
    descripcion: "Import {View, Text} from 'react-native'",
    existe: (codigo) =>
      /import\s*\{[^}]*View[^}]*Text[^}]*\}\s*from\s*['"]react-native['"]/.test(codigo) ||
      /import\s*\{[^}]*Text[^}]*View[^}]*\}\s*from\s*['"]react-native['"]/.test(codigo),
  },
  {
    id: "3",
    descripcion: "const App: React.FC = () => {}",
    dependeDe: "1",
    existe: (codigo) => /const\s+App\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>/.test(codigo),
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
    existe: (codigo) => /<View[\s\S]*?<\/View>/.test(codigo),
    dentroDe: (codigo) => /return\s*\([\s\S]*?<View[\s\S]*?<\/View>[\s\S]*?\)/.test(codigo),
  },
  {
    id: "6",
    descripcion: "<View></View> contiene <Text></Text>",
    dependeDe: "5",
    existe: (codigo) => /<Text[\s\S]*?<\/Text>/.test(codigo),
    dentroDe: (codigo) => /<View[\s\S]*?>\s*<Text[\s\S]*?<\/Text>\s*<\/View>/.test(codigo),
  },
  {
    id: "7",
    descripcion: "<Text> contiene HolaMundo",
    dependeDe: "6",
    existe: (codigo) => /HolaMundo/.test(codigo),
    dentroDe: (codigo) => /<Text[^>]*>HolaMundo<\/Text>/.test(codigo),
  },
  {
    id: "8",
    descripcion: "export default App",
    dependeDe: "3",
    existe: (codigo) => /export\s+default\s+App/.test(codigo),
  },
]
  },
  "1_2": {
  nombre: "Estilos con StyleSheet",
  leccion: "1",
  codigoResuelto: `<View style={styles.container}></View>

const styles = StyleSheet.create({ 
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});`,
  checkList: [
    {
      id: "1",
      descripcion: "<View style={styles.container}></View>",
      existe: (codigo) => /<View\s+style=\{styles\.container\}\s*><\/View>/.test(codigo),
    },
    {
      id: "2",
      descripcion: "StyleSheet.create({...})",
      existe: (codigo) => /StyleSheet\.create\s*\(\s*\{/.test(codigo),
    },
    {
      id: "3",
      descripcion: "container dentro de StyleSheet.create",
      dependeDe: "2",
      existe: (codigo) => /container\s*:\s*\{/.test(codigo),
      dentroDe: (codigo) => /StyleSheet\.create\s*\(\s*\{[\s\S]*?container\s*:\s*\{/.test(codigo),
    },
    {
      id: "4",
      descripcion: "flex: 1,",
      dependeDe: "3",
      existe: (codigo) => /flex\s*:\s*1/.test(codigo),
      dentroDe: (codigo) => /container\s*:\s*\{[\s\S]*?flex\s*:\s*1/.test(codigo),
    },
    {
      id: "5",
      descripcion: "justifyContent: 'center',",
      dependeDe: "3",
      existe: (codigo) => /justifyContent\s*:\s*['"]center['"]/.test(codigo),
      dentroDe: (codigo) => /container\s*:\s*\{[\s\S]*?justifyContent\s*:\s*['"]center['"]/.test(codigo),
    },
    {
      id: "6",
      descripcion: "alignItems: 'center',",
      dependeDe: "3",
      existe: (codigo) => /alignItems\s*:\s*['"]center['"]/.test(codigo),
      dentroDe: (codigo) => /container\s*:\s*\{[\s\S]*?alignItems\s*:\s*['"]center['"]/.test(codigo),
    },
    {
      id: "7",
      descripcion: "backgroundColor: 'white',",
      dependeDe: "3",
      existe: (codigo) => /backgroundColor\s*:\s*['"]white['"]/.test(codigo),
      dentroDe: (codigo) => /container\s*:\s*\{[\s\S]*?backgroundColor\s*:\s*['"]white['"]/.test(codigo),
    },
  ]
},
};

export type EjercicioId = keyof typeof ejercicios;