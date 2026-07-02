import db from './cliente';
import { Intento } from '../../types/intento';

export function guardarIntento(
  id_usuario: number,
  id_ejercicio: string,
  tiempo: number,
  caracteres: number
): boolean {
  try {
    const fecha = new Date().toISOString();
    const rec1 = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString();
    const rec3 = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const rec7 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const cadencia = tiempo > 0 ? caracteres / tiempo : 0;

    db.runSync(
      'INSERT INTO intento (id_usuario, id_ejercicio, tiempo, caracteres, cadencia, fecha, recordatorio_1, recordatorio_3, recordatorio_7) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [id_usuario, id_ejercicio, tiempo, caracteres, cadencia, fecha, rec1, rec3, rec7]
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

export type CadenciaPorAlumno = {
  id_usuario: number;
  nombre: string;
  cadencia_promedio: number;
  cantidad_intentos: number;
};

export function obtenerCadenciaPromedioPorAlumno(): CadenciaPorAlumno[] {
  try {
    return db.getAllSync<CadenciaPorAlumno>(
      'SELECT u.id AS id_usuario, u.nombre AS nombre, ' +
      'AVG(i.cadencia) AS cadencia_promedio, ' +
      'COUNT(i.id) AS cantidad_intentos ' +
      'FROM usuario u ' +
      'JOIN intento i ON i.id_usuario = u.id ' +
      "WHERE u.tipo = 'alumno' " +
      'GROUP BY u.id ' +
      'ORDER BY cadencia_promedio DESC;'
    );
  } catch (e) {
    return [];
  }
}

export function obtenerCadenciaPromedioPorEjercicio(id_usuario: number): { id_ejercicio: string; cadencia_promedio: number }[] {
  try {
    return db.getAllSync<{ id_ejercicio: string; cadencia_promedio: number }>(
      'SELECT id_ejercicio, AVG(cadencia) AS cadencia_promedio ' +
      'FROM intento ' +
      'WHERE id_usuario = ? ' +
      'GROUP BY id_ejercicio;',
      [id_usuario]
    );
  } catch (e) {
    return [];
  }
}