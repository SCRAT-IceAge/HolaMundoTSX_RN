import db from './cliente';
import { Usuario } from '../../types/usuario';

export function crearUsuario(nombre: string, email: string, contrasena: string): boolean {
  try {
    const existente = db.getFirstSync(
      'SELECT id FROM usuario WHERE email = ?',
      [email]
    );
    if (existente) {
      return false;
    }
    db.runSync(
      'INSERT INTO usuario (nombre, email, contrasena) VALUES (?, ?, ?)',
      [nombre, email, contrasena]
    );
    return true;
  } catch (e) {
    return false;
  }
}

export function loginUsuario(email: string, contrasena: string): Usuario | null {
  try {
    const usuario = db.getFirstSync<Usuario>(
      'SELECT * FROM usuario WHERE email = ? AND contrasena = ?',
      [email, contrasena]
    );
    return usuario ?? null;
  } catch (e) {
    return null;
  }
}