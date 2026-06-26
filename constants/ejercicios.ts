import { NodoAST, ItemCheckList } from '../types/ast';

export const ejercicios: Record<string, {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  astReferencia: object;
  checkList: readonly ItemCheckList[];
}> = {
  "1_1": {
    nombre: "Hola Mundo",
    leccion: "1",
    codigoResuelto: "console.log('Hola Mundo');",
    astReferencia: {
      kind: "SourceFile",
      children: [
        {
          kind: "ExpressionStatement",
          children: [
            {
              kind: "CallExpression",
              children: [
                {
                  kind: "PropertyAccessExpression",
                  expression: "Identifier",
                  name: "log",
                  children: [
                    { kind: "Identifier", text: "console" },
                    { kind: "Identifier", text: "log" }
                  ]
                },
                {
                  kind: "StringLiteral",
                  text: "Hola Mundo"
                }
              ]
            }
          ]
        },
        {
          kind: "EndOfFileToken"
        }
      ]
    },
    checkList: [
      { id: "1", descripcion: 'Escribiste "Hola Mundo"', kind: "StringLiteral", text: "Hola Mundo" },
      { id: "2", descripcion: 'Escribiste console.log("Hola Mundo")', kind: "CallExpression", callName: "log", argKind: "StringLiteral", text: "Hola Mundo" },
    ]
  }
};

export type EjercicioId = keyof typeof ejercicios;