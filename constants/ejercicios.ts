export const ejercicios = {
  "1_1": {
    nombre: "Hola Mundo",
    leccion: "1",
    codigoResuelto: "console.log('Hola Mundo');",
    astReferencia: {},
    checkList: [
      { id: "1", descripcion: "Llamada a console.log" },
      { id: "2", descripcion: "Argumento: 'Hola Mundo'" },
    ]
  }
} as const;

export type EjercicioId = keyof typeof ejercicios;