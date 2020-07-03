let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3001;

let pool = new pg.Pool({
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'exercises',
    max: 15
});

// pool.connect((err, db, done) => {
//     if(err){
//         return console.log(err);
//     }
//     else{
//         db.query('SELECT * from exercise', (err, table) => {
//             if (err){
//                 return console.log(err)
//             }
//             else{
//                 console.log(table.rows)
//             }
//         })
//     }
// })

//        pool.query("SELECT * from exercise WHERE exercisetype LIKE $1 AND difficulty LIKE $2", [type, difficulty], (error, results) => {

let app = express();

// const exercise_model = require('./exercise_model')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers',  'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/api/get-exercise', function(request, response){

    pool.connect((err, db, done) => {
    if(err){
        return response.status(400).send(err);
    }
    else{
        db.query('SELECT * from exercise', (err, table) => {
            done();
            if (err){
                return response.status(400).send(err);
            }
            else{
                console.log(table.rows)
                response.status(201).send(table.rows);
            }
        })
    }
})
});

app.get('/api/exercises', function(request,response){
    pool.connect(function(err,db,done){
        if (err){
            return response.status(400).send(err);
        }
        else{
            db.query('SELECT * from exercise', (err, table) => {
                done();
                if (err){
                    return response.status(400).send(err);
                }
                else{
                    console.log(table.rows)
                    response.status(200).send(table.rows);
                }
            })
        }
    })
})


app.listen(PORT, () => console.log('Listening on port ' + PORT))
