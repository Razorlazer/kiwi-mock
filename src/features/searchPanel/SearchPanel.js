import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import { Container, Grid, Divider, Button } from '@mui/material';
import Stack from '@mui/material/Stack';

import PriceSlider from '../../sharedComponents/PriceSlider';
import { selectLocations } from '../../store/slices/locationsSlice';
import { fetchFlightList } from '../../store/slices/flightsSlice';
import LocationSelector from './LocationsSelector';
import DatePicker from '../../sharedComponents/DatePicker';
import Toggle from '../../sharedComponents/Toggle';

const SearchPanel = () => {
    
    const dispatch = useDispatch();
    const { departureLocation , destinationLocation } = useSelector(selectLocations);
    //console.log(departureLocation, destinationLocation);
    const fetchFlights =() => {
        dispatch(fetchFlightList());
    };

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
                            <Grid item lg={3} md={3} sm={12}>
                                <DatePicker label={'Departure'} />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12}>
                                <DatePicker label={'Return'} />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Toggle />
                            </Grid>
                            <Grid item>
                                <PriceSlider />
                            </Grid>
                            <Grid>
                                <Button color={'success'} variant="outlined" onClick={fetchFlights}>Search</Button>
                            </Grid>
                        </Grid>
                    </Stack>
            </Container>
        </AppBar>)
}

export default SearchPanel;