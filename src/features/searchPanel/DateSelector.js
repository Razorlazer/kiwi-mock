import { Grid} from '@mui/material';
import { useDispatch } from 'react-redux';
import DatePicker from '../../sharedComponents/DatePicker';
import { changeFlightsSearchParams } from '../../store/slices/flightsSlice';


const DateSelector = () => {
    const dispatch = useDispatch();
    const handleFromDate = (date) => {
        dispatch(changeFlightsSearchParams({ fromDate: date?.toString() }));
    }
    
    const handleToDate = (date) => {
        dispatch(changeFlightsSearchParams({ toDate: date?.toString() }));
    }

    return (<>
        <Grid item lg={3} md={3} sm={12}>
            <DatePicker label={'Departure'} onChange={handleFromDate}/>
        </Grid>
        <Grid item lg={3} md={3} sm={12}>
            <DatePicker label={'Return'} onChange={handleToDate}/>
        </Grid>
    </>);
};

export default DateSelector;