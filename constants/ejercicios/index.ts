import { ejercicio_1_1 } from './1_1HolaMundo';
import { ejercicio_1_2 } from './1_2HolaMundoCentrado';

export const ejercicios: Record<string, typeof ejercicio_1_1> = {
  "1_1": ejercicio_1_1,
  "1_2": ejercicio_1_2,
};

export type EjercicioId = keyof typeof ejercicios;