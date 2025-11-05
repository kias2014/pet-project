import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RootStackParamList} from './types';
import {useAppSelector, useAppDispatch} from '@store/store';
import {loginSuccess} from '@store/slices/authSlice';
import {STORAGE_KEYS} from '@constants/index';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Import modal screens
import ConsultationScreen from '@screens/consultation/ConsultationScreen';
import NotificationsScreen from '@screens/notifications/NotificationsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {isAuthenticated} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const refreshToken = await AsyncStorage.getItem(
        STORAGE_KEYS.REFRESH_TOKEN
      );
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);

      if (token && refreshToken && userData) {
        const user = JSON.parse(userData);
        dispatch(loginSuccess({user, token, refreshToken}));
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen
              name="Consultation"
              component={ConsultationScreen}
              options={{
                presentation: 'fullScreenModal',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Notifications',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
