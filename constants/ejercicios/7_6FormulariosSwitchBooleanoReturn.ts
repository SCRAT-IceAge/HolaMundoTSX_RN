import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_7_6: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "FormulariosSwitchBooleanoReturn",
  leccion: "7",
  codigoResuelto: `  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Acepto Terminos</Text>
        <Switch value={acepta} onValueChange={setAcepta} />
      </View>
      <Button title="Enviar" onPress={enviar} />
    </View>
  );`,
  checkList: [
    {
      id: "1",
      descripcion: "Comienza con return ( para retornar JSX",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Declara una View contenedora con estilo flex: 1, padding: 16 y justifyContent: \"center\"",
      dependeDe: "1",
      existe: (codigo) => /<View\s+style=\{\{\s*flex\s*:\s*1\s*,\s*padding\s*:\s*16\s*,\s*justifyContent\s*:\s*["']center["']\s*,?\s*\}\}\s*>/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Declara una View interna con flexDirection: \"row\" y justifyContent: \"space-between\"",
      dependeDe: "2",
      existe: (codigo) => /<View\s+style=\{\{\s*flexDirection\s*:\s*["']row["']\s*,\s*justifyContent\s*:\s*["']space-between["']\s*\}\}\s*>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\s+style=\{\{\s*flex\s*:\s*1[\s\S]*?<View\s+style=\{\{\s*flexDirection\s*:\s*["']row["']\s*,\s*justifyContent\s*:\s*["']space-between["']\s*\}\}\s*>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Dentro de la View de fila, muestra un Text con el texto \"Acepto Terminos\"",
      dependeDe: "3",
      existe: (codigo) => /<Text>\s*Acepto Terminos\s*<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\s+style=\{\{\s*flexDirection\s*:\s*["']row["'][\s\S]*?<Text>\s*Acepto Terminos\s*<\/Text>/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "Dentro de la View de fila, declara un Switch con value={acepta} y onValueChange={setAcepta}",
      dependeDe: "3",
      existe: (codigo) => /<Switch\s+value=\{acepta\}\s+onValueChange=\{setAcepta\}\s*\/>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\s+style=\{\{\s*flexDirection\s*:\s*["']row["'][\s\S]*?<Switch\s+value=\{acepta\}\s+onValueChange=\{setAcepta\}\s*\/>/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "Declara un Button con title=\"Enviar\" y onPress={enviar}, fuera de la View de fila pero dentro de la View contenedora",
      dependeDe: "2",
      existe: (codigo) => /<Button\s+title=["']Enviar["']\s+onPress=\{enviar\}\s*\/>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\s+style=\{\{\s*flex\s*:\s*1[\s\S]*?<Button\s+title=["']Enviar["']\s+onPress=\{enviar\}\s*\/>/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "Cierra el return con );",
      dependeDe: "1",
      existe: (codigo) => /\)\s*;?\s*$/.test((codigo || '').trim()),
    },
  ]
};