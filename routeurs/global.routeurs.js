/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');

/***********************
 * VARIABLES GLOBALES  *
************************/

const routeur = express.Router();

/***********************
 *       ROUTAGE       *
************************/

// Page d'accueil
routeur.get('/', (requete, reponse) => {
    reponse.render('accueil/accueil.pug')
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