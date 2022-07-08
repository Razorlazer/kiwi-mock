import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Container, Grid, Divider, Button } from '@mui/material';
import SelectInput from '../../sharedComponents/SelectInput';
import DatePicker from '../../sharedComponents/DatePicker';
import Toggle from '../../sharedComponents/Toggle';
import Stack from '@mui/material/Stack';
import PriceSlider from '../../sharedComponents/PriceSlider';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: 128,
    },
}));

const SearchPanel = () => {
    return (<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit">
            <Container maxWidth="lg">
                <StyledToolbar>
                    <Stack 
                        spacing={2} 
                        alignSelf={'center'} 
                        divider={<Divider orientation="row" flexItem />}
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        <Grid container spacing={2} alignItems="center"
                            justifyContent="center" >
                            <Grid item>
                                <SelectInput label={'From'} />
                            </Grid>
                            <Grid item>
                                <SelectInput label={'To'} />
                            </Grid>
                            <Grid item>
                                <DatePicker label={'Departure'} />
                            </Grid>
                            <Grid item>
                                <DatePicker label={'Return'} />
                            </Grid>
                            <Grid item>   
                                <Button color={'success'} variant="outlined">Search</Button>
                            </Grid>
                        </Grid>
                        <Grid container alignContent={'space-between'} flexWrap={'wrap'} justifyContent={'space-between'}>
                            <Grid item>
                                <Toggle/>
                            </Grid>
                            <Grid item>
                                <PriceSlider/>
                            </Grid>
                        </Grid>
                    </Stack>

                </StyledToolbar>
            </Container>
        </AppBar>
    </Box>)
}

export default SearchPanel;