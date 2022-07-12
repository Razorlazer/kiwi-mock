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
                        mb={2}
                        spacing={1}
                        width={'100%'}
                        divider={<Divider orientation="horizontal" />}
                    >
                        <Grid container columnSpacing={2} rowSpacing={2} direction={'row'}>
                            <LocationSelector />
                            <DateSelector />
                        </Grid>
                        <Grid container justifyContent="space-between" rowSpacing={1}>
                            <FlightTypeSelector/>
                            <PriceSelector/>
                            <Grid item lg={1} md={1} sm={12} xs={12}>
                                <Button color={'success'} fullWidth variant="outlined" onClick={fetchFlights} 
                                    disabled={isSearchDisabled} data-testid='search-button'>
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>
            </Container>
        </AppBar>)
}

export default SearchPanel;