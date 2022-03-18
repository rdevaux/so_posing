/***********************
 * IMPORT DES MODULES *
************************/

const mysql = require('promise-mysql');
const config = require('./public/config.json');

/***********************
 * CONNEXION À LA BDD  *
************************/

exports.connexion = mysql.createConnection({
    socketPath: config.db.socketPath,
    host: config.db.host,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password
})