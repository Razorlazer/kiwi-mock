import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Euro from '@mui/icons-material/Euro';
import AccessTime from '@mui/icons-material/AccessTime';
import ConnectingAirports from '@mui/icons-material/ConnectingAirports';
import Paper from '@mui/material/Paper';
import { selectFlights, changeFlightsSearchParams, changeFlightsSearchStatus } from '../../store/slices/flightsSlice';

const BestFlights = () => {
    const dispatch = useDispatch();
    const { flightList, flightsSearchParams } = useSelector(selectFlights);
    const [value, setValue] = React.useState(flightsSearchParams?.sort ?? 'price');

    const handleChange = (event, value) => {
        dispatch(changeFlightsSearchStatus('loading'))
        dispatch(changeFlightsSearchParams({ sort: value, asc: value === 'quality' ? true : false }));
        setValue(value);
    };

    const bestFlights = flightList?.best_results ? flightList.best_results[0] : {};  
    
    return flightList.best_results ? (
        <Paper elevation={1} >
            <BottomNavigation value={value} onChange={handleChange} showLabels>
                <BottomNavigationAction
                    label={`Cheapest: ${bestFlights?.price ?? '' }` }
                    value="price"
                    icon={<Euro />}
                />
                <BottomNavigationAction
                    label={`Fastest: ${bestFlights?.duration ?? ''}`}
                    value="duration"
                    icon={<AccessTime />}
                />
                <BottomNavigationAction
                    label="Quality"
                    value="quality"
                    icon={<ConnectingAirports />}
                />
            </BottomNavigation>
        </Paper>) : <></>
};

export default BestFlights;