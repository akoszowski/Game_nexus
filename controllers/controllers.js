const Queries = require('../database/queries');
const TokenGenerator = require('uuid-token-generator'); // generating session cookies

const tokenGenerator = new TokenGenerator();

const saySomething = (req, res, next) => {
    Queries.test().then(dbres => {
        res.status(200).json(dbres);
    }).catch(err => {
        res.status(400).json(err.message);
    })
}

const tokGen = new TokenGenerator();

const login = (req, res, next) => {
    let username = req.body.username;
    let passwdhash = req.body.password;
    console.log(username, passwdhash);
    Queries.loginAuth(username, passwdhash).then(exists => {
        if(exists) {
            // let id = exists.username;
            let tok = tokGen.generate();
            // tokMap.set(tok, username);
            res.status(200).json({
                token: tok
            });
            console.log("Token send");
        } else {
            res.status(400).send("Invalid login data!");
            console.log("Authorization failed");
        }
    });
}

const register = (req, res, next) => {
    let username = req.body.username;
    let passwdhash = req.body.password;

    Queries.isRegistered(username).then(registered => {
        if (registered) {
            res.status(400).send("Account already registered!");
        } else {
            let tok = tokGen.generate();
            Queries.registerUser(username, passwdhash)
            .then(qres => {
                res.status(200).json({
                    token: tok
                });
            })
            .catch(err => {
                res.status(400).send(err);
            });
        }});
}

module.exports.saySomething = saySomething;
module.exports.login = login;
module.exports.register = register;