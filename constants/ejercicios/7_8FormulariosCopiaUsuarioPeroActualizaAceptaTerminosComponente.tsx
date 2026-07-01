import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_7_8: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "FormulariosCopiaUsuarioPeroActualizaAceptaTerminosComponente",
  leccion: "7",
  codigoResuelto: `const Formuliuiu: React.FC = () => {
  const [user, setUser] = useState<UserForm>({
    usuario: "",
    aceptaTerminos: false,
  });

  const { usuario, aceptaTerminos } = user;

  return (
    <View>
      <TextInput
        value={usuario}
        onChangeText={(text) => setUser({ ...user, usuario: text })}
      />
    </View>
  );

}`,
  checkList: [
    {
      id: "1",
      descripcion: "Declara el componente Formuliuiu usando React.FC",
      existe: (codigo) => /const\s+Formuliuiu\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Declara el estado user con useState<UserForm> inicializado con usuario: \"\" y aceptaTerminos: false",
      dependeDe: "1",
      existe: (codigo) => /const\s*\[\s*user\s*,\s*setUser\s*\]\s*=\s*useState<UserForm>\s*\(\s*\{\s*usuario\s*:\s*["']["']\s*,\s*aceptaTerminos\s*:\s*false\s*,?\s*\}\s*\)/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+Formuliuiu[\s\S]*?const\s*\[\s*user\s*,\s*setUser\s*\]\s*=\s*useState<UserForm>\s*\(\s*\{\s*usuario\s*:\s*["']["']\s*,\s*aceptaTerminos\s*:\s*false\s*,?\s*\}\s*\)/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Desestructura usuario y aceptaTerminos a partir de user",
      dependeDe: "2",
      existe: (codigo) => /const\s*\{\s*usuario\s*,\s*aceptaTerminos\s*\}\s*=\s*user/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+Formuliuiu[\s\S]*?const\s*\{\s*usuario\s*,\s*aceptaTerminos\s*\}\s*=\s*user/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Retorna JSX con una View contenedora",
      dependeDe: "1",
      existe: (codigo) => /return\s*\(\s*<View>/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+Formuliuiu[\s\S]*?return\s*\(\s*<View>/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "Dentro de la View, declara un TextInput con value={usuario}",
      dependeDe: "4",
      existe: (codigo) => /<TextInput[\s\S]*?value=\{usuario\}/.test(codigo || ''),
      dentroDe: (codigo) => /<View>[\s\S]*?<TextInput[\s\S]*?value=\{usuario\}/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "El TextInput tiene onChangeText que actualiza usuario preservando el resto del estado con spread ...user",
      dependeDe: "5",
      existe: (codigo) => /onChangeText=\{\s*\(text\)\s*=>\s*setUser\(\s*\{\s*\.\.\.user\s*,\s*usuario\s*:\s*text\s*\}\s*\)\s*\}/.test(codigo || ''),
      dentroDe: (codigo) => /<TextInput[\s\S]*?onChangeText=\{\s*\(text\)\s*=>\s*setUser\(\s*\{\s*\.\.\.user\s*,\s*usuario\s*:\s*text\s*\}\s*\)\s*\}/.test(codigo || ''),
    },
  ]
};