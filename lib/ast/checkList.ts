import { ItemCheckList, ItemCheckListResultado } from '../../types/ast';

export function verificarCheckList(
  codigo: string,
  checkList: readonly ItemCheckList[]
): ItemCheckListResultado[] {
  const resultados: ItemCheckListResultado[] = [];

  for (const item of checkList) {
    const dependenciaCumplida = item.dependeDe
      ? resultados.find((r) => r.id === item.dependeDe)?.correcto ?? false
      : true;

    const existencia = item.existe(codigo);
    const pertenencia = item.dentroDe ? item.dentroDe(codigo) : true;

    const correcto = dependenciaCumplida && existencia && pertenencia;

    resultados.push({
      id: item.id,
      descripcion: item.descripcion,
      correcto,
      dependeDe: item.dependeDe,
    });
  }

  return resultados;
}