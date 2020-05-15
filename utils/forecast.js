const request = require('postman-request');

const weatherToken = "9af58cdaad3ece13ef36ea55a3ae6bf5";

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${weatherToken}&query=${lat},${long}`;
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error) {
            callback('WeatherStack:', body.error.info, undefined);
        }
        else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
            //console.log(`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
        }
    });
};

module.exports = forecast;