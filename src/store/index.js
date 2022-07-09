import { configureStore } from '@reduxjs/toolkit';
import locationsSlice from './slices/locationsSlice';
import flightsSlice from './slices/flightsSlice';

const store = configureStore({
  reducer: {
    flights: flightsSlice,
    locations: locationsSlice
  },
});

export default store; 