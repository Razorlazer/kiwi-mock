import configureStore from 'redux-mock-store';
import { flightsInitialState } from '../store/slices/flightsSlice';
import { locationsInitialState } from '../store/slices/locationsSlice';

export const mockStore = () =>{ 
    return configureStore([])({
        locations: locationsInitialState,
        flights: flightsInitialState
    });
}

