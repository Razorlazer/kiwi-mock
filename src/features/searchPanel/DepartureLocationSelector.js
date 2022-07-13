import * as React from 'react';
import { Grid, } from '@mui/material';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import SelectInput from '../../sharedComponents/SelectInput';
import {
    selectLocations,
    fetchDepartureLocationsList,
    changeDepartureLocation
} from '../../store/slices/locationsSlice';

const DepartureLocationsSelector = () => {
    const dispatch = useDispatch();
    const { searchParams, departureLocationsList } = useSelector(selectLocations);
    const [searchDepartureString, setSearchDepartureString] = React.useState();
   
    const fetchDepartureLocations = (searchKey) => {
        dispatch(fetchDepartureLocationsList({ ...searchParams, term: searchKey ? searchKey : searchParams.term}));
    }
   
    //debounce the action to improve user experience 
    const [searchDepartureLocation] = React.useState(() =>
        debounce(value => fetchDepartureLocations(value), 400)
    );
   
    React.useEffect(() => searchDepartureLocation(searchDepartureString), [searchDepartureString]);
   
    const changeDepartureParams = (location) => {
        dispatch(changeDepartureLocation(location))
    };

    return (<Grid item lg={3} md={3} sm={12} xs={12}>
            <SelectInput
                label={'Departure city/airport'}
                onChange={changeDepartureParams}
                onSearchChange={setSearchDepartureString}
                departureList={departureLocationsList}
            />
        </Grid>
    );
};

export default DepartureLocationsSelector;