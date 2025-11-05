import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthStackParamList} from './types';
import {STORAGE_KEYS} from '@constants/index';

// Import auth screens (we'll create these next)
import SplashScreen from '@screens/auth/SplashScreen';
import OnboardingScreen from '@screens/onboarding/OnboardingScreen';
import LoginScreen from '@screens/auth/LoginScreen';
import SignupScreen from '@screens/auth/SignupScreen';
import ForgotPasswordScreen from '@screens/auth/ForgotPasswordScreen';
import OTPVerificationScreen from '@screens/auth/OTPVerificationScreen';
import ResetPasswordScreen from '@screens/auth/ResetPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const completed = await AsyncStorage.getItem(
        STORAGE_KEYS.ONBOARDING_COMPLETED
      );
      setShowOnboarding(!completed);
    } catch (error) {
      console.error('Onboarding check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={showOnboarding ? 'Splash' : 'Login'}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
