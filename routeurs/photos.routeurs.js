/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');
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

// Affichage des photos
routeur.post('/:id', photosController.affichage_photos)

/***********************
 *        EXPORTS      *
************************/

module.exports = routeur;