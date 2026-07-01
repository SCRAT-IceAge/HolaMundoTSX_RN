import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_4_10: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorComponenteHomeScreenPasarPropsSinReturn",
  leccion: "4",
  codigoResuelto: `const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleGoToDetail = () => {
    navigation.navigate('Detalle', {
      productId: 42,
      userName: 'Juan Pérez',
    });
  };`,
  checkList: [
    {
      id: "1",
      descripcion: "Declara el componente HomeScreen usando React.FC<Props> con { navigation } desestructurado como prop",
      existe: (codigo) => /const\s+HomeScreen\s*:\s*React\.FC\s*<\s*Props\s*>\s*=\s*\(\s*\{\s*navigation\s*\}\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Declara la función handleGoToDetail",
      dependeDe: "1",
      existe: (codigo) => /const\s+handleGoToDetail\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+HomeScreen[\s\S]*?const\s+handleGoToDetail\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "handleGoToDetail llama a navigation.navigate('Detalle', ...)",
      dependeDe: "2",
      existe: (codigo) => /navigation\.navigate\s*\(\s*['"]Detalle['"]\s*,/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+handleGoToDetail\s*=\s*\(\s*\)\s*=>\s*\{[\s\S]*?navigation\.navigate\s*\(\s*['"]Detalle['"]\s*,[\s\S]*?\}/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "El objeto de parámetros pasado a navigate tiene productId: 42",
      dependeDe: "3",
      existe: (codigo) => /productId\s*:\s*42/.test(codigo || ''),
      dentroDe: (codigo) => /navigation\.navigate\s*\(\s*['"]Detalle['"]\s*,\s*\{[\s\S]*?productId\s*:\s*42[\s\S]*?\}/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "El objeto de parámetros pasado a navigate tiene userName: 'Juan Pérez'",
      dependeDe: "3",
      existe: (codigo) => /userName\s*:\s*['"]Juan Pérez['"]/.test(codigo || ''),
      dentroDe: (codigo) => /navigation\.navigate\s*\(\s*['"]Detalle['"]\s*,\s*\{[\s\S]*?userName\s*:\s*['"]Juan Pérez['"][\s\S]*?\}/.test(codigo || ''),
    },
  ]
};