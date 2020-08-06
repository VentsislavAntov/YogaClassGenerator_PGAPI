/**
 * This application is used to connect to the database and query its information upon API calls
 * which is then used by the other application (react-iyengar-yoga-generator).
 * The PostgreSQL tool used is pgAdmin
 */


//Note that the port used is 3001. This will prevent conflict with the other application which is on port 3000
let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const port = process.env.PORT || 3001;

//Pools will use environment variables for connection information - the table on pgAdmin is called exercises.
//Note that there is a maximum number of client connections set but this can be changed easily. Default should be 10 if not set
let pool = new pg.Pool({
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'exercises',
    max: 20
});


//Application framework for node. Morgan is used for logging request details
let app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//Post
app.post('/api/get-exercise', function (request, response) {
    pool.connect((err, db, done) => {
        if (err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * from exercise', (err, table) => {
                done();
                if (err) {
                    return response.status(400).send(err);
                } else {
                    response.status(201).send(table.rows);
                }
            })
        }
    })
});

//get
app.get('/api/exercises', function (request, response) {
    pool.connect(function (err, db, done) {
        if (err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * from exercise', (err, table) => {
                done();
                if (err) {
                    return response.status(400).send(err);
                } else {
                    response.status(200).send(table.rows);
                }
            })
        }
    })
});

//To display that it is listening
app.listen(port, '0.0.0.0', () => console.log('Listening ...'));
