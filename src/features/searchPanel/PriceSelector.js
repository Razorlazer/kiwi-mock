import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import SliderWithLabel from '../../sharedComponents/SliderWithLabel';
import { changeFlightsSearchParams } from '../../store/slices/flightsSlice';

const valuetext = (value) => {
    return `${value}€`;
}

const marks = [
    {
        value: 100,
        label: '100€',
    },
    {
        value: 500,
        label: '500€',
    },
    {
        value: 1000,
        label: '1000€',
    },
    {
        value: 2000,
        label: '2000€',
    }
];

const PriceSelector = () => {
    const dispatch = useDispatch();

    const handlePriceChange = (price) => {
        dispatch(changeFlightsSearchParams({ price_to: price }))
    };

    return (
        <Grid item>
            <SliderWithLabel label={'Price up to:'} marks={marks} valuetext={valuetext} onChange={handlePriceChange} defaultValue={500}/>
        </Grid>
    );
}

export default PriceSelector;