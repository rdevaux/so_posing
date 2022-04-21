/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');
const checkInternetConnected = require('check-internet-connected');

/***********************
 * VARIABLES GLOBALES  *
************************/

const routeur = express.Router();
const config = {
    timeout: 5000, //timeout connecting to each server(A and AAAA), each try (default 5000)
    retries: 5,//number of retries to do before failing (default 5)
    domain: 'google.com'//the domain to check DNS record of
}

let internet = true;

setInterval(() => {
    checkInternetConnected(config)
        .then(() => {
            console.log("Internet available");
            internet = true;
        }).catch((error) => {
            console.log("No internet", error);
            internet = false;
        });
}, 15000);

/***********************
 *       ROUTAGE       *
************************/

// Page d'accueil
routeur.get('/', (requete, reponse) => {
    reponse.render('accueil/accueil.pug', { internet })
})

// Gestion de l'erreur 404
routeur.use((requete, reponse, suite) => {
    const error = new Error("Page non trouvée");
    error.status = 404;
    suite(error);
})

// Affichage de la page d'erreur
routeur.use((error, requete, reponse) => {
    reponse.status(error.status || 500);
    reponse.end(error.message);
})

/***********************
 *        EXPORTS      *
************************/

module.exports = routeur;