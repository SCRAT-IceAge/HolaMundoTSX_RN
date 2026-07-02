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

export function hacerAdmin(email: string): boolean {
  try {
    db.runSync(
      "UPDATE usuario SET tipo = 'admin' WHERE email = ?;",
      [email]
    );
    return true;
  } catch (e) {
    console.log('Error en hacerAdmin:', e);
    return false;
  }
}