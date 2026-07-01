import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_4_11: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorComponenteHomeScreenPasarPropsConReturn",
  leccion: "4",
  codigoResuelto: `  return (
    <View style={{ padding: 16, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Pantalla de Inicio</Text>
      <Button title="Ver Detalle del producto 42" onPress={handleGoToDetail} />
    </View>
  );
};`,
  checkList: [
    {
      id: "1",
      descripcion: "Tiene return()",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "El return contiene <View></View>",
      dependeDe: "1",
      existe: (codigo) => /<View\b[^>]*>[\s\S]*?<\/View>/.test(codigo || ''),
      dentroDe: (codigo) => /return\s*\([\s\S]*?<View\b[^>]*>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "<View> tiene style con padding: 16, flex: 1, justifyContent: 'center' y alignItems: 'center'",
      dependeDe: "2",
      existe: (codigo) =>
        /<View\b[^>]*style\s*=\s*\{\{[^}]*padding\s*:\s*16[^}]*flex\s*:\s*1[^}]*justifyContent\s*:\s*['"]center['"][^}]*alignItems\s*:\s*['"]center['"][^}]*\}\}/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "<View> contiene <Text> con el texto 'Pantalla de Inicio'",
      dependeDe: "2",
      existe: (codigo) => /<Text\b[^>]*>Pantalla de Inicio<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\b[^>]*>Pantalla de Inicio<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "El <Text> de 'Pantalla de Inicio' tiene style con fontSize: 18 y marginBottom: 12",
      dependeDe: "4",
      existe: (codigo) =>
        /<Text\b[^>]*style\s*=\s*\{\{[^}]*fontSize\s*:\s*18[^}]*marginBottom\s*:\s*12[^}]*\}\}[^>]*>Pantalla de Inicio<\/Text>/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "<View> contiene <Button> con title=\"Ver Detalle del producto 42\" y onPress={handleGoToDetail}",
      dependeDe: "2",
      existe: (codigo) =>
        /<Button\b[^>]*title\s*=\s*["']Ver Detalle del producto 42["'][^>]*onPress\s*=\s*\{\s*handleGoToDetail\s*\}[^>]*\/>/.test(codigo || ''),
      dentroDe: (codigo) =>
        /<View\b[^>]*>[\s\S]*?<Button\b[^>]*title\s*=\s*["']Ver Detalle del producto 42["'][\s\S]*?\/>[\s\S]*?<\/View>/.test(codigo || ''),
    },
  ]
};