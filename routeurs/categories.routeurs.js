/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');
const twig = require('twig');
const categoriesController = require('../controllers/categories.controller');

/***********************
 * VARIABLES GLOBALES  *
************************/

const routeur = express.Router();

/***********************
 *       ROUTAGE       *
************************/

// Page d'accueil
routeur.get('/', categoriesController.affichage_categories)

/***********************
 *        EXPORTS      *
************************/

module.exports = routeur;