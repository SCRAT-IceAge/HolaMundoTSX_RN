import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_1_2: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "Hola Mundo Centrado",
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
};