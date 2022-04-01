/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');
const categoriesController = require('../controllers/categories.controller');

/***********************
 * VARIABLES GLOBALES  *
************************/

const routeur = express.Router();

/***********************
 *       ROUTAGE       *
************************/

// Page des catégories
routeur.get('/', categoriesController.affichage_categories)

// Page des sous catégories
routeur.get('/:id', categoriesController.affichage_sous_categories)

/***********************
 *        EXPORTS      *
************************/

module.exports = routeur;