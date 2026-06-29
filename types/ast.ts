export type ItemCheckList = {
  id: string;
  descripcion: string;
  existe: (codigo: string) => boolean;
  dependeDe?: string;
  dentroDe?: (codigo: string) => boolean;
};

export type ItemCheckListResultado = {
  id: string;
  descripcion: string;
  correcto: boolean;
  dependeDe?: string;
};