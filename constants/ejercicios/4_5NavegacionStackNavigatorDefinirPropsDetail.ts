import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_4_5: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorDefinirPropsDetail",
  leccion: "4",
  codigoResuelto: `import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
type DetailRouteProp = RouteProp<RootStackParamList, 'Detalle'>;
type Props = { route: DetailRouteProp; };`,
  checkList: [
    {
      id: "1",
      descripcion: "Importa RouteProp desde '@react-navigation/native'",
      existe: (codigo) => /import\s*\{\s*RouteProp\s*\}\s*from\s*['"]@react-navigation\/native['"]/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Importa RootStackParamList desde '../types/navigation'",
      existe: (codigo) => /import\s*\{\s*RootStackParamList\s*\}\s*from\s*['"]\.\.\/types\/navigation['"]/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Declara el type DetailRouteProp usando RouteProp<RootStackParamList, 'Detalle'>",
      dependeDe: ["1", "2"],
      existe: (codigo) => /type\s+DetailRouteProp\s*=\s*RouteProp\s*<\s*RootStackParamList\s*,\s*['"]Detalle['"]\s*>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Declara el type Props con la propiedad route: DetailRouteProp",
      dependeDe: "3",
      existe: (codigo) => /route\s*:\s*DetailRouteProp/.test(codigo || ''),
      dentroDe: (codigo) => /type\s+Props\s*=\s*\{[\s\S]*?route\s*:\s*DetailRouteProp[\s\S]*?\}/.test(codigo || ''),
    },
  ]
};