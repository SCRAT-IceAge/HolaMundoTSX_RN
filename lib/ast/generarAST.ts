import * as ts from 'typescript';
import { NodoAST } from '../../types/verificacion';

export function serializarNodo(nodo: ts.Node): NodoAST {
  const resultado: NodoAST = { kind: ts.SyntaxKind[nodo.kind] };

  if (
    ts.isIdentifier(nodo) ||
    ts.isStringLiteral(nodo) ||
    ts.isNumericLiteral(nodo) ||
    ts.isJsxText(nodo)
  ) {
    resultado.text = (nodo as ts.Identifier).text;
  }

  if (ts.isPropertyAccessExpression(nodo)) {
    resultado.expression = ts.SyntaxKind[nodo.expression.kind];
    resultado.name = nodo.name.text;
  }

  const hijos: NodoAST[] = [];
  nodo.forEachChild((hijo) => {
    hijos.push(serializarNodo(hijo));
  });

  if (hijos.length > 0) {
    resultado.children = hijos;
  }

  return resultado;
}

export function generarAST(codigo: string): NodoAST {
  const sourceFile = ts.createSourceFile(
    'ejercicio.tsx',
    codigo,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  return serializarNodo(sourceFile);
}