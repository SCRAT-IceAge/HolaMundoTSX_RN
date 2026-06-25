import db from './cliente';
import { Usuario } from '../../types/usuario';

export function crearUsuario(nombre: string, email: string, contrasena: string): boolean {
  try {
    db.runSync(
      'INSERT INTO usuario (nombre, email, contrasena) VALUES (?, ?, ?);',
      [nombre, email, contrasena]
    );
    return true;
  } catch (e) {
    return false;
  }
}

export function obtenerUsuarioPorEmail(email: string): Usuario | null {
  try {
    const resultado = db.getFirstSync<Usuario>(
      'SELECT * FROM usuario WHERE email = ?;',
      [email]
    );
    return resultado ?? null;
  } catch (e) {
    return null;
  }
}