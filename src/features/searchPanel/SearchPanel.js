import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import { Container, Grid, Divider, Button } from '@mui/material';
import Stack from '@mui/material/Stack';

import { selectLocations } from '../../store/slices/locationsSlice';
import { fetchFlightList, selectFlights } from '../../store/slices/flightsSlice';
import LocationSelector from './LocationsSelector';
import DateSelector from './DateSelector';
import FlightTypeSelector from './FlightTypeSelector';
import PriceSelector from './PriceSelector';

const SearchPanel = () => {
    
    const dispatch = useDispatch();
    const { departureLocation , destinationLocation } = useSelector(selectLocations);
    const { flightsSearchParams } = useSelector(selectFlights);

    const fetchFlights = () => {
        dispatch(fetchFlightList({ fly_from: departureLocation, fly_to: destinationLocation, ...flightsSearchParams }));
    };

    const isSearchDisabled = !departureLocation || !destinationLocation || !flightsSearchParams.fromDate || !flightsSearchParams.toDate;

    return (<AppBar position="static" color="inherit">
            <Container maxWidth="lg">
                    <Stack
                        mt={2}
                        spacing={2}
                        width={'100%'}
                        divider={<Divider orientation="horizontal" flexItem />}
                    >
                        <Grid container columnSpacing={2} direction={'row'}>
                            <LocationSelector />
                            <DateSelector />
                        </Grid>
                        <Grid container justifyContent="space-between">
                            <FlightTypeSelector/>
                            <PriceSelector/>
                            <Grid>
                                <Button color={'success'} variant="outlined" onClick={fetchFlights} disabled={isSearchDisabled}>
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>
            </Container>
        </AppBar>)
}

export default SearchPanel;