import * as React from 'react';
import { useSelector } from 'react-redux';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Euro from '@mui/icons-material/Euro';
import AccessTime from '@mui/icons-material/AccessTime';
import ConnectingAirports from '@mui/icons-material/ConnectingAirports';
import Paper from '@mui/material/Paper';
import { selectFlights } from '../../store/slices/flightsSlice';

const BestFlights = () => {
    const [value, setValue] = React.useState('price');
    const { flightList } = useSelector(selectFlights);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const bestFlights = flightList?.best_results ? flightList.best_results[0] : {};  
    
    return flightList.best_results ? (
        <Paper elevation={1} >
            <BottomNavigation value={value} onChange={handleChange} showLabels>
                <BottomNavigationAction
                    label={`Cheapest: ${bestFlights.price}`}
                    value="price"
                    icon={<Euro />}
                />
                <BottomNavigationAction
                    label={`Fastest: ${bestFlights.duration}`}
                    value="duration"
                    icon={<AccessTime />}
                />
                <BottomNavigationAction
                    label="Transfer: direct"
                    value="nearby"
                    icon={<ConnectingAirports />}
                />
            </BottomNavigation>
        </Paper>) : <></>
};

export default BestFlights;