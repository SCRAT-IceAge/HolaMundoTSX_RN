import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_7_4: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "FormulariosEstadoDerivado",
  leccion: "7",
  codigoResuelto: `const FormUsuarioEmail: React.FC = () => {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");

  const puedeEnviar = usuario.trim() !== "" && email.includes("@");`,
  checkList: [
    {
      id: "1",
      descripcion: "Declara el componente FormUsuarioEmail usando React.FC",
      existe: (codigo) => /const\s+FormUsuarioEmail\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Declara el estado usuario con useState(\"\")",
      dependeDe: "1",
      existe: (codigo) => /const\s*\[\s*usuario\s*,\s*setUsuario\s*\]\s*=\s*useState\s*\(\s*["']["']\s*\)/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+FormUsuarioEmail[\s\S]*?const\s*\[\s*usuario\s*,\s*setUsuario\s*\]\s*=\s*useState\s*\(\s*["']["']\s*\)/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Declara el estado email con useState(\"\")",
      dependeDe: "1",
      existe: (codigo) => /const\s*\[\s*email\s*,\s*setEmail\s*\]\s*=\s*useState\s*\(\s*["']["']\s*\)/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+FormUsuarioEmail[\s\S]*?const\s*\[\s*email\s*,\s*setEmail\s*\]\s*=\s*useState\s*\(\s*["']["']\s*\)/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Declara puedeEnviar como estado derivado: usuario.trim() !== \"\" && email.includes(\"@\")",
      dependeDe: ["2", "3"],
      existe: (codigo) => /const\s+puedeEnviar\s*=\s*usuario\.trim\(\)\s*!==\s*["']["']\s*&&\s*email\.includes\s*\(\s*["']@["']\s*\)/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+FormUsuarioEmail[\s\S]*?const\s+puedeEnviar\s*=\s*usuario\.trim\(\)\s*!==\s*["']["']\s*&&\s*email\.includes\s*\(\s*["']@["']\s*\)/.test(codigo || ''),
    },
  ]
};