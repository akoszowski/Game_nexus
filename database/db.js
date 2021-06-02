const { Client } = require('pg');

const connectionString = "postgres://prfbbrfnnhpglk:06dcbe751adf4522c00afff761b4003bd37a39a55f47ed5b70dd4eb7877f35b2@ec2-52-208-221-89.eu-west-1.compute.amazonaws.com:5432/d9h8goms7cnmln";

// Connecting to our database via URI
const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = client;