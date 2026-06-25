export const ejercicios = {
  "1_1": {
    nombre: "Hola Mundo",
    leccion: "1",
    codigoResuelto: "",
    astReferencia: {},
    checkList: [
      // { id: "1", descripcion: "..." }
    ]
  }
} as const;

export type EjercicioId = keyof typeof ejercicios;
