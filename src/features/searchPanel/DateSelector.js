import { Grid} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '../../sharedComponents/DatePicker';
import { changeFlightsSearchParams, selectFlights } from '../../store/slices/flightsSlice';


const DateSelector = () => {
    const dispatch = useDispatch();
    const { flightsSearchParams } = useSelector(selectFlights);

    const handleFromDate = (date) => {
        dispatch(changeFlightsSearchParams({ fromDate: date?.toString() }));
    }
    
    const handleToDate = (date) => {
        dispatch(changeFlightsSearchParams({ toDate: date?.toString() }));
    }

    //restrict return date to be equal or bigger that departure date
    const minDate = flightsSearchParams?.fromDate && new Date(flightsSearchParams?.fromDate);

    return (<>
        <Grid item lg={3} md={3} sm={6} xs={6}>
            <DatePicker label={'From date:'} onChange={handleFromDate}/>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={6}>
            <DatePicker label={'To date'} onChange={handleToDate} minDate={minDate}/>
        </Grid>
    </>);
};

export default DateSelector;