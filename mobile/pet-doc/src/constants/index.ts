export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api/v1'
  : 'https://api.petdoc.com/api/v1';

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_OTP: '/auth/verify-otp',

  // User
  USER_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',

  // Pets
  PETS: '/users/pets',
  PET_DETAIL: (id: string) => `/users/pets/${id}`,
  PET_MEDICAL_RECORDS: (id: string) => `/users/pets/${id}/medical-records`,

  // Vendors/Providers
  VENDORS: '/vendors',
  VENDOR_DETAIL: (id: string) => `/vendors/${id}`,
  VENDOR_SERVICES: (id: string) => `/vendors/${id}/services`,

  // Appointments
  APPOINTMENTS: '/appointments',
  APPOINTMENT_DETAIL: (id: string) => `/appointments/${id}`,
  BOOK_APPOINTMENT: '/appointments',

  // Consultations
  CONSULTATIONS: '/consultations',
  CONSULTATION_DETAIL: (id: string) => `/consultations/${id}`,

  // Community
  POSTS: '/community/posts',
  POST_DETAIL: (id: string) => `/community/posts/${id}`,
  EVENTS: '/community/events',

  // Marketplace
  PRODUCTS: '/marketplace/products',
  PRODUCT_DETAIL: (id: string) => `/marketplace/products/${id}`,
  CART: '/marketplace/cart',
  ORDERS: '/marketplace/orders',

  // Notifications
  NOTIFICATIONS: '/notifications',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@pet_doc:auth_token',
  REFRESH_TOKEN: '@pet_doc:refresh_token',
  USER_DATA: '@pet_doc:user_data',
  ONBOARDING_COMPLETED: '@pet_doc:onboarding_completed',
};

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
};

export const PET_SPECIES = [
  {label: 'Dog', value: 'dog'},
  {label: 'Cat', value: 'cat'},
  {label: 'Bird', value: 'bird'},
  {label: 'Rabbit', value: 'rabbit'},
  {label: 'Fish', value: 'fish'},
  {label: 'Other', value: 'other'},
];

export const SERVICE_CATEGORIES = [
  {id: '1', name: 'Veterinary Care', icon: 'medical-bag'},
  {id: '2', name: 'Grooming', icon: 'cut'},
  {id: '3', name: 'Training', icon: 'school'},
  {id: '4', name: 'Pet Sitting', icon: 'home'},
  {id: '5', name: 'Walking', icon: 'walk'},
  {id: '6', name: 'Emergency Care', icon: 'ambulance'},
];
