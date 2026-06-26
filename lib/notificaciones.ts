import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function pedirPermisos(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function programarRecordatorios(id_ejercicio: string): Promise<{
  rec1: string;
  rec3: string;
  rec7: string;
}> {
  const rec1 = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Recordatorio HolaMundo',
      body: `Repasa el ejercicio ${id_ejercicio} para reforzar lo aprendido.`,
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 1 * 24 * 60 * 60, repeats: false },
  });

  const rec3 = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Recordatorio HolaMundo',
      body: `Han pasado 3 dias. Vuelve a practicar el ejercicio ${id_ejercicio}.`,
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 3 * 24 * 60 * 60, repeats: false },
  });

  const rec7 = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Recordatorio HolaMundo',
      body: `Una semana despues. Repasa el ejercicio ${id_ejercicio} en el Inspector.`,
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 7 * 24 * 60 * 60, repeats: false },
  });

  return { rec1, rec3, rec7 };
}