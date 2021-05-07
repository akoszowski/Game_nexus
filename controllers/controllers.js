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
    });
}

// Basic information about user, having one's token.
const userInfo = (req, res, next) => {
    let userId = tokMap.get(req.body.token);
    Queries.getUserInfo(userId).then(row => {
        res.status(200).json(row);
    });
}

// FIXME: być może mutlimapa będzie potrzebna w przyszłości.
var activeGames = new Map();

// Need to inform server before entering the game.
const newGame = (req, res, next) => {
    let username = req.body.username;
    let game = req.body.game;
    if (activeGames.has(username)) {
        res.status(400).send("You have got already active game! First finish it.")
    } else {    // Redirection at the front.
        activeGames.set(username, game);
        res.status(200);
    }
}

// Obtain statistics after the game finishes.
const updateStats = (req, res, next) => {
    let game = req.body.game;
    let username = req.body.username;
    let result = req.body.result;
    if (activeGames.has(username)) {
        Queries.updateStats(username, game, result).then(updated => {
            res.status(200);
        });
        activeGames.delete(username);       // FIXME: potential callback ?
    } else {
        res.status(400).send("Not sychronized data. Such a user has not started a game!");
    }
}

// Enables to set new password.
const updatePassword = (req, res, next) => {
    let mail = req.body.email;
    let curPasswdHash = req.body.oldPassword;
    let newPasswdHash = req.body.newPassword;
    Queries.loginAuth([mail, curPasswdHash]).then(exists => {
        if (exists) {
            Queries.setPassword(mail, newPasswdHash).then( updated => {
               res.status(200).send("Updated password!");
            });
        } else {
            res.status(400).send("Invalid password!");
        }
    })
}

module.exports.register = register;
module.exports.login = login;
module.exports.validToken = validToken;
module.exports.userInfo = userInfo;
module.exports.newGame = newGame;
module.exports.updateStats = updateStats;
module.exports.updatePassword = updatePassword;

