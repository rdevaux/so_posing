/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');
const twig = require('twig');
const photosController = require('../controllers/photos.controller')
const filtreController = require('../controllers/filtres.controller')
/***********************
 * VARIABLES GLOBALES  *
************************/

const routeur = express.Router();

/***********************
 *       ROUTAGE       *
************************/

// Affichage des filtres
routeur.get('/:id', filtreController.affichage_filtres)

/***********************
 *        EXPORTS      *
************************/

module.exports = routeur;