import { ItemCheckList } from '../../types/verificacion';
export const ejercicio_7_7: {
  nombre: string;
  leccion: string;
  codigoResuelto: string;
  checkList: readonly ItemCheckList[];
} = {
  nombre: "FormulariosCopiaUsuarioPeroActualizaAceptaTerminosPreparacion",
  leccion: "7",
  codigoResuelto: `import React, { useState } from "react";
import { View, TextInput } from "react-native";

type UserForm = {
  usuario: string;
  aceptaTerminos: boolean;
}`,
  checkList: [
    {
      id: "1",
      descripcion: "Importa useState desde react",
      existe: (codigo) => /import\s+React\s*,\s*\{\s*useState\s*\}\s*from\s*["']react["']/.test(codigo || ''),
    },
    {
      id: "2",
      descripcion: "Importa View y TextInput desde react-native",
      existe: (codigo) => /import\s*\{\s*View\s*,\s*TextInput\s*\}\s*from\s*["']react-native["']/.test(codigo || ''),
    },
    {
      id: "3",
      descripcion: "Declara el tipo UserForm con usuario: string y aceptaTerminos: boolean",
      existe: (codigo) => /type\s+UserForm\s*=\s*\{\s*usuario\s*:\s*string\s*;?\s*aceptaTerminos\s*:\s*boolean\s*;?\s*\}/.test(codigo || ''),
    },
  ]
};