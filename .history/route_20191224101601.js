const app = require('./app');
const request = require('request');

app.get('/',(req,res)=>{
    console.log('Hi');
});

app.get('/launches',(req,res)=>{
    request('https://api.spacexdata.com/v3/launches',(error,response,body)=>{
        if(error) {res.send(error); return;}
        res.json(JSON.stringify(body));
    });
});