import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../types';

// Import screens
import ProfileHomeScreen from '@screens/profile/ProfileHomeScreen';
import EditProfileScreen from '@screens/profile/EditProfileScreen';
import MyPetsScreen from '@screens/pets/MyPetsScreen';
import AddPetScreen from '@screens/pets/AddPetScreen';
import EditPetScreen from '@screens/pets/EditPetScreen';
import PetDetailScreen from '@screens/pets/PetDetailScreen';
import PetMedicalRecordsScreen from '@screens/pets/PetMedicalRecordsScreen';
import AddMedicalRecordScreen from '@screens/pets/AddMedicalRecordScreen';
import EditMedicalRecordScreen from '@screens/pets/EditMedicalRecordScreen';
import MyAppointmentsScreen from '@screens/appointments/MyAppointmentsScreen';
import MyOrdersScreen from '@screens/marketplace/MyOrdersScreen';
import SavedAddressesScreen from '@screens/profile/SavedAddressesScreen';
import AddAddressScreen from '@screens/profile/AddAddressScreen';
import EditAddressScreen from '@screens/profile/EditAddressScreen';
import PaymentMethodsScreen from '@screens/profile/PaymentMethodsScreen';
import SettingsScreen from '@screens/profile/SettingsScreen';
import HelpSupportScreen from '@screens/profile/HelpSupportScreen';
import AboutScreen from '@screens/profile/AboutScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHome"
        component={ProfileHomeScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />
      <Stack.Screen
        name="MyPets"
        component={MyPetsScreen}
        options={{title: 'My Pets'}}
      />
      <Stack.Screen
        name="AddPet"
        component={AddPetScreen}
        options={{title: 'Add Pet'}}
      />
      <Stack.Screen
        name="EditPet"
        component={EditPetScreen}
        options={{title: 'Edit Pet'}}
      />
      <Stack.Screen
        name="PetDetail"
        component={PetDetailScreen}
        options={{title: 'Pet Details'}}
      />
      <Stack.Screen
        name="PetMedicalRecords"
        component={PetMedicalRecordsScreen}
        options={{title: 'Medical Records'}}
      />
      <Stack.Screen
        name="AddMedicalRecord"
        component={AddMedicalRecordScreen}
        options={{title: 'Add Medical Record'}}
      />
      <Stack.Screen
        name="EditMedicalRecord"
        component={EditMedicalRecordScreen}
        options={{title: 'Edit Medical Record'}}
      />
      <Stack.Screen
        name="MyAppointments"
        component={MyAppointmentsScreen}
        options={{title: 'My Appointments'}}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{title: 'My Orders'}}
      />
      <Stack.Screen
        name="SavedAddresses"
        component={SavedAddressesScreen}
        options={{title: 'Saved Addresses'}}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddressScreen}
        options={{title: 'Add Address'}}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddressScreen}
        options={{title: 'Edit Address'}}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{title: 'Payment Methods'}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{title: 'Help & Support'}}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{title: 'About'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
