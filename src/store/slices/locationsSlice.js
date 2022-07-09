import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLocations } from '../../api';
import { createLocationSelectionList } from '../../utilities/helperFunctions';

const initialState = {
    locationsList: [],
    searchParams: { location_types: 'airport', term: 'Prague' },
    destinationLocation: {},
    departureLocation: {},
    status: 'loading',
};

export const fetchLocationsList = createAsyncThunk(
    'flights/destination/list',
    async (params) => {
        console.log(params);
        const response = await fetchLocations(params);
        return response.data;
    }
);

export const locationsSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {
        changeLocationSearchParams: (state, action) => {
            state.searchParams = { ...state.searchParams, ...action.payload }
        },
        changeDepartureLocation: (state, action) => {
            state.departureLocation = action.payload
        },
        changeDestinationaLocation: (state, action) => {
            state.destinationLocation = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocationsList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLocationsList.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(fetchLocationsList.fulfilled, (state, action) => {
                const list = createLocationSelectionList(action.payload);
                state.status = 'fullfilled';
                state.locationsList = list;
            });
    },
});

export const { changeLocationSearchParams, changeDepartureLocation, changeDestinationaLocation } = locationsSlice.actions;
export const selectLocations = (state) => state.locations;
export default locationsSlice.reducer;
