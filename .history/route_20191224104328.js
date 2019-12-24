const app = require('./app');
const request = require('request');

app.get('/', (req, res) => {
    console.log('Hi');
});

app.get('/launches', (req, res) => {
    request('https://api.spacexdata.com/v3/launches', (error, response, body) => {
        if (error) { res.send(error); return; }
        res.send(body);
    });
});

app.get('/launch/:flight_number', (req, res) => {
    request(`https://api.spacexdata.com/v3/launches/${req.params.flight_number}`, (error, response, body) => {
        if (error) { res.send(error); return; }
        let newResponse = [];
        newResponse.push(JSON.parse(body));
        request(`https://api.spacexdata.com/v3/launchpads/${JSON.parse(body).launch_site.site_id}`, (error, response, launchPadBody) => {
            if (error) { res.send(error); return; }
            newResponse.push(JSON.parse(launchPadBody));
            // console.log(newResponse);
            res.send(newResponse);
        });
    });
});