import { ItemCheckList, ItemCheckListResultado } from '../types/verificacion';

export function verificarCheckList(
  codigo: string,
  checkList: readonly ItemCheckList[]
): ItemCheckListResultado[] {
  const resultados: ItemCheckListResultado[] = [];

  for (const item of checkList) {
    const idsDependencia = item.dependeDe
      ? (Array.isArray(item.dependeDe) ? item.dependeDe : [item.dependeDe])
      : [];

    const dependenciaCumplida = idsDependencia.every(
      (idDep) => resultados.find((r) => r.id === idDep)?.correcto ?? false
    );

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