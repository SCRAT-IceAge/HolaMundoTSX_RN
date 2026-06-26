export type NodoAST = {
  kind: string;
  text?: string;
  name?: string;
  expression?: string;
  children?: NodoAST[];
};

export type ItemCheckList = {
  id: string;
  descripcion: string;
  kind: string;
  text?: string;
  name?: string;
  dependeDe?: string;
  callName?: string;
  argKind?: string;
};

export type ItemCheckListResultado = ItemCheckList & {
  correcto: boolean;
};