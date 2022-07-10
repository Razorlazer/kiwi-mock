export const buildURLParams = (params = {})=>{
    const keys = Object.keys(params);

    const urlParams = [];
    for (let key = 0; key < keys.length; key++){
        if (params[keys[key]]){
            urlParams.push(`${keys[key]}=${params[keys[key]]}`)
        }
    }
  
    return urlParams.join('&');
};

export const createLocationSelectionList = ({ locations }, state) => {
    const mappedLocations = locations.filter(location => location.code !== state.destinationLocation && location.code!== state.departureLocation)
    .map(location => ({
        id: location.id,
        code: location.code,
        label: location.name,
        global_rank_dst: location.global_rank_dst,
        country: location.country,
        city: location.city
    }));

    return mappedLocations;
};

export const timeEpochUTCtoLocal = (dtime) => {
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(dtime);
    return d.toLocaleString();
} 