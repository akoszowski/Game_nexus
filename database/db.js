const { Client } = require('pg');

const connectionString = "postgres://fjoiauwcdcgong:8fbf775c79d9cda97e876a56d0a6cda271201f87cbeb2bcf41fb8e9e9f7ad063@ec2-54-155-226-153.eu-west-1.compute.amazonaws.com:5432/dd4hv7g3gngb97";

// Connecting to our database via URI
const client = new Client({
    connectionString: connectionString,
    //connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = client;