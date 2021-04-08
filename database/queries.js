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
    // ...
}

module.exports = Queries;