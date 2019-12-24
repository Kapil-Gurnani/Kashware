
var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow,-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', '*');
    res.append('Access-Control-Allow-Headers', ['Content-Type','application/json']);
    next();
});

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})

module.exports = app;