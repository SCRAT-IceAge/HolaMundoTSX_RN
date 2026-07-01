import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_4_12: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorRecibirPropsYUsarlosEnDetailScreen",
  leccion: "4",
  codigoResuelto: `type DetailRouteProp = RouteProp<RootStackParamList, 'Detalle'>;
type Props = { route: DetailRouteProp; };

const DetailScreen: React.FC<Props> = ({ route }) => {
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
      descripcion: "Declara el type DetailRouteProp usando RouteProp<RootStackParamList, 'Detalle'>",
      existe: (codigo) => /type\s+DetailRouteProp\s*=\s*RouteProp\s*<\s*RootStackParamList\s*,\s*['"]Detalle['"]\s*>/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Declara el type Props con la propiedad route: DetailRouteProp",
      dependeDe: "1",
      existe: (codigo) => /route\s*:\s*DetailRouteProp/.test(codigo || ''),
      dentroDe: (codigo) => /type\s+Props\s*=\s*\{[\s\S]*?route\s*:\s*DetailRouteProp[\s\S]*?\}/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Declara el componente DetailScreen usando React.FC<Props> con { route } desestructurado como prop",
      dependeDe: "2",
      existe: (codigo) => /const\s+DetailScreen\s*:\s*React\.FC\s*<\s*Props\s*>\s*=\s*\(\s*\{\s*route\s*\}\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Desestructura productId y userName desde route.params",
      dependeDe: "3",
      existe: (codigo) => /const\s*\{\s*productId\s*,\s*userName\s*\}\s*=\s*route\.params/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+DetailScreen[\s\S]*?const\s*\{\s*productId\s*,\s*userName\s*\}\s*=\s*route\.params/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "DetailScreen tiene return()",
      dependeDe: "4",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+DetailScreen[\s\S]*?return\s*\(/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "El return contiene <View></View>",
      dependeDe: "5",
      existe: (codigo) => /<View\b[^>]*>[\s\S]*?<\/View>/.test(codigo || ''),
      dentroDe: (codigo) => /return\s*\([\s\S]*?<View\b[^>]*>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "<View> contiene <Text> con el texto 'Estás en la pantalla de Detalle'",
      dependeDe: "6",
      existe: (codigo) => /<Text\b[^>]*>Estás en la pantalla de Detalle<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\b[^>]*>Estás en la pantalla de Detalle<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "8",
      descripcion: "<View> contiene <Text> que muestra Producto: #{productId}",
      dependeDe: "6",
      existe: (codigo) => /<Text\b[^>]*>Producto:\s*#\{productId\}<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\b[^>]*>Producto:\s*#\{productId\}<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "9",
      descripcion: "<View> contiene <Text> que muestra Usuario: {userName}",
      dependeDe: "6",
      existe: (codigo) => /<Text\b[^>]*>Usuario:\s*\{userName\}<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\b[^>]*>Usuario:\s*\{userName\}<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
  ]
};