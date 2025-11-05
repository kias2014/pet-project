import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ServicesStackParamList} from '../types';

// Import screens
import ServicesListScreen from '@screens/services/ServicesListScreen';
import ServiceProvidersScreen from '@screens/services/ServiceProvidersScreen';
import ProviderDetailScreen from '@screens/services/ProviderDetailScreen';
import BookingFlowScreen from '@screens/appointments/BookingFlowScreen';
import BookingConfirmationScreen from '@screens/appointments/BookingConfirmationScreen';
import AppointmentsScreen from '@screens/appointments/AppointmentsScreen';
import AppointmentDetailScreen from '@screens/appointments/AppointmentDetailScreen';

const Stack = createNativeStackNavigator<ServicesStackParamList>();

const ServicesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ServicesList"
        component={ServicesListScreen}
        options={{title: 'Services'}}
      />
      <Stack.Screen
        name="ServiceProviders"
        component={ServiceProvidersScreen}
        options={{title: 'Providers'}}
      />
      <Stack.Screen
        name="ProviderDetail"
        component={ProviderDetailScreen}
        options={{title: 'Provider Details'}}
      />
      <Stack.Screen
        name="BookingFlow"
        component={BookingFlowScreen}
        options={{title: 'Book Appointment'}}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
        options={{title: 'Booking Confirmed'}}
      />
      <Stack.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{title: 'My Appointments'}}
      />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetailScreen}
        options={{title: 'Appointment Details'}}
      />
    </Stack.Navigator>
  );
};

export default ServicesStackNavigator;
