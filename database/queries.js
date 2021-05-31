const db = require('./db');

class Queries {
    // Check if user with given mail is registered.
    static async isRegisteredMail(mail) {
        let res = await db.query('SELECT * FROM users WHERE mail = $1', [mail])
        return res.rowCount > 0;
    }

    // Check if user with given username is registered.
    static async isRegisteredUsername(username) {
        let res = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return res.rowCount > 0;
    }

    // Register user with given parameters.
    static async registerUser(vals) {
        let res = await db.query('INSERT INTO users(id, mail, username, passwdhash) VALUES(DEFAULT, $1, $2, $3) RETURNING id', vals);
        return res.rows[0].id;
    }

    // Check login data.
    static async loginAuth(vals) {
        let res = await db.query('SELECT id FROM users WHERE mail = $1 AND passwdhash = $2', vals);
        return res.rows[0];
    }

    // Returns all information about user with given id.
    static async getUserInfo(userId) {
        let res = await db.query('SELECT username, mail FROM users WHERE id = $1', [userId]);
        return res.rows[0];
    }

    static async updateStats(username, game, result) {
        await db.query('INSERT INTO stats(username, game, date, result) VALUES ($1, $2, DEFAULT, $3)', [username, game, result]);
        return true;
    }

    static async setPassword(mail, newPasswdHash) {
        await db.query('UPDATE users SET passwdhash = $2 WHERE mail = $1', [mail, newPasswdHash]);
        return true;
    }

    // Check login data.
    static async gameValidation(vals) {
        let res = await db.query('SELECT username FROM users WHERE mail = $1 AND passwdhash = $2', vals);
        return res.rows[0];
    }

    static async getGamesInfo() {
        let res = await db.query('SELECT game FROM games');
        return res.rows;
    }

    static async getStatsInfo(username) {
        let res = await db.query('SELECT * FROM stats WHERE username = $1', [username]);
        return res.rows;
    }

    static async getRankingInfo() {
        let res = await db.query('SELECT username, game, COUNT(result) AS wins FROM stats WHERE result = 1 GROUP BY game, username ORDER BY wins DESC');
        return res.rows;
    }
}

module.exports = Queries;