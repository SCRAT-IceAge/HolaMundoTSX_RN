import db from './cliente';
import { Intento } from '../../types/intento';

export function guardarIntento(
  id_usuario: number,
  id_ejercicio: string,
  tiempo: number
): boolean {
  try {
    const fecha = new Date().toISOString();
    const rec1 = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString();
    const rec3 = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const rec7 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    db.runSync(
      'INSERT INTO intento (id_usuario, id_ejercicio, tiempo, fecha, recordatorio_1, recordatorio_3, recordatorio_7) VALUES (?, ?, ?, ?, ?, ?, ?);',
      [id_usuario, id_ejercicio, tiempo, fecha, rec1, rec3, rec7]
    );
    return true;
  } catch (e) {
    return false;
  }
}

export function obtenerIntentosPorUsuario(id_usuario: number): Intento[] {
  try {
    return db.getAllSync<Intento>(
      'SELECT * FROM intento WHERE id_usuario = ? ORDER BY fecha DESC;',
      [id_usuario]
    );
  } catch (e) {
    return [];
  }
}