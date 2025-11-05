import {NavigatorScreenParams} from '@react-navigation/native';
import {Pet, Vendor, Appointment, Product, Post, Event} from '@types/index';

// Root Stack
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Consultation: {appointmentId: string};
  Notifications: undefined;
};

// Auth Stack
export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  OTPVerification: {email: string; type: 'registration' | 'password-reset'};
  ResetPassword: {token: string};
};

// Main Bottom Tabs
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ServicesTab: NavigatorScreenParams<ServicesStackParamList>;
  CommunityTab: NavigatorScreenParams<CommunityStackParamList>;
  MarketplaceTab: NavigatorScreenParams<MarketplaceStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

// Home Stack
export type HomeStackParamList = {
  Home: undefined;
  PetSetup: undefined;
  Emergency: undefined;
};

// Services Stack
export type ServicesStackParamList = {
  ServicesList: undefined;
  ServiceProviders: {categoryId: string; categoryName: string};
  ProviderDetail: {vendorId: string};
  BookingFlow: {vendorId: string; serviceId: string};
  BookingConfirmation: {appointmentId: string};
  Appointments: undefined;
  AppointmentDetail: {appointmentId: string};
};

// Community Stack
export type CommunityStackParamList = {
  CommunityFeed: undefined;
  CreatePost: undefined;
  PostDetail: {postId: string};
  Events: undefined;
  EventDetail: {eventId: string};
};

// Marketplace Stack
export type MarketplaceStackParamList = {
  ShopHome: undefined;
  ProductCategory: {categoryId: string; categoryName: string};
  ProductDetail: {productId: string};
  Cart: undefined;
  Checkout: undefined;
  Orders: undefined;
  OrderDetail: {orderId: string};
  TrackOrder: {orderId: string};
};

// Profile Stack
export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  MyPets: undefined;
  AddPet: undefined;
  EditPet: {petId: string};
  PetDetail: {petId: string};
  PetMedicalRecords: {petId: string};
  AddMedicalRecord: {petId: string};
  MyAppointments: undefined;
  MyOrders: undefined;
  SavedAddresses: undefined;
  AddAddress: undefined;
  EditAddress: {addressId: string};
  PaymentMethods: undefined;
  Settings: undefined;
  HelpSupport: undefined;
  About: undefined;
};
