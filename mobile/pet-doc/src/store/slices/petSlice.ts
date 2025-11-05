import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Pet} from '@types/index';

interface PetState {
  pets: Pet[];
  selectedPet: Pet | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PetState = {
  pets: [],
  selectedPet: null,
  isLoading: false,
  error: null,
};

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    fetchPetsStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPetsSuccess: (state, action: PayloadAction<Pet[]>) => {
      state.pets = action.payload;
      state.isLoading = false;
    },
    fetchPetsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPet: (state, action: PayloadAction<Pet>) => {
      state.pets.push(action.payload);
    },
    updatePet: (state, action: PayloadAction<Pet>) => {
      const index = state.pets.findIndex(pet => pet.id === action.payload.id);
      if (index !== -1) {
        state.pets[index] = action.payload;
      }
    },
    deletePet: (state, action: PayloadAction<string>) => {
      state.pets = state.pets.filter(pet => pet.id !== action.payload);
    },
    selectPet: (state, action: PayloadAction<Pet>) => {
      state.selectedPet = action.payload;
    },
  },
});

export const {
  fetchPetsStart,
  fetchPetsSuccess,
  fetchPetsFailure,
  addPet,
  updatePet,
  deletePet,
  selectPet,
} = petSlice.actions;

export default petSlice.reducer;
