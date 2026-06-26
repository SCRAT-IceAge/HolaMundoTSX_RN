import { NodoAST } from '../../types/ast';

export function compararNodos(nodoUsuario: NodoAST, nodoReferencia: NodoAST): boolean {
  if (!nodoUsuario || !nodoReferencia) return false;
  if (nodoUsuario.kind !== nodoReferencia.kind) return false;
  if (nodoReferencia.text && nodoUsuario.text !== nodoReferencia.text) return false;
  if (nodoReferencia.name && nodoUsuario.name !== nodoReferencia.name) return false;

  if (nodoReferencia.children) {
    for (let i = 0; i < nodoReferencia.children.length; i++) {
      const hijoUsuario = nodoUsuario.children?.[i];
      const hijoReferencia = nodoReferencia.children[i];
      if (!hijoUsuario || !compararNodos(hijoUsuario, hijoReferencia)) {
        return false;
      }
    }
  }

  return true;
}

export function verificarCheckList(
  astUsuario: NodoAST,
  astReferencia: NodoAST,
  checkList: readonly { id: string; descripcion: string }[]
): { id: string; descripcion: string; correcto: boolean }[] {
  const astCorrecto = compararNodos(astUsuario, astReferencia);

  return checkList.map((item) => ({
    ...item,
    correcto: astCorrecto,
  }));
}