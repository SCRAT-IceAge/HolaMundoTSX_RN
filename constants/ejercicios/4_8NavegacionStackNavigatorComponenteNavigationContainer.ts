import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_4_8: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "NavegacionStackNavigatorComponenteNavigationContainer",
  leccion: "4",
  codigoResuelto: `const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen
          name="Detalle"
          component={DetailScreen}
          options={({ route }) => ({
            title: \`Detalle #\${route.params.productId}\`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};`,
  checkList: [
    {
      id: "1",
      descripcion: "Declara el componente App usando React.FC",
      existe: (codigo) => /const\s+App\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "App tiene return()",
      dependeDe: "1",
      existe: (codigo) => /return\s*\(/.test(codigo || ''),
      dentroDe: (codigo) => /const\s+App[\s\S]*?return\s*\(/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "El return contiene <NavigationContainer></NavigationContainer>",
      dependeDe: "2",
      existe: (codigo) => /<NavigationContainer\b[^>]*>[\s\S]*?<\/NavigationContainer>/.test(codigo || ''),
      dentroDe: (codigo) => /return\s*\([\s\S]*?<NavigationContainer\b[^>]*>[\s\S]*?<\/NavigationContainer>/.test(codigo || ''),
    },
    {
      id: "4",
      descripcion: "<NavigationContainer> contiene <Stack.Navigator></Stack.Navigator>",
      dependeDe: "3",
      existe: (codigo) => /<Stack\.Navigator\b[^>]*>[\s\S]*?<\/Stack\.Navigator>/.test(codigo || ''),
      dentroDe: (codigo) => /<NavigationContainer\b[^>]*>[\s\S]*?<Stack\.Navigator\b[^>]*>[\s\S]*?<\/Stack\.Navigator>[\s\S]*?<\/NavigationContainer>/.test(codigo || ''),
    },
    {
      id: "5",
      descripcion: "<Stack.Navigator> tiene initialRouteName=\"Inicio\"",
      dependeDe: "4",
      existe: (codigo) => /<Stack\.Navigator\b[^>]*initialRouteName\s*=\s*["']Inicio["']/.test(codigo || ''),
    },
    {
      id: "6",
      descripcion: "<Stack.Navigator> contiene <Stack.Screen name=\"Inicio\" component={HomeScreen} options={{ title: 'Inicio' }} />",
      dependeDe: "4",
      existe: (codigo) =>
        /<Stack\.Screen\b[^>]*name\s*=\s*["']Inicio["'][^>]*component\s*=\s*\{\s*HomeScreen\s*\}[^>]*options\s*=\s*\{\{\s*title\s*:\s*['"]Inicio['"]\s*\}\}[^>]*\/>/.test(codigo || ''),
      dentroDe: (codigo) =>
        /<Stack\.Navigator\b[^>]*>[\s\S]*?<Stack\.Screen\b[^>]*name\s*=\s*["']Inicio["'][\s\S]*?\/>[\s\S]*?<\/Stack\.Navigator>/.test(codigo || ''),
    },
    {
      id: "7",
      descripcion: "<Stack.Navigator> contiene <Stack.Screen name=\"Detalle\" component={DetailScreen} />",
      dependeDe: "4",
      existe: (codigo) =>
        /<Stack\.Screen\b[^>]*name\s*=\s*["']Detalle["'][^>]*component\s*=\s*\{\s*DetailScreen\s*\}/.test(codigo || ''),
      dentroDe: (codigo) =>
        /<Stack\.Navigator\b[^>]*>[\s\S]*?<Stack\.Screen\b[^>]*name\s*=\s*["']Detalle["'][\s\S]*?\/>[\s\S]*?<\/Stack\.Navigator>/.test(codigo || ''),
    },
    {
      id: "8",
      descripcion: "El Stack.Screen \"Detalle\" tiene options como función que devuelve title con route.params.productId",
      dependeDe: "7",
      existe: (codigo) =>
        /options\s*=\s*\(\s*\{\s*route\s*\}\s*\)\s*=>\s*\(\s*\{[\s\S]*?title\s*:\s*`Detalle #\$\{route\.params\.productId\}`[\s\S]*?\}\s*\)/.test(codigo || ''),
      dentroDe: (codigo) =>
        /<Stack\.Screen\b[^>]*name\s*=\s*["']Detalle["'][\s\S]*?options\s*=\s*\(\s*\{\s*route\s*\}\s*\)\s*=>[\s\S]*?\/>/.test(codigo || ''),
    },
  ]
};