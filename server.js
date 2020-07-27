const express = require('express')
const app = express()
const port = 3001

const exercise_model = require('./exercise_model')

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

// app.get('/', (req, res) => {
//     res.status(200).send('Success');
// })

app.get('/', (req, res) => {
    exercise_model.getExercises()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


// const {Client} = require('pg');
// const client = new Client({
//     user: 'postgres',
//     password: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     database: 'exercises',
//     max: 15
// });
//
// function GetExercise(props) {
//     client.connect()
//         .then(() => console.log("Connected successfully"))
//         .then(() => client.query("SELECT * from exercise WHERE englishname LIKE $1 AND sanskritname LIKE $2", props))
//         .then(results => console.table(results.rows))
//         .catch(e => console.log(e))
//         .finally(() => client.end())
// }
