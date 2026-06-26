export const expectedholamundoAst = {
  "kind": "SourceFile",
  "children": [
    {
      "kind": "ExpressionStatement",
      "children": [
        {
          "kind": "CallExpression",
          "children": [
            {
              "kind": "PropertyAccessExpression",
              "expression": "Identifier",
              "name": "log",
              "children": [
                {
                  "kind": "Identifier",
                  "text": "console"
                },
                {
                  "kind": "Identifier",
                  "text": "log"
                }
              ]
            },
            {
              "kind": "StringLiteral",
              "text": "Hola Mundo"
            }
          ]
        }
      ]
    },
    {
      "kind": "EndOfFileToken"
    }
  ]
} as const;
