import { Grid} from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeFlightsSearchParams } from '../../store/slices/flightsSlice';
import Toggle from '../../sharedComponents/Toggle';

const fligtTypes = [{
        label: 'Economy',
        key: 'M', 
        value: 'M'
    },
    {
        label: 'Premium Economy',
        key: 'W',
        value: 'W'
    },
    {
        label: 'Business',
        key: 'C',
        value: 'C'
    },
    {
        label: 'First class',
        key: 'F',
        value: 'F'
    }
];

const FlightTypeSelector = () => {
    const dispatch = useDispatch();

    const handleFlightTypeChange = (type) =>{
        dispatch(changeFlightsSearchParams({ selected_cabins: type }))
    };

    return (
        <Grid item>
            <Toggle toggleOptions={fligtTypes} onChange={handleFlightTypeChange} defaultValue={fligtTypes[0].key}/>
        </Grid>
    );
};

export default FlightTypeSelector;