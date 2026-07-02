import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';

export default function Presentacion() {
  const opacidad = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(opacidad, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(opacidad, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
    ]).start(() => {
      router.replace('/menu');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logo, { opacity: opacidad }]}>
        <Text style={styles.logoTexto}>{"</>"}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTexto: {
    fontSize: 72,
    color: '#fff',
    fontWeight: 'bold',
  },
});
