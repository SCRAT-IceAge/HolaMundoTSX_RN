import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_4_3: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorProps+HomeScreenComponent",
  leccion: "4",
  codigoResuelto: `type Props = {
  navigation: HomeNavProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleGoToDetail = () => {
    navigation.navigate('Detalle', {
      productId: 42,
      userName: 'Juan Pérez',
    });
  };`,
  checkList: [
    {
      id: "1",
      descripcion: "Define el tipo Props con navigation: HomeNavProp",
      existe: (codigo) => /type\s+Props\s*=\s*\{[^}]*?navigation\s*:\s*HomeNavProp[^}]*?\}/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Declara HomeScreen tipado como React.FC<Props>, desestructurando navigation",
      dependeDe: "1",
      existe: (codigo) =>
        /const\s+HomeScreen\s*:\s*React\.FC\s*<\s*Props\s*>\s*=\s*\(\s*\{\s*navigation\s*\}\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Declara la función handleGoToDetail dentro de HomeScreen",
      dependeDe: "2",
      existe: (codigo) => /const\s+handleGoToDetail\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
      dentroDe: (codigo) => /HomeScreen[\s\S]*?const\s+handleGoToDetail\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "handleGoToDetail llama a navigation.navigate('Detalle', { productId: 42, userName: 'Juan Pérez' })",
      dependeDe: "3",
      existe: (codigo) =>
        /navigation\.navigate\s*\(\s*['"]Detalle['"]\s*,\s*\{[^}]*?productId\s*:\s*42[^}]*?userName\s*:\s*['"]Juan Pérez['"][^}]*?\}\s*\)/.test(codigo || '') ||
        /navigation\.navigate\s*\(\s*['"]Detalle['"]\s*,\s*\{[^}]*?userName\s*:\s*['"]Juan Pérez['"][^}]*?productId\s*:\s*42[^}]*?\}\s*\)/.test(codigo || ''),
      dentroDe: (codigo) =>
        /const\s+handleGoToDetail\s*=\s*\(\s*\)\s*=>\s*\{[\s\S]*?navigation\.navigate\s*\(\s*['"]Detalle['"]/.test(codigo || ''),
    },
  ]
};