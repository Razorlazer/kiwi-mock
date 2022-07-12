import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFlights } from '../../api';

export const flightsInitialState = {
    flightList: [],
    flightsSearchParams: { sort: 'price', limit: 10, offset: 0 },
    status: 'idle',
};

export const fetchFlightList = createAsyncThunk(
    'flights/list',
    async (params) => {
        const response = await fetchFlights(params);
        return response.data;
    }
);

export const flightsSlice = createSlice({
    name: 'flights',
    initialState: flightsInitialState,
    reducers: {
        changeFlightsSearchParams: (state, action) => {
            state.flightsSearchParams = {
                ...state.flightsSearchParams,
                ...action.payload
            };
        },
        changeFlightsSearchStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlightList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFlightList.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(fetchFlightList.fulfilled, (state, action) => {
                state.status = 'fullfilled';
                state.flightList = action.payload;
            });
    },
});

export const { changeFlightsSearchParams, changeFlightsSearchStatus } = flightsSlice.actions;
export const selectFlights = (state) => state.flights;
export default flightsSlice.reducer;
