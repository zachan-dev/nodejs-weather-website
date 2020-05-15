console.log('Client side javascript file is loaded!');

// fetch API in all browsers except nodeJS, promises API
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});

/*
address = 'Hong Kong';

fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
        }
        else {
            console.log(data.location);
            console.log(data.forecast);
        }
        //console.log(data);
    });
});
*/

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const loadingMsg = document.querySelector('#loading');
const successMsg = {
    location: document.querySelector('.successMsg#location'),
    forecast: document.querySelector('.successMsg#forecast'),
};
const errorMsg = document.querySelector('#errorMsg');

const loading = () => {
    loadingMsg.textContent = 'Loading...';
    successMsg.location.textContent = '';
    successMsg.forecast.textContent = '';
    errorMsg.textContent = '';
};

const clearMsgs = () => {
    loadingMsg.textContent = '';
    successMsg.location.textContent = '';
    successMsg.forecast.textContent = '';
    errorMsg.textContent = '';
};

weatherForm.addEventListener('submit', (e) => { // but submit will refresh the page!
    e.preventDefault(); // this event function prevent refreshing!

    loading();

    const address = search.value;

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            clearMsgs();
            if (data.error) {
                errorMsg.textContent = data.error;
                //console.log(data.error);
            }
            else {
                successMsg.location.textContent = data.location;
                successMsg.forecast.textContent = data.forecast;
                //console.log(data.location);
                //console.log(data.forecast);
            }
        });
    });

    console.log('testing');
});