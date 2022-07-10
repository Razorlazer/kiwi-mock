import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLocations } from '../../api';
import { createLocationSelectionList } from '../../utilities/helperFunctions';

const initialState = {
    departureLocationsList: [],
    destinationLocationsList: [],
    searchParams: { location_types: 'airport', term: 'Prague' },
    destinationLocation: null,
    departureLocation: null,
    departureLocationStatus: 'idle',
    destinationLocationStatus: 'idle',
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
    initialState,
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
    },
    extraReducers: (builder) => {
        builder
            //Departure location actions
            .addCase(fetchDepartureLocationsList.pending, (state) => {
                state.departureLocationStatus = 'loading';
            })
            .addCase(fetchDepartureLocationsList.rejected, (state) => {
                state.departureLocationStatus = 'rejected';
            })
            .addCase(fetchDepartureLocationsList.fulfilled, (state, action) => {
                const list = createLocationSelectionList(action.payload, state);
                state.departureLocationStatus = 'fullfilled';
                state.departureLocationsList = list;
            })

            //Destination location actions
            .addCase(fetchDestinationLocationsList.pending, (state) => {
                state.destinationLocationStatus = 'loading';
            })
            .addCase(fetchDestinationLocationsList.rejected, (state) => {
                state.destinationLocationStatus = 'rejected';
            })
            .addCase(fetchDestinationLocationsList.fulfilled, (state, action) => {
                const list = createLocationSelectionList(action.payload, state);
                state.destinationLocationStatus = 'fullfilled';
                state.destinationLocationsList = list;
            });
    },
});

export const { changeLocationSearchParams, changeDepartureLocation, changeDestinationaLocation } = locationsSlice.actions;
export const selectLocations = (state) => state.locations;
export default locationsSlice.reducer;
