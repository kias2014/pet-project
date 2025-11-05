import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Appointment} from '@types/index';

interface AppointmentState {
  appointments: Appointment[];
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  upcomingAppointments: [],
  pastAppointments: [],
  isLoading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    fetchAppointmentsStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchAppointmentsSuccess: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
      const now = new Date();
      state.upcomingAppointments = action.payload.filter(
        apt => new Date(apt.date) >= now && apt.status !== 'cancelled'
      );
      state.pastAppointments = action.payload.filter(
        apt => new Date(apt.date) < now || apt.status === 'cancelled'
      );
      state.isLoading = false;
    },
    fetchAppointmentsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.appointments.findIndex(
        apt => apt.id === action.payload.id
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
  },
});

export const {
  fetchAppointmentsStart,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  addAppointment,
  updateAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
