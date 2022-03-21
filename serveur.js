/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');
const morgan = require('morgan');
const config = require('./config.json');
const routeurCategories = require('./routeurs/categories.routeurs');
const routeurPhotos = require('./routeurs/photos.routeurs');
const routeurGlobal = require('./routeurs/global.routeurs');

/***********************
 * VARIABLES GLOBALES  *
************************/

const app = express();
const port = config.port;

/***********************
 *     MIDDLEWWARES    *
************************/

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(morgan('dev'));

// Routage
app.use('/categories/', routeurCategories);
app.use('/photos/', routeurPhotos);
app.use('/', routeurGlobal);

/***********************
 *     TRAITEMENTS     *
************************/

app.listen(port);