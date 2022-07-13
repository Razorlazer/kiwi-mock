import * as React from 'react';

import FlightList from "../features/flightsList/FlightList";
import SearchPanel from "../features/searchPanel/SearchPanel";

const LandingPage = () => {
    return (<>
        <SearchPanel />
        <FlightList />
    </>)
};

export default LandingPage;