import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_4_13: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorHeaderDinamico",
  leccion: "4",
  codigoResuelto: `<Stack.Screen
  name="Detalle"
  component={DetailScreen}
  options={({ route }) => ({
    title: \`Detalle #\${route.params.productId}\`,
  })}
/>`,
  checkList: [
    {
      id: "1",
      descripcion: "Declara <Stack.Screen> con name=\"Detalle\"",
      existe: (codigo) => /<Stack\.Screen\b[^>]*name\s*=\s*["']Detalle["']/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "<Stack.Screen> tiene component={DetailScreen}",
      dependeDe: "1",
      existe: (codigo) => /component\s*=\s*\{\s*DetailScreen\s*\}/.test(codigo || ''),
      dentroDe: (codigo) => /<Stack\.Screen\b[^>]*name\s*=\s*["']Detalle["'][\s\S]*?component\s*=\s*\{\s*DetailScreen\s*\}[\s\S]*?\/>/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "<Stack.Screen> tiene options como función que recibe { route }",
      dependeDe: "1",
      existe: (codigo) => /options\s*=\s*\(\s*\{\s*route\s*\}\s*\)\s*=>/.test(codigo || ''),
      dentroDe: (codigo) => /<Stack\.Screen\b[^>]*name\s*=\s*["']Detalle["'][\s\S]*?options\s*=\s*\(\s*\{\s*route\s*\}\s*\)\s*=>[\s\S]*?\/>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "options devuelve un objeto con title usando template literal `Detalle #${route.params.productId}`",
      dependeDe: "3",
      existe: (codigo) => /title\s*:\s*`Detalle #\$\{route\.params\.productId\}`/.test(codigo || ''),
      dentroDe: (codigo) => /options\s*=\s*\(\s*\{\s*route\s*\}\s*\)\s*=>\s*\(\s*\{[\s\S]*?title\s*:\s*`Detalle #\$\{route\.params\.productId\}`[\s\S]*?\}\s*\)/.test(codigo || ''),
    },
  ]
};