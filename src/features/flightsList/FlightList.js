import * as React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import BestFlights from './BestFlights';
import FlightCard from './FlightCard';
import { selectFlights } from '../../store/slices/flightsSlice';

const FlightList = () => {
    const { flightList } = useSelector(selectFlights);
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const flights = flightList?.data ? flightList.data : [];
    return flights.length > 0 ? (<Container maxWidth={'lg'}>
        <Stack spacing={2} mt={4}>
            <BestFlights />
            <Stack spacing={2}>
                {flights.map(flight => <FlightCard flight={flight}/> )} 
            </Stack>
        </Stack>
    </Container>) : <></>;
}

export default FlightList;