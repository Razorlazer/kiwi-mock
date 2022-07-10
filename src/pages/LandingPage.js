import * as React from 'react';
import { Stack, Container } from '@mui/material';

import FlightList from "../features/flightsList/FlightList";
import SearchPanel from "../features/searchPanel/SearchPanel";

const LandingPage = () => {
    return (<>
        <SearchPanel />
        <FlightList mt />
    </>)
};

export default LandingPage;