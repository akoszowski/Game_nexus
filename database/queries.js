const db = require('./db.js')

// Class serving queries to cennected database.
class Queries {
    static async test() {
        let res = await db.query('SELECT nazwa_projektu FROM test');
        return res.rows[0];
    }

    static async loginAuth(username, passwdhash) {
        let res = await db.query('SELECT username FROM users WHERE username = $1 AND passwdhash = $2', [username, passwdhash]);
        return res.rows[0];
    }

    static async isRegistered(username) {
        let res = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return res.rowCount > 0;
    }

    static async registerUser(username, passwdhash) {
        let vals = [username, passwdhash];
        let _res = await db.query('SELECT * FROM users');
        let res = await db.query('INSERT INTO users(username, passwdhash) VALUES($1, $2)', vals);
        return true;
    }

    // ...
}

module.exports = Queries;