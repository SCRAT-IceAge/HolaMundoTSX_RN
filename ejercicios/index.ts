import { ejercicio_1_1 } from './1_1HolaMundo';
import { ejercicio_1_2 } from './1_2HolaMundoCentrado';
import { ejercicio_2_1 } from './2_1ComponenteBienvenida';
import { ejercicio_2_2 } from './2_2ImportarComponente';
import { ejercicio_2_3 } from './2_3PropParaComponente';
import { ejercicio_2_4 } from './2_4PropsConImage';
import { ejercicio_2_5 } from './2_5Estilos';
import { ejercicio_3_1 } from './3_1PropsEnteras';
import { ejercicio_3_2 } from './3_2States';
import { ejercicio_3_3_1 } from './3_3_1FlatListTarjetaProductoType';
import { ejercicio_3_3_2 } from './3_3_2FlatListTarjetaComponent';
import { ejercicio_3_3_3 } from './3_3_3FlatListCatalogo';
import { ejercicio_4_1 } from './4_1NavegacionStackNavigatorTypes';
import { ejercicio_4_2 } from './4_2NavegacionStackNavigatorDefinirHome';
import { ejercicio_4_3 } from './4_3NavegacionStackNavigatorPropsHomeScreenComponent';
import { ejercicio_4_4 } from './4_4NavegacionStackNavigatorReturnDeHomeScreen';
import { ejercicio_4_5 } from './4_5NavegacionStackNavigatorDefinirPropsDetail';
import { ejercicio_4_6 } from './4_6NavegacionStackNavigatorDefinirDetailScreen';
import { ejercicio_4_7 } from './4_7NavegacionStackNavigatorConfigurarStackNavegacion';
import { ejercicio_4_8 } from './4_8NavegacionStackNavigatorComponenteNavigationContainer';
import { ejercicio_4_9 } from './4_9NavegacionStackNavigatorParametrosEntrePantallasPreparacion';
import { ejercicio_4_10 } from './4_10NavegacionStackNavigatorComponenteHomeScreenPasarPropsSinReturn';
import { ejercicio_4_11 } from './4_11NavegacionStackNavigatorComponenteHomeScreenPasarPropsConReturn';
import { ejercicio_4_12 } from './4_12NavegacionStackNavigatorRecibirPropsYUsarlosEnDetailScreen';
import { ejercicio_4_13 } from './4_13NavegacionStackNavigatorHeaderDinamico';
import { ejercicio_7_1 } from './7_1FormulariosSinNombre';
import { ejercicio_7_2 } from './7_2FormulariosEstadoDerivado';
import { ejercicio_7_3 } from './7_3FormulariosSinNombreConReturn';
import { ejercicio_7_4 } from './7_4FormulariosEstadoDerivado';
import { ejercicio_7_5 } from './7_5FormulariosSwitchBooleanoPreparacion';
import { ejercicio_7_6 } from './7_6FormulariosSwitchBooleanoReturn';
import { ejercicio_7_7 } from './7_7FormulariosCopiaUsuarioPeroActualizaAceptaTerminosPreparacion';
import { ejercicio_7_8 } from './7_8FormulariosCopiaUsuarioPeroActualizaAceptaTerminosComponente';




export const ejercicios: Record<string, typeof ejercicio_1_1> = {
  "1_1": ejercicio_1_1,
  "1_2": ejercicio_1_2,
  "2_1": ejercicio_2_1,
  "2_2": ejercicio_2_2,
  "2_3": ejercicio_2_3,
  "2_4": ejercicio_2_4,
  "2_5": ejercicio_2_5,
  "3_1": ejercicio_3_1,
  "3_2": ejercicio_3_2,
  "3_3_1": ejercicio_3_3_1,
  "3_3_2": ejercicio_3_3_2,
  "3_3_3": ejercicio_3_3_3,
  "4_1": ejercicio_4_1,
  "4_2": ejercicio_4_2,
  "4_3": ejercicio_4_3,
  "4_4": ejercicio_4_4,
  "4_5": ejercicio_4_5,
  "4_6": ejercicio_4_6,
  "4_7": ejercicio_4_7,
  "4_8": ejercicio_4_8,
  "4_9": ejercicio_4_9,
  "4_10": ejercicio_4_10,
  "4_11": ejercicio_4_11,
  "4_12": ejercicio_4_12,
  "4_13": ejercicio_4_13,
  "7_1": ejercicio_7_1,
  "7_2": ejercicio_7_2,
  "7_3": ejercicio_7_3,
  "7_4": ejercicio_7_4,
  "7_5": ejercicio_7_5,
  "7_6": ejercicio_7_6,
  "7_7": ejercicio_7_7,
  "7_8": ejercicio_7_8,
};
export type EjercicioId = keyof typeof ejercicios;