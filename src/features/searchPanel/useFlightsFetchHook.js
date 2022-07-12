import * as React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
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

    const isSearchDisabled = !departureLocation || !destinationLocation || !flightsSearchParams.fromDate || !flightsSearchParams.toDate;

    const fetchFlights = () => {
        //makes sure that locations are set
        if (!isSearchDisabled) {
            dispatch(fetchFlightList({ fly_from: departureLocation, fly_to: destinationLocation, ...flightsSearchParams }));
        }
    }

    const resetAndFetchFlights = () => {
        !isSearchDisabled && dispatch(changeFlightsSearchStatus('loading'));
        fetchFlights();
    };

    React.useEffect(() => {
        fetchFlights();
    }, [flightsSearchParams.limit]);

    React.useEffect(() => {
        resetAndFetchFlights();
    }, [flightsSearchParams.sort]);

    return { fetchFlights, isSearchDisabled };
};

export default useFlightsFetchHook;