export const buildURLParams = (params = {})=>{
    //invalid url parameters type
    if(typeof params !== 'object'){
        return '';
    }

    const keys = Object.keys(params);

    const urlParams = [];
    for (let key = 0; key < keys.length; key++){
        if (params[keys[key]]){
            urlParams.push(`${keys[key]}=${params[keys[key]]}`)
        }
    }
  
    return urlParams.join('&');
};

export const createLocationSelectionList = ({ locations }, state={}) => {
    const mappedLocations = locations.filter(location => location.code !== state.destinationLocation && location.code!== state.departureLocation)
    .map(location => ({
        id: location.id,
        code: location.code,
        label: location.name,
        country: location.country,
        city: location.city
    }));

    return mappedLocations;
};

export const timeEpochUTCtoLocal = (dtime) => {
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(dtime);
    return d.toLocaleString();
};

export const dateIsValid = (date) => {
    return date instanceof Date && !isNaN(date);
}

export const compareDates = (date1, date2) =>{
    const dateObject1 = new Date(date1);
    const dateObject2 = new Date(date2);

    if (!dateIsValid(dateObject1) || !dateIsValid(dateObject2)) {
        return 'Invalid date';
    };

    if(dateObject1 === dateObject2) {
        return 0;
    } else if(dateObject1 > dateObject2){
        return -1;
    } else {
        return 1;
    };
};

export const validateSearchParams = (params) => {
    const keys = Object.keys(params);

    let isValid = true;
    for(let key = 0; key < keys.length; key++){
        if (!params[keys[key]]) {
            isValid = false;
            break;
        }
    };

    if(isValid === false){
        return false;
    }

    if (compareDates(params.fromDate, params.toDate) !== 1) {
        return false;
    }

    return true;
}