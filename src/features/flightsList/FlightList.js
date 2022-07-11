import * as React from 'react';
import { useSelector } from 'react-redux';
import { Container, CircularProgress, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import BestFlights from './BestFlights';
import FlightCard from './FlightCard';
import { selectFlights } from '../../store/slices/flightsSlice';
import Paginator from '../../sharedComponents/Pagination';

const FlightList = () => {
    const { flightList, status } = useSelector(selectFlights);

    const flights = flightList?.data ? flightList.data : [];
    return (<Container maxWidth={'lg'}>
        <Stack spacing={2} mt={4} pb={4}>
            <BestFlights />
            {status === 'loading' ?
                (<Grid container justifyContent={'center'} alignContent={'center'} spacing={5}>
                        <Grid item>
                            <CircularProgress disableShrink />
                        </Grid>
                </Grid>) : (
                <Stack spacing={2}>
                    {flights.map(flight => <FlightCard flight={flight}/> )} 
                </Stack>)}
            {status === 'fullfilled' ?  <Grid container justifyContent={'center'} alignContent={'center'} spacing={5}>
                    <Grid item>
                        <Paginator></Paginator>
                    </Grid>
                </Grid>: <></>}
        </Stack>
    </Container>);
}

export default FlightList;