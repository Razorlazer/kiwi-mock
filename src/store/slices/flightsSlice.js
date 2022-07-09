import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFlights } from '../../api';

const initialState = {
    flightList: [],
    flightsSearchParams: {},
    status: 'loading',
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
    initialState,
    reducers: {
        changeFlightsSearchParams: (state, action) => {
            state.flightsSearchParams = action.payload;
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

export const { changeFlightsSearchParams } = flightsSlice.actions;

export default flightsSlice.reducer;
