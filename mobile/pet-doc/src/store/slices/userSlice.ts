import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '@types/index';

interface UserState {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        state.profile = {...state.profile, ...action.payload};
      }
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserProfile,
} = userSlice.actions;

export default userSlice.reducer;
