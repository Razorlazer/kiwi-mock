/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Grid, } from '@mui/material';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';

import SelectInput from '../../sharedComponents/SelectInput';
import {
    selectLocations,
    fetchLocationsList,
    changeDestinationaLocation,
    changeDepartureLocation
} from '../../store/slices/locationsSlice';


const LocationsSelector = ()=>{
    const dispatch = useDispatch();
    const { searchParams } = useSelector(selectLocations);
    const [searchString, setSearchString] = React.useState();
    
    const fetchLocations = (searchKey) => {
        dispatch(fetchLocationsList({ ...searchParams, term: searchKey ? searchKey : searchParams.term }));
    }

    const [searchLocation] = React.useState(() =>
        debounce(value => fetchLocations(value), 400)
    );

    React.useEffect(() => searchLocation(searchString), [searchString]);


    const changeDestinationParams = (location) => {
        console.log(location);
        dispatch(changeDestinationaLocation(location));
    };

    const changeDepartureParams = (location) => {
        dispatch(changeDepartureLocation(location))
    };

    return(<>
        <Grid item lg={3} md={3} sm={12}>
            <SelectInput label={'From'} onChange={changeDepartureParams} onSearchChange={setSearchString}/>
        </Grid>
        <Grid item lg={3} md={3} sm={12}>
            <SelectInput label={'To'} onChange={changeDestinationParams} onSearchChange={setSearchString} />
        </Grid>
    </>);
};

export default LocationsSelector;