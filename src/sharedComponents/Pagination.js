import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { changeFlightsSearchParams, selectFlights, resetFlightsStore } from '../store/slices/flightsSlice';

//This is simple pager. It can be improved to more complex pagination component with biderctional dynamic paging
const Paginator = () => {
    const dispatch = useDispatch();
    const { flightsSearchParams } = useSelector(selectFlights);
    const loadMore = () => {
        const currentLimit = flightsSearchParams?.limit ?? 10;
        dispatch(changeFlightsSearchParams({ limit: currentLimit + 10 }));
    }

    const resetFlights = () =>{
        dispatch(resetFlightsStore());
    }

    return <>
        <Grid container justifyContent={'center'} alignContent={'center'} spacing={5}>
            <Grid item>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={resetFlights} color='error'>Clear flights list</Button>
                    <Button onClick={loadMore}>Load more</Button>
                </ButtonGroup>
            </Grid>
        </Grid>

    </>
};

export default Paginator;