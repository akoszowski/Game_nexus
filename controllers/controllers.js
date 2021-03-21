const Queries = require('../database/queries');
const TokenGenerator = require('uid-generator'); // generating session cookies

const tokenGenerator = new TokenGenerator();

const saySomething = (req, res, next) => {
    Queries.test().then(dbres => {
        res.status(200).json(dbres);
    }).catch(err => {
        res.status(400).json(err.message);
    })
}

module.exports.saySomething = saySomething;