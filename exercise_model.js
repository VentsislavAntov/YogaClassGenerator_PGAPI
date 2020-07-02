const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'exercises',
    max: 15
});


const getExercises = (type, difficulty) => {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * from exercise WHERE exercisetype LIKE $1 AND difficulty LIKE $2", [type, difficulty], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
};

module.exports = {
    getExercises,
};