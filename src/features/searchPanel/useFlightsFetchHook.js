import * as React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { validateSearchParams } from '../../utilities/helperFunctions';
import { selectLocations } from '../../store/slices/locationsSlice';
import { fetchFlightList, selectFlights, changeFlightsSearchStatus } from '../../store/slices/flightsSlice';

/**
* Manages flights list fetch action. It enables to fetch flights from scratch when resetAndFetchFlights is triggered or 
* loads more flights onto existing list when fetchFlights is triggered solely
* @returns {fetchFlights, isSearchDisabled}
*/
const useFlightsFetchHook = () => {
    const dispatch = useDispatch();
    const { departureLocation, destinationLocation } = useSelector(selectLocations);
    const { flightsSearchParams } = useSelector(selectFlights);
    const { fromDate, toDate, limit, sort } = flightsSearchParams || {};

    const isValid = validateSearchParams({ departureLocation, destinationLocation, fromDate, toDate });

    const fetchFlights = () => {
        if (isValid) {
            dispatch(fetchFlightList({ fly_from: departureLocation, fly_to: destinationLocation, ...flightsSearchParams }));
        }
    }

    const resetAndFetchFlights = () => {
        isValid && dispatch(changeFlightsSearchStatus('loading'));
        fetchFlights();
    };

    React.useEffect(() => {
        fetchFlights();
    }, [limit]);

    React.useEffect(() => {
        resetAndFetchFlights();
    }, [sort]);

    return { fetchFlights, isSearchDisabled: !isValid };
};

export default useFlightsFetchHook;