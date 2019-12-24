const app = require('./app');
const request = require('request');

app.get('/', (req, res) => {
    console.log('Hi');
});

app.get('/launches', (req, res) => {
    let api = `https://api.spacexdata.com/v3/launches/${req.query.flight_number}`;
    if(req.query.flight_number == undefined) api = "https://api.spacexdata.com/v3/launches";

    request(api, (error, response, body) => {
        if (error) { res.send(error); return; }
        if(req.query.flight_number == undefined){ res.send(body); return; }
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

// [[1,2],[3,4],[5,6]] => [1,2,3,4,5,6]