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
import { ejercicio_4_3 } from './4_3NavegacionStackNavigatorProps+HomeScreenComponent';
import { ejercicio_4_4 } from './4_4NavegacionStackNavigatorReturnDeHomeScreen';
import { ejercicio_4_5 } from './4_5NavegacionStackNavigatorDefinirPropsDetail';



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
};
export type EjercicioId = keyof typeof ejercicios;