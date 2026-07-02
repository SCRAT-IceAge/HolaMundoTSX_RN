let usuarioId: number | null = null;
let usuarioTipo: 'alumno' | 'admin' | null = null;
let modoOscuro: boolean = false;
let ejercicioActual: string = '1_1';
let tabActual: string = 'inspector';

export function iniciarSesion(id: number, tipo: 'alumno' | 'admin') {
  usuarioId = id;
  usuarioTipo = tipo;
}

export function cerrarSesion() {
  usuarioId = null;
  usuarioTipo = null;
}

export function obtenerUsuarioId(): number | null {
  return usuarioId;
}

export function hayUsuarioLogueado(): boolean {
  return usuarioId !== null;
}

export function esAdmin(): boolean {
  return usuarioTipo === 'admin';
}

export function getModoOscuro(): boolean {
  return modoOscuro;
}

export function setModoOscuro(valor: boolean) {
  modoOscuro = valor;
}

export function getEjercicioActual(): string {
  return ejercicioActual;
}

export function setEjercicioActual(id: string) {
  ejercicioActual = id;
}

export function getTabActual(): string {
  return tabActual;
}

export function setTabActual(tab: string) {
  tabActual = tab;
}