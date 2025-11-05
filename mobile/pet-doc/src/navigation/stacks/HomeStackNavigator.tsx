import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../types';

// Import screens
import HomeScreen from '@screens/home/HomeScreen';
import PetSetupScreen from '@screens/pets/PetSetupScreen';
import EmergencyScreen from '@screens/emergency/EmergencyScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PetSetup"
        component={PetSetupScreen}
        options={{title: 'Add Your Pet'}}
      />
      <Stack.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{title: 'Emergency Care'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
