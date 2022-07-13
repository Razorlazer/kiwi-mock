import * as React from 'react';
import { Grid, } from '@mui/material';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';

import SelectInput from '../../sharedComponents/SelectInput';
import {
    selectLocations,
    fetchDestinationLocationsList,
    changeDestinationaLocation,
} from '../../store/slices/locationsSlice';

const DestinationLocationsSelector = ()=>{
    const dispatch = useDispatch();
    const { searchParams, destinationLocationsList } = useSelector(selectLocations);
    const [searchDestinationString, setSearchDestincationString] = React.useState();

    const fetchDestinationLocations = (searchKey) => {
        dispatch(fetchDestinationLocationsList({ ...searchParams, term: searchKey ? searchKey : searchParams.term }));
    }

    //debounce the action to improve user experience 
    const [searchDestinationLocation] = React.useState(() =>
        debounce(value => fetchDestinationLocations(value), 400)
    );
    
    React.useEffect(() => searchDestinationLocation(searchDestinationString), [searchDestinationString]);

    const changeDestinationParams = (location) => {
        dispatch(changeDestinationaLocation(location));
    };
    
    return(
        <Grid item lg={3} md={3} sm={12} xs={12}>
            <SelectInput 
                label={'Destination city/airport'} 
                onChange={changeDestinationParams} 
                onSearchChange={setSearchDestincationString} 
                destinationList={destinationLocationsList}
            />
        </Grid>
    );
};

export default DestinationLocationsSelector;