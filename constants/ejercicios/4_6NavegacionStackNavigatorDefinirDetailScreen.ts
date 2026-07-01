import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_4_6: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorDefinirDetailScreen",
  leccion: "4",
  codigoResuelto: `const DetailScreen: React.FC = ({ route }) => {
  const { productId, userName } = route.params;
  return (
    <View>
      <Text>Estás en la pantalla de Detalle</Text>
      <Text>Producto: #{productId}</Text>
      <Text>Usuario: {userName}</Text>
    </View>
  );
};`,
  checkList: [
    {
      id: "1",
      descripcion: "Declara el componente DetailScreen usando React.FC con { route } desestructurado como prop",
      existe: (codigo) => /const\s+DetailScreen\s*:\s*React\.FC\s*=\s*\(\s*\{\s*route\s*\}\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Desestructura productId y userName desde route.params",
      dependeDe: "1",
      existe: (codigo) => /const\s*\{\s*productId\s*,\s*userName\s*\}\s*=\s*route\.params/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+DetailScreen[\s\S]*?const\s*\{\s*productId\s*,\s*userName\s*\}\s*=\s*route\.params/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "DetailScreen tiene return()",
      dependeDe: "2",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+DetailScreen[\s\S]*?return\s*\(/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "El return contiene <View></View>",
      dependeDe: "3",
      existe: (codigo) => /<View\b[^>]*>[\s\S]*?<\/View>/.test(codigo || ''),
      dentroDe: (codigo) => /return\s*\([\s\S]*?<View\b[^>]*>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "<View> contiene <Text> con el texto 'Estás en la pantalla de Detalle'",
      dependeDe: "4",
      existe: (codigo) => /<Text\b[^>]*>Estás en la pantalla de Detalle<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\b[^>]*>Estás en la pantalla de Detalle<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "<View> contiene <Text> que muestra Producto: #{productId}",
      dependeDe: "4",
      existe: (codigo) => /<Text\b[^>]*>Producto:\s*#\{productId\}<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\b[^>]*>Producto:\s*#\{productId\}<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "<View> contiene <Text> que muestra Usuario: {userName}",
      dependeDe: "4",
      existe: (codigo) => /<Text\b[^>]*>Usuario:\s*\{userName\}<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\b[^>]*>Usuario:\s*\{userName\}<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
  ]
};