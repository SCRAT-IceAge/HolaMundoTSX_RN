import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_3_3_3: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "FlatListCatalogo",
  leccion: "3",
  codigoResuelto: `const CatalogoScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TarjetaProducto producto={item} />}
        contentContainerStyle={styles.lista}
      />
    </SafeAreaView>
  );
};`,
  checkList: [
    {
      id: "1",
      descripcion: "Declara el componente CatalogoScreen usando React.FC",
      existe: (codigo) => /const\s+CatalogoScreen\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "CatalogoScreen tiene return()",
      dependeDe: "1",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+CatalogoScreen[\s\S]*?return\s*\(/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "El return contiene <SafeAreaView></SafeAreaView>",
      dependeDe: "2",
      existe: (codigo) => /<SafeAreaView\b[^>]*>[\s\S]*?<\/SafeAreaView>/.test(codigo || ''),
      dentroDe: (codigo) => /return\s*\([\s\S]*?<SafeAreaView\b[^>]*>[\s\S]*?<\/SafeAreaView>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "<SafeAreaView> contiene <FlatList>",
      dependeDe: "3",
      existe: (codigo) => /<FlatList\b[^>]*\/?>/.test(codigo || ''),
      dentroDe: (codigo) => /<SafeAreaView\b[^>]*>[\s\S]*?<FlatList\b[\s\S]*?\/>[\s\S]*?<\/SafeAreaView>/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "<FlatList> tiene data={productos}",
      dependeDe: "4",
      existe: (codigo) => /data\s*=\s*\{\s*productos\s*\}/.test(codigo || ''),
      dentroDe: (codigo) => /<FlatList\b[^>]*?data\s*=\s*\{\s*productos\s*\}[\s\S]*?\/>/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "<FlatList> tiene keyExtractor que devuelve item.id",
      dependeDe: "4",
      existe: (codigo) => /keyExtractor\s*=\s*\{\s*\(\s*item\s*\)\s*=>\s*item\.id\s*\}/.test(codigo || ''),
      dentroDe: (codigo) => /<FlatList\b[^>]*?keyExtractor\s*=\s*\{\s*\(\s*item\s*\)\s*=>\s*item\.id\s*\}[\s\S]*?\/>/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "<FlatList> tiene renderItem que renderiza <TarjetaProducto producto={item} />",
      dependeDe: "4",
      existe: (codigo) =>
        /renderItem\s*=\s*\{\s*\(\s*\{\s*item\s*\}\s*\)\s*=>\s*<TarjetaProducto\s+producto\s*=\s*\{\s*item\s*\}\s*\/>\s*\}/.test(codigo || ''),
      dentroDe: (codigo) =>
        /<FlatList\b[^>]*?renderItem\s*=\s*\{\s*\(\s*\{\s*item\s*\}\s*\)\s*=>\s*<TarjetaProducto\s+producto\s*=\s*\{\s*item\s*\}\s*\/>\s*\}[\s\S]*?\/>/.test(codigo || ''),
    },
    {
      id: "8",
      descripcion: "<FlatList> tiene contentContainerStyle={styles.lista}",
      dependeDe: "4",
      existe: (codigo) => /contentContainerStyle\s*=\s*\{\s*styles\.lista\s*\}/.test(codigo || ''),
      dentroDe: (codigo) => /<FlatList\b[^>]*?contentContainerStyle\s*=\s*\{\s*styles\.lista\s*\}[\s\S]*?\/>/.test(codigo || ''),
    },
  ]
};