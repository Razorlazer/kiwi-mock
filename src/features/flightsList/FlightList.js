import * as React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import BestFlights from './BestFlights';
import FlightCard from './FlightCard';
import { selectFlights } from '../../store/slices/flightsSlice';
import Paginator from '../../sharedComponents/Pagination';
import EmptyState from '../emptyStates/EmptyState';
import LoadingState from '../emptyStates/LoadingState';

const FlightList = () => {
    const { flightList, status } = useSelector(selectFlights);

    const flights = flightList?.data ? flightList.data : [];

    return (<Container maxWidth={'lg'}>
        <Stack spacing={2} mt={4} pb={4}>
            <BestFlights />
            {(status === 'idle') ? 
                <EmptyState 
                    title='Welcome to minimalistic kiwi.com'
                    description='To find flights between cities, please use the search panel on top!'
                /> : <></>
            }
            <Stack spacing={2}>
                {flights.map(flight => <FlightCard flight={flight} />)}
            </Stack>
            {(status === 'fullfilled' && flights.length > 0) ? <Paginator /> : <></>}
            {(status === 'fullfilled' && flights.length === 0) ? 
                <EmptyState
                    title='No flights found for selected destinations'
                    description='Please try modifiying your search!'
                /> : <></>
            }
            {status === 'loading' ? <LoadingState/> : <></>}
        </Stack>
    </Container>);
}

export default FlightList;