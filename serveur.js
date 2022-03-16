/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');
const morgan = require('morgan');
const routeurGlobal = require('./routeurs/global.routeurs');

/***********************
 * VARIABLES GLOBALES  *
************************/

const app = express();
const routeur = express.Router();
const port = 3000;

/***********************
 *     MIDDLEWWARES    *
************************/

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(morgan('dev'));

// Routage
app.use('/', routeurGlobal);

/***********************
 *     TRAITEMENTS     *
************************/

app.listen(port);