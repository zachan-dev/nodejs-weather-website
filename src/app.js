const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('../utils/geocode');
const forecast = require('../utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
//console.log(__filename);

const app = express();
const port = 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // default to be views
const partialsPath = path.join(__dirname, '../templates/partials'); // NOTE: nodemon .\src\app.js -e js,hbs --> watch js and hbs changes and restart

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(publicDirPath));

// app.get('/', (req, res) => {
//     res.send('<h1>Weather</h1>');
// }); //route never ran if static

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Zach',
//         age: 22
//     },
//     {
//         name: 'Wyman',
//         age: 26
//     }]); // JSON as an object
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');
// });

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Zach Chan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zach Chan'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some useful text.',
        title: 'Help',
        name: 'Zach Chan'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.status(400).send({
            error: 'You must provide an address'
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.status(400).send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.status(400).send({
                    error
                });
            }
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });

    /*
    res.send({
        forecast: 'It is raining.',
        location: 'Hong Kong',
        address: req.query.address
    });
    */
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.status(400).send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query); // querys

    res.send({ //if send twice, Error: Cannot set headers after they are sent to the client
        products: []
    });
});

app.get('/help/*', (req, res) => {
    //res.send('Help article not found');
    res.status(404).render('404', {
        errorMsg: 'Help article not found.',
        title: '404',
        name: 'Zach Chan'
    });
});

//error page, * means everything but registered paths, come last
app.get('*', (req, res) => {
    //res.send('My 404 page');
    res.status(404).render('404', {
        errorMsg: 'Page not found.',
        title: '404',
        name: 'Zach Chan'
    });
});

app.listen(port, () => console.log(`Web server listening at http://localhost:${port}`));