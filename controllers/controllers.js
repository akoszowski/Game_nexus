const Queries = require('../database/queries');
const db = require('../database/db');
const TokenGenerator = require('uuid-token-generator');


const tokGen = new TokenGenerator();
var tokMap = new Map();

// User registration.
const register = (req, res, next) => {
    let mail = req.body.email;
    let username = req.body.name;
    let passwdhash = req.body.password;

    Queries.isRegisteredMail(mail).then(registeredMail => {
        if (registeredMail) {
            res.status(400).send("Account with such an email is already registered!");
        } else {
            Queries.isRegisteredUsername(username).then(registeredUsername => {
                if (registeredUsername) {
                    res.status(400).send("Account with such an username is already registered!");
                } else {
                    let vals = [mail, username, passwdhash];
                    let tok = tokGen.generate();
                    Queries.registerUser(vals).then(id => {
                        tokMap.set(tok, id);
                        console.log(id);
                        res.status(200).json({
                            token: tok
                        });
                    }).catch(err => {
                        res.status(400).send(err);
                    });
                }
            });
        }
    });
}

// User login.
const login = (req,res,next) => {
    let mail = req.body.email;
    let passwdhash = req.body.password;
    let vals = [mail, passwdhash];
    Queries.loginAuth(vals).then(exists => {
        if(exists) {
            let id = exists.id;
            let tok = tokGen.generate();
            tokMap.set(tok, id);
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

// Checks if user with given token exists.
const validToken = (req,res,next) => {
    res.status(200).json({
            valid: tokMap.has(req.query.token)
        }
    );
}

// Basic information about user, having one's token.
const userInfo = (req, res, next) => {
    let userId = tokMap.get(req.body.token);
    Queries.getUserInfo(userId).then(row => {
        res.status(200).json(row);
    });
}


module.exports.register = register;
module.exports.login = login;
module.exports.validToken = validToken;
module.exports.userInfo = userInfo;

