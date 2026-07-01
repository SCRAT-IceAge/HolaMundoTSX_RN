import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_3_3_2: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "FlatListTarjetaComponent",
  leccion: "3",
  codigoResuelto: `type TarjetaProductoProps = {
  producto: Producto;
};
const TarjetaProducto: React.FC<TarjetaProductoProps> = ({ producto }) => (
  <View style={styles.tarjeta}>
    <Text style={styles.nombre}>{producto.nombre}</Text>
    <Text style={styles.descripcion}>{producto.descripcion}</Text>
    <Text style={styles.precio}>$ {producto.precio.toLocaleString()}</Text>
  </View>
);`,
  checkList: [
    {
      id: "1",
      descripcion: "Define el tipo TarjetaProductoProps con producto: Producto",
      existe: (codigo) =>
        /type\s+TarjetaProductoProps\s*=\s*\{[^}]*?producto\s*:\s*Producto[^}]*?\}/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Asigna el tipo TarjetaProductoProps al componente React.FC",
      dependeDe: "1",
      existe: (codigo) => /const\s+TarjetaProducto\s*:\s*React\.FC\s*<\s*TarjetaProductoProps\s*>\s*=/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Desestructura producto en los parámetros",
      dependeDe: "2",
      existe: (codigo) => /\{\s*producto\s*\}/.test(codigo || ''),
      dentroDe: (codigo) =>
        /const\s+TarjetaProducto\s*:\s*React\.FC\s*<\s*TarjetaProductoProps\s*>\s*=\s*\(\s*\{\s*producto\s*\}\s*\)/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "Usa return implícito con paréntesis (=> (...))",
      dependeDe: "3",
      existe: (codigo) => /\}\s*\)\s*=>\s*\(/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "Renderiza <View style={styles.tarjeta}>",
      dependeDe: "4",
      existe: (codigo) => /<View\s+style\s*=\s*\{\s*styles\.tarjeta\s*\}/.test(codigo || ''),
      dentroDe: (codigo) => /\}\s*\)\s*=>\s*\([\s\S]*?<View\s+style\s*=\s*\{\s*styles\.tarjeta\s*\}[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "<View> contiene <Text> que muestra producto.nombre",
      dependeDe: "5",
      existe: (codigo) => /<Text\s+style\s*=\s*\{\s*styles\.nombre\s*\}\s*>[^<]*\{\s*producto\.nombre\s*\}[^<]*<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\s+style\s*=\s*\{\s*styles\.nombre\s*\}\s*>[^<]*\{\s*producto\.nombre\s*\}[^<]*<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "<View> contiene <Text> que muestra producto.descripcion",
      dependeDe: "5",
      existe: (codigo) => /<Text\s+style\s*=\s*\{\s*styles\.descripcion\s*\}\s*>[^<]*\{\s*producto\.descripcion\s*\}[^<]*<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\s+style\s*=\s*\{\s*styles\.descripcion\s*\}\s*>[^<]*\{\s*producto\.descripcion\s*\}[^<]*<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
    {
      id: "8",
      descripcion: "<View> contiene <Text> que muestra el precio formateado con toLocaleString()",
      dependeDe: "5",
      existe: (codigo) => /<Text\s+style\s*=\s*\{\s*styles\.precio\s*\}\s*>[^<]*\$\s*\{\s*producto\.precio\.toLocaleString\(\)\s*\}[^<]*<\/Text>/.test(codigo || ''),
      dentroDe: (codigo) => /<View\b[^>]*>[\s\S]*?<Text\s+style\s*=\s*\{\s*styles\.precio\s*\}\s*>[^<]*\$\s*\{\s*producto\.precio\.toLocaleString\(\)\s*\}[^<]*<\/Text>[\s\S]*?<\/View>/.test(codigo || ''),
    },
  ]
};