import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_7_3: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "FormulariosSinNombreConReturn",
  leccion: "7",
  codigoResuelto: `  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 8 }}>
      <Text>Nombre</Text>
      <TextInput
        value={nombre} // UI lee del estado
        onChangeText={setNombre} // UI escribe al estado
        placeholder="tu nombre"
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Button title="Enviar" onPress={enviar} />
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
      descripcion: "<View> tiene style con flex: 1, padding: 16, justifyContent: \"center\" y gap: 8",
      dependeDe: "2",
      existe: (codigo) =>
        /<View\b[^>]*style\s*=\s*\{\{[^}]*flex\s*:\s*1[^}]*padding\s*:\s*16[^}]*justifyContent\s*:\s*["']center["'][^}]*gap\s*:\s*8[^}]*\}\}/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "<View> contiene <Text> con el texto 'Nombre'",
      dependeDe: "2",
      existe: (codigo) => /<Text\b[^>]*>Nombre<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\b[^>]*>Nombre<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "<View> contiene <TextInput>",
      dependeDe: "2",
      existe: (codigo) => /<TextInput\b[^>]*\/?>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<TextInput\b[\s\S]*?\/>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "<TextInput> tiene value={nombre}",
      dependeDe: "5",
      existe: (codigo) => /value\s*=\s*\{\s*nombre\s*\}/.test(codigo || ''),
      dentroDe: (codigo) => /<TextInput\b[^>]*?value\s*=\s*\{\s*nombre\s*\}[\s\S]*?\/>/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "<TextInput> tiene onChangeText={setNombre}",
      dependeDe: "5",
      existe: (codigo) => /onChangeText\s*=\s*\{\s*setNombre\s*\}/.test(codigo || ''),
      dentroDe: (codigo) => /<TextInput\b[^>]*?onChangeText\s*=\s*\{\s*setNombre\s*\}[\s\S]*?\/>/.test(codigo || ''),
    },
    {
      id: "8",
      descripcion: "<TextInput> tiene placeholder=\"tu nombre\"",
      dependeDe: "5",
      existe: (codigo) => /placeholder\s*=\s*["']tu nombre["']/.test(codigo || ''),
      dentroDe: (codigo) => /<TextInput\b[^>]*?placeholder\s*=\s*["']tu nombre["'][\s\S]*?\/>/.test(codigo || ''),
    },
    {
      id: "9",
      descripcion: "<TextInput> tiene style con borderWidth: 1 y padding: 8",
      dependeDe: "5",
      existe: (codigo) =>
        /<TextInput\b[^>]*style\s*=\s*\{\{[^}]*borderWidth\s*:\s*1[^}]*padding\s*:\s*8[^}]*\}\}/.test(codigo || ''),
    },
    {
      id: "10",
      descripcion: "<View> contiene <Button title=\"Enviar\" onPress={enviar} />",
      dependeDe: "2",
      existe: (codigo) =>
        /<Button\b[^>]*title\s*=\s*["']Enviar["'][^>]*onPress\s*=\s*\{\s*enviar\s*\}[^>]*\/>/.test(codigo || ''),
      dentroDe: (codigo) =>
        /<View\b[^>]*>[\s\S]*?<Button\b[^>]*title\s*=\s*["']Enviar["'][\s\S]*?\/>[\s\S]*?<\/View>/.test(codigo || ''),
    },
  ]
};