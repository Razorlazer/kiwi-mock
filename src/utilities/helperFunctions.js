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

export const createLocationSelectionList = ({ locations }) => {
    const mappedLocations = locations.map(location => ({
        id: location.id,
        code: location.code,
        label: location.name,
        global_rank_dst: location.global_rank_dst,
        country: location.country,
        city: location.city
    }));

    return mappedLocations;
}