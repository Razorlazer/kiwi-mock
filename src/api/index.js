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
    return kiwiAPI.get('/flights?v=3&partner=skypicker&locale=en&flyFrom=prague_cz&to=paris_fr&dateFrom=18%2F07%2F2022&dateTo=18%2F07%2F2022&typeFlight=return&returnFrom=19%2F07%2F2022&returnTo=19%2F07%2F2022');
}
