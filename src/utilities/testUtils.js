import configureStore from 'redux-mock-store';
import { flightsInitialState } from '../store/slices/flightsSlice';
import { locationsInitialState } from '../store/slices/locationsSlice';

export const fullSearchState = {
    locations: {
        ...locationsInitialState,
        departureLocation: 'PRG',
        destinationLocation: 'VIE',
    },
    flights: flightsInitialState
}
export const mockStore = (initialState) =>{ 
    return configureStore([])(initialState || {
        locations: locationsInitialState,
        flights: flightsInitialState
    });
}

