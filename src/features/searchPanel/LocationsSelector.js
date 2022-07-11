import * as React from 'react';
import { Grid, } from '@mui/material';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';

import SelectInput from '../../sharedComponents/SelectInput';
import {
    selectLocations,
    fetchDepartureLocationsList,
    fetchDestinationLocationsList,
    changeDestinationaLocation,
    changeDepartureLocation
} from '../../store/slices/locationsSlice';

//TODO: this component needs to be optimised with the locations slice
const LocationsSelector = ()=>{
    const dispatch = useDispatch();
    const { searchParams, departureLocationsList, destinationLocationsList } = useSelector(selectLocations);
    const [searchDepartureString, setSearchDepartureString] = React.useState();
    const [searchDestinationString, setSearchDestincationString] = React.useState();

    const fetchDepartureLocations = (searchKey) => {
        dispatch(fetchDepartureLocationsList({ ...searchParams, term: searchKey ? searchKey : searchParams.term }));
    }
    const fetchDestinationLocations = (searchKey) => {
        dispatch(fetchDestinationLocationsList({ ...searchParams, term: searchKey ? searchKey : searchParams.term }));
    }

    //debounce the action to improve user experience 
    const [searchDepartureLocation] = React.useState(() =>
        debounce(value => fetchDepartureLocations(value), 400)
    );
    const [searchDestinationLocation] = React.useState(() =>
        debounce(value => fetchDestinationLocations(value), 400)
    );

    React.useEffect(() => searchDepartureLocation(searchDepartureString), [searchDepartureString]);
    React.useEffect(() => searchDestinationLocation(searchDestinationString), [searchDestinationString]);

    const changeDestinationParams = (location) => {
        dispatch(changeDestinationaLocation(location));
    };
    const changeDepartureParams = (location) => {
        dispatch(changeDepartureLocation(location))
    };

    return(<>
        <Grid item lg={3} md={3} sm={12}>
            <SelectInput label={'From'} onChange={changeDepartureParams} onSearchChange={setSearchDepartureString} departureList={departureLocationsList}/>
        </Grid>
        <Grid item lg={3} md={3} sm={12}>
            <SelectInput label={'To'} onChange={changeDestinationParams} onSearchChange={setSearchDestincationString} destinationList={destinationLocationsList}/>
        </Grid>
    </>);
};

export default LocationsSelector;