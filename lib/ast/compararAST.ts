import { NodoAST, ItemCheckList, ItemCheckListResultado } from '../../types/ast';

function buscarNodo(
  nodo: NodoAST,
  kind: string,
  text?: string,
  name?: string,
  codigo?: string
): boolean {
  if (nodo.kind === kind) {
    if (text && nodo.text !== text) return false;
    if (name && nodo.name !== name) return false;
    if (text && codigo) {
      const conComillasSimples = `'${text}'`;
      const conComillasDobles = `"${text}"`;
      if (!codigo.includes(conComillasSimples) && !codigo.includes(conComillasDobles)) return false;
    }
    return true;
  }
  if (nodo.children) {
    return nodo.children.some((hijo) => buscarNodo(hijo, kind, text, name, codigo));
  }
  return false;
}

function buscarCallExpressionCompleto(
  nodo: NodoAST,
  name: string,
  argKind: string,
  argText?: string,
  codigo?: string
): boolean {
  if (nodo.kind === 'CallExpression' && nodo.children) {
    const tieneAcceso = nodo.children.some((h) =>
      h.kind === 'PropertyAccessExpression' && h.name === name
    );
    const tieneArgumento = nodo.children.some((h) =>
      h.kind === argKind && (!argText || h.text === argText)
    );
    const parentesisCerrado = codigo
      ? codigo.trimEnd().endsWith(')') || codigo.trimEnd().endsWith(');')
      : true;
    const stringCerrado = argText && codigo
      ? codigo.includes(`'${argText}'`) || codigo.includes(`"${argText}"`)
      : true;
    if (tieneAcceso && tieneArgumento && parentesisCerrado && stringCerrado) return true;
  }
  if (nodo.children) {
    return nodo.children.some((hijo) =>
      buscarCallExpressionCompleto(hijo, name, argKind, argText, codigo)
    );
  }
  return false;
}

export function verificarCheckList(
  astUsuario: NodoAST,
  checkList: readonly ItemCheckList[],
  codigo: string
): ItemCheckListResultado[] {
  const resultados: ItemCheckListResultado[] = [];

  for (const item of checkList) {
    let nodoCorrecto: boolean;

    if (item.callName && item.argKind) {
      nodoCorrecto = buscarCallExpressionCompleto(astUsuario, item.callName, item.argKind, item.text, codigo);
    } else {
      nodoCorrecto = buscarNodo(astUsuario, item.kind, item.text, item.name, codigo);
    }

    const dependenciaCumplida = item.dependeDe
      ? resultados.find((r) => r.id === item.dependeDe)?.correcto ?? false
      : true;

    resultados.push({
      ...item,
      correcto: nodoCorrecto && dependenciaCumplida,
    });
  }

  return resultados;
}