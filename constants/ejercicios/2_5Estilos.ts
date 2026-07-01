import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_2_5: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "Estilos",
  leccion: "2",
  codigoResuelto: `const styles = StyleSheet.create({ 
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  text: {
    fontSize: 20,
    color: 'darkblue',
  },
});`,
  checkList: [
    {
      id: "1",
      descripcion: "StyleSheet.create({...})",
      existe: (codigo) => /StyleSheet\.create\s*\(\s*\{/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "container dentro de StyleSheet.create",
      dependeDe: "1",
      existe: (codigo) => /container\s*:\s*\{/.test(codigo || ''),
      dentroDe: (codigo) => /StyleSheet\.create\s*\(\s*\{[\s\S]*?container\s*:\s*\{/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "container tiene flex: 1",
      dependeDe: "2",
      existe: (codigo) => /flex\s*:\s*1/.test(codigo || ''),
      dentroDe: (codigo) => /container\s*:\s*\{[^}]*?flex\s*:\s*1[^}]*?\}/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "container tiene justifyContent: 'center'",
      dependeDe: "2",
      existe: (codigo) => /justifyContent\s*:\s*['"]center['"]/.test(codigo || ''),
      dentroDe: (codigo) => /container\s*:\s*\{[^}]*?justifyContent\s*:\s*['"]center['"][^}]*?\}/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "container tiene alignItems: 'center'",
      dependeDe: "2",
      existe: (codigo) => /alignItems\s*:\s*['"]center['"]/.test(codigo || ''),
      dentroDe: (codigo) => /container\s*:\s*\{[^}]*?alignItems\s*:\s*['"]center['"][^}]*?\}/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "container tiene backgroundColor: 'lightblue'",
      dependeDe: "2",
      existe: (codigo) => /backgroundColor\s*:\s*['"]lightblue['"]/.test(codigo || ''),
      dentroDe: (codigo) => /container\s*:\s*\{[^}]*?backgroundColor\s*:\s*['"]lightblue['"][^}]*?\}/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "text dentro de StyleSheet.create",
      dependeDe: "1",
      existe: (codigo) => /text\s*:\s*\{/.test(codigo || ''),
      dentroDe: (codigo) => /StyleSheet\.create\s*\(\s*\{[\s\S]*?text\s*:\s*\{/.test(codigo || ''),
    },
    {
      id: "8",
      descripcion: "text tiene fontSize: 20",
      dependeDe: "7",
      existe: (codigo) => /fontSize\s*:\s*20/.test(codigo || ''),
      dentroDe: (codigo) => /text\s*:\s*\{[^}]*?fontSize\s*:\s*20[^}]*?\}/.test(codigo || ''),
    },
    {
      id: "9",
      descripcion: "text tiene color: 'darkblue'",
      dependeDe: "7",
      existe: (codigo) => /color\s*:\s*['"]darkblue['"]/.test(codigo || ''),
      dentroDe: (codigo) => /text\s*:\s*\{[^}]*?color\s*:\s*['"]darkblue['"][^}]*?\}/.test(codigo || ''),
    },
  ]
};