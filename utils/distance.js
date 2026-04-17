export let getDistance = (lat1, lon1, lat2, lon2)=>{
    let EARTH_RADIUS_KM = 6371;

    let toRad = (deg) => (deg * Math.PI) / 180;

    let dLat = toRad(lat2 - lat1);
    let dLon = toRad(lon2 - lon1);

    let a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c;
}