import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_4_4: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorReturnDeHomeScreen",
  leccion: "4",
  codigoResuelto: `return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Pantalla de Inicio</Text>
      <Button title="Ver Detalle del producto 42" onPress={handleGoToDetail} />
    </View>
  );`,
  checkList: [
    {
      id: "1",
      descripcion: "Tiene return()",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "El return contiene <View> con flex: 1, justifyContent y alignItems en 'center'",
      dependeDe: "1",
      existe: (codigo) =>
        /<View\s+style\s*=\s*\{\{[^}]*?flex\s*:\s*1[^}]*?\}\}/.test(codigo || '') &&
        /<View\s+style\s*=\s*\{\{[^}]*?justifyContent\s*:\s*['"]center['"][^}]*?\}\}/.test(codigo || '') &&
        /<View\s+style\s*=\s*\{\{[^}]*?alignItems\s*:\s*['"]center['"][^}]*?\}\}/.test(codigo || ''),
      dentroDe: (codigo) => /return\s*\([\s\S]*?<View\b[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "<View> contiene <Text> con el título 'Pantalla de Inicio'",
      dependeDe: "2",
      existe: (codigo) => /<Text\s+style\s*=\s*\{\{[^}]*?\}\}\s*>\s*Pantalla de Inicio\s*<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\b[^>]*>\s*Pantalla de Inicio\s*<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "<View> contiene <Button> con title y onPress={handleGoToDetail}",
      dependeDe: "2",
      existe: (codigo) =>
        /<Button\s+title\s*=\s*['"][^'"]+['"]\s+onPress\s*=\s*\{\s*handleGoToDetail\s*\}\s*\/>/.test(codigo || '') ||
        /<Button\s+onPress\s*=\s*\{\s*handleGoToDetail\s*\}\s+title\s*=\s*['"][^'"]+['"]\s*\/>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Button\b[\s\S]*?\/>[\s\S]*?<\/View>/.test(codigo || ''),
    },
  ]
};