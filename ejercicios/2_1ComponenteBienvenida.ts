import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_2_1: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "Componente de Bienvenida",
  leccion: "2",
  codigoResuelto: `const Bienvenida: React.FC = () => { 
  return (      
      ¡Bienvenido/a a mi app!
  ); 
}; 
 
const App: React.FC = () => { 
  return ( 
   <View style ={styles.container}>    
      <Bienvenida />
   </View>
  ); 
};`,
  checkList: [
    {
      id: "1",
      descripcion: "Declara el componente Bienvenida",
      existe: (codigo) => /const\s+Bienvenida\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Bienvenida tiene return()",
      dependeDe: "1",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
      dentroDe: (codigo) =>
        /const\s+Bienvenida[\s\S]*?return\s*\([\s\S]*?\)[\s\S]*?;\s*\}/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Bienvenida muestra el texto de saludo",
      dependeDe: "2",
      existe: (codigo) => /¡Bienvenido\/a a mi app!/.test(codigo || ''),
      dentroDe: (codigo) =>
        /const\s+Bienvenida[\s\S]*?return\s*\([^)]*?¡Bienvenido\/a a mi app![^)]*?\)/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Declara el componente App",
      existe: (codigo) => /const\s+App\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "App tiene return()",
      dependeDe: "4",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
      dentroDe: (codigo) =>
        /const\s+App[\s\S]*?return\s*\(/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "App contiene <View> con style container",
      dependeDe: "5",
      existe: (codigo) => /<View\s+style\s*=\s*\{\s*styles\.container\s*\}/.test(codigo || ''),
      dentroDe: (codigo) =>
        /const\s+App[\s\S]*?return\s*\([\s\S]*?<View\s+style\s*=\s*\{\s*styles\.container\s*\}/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "App renderiza <Bienvenida /> dentro de <View>",
      dependeDe: "6",
      existe: (codigo) => /<Bienvenida\s*\/>/.test(codigo || ''),
      dentroDe: (codigo) => /<View[^>]*>[\s\S]*?<Bienvenida\s*\/>[\s\S]*?<\/View>/.test(codigo || ''),
    },
  ]
};