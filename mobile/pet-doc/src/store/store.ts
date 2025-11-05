import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import petReducer from './slices/petSlice';
import appointmentReducer from './slices/appointmentSlice';
import cartReducer from './slices/cartSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    pet: petReducer,
    appointment: appointmentReducer,
    cart: cartReducer,
    notification: notificationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks with types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
