let usuarioId: number | null = null;

export function iniciarSesion(id: number) {
  usuarioId = id;
}

export function cerrarSesion() {
  usuarioId = null;
}

export function obtenerUsuarioId(): number | null {
  return usuarioId;
}

export function hayUsuarioLogueado(): boolean {
  return usuarioId !== null;
}