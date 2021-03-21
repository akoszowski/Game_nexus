const db = require('./db.js')

// Class serving queries to cennected database.
class Queries {
    static async test() {
        let res = await db.query('SELECT nazwa_projektu FROM test');
        return res.rows[0];
    }

    // ...
}

module.exports = Queries;