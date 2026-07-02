import { Alert } from 'react-native';
import { procesarComplecionEjercicio as procesarRecordatorios } from '../db/recordatorios';

/**
 * Función principal - ejecutar cuando se completa un ejercicio
 */
export async function procesarComplecionEjercicio(
  id_usuario: number
): Promise<void> {
  try {
    console.log('📝 Iniciando procesamiento de recordatorios...');

    // Procesar en BD local
    const exito = procesarRecordatorios(id_usuario);

    if (exito) {
      Alert.alert(
        '✅ Excelente',
        'Hemos guardado recordatorios para que sigas practicando.',
        [{ text: 'OK' }]
      );
    } else {
      console.warn('⚠️ No se pudieron crear los recordatorios');
    }
  } catch (error) {
    console.error('❌ Error procesando completación:', error);
    // No romper la app si falla
  }
}

export default {
  procesarComplecionEjercicio,
};
