// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./database/db');
const sha1 = require('js-sha1');

// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());

// Require Route
const api = require('./routes/routes');

// Configure app to use route
app.use('/api/v1/', api);

app.use('/login', (req, res) => {
    res.send({
        login: req.body.login,
        password: sha1(req.body.password)
      });
})

app.use('/register', (req, res) => {
    res.send({
        login: req.body.login,
        password: sha1(req.body.password)
      });
})

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

db.connect().then(()=> {
    // Configure our server to listen on the port defiend by our port variable
    app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
}).catch(()=>{});