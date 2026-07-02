export type TipoUsuario = 'alumno' | 'admin';

export type Usuario = {
  id: number;
  nombre: string;
  email: string;
  contrasena: string;
  tipo: TipoUsuario;
};