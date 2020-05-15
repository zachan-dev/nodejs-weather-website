const request = require('postman-request');

const geocodeToken = "pk.eyJ1IjoiemFjaGNoYW4iLCJhIjoiY2thM2hlaWt1MGoyczNlbnhsZHdmNG12eiJ9.Kfr06yhq5nW9DgVcA2Pc0w";

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geocodeToken}&limit=1`;
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        }
        else if (body.message) {
            callback('GeoCode:' + body.message, undefined);
        }
        else if (body.features.length == 0) {
            callback('Unable to find location specified!', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;