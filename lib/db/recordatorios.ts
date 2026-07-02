import db from './cliente';

export interface Recordatorio {
  id: number;
  id_usuario: number;
  titulo: string;
  descripcion: string;
  fecha_recordatorio: string;
  visto: number;
  fecha_creacion: string;
}

/**
 * Verifica si hay recordatorios no vistos en los próximos 7 días
 */
export function verificarRecordatoriosProximos7Dias(
  id_usuario: number
): boolean {
  try {
    const ahora = new Date();
    const en7Dias = new Date(ahora.getTime() + 7 * 24 * 60 * 60 * 1000);

    console.log('\n📝 ====== VERIFICAR RECORDATORIOS ======');
    console.log(`📝 Usuario ID: ${id_usuario}`);
    console.log(`📝 Fecha actual: ${ahora.toISOString()}`);
    console.log(`📝 Fecha en 7 días: ${en7Dias.toISOString()}`);

    const recordatorios = db.getAllSync<Recordatorio>(
      `SELECT * FROM recordatorio 
       WHERE id_usuario = ? 
       AND visto = 0 
       AND fecha_recordatorio >= ? 
       AND fecha_recordatorio <= ?
       ORDER BY fecha_recordatorio ASC;`,
      [
        id_usuario,
        ahora.toISOString(),
        en7Dias.toISOString(),
      ]
    );

    console.log(`📝 Recordatorios encontrados: ${recordatorios.length}`);
    recordatorios.forEach((rec, idx) => {
      console.log(`\n${idx + 1}. ${rec.titulo}`);
      console.log(`   Fecha: ${rec.fecha_recordatorio}`);
    });
    console.log('📝 ====== FIN ======\n');

    return recordatorios.length > 0;
  } catch (error) {
    console.error('Error verificando recordatorios:', error);
    return false;
  }
}

/**
 * Crea 3 recordatorios si no existen
 */
export function crearRecordatorios(id_usuario: number): boolean {
  try {
    const ahora = new Date();
    const fechaCreacion = ahora.toISOString();

    console.log('📝 ====== CREAR RECORDATORIOS ======');
    console.log(`📝 Usuario ID: ${id_usuario}`);
    console.log(`📝 Fecha actual: ${fechaCreacion}`);

    const recordatorios = [
      {
        dias: 1,
        titulo: '📚 Recuerda: Continúa practicando',
        descripcion: 'Completaste una lección. ¡Sigue aprendiendo!',
      },
      {
        dias: 3,
        titulo: '📚 Recordatorio de práctica',
        descripcion: 'Vuelve a practicar lo que aprendiste',
      },
      {
        dias: 7,
        titulo: '📚 Revisión semanal',
        descripcion: 'Revisa las lecciones de esta semana',
      },
    ];

    for (const rec of recordatorios) {
      const fechaRecordatorio = new Date(
        ahora.getTime() + rec.dias * 24 * 60 * 60 * 1000
      );
      fechaRecordatorio.setHours(10, 0, 0, 0);

      try {
        db.runSync(
          `INSERT INTO recordatorio 
           (id_usuario, titulo, descripcion, fecha_recordatorio, visto, fecha_creacion)
           VALUES (?, ?, ?, ?, 0, ?);`,
          [
            id_usuario,
            rec.titulo,
            rec.descripcion,
            fechaRecordatorio.toISOString(),
            fechaCreacion,
          ]
        );
        console.log(`✅ Recordatorio creado:`);
        console.log(`   📅 Días: ${rec.dias}`);
        console.log(`   📝 Título: ${rec.titulo}`);
        console.log(`   🕐 Fecha: ${fechaRecordatorio.toISOString()}`);
      } catch (error) {
        console.warn(`Error creando recordatorio:`, error);
      }
    }
    
    // Mostrar todos los recordatorios guardados
    console.log('\n📝 ====== RECORDATORIOS GUARDADOS ======');
    const todosLosRecordatorios = db.getAllSync<Recordatorio>(
      'SELECT * FROM recordatorio WHERE id_usuario = ?;',
      [id_usuario]
    );
    console.log(`Total: ${todosLosRecordatorios.length} recordatorios`);
    todosLosRecordatorios.forEach((rec, idx) => {
      console.log(`\n${idx + 1}. ${rec.titulo}`);
      console.log(`   Descripción: ${rec.descripcion}`);
      console.log(`   Fecha: ${rec.fecha_recordatorio}`);
      console.log(`   Visto: ${rec.visto === 1 ? 'Sí' : 'No'}`);
    });
    console.log('📝 ====== FIN ======\n');
    
    return true;
  } catch (error) {
    console.error('Error en crearRecordatorios:', error);
    return false;
  }
}

/**
 * Obtiene todos los recordatorios no vistos de un usuario
 */
export function obtenerRecordatoriosNoVistos(
  id_usuario: number
): Recordatorio[] {
  try {
    return db.getAllSync<Recordatorio>(
      `SELECT * FROM recordatorio 
       WHERE id_usuario = ? AND visto = 0
       ORDER BY fecha_recordatorio ASC;`,
      [id_usuario]
    );
  } catch (error) {
    console.error('Error obteniendo recordatorios:', error);
    return [];
  }
}

/**
 * Marca un recordatorio como visto
 */
export function marcarRecordatorioVisto(id_recordatorio: number): boolean {
  try {
    db.runSync(
      'UPDATE recordatorio SET visto = 1 WHERE id = ?;',
      [id_recordatorio]
    );
    return true;
  } catch (error) {
    console.error('Error marcando recordatorio como visto:', error);
    return false;
  }
}

/**
 * Función principal - ejecutar cuando se completa un ejercicio
 */
export function procesarComplecionEjercicio(id_usuario: number): boolean {
  try {
    console.log('📝 Procesando completación del ejercicio...');

    // Verificar si hay recordatorios en los próximos 7 días
    const hayRecordatorios = verificarRecordatoriosProximos7Dias(id_usuario);

    if (!hayRecordatorios) {
      console.log('📝 No hay recordatorios, creando...');
      return crearRecordatorios(id_usuario);
    } else {
      console.log('📝 Ya hay recordatorios programados');
      return true;
    }
  } catch (error) {
    console.error('Error procesando completación:', error);
    return false;
  }
}
