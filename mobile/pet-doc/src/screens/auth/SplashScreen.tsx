import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/types';
import {colors} from '@theme/colors';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    // Navigate to onboarding after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🐾</Text>
      <Text style={styles.title}>Pet Doc</Text>
      <Text style={styles.tagline}>Your Trusted Pet Care Companion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginBottom: 8,
  },
  tagline: {
    fontSize: typography.fontSize.md,
    color: colors.white,
    opacity: 0.9,
  },
});

export default SplashScreen;
