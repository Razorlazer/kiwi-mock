import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLocations } from '../../api';
import { createLocationSelectionList } from '../../utilities/helperFunctions';

export const locationsInitialState = {
    departureLocationsList: [],
    destinationLocationsList: [],
    searchParams: { location_types: 'airport' },
    destinationLocation: null,
    departureLocation: null,
    departureStatus: 'idle',
    destinationStatus: 'idle',
};

export const fetchDepartureLocationsList = createAsyncThunk(
    'flights/departure/list',
    async (params) => {
        const response = await fetchLocations(params);
        return response.data;
    }
);

export const fetchDestinationLocationsList = createAsyncThunk(
    'flights/destination/list',
    async (params) => {
        const response = await fetchLocations(params);
        return response.data;
    }
);


export const locationsSlice = createSlice({
    name: 'flights',
    initialState: locationsInitialState,
    reducers: {
        changeLocationSearchParams: (state, action) => {
            state.searchParams = { ...state.searchParams, ...action.payload };
            state.status = 'loading';
        },
        changeDepartureLocation: (state, action) => {
            state.departureLocation = action.payload;
            state.status = 'loading';
        },
        changeDestinationaLocation: (state, action) => {
            state.destinationLocation = action.payload;
            state.status = 'loading';
        },
        resetLocationsStore: () => locationsInitialState
    },
    extraReducers: (builder) => {
        builder
            //Departure location actions
            .addCase(fetchDepartureLocationsList.pending, (state) => {
                state.departureStatus = 'loading';
            })
            .addCase(fetchDepartureLocationsList.rejected, (state) => {
                state.departureStatus = 'rejected';
            })
            .addCase(fetchDepartureLocationsList.fulfilled, (state, action) => {
                const list = createLocationSelectionList(action.payload, state);
                state.departureStatus = 'fullfilled';
                state.departureLocationsList = list;
            })

            //Destination location actions
            .addCase(fetchDestinationLocationsList.pending, (state) => {
                state.destinationStatus = 'loading';
            })
            .addCase(fetchDestinationLocationsList.rejected, (state) => {
                state.destinationStatus = 'rejected';
            })
            .addCase(fetchDestinationLocationsList.fulfilled, (state, action) => {
                const list = createLocationSelectionList(action.payload, state);
                state.destinationStatus = 'fullfilled';
                state.destinationLocationsList = list;
            });
    },
});

export const { 
    changeLocationSearchParams, 
    changeDepartureLocation, 
    changeDestinationaLocation,
    resetLocationsStore
} = locationsSlice.actions;

export const selectLocations = (state) => state.locations;
export default locationsSlice.reducer;
