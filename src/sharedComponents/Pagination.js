import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { changeFlightsSearchParams, selectFlights } from '../store/slices/flightsSlice';

//This is simple pager. It can be improved to more complex pagination component with biderctional dynamic paging
const Paginator = () => {
    const dispatch = useDispatch();
    const { flightsSearchParams } = useSelector(selectFlights);
    const loadMore = () => {
        const currentLimit = flightsSearchParams?.limit ?? 10;
        dispatch(changeFlightsSearchParams({ limit: currentLimit + 10 }));
    }
    return  <Button onClick={loadMore}>Load more</Button>
};

export default Paginator;