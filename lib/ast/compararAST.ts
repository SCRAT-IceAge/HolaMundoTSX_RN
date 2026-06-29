import { ItemCheckList, ItemCheckListResultado } from '../../types/verificacion';

export function verificarCheckList(
  codigo: string,
  checkList: readonly ItemCheckList[]
): ItemCheckListResultado[] {
  const resultados: ItemCheckListResultado[] = [];

  for (const item of checkList) {
    const dependenciaCumplida = item.dependeDe
      ? resultados.find((r) => r.id === item.dependeDe)?.correcto ?? false
      : true;

    const correcto = dependenciaCumplida && item.verificar(codigo);

    resultados.push({
      id: item.id,
      descripcion: item.descripcion,
      correcto,
      dependeDe: item.dependeDe,
    });
  }

  return resultados;
}