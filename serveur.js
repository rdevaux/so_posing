/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');
const morgan = require('morgan');
const mysql = require('promise-mysql');
const config = require('./public/config.json');
const routeurCategories = require('./routeurs/categories.routeurs');
const routeurGlobal = require('./routeurs/global.routeurs');

/***********************
 * VARIABLES GLOBALES  *
************************/

const app = express();
const port = config.port;

/***********************
 * CONNEXION À LA BDD  *
************************/

mysql.createConnection({
    socketPath: config.db.socketPath,
    host: config.db.host,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password
})
.then((db) => {
    console.log('Connected')
    let Categories = require('./models/categories.model')(db, config);
})
.catch((err) => {
    console.log('Error during database connection')
    console.log(err.message)
})

/***********************
 *     MIDDLEWWARES    *
************************/

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(morgan('dev'));

// Routage
app.use('/categories/', routeurCategories);
app.use('/', routeurGlobal);

/***********************
 *     TRAITEMENTS     *
************************/

app.listen(port);