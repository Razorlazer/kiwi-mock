import axios from 'axios';
import { buildURLParams } from '../utilities/helperFunctions';

const kiwiAPI = axios.create({
    baseURL: 'https://api.skypicker.com'
});

export const fetchLocations = (params) => {
    const urlParams = buildURLParams(params);
    return kiwiAPI.get(`locations?${urlParams}`);
}

export const fetchFlights = (params) => {
    const urlParams = buildURLParams(params);
    //some url params are by default added for the sakeof simplicity  
    return kiwiAPI.get(`/flights?v=3&partner=skypicker&sort=price&asc=1&vehicle_type=aircraft&locale=en&${urlParams}`);
}
