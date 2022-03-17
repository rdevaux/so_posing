/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');
const twig = require('twig');

/***********************
 * VARIABLES GLOBALES  *
************************/

const routeur = express.Router();

/***********************
 *       ROUTAGE       *
************************/

// Page d'accueil
routeur.get('/', (requete, reponse) => {
    reponse.render('categories/categories.html.twig')
})

/***********************
 *        EXPORTS      *
************************/

module.exports = routeur;