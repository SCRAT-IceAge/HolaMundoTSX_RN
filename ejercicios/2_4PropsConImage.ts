import { ItemCheckList } from '../../types/verificacion';

export const ejercicio_2_4: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "Props con Image",
  leccion: "2",
  codigoResuelto: `import { Image } from 'react-native';

<Image source={{ uri: 'https://picsum.photos/200' }} style={{ width: 100, height: 100 }}/>`,
  checkList: [
    {
      id: "1",
      descripcion: "Import { Image } from 'react-native'",
      existe: (codigo) => /import\s*\{[^}]*\bImage\b[^}]*\}\s*from\s*['"]react-native['"]\s*;?/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Renderiza <Image /> de forma autoconclusiva",
      existe: (codigo) => /<Image\b[^>]*\/>/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "<Image> tiene source con uri",
      dependeDe: "2",
      existe: (codigo) => /source\s*=\s*\{\{\s*uri\s*:\s*['"][^'"]+['"]\s*\}\}/.test(codigo || ''),
      dentroDe: (codigo) => /<Image\b[^>]*?source\s*=\s*\{\{\s*uri\s*:\s*['"][^'"]+['"]\s*\}\}[^>]*\/>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "<Image> tiene style con width: 100 y height: 100",
      dependeDe: "2",
      existe: (codigo) => /style\s*=\s*\{\{\s*width\s*:\s*100\s*,\s*height\s*:\s*100\s*\}\}/.test(codigo || ''),
      dentroDe: (codigo) => /<Image\b[^>]*?style\s*=\s*\{\{\s*width\s*:\s*100\s*,\s*height\s*:\s*100\s*\}\}[^>]*\/>/.test(codigo || ''),
    },
  ]
};