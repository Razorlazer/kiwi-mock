import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Container, Grid, Divider, Button } from '@mui/material';
import Stack from '@mui/material/Stack';

import LocationSelector from './LocationsSelector';
import DateSelector from './DateSelector';
import FlightTypeSelector from './FlightTypeSelector';
import PriceSelector from './PriceSelector';
import useFlightsFetchHook from './useFlightsFetchHook';

const SearchPanel = () => {
    const { fetchFlights, isSearchDisabled} = useFlightsFetchHook();

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
                        <Button color={'success'} variant="outlined" onClick={fetchFlights} disabled={isSearchDisabled} data-testid='search-button'>
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>
            </Container>
        </AppBar>)
}

export default SearchPanel;