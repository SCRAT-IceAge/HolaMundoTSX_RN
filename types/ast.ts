export type NodoAST = {
  kind: string;
  text?: string;
  name?: string;
  expression?: string;
  children?: NodoAST[];
};