/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');
const twig = require('twig');
const photosController = require('../controllers/photos.controller')

/***********************
 * VARIABLES GLOBALES  *
************************/

const routeur = express.Router();

/***********************
 *       ROUTAGE       *
************************/

// Affichage des photos
routeur.get('/:id', photosController.affichage_photos)

/***********************
 *        EXPORTS      *
************************/

module.exports = routeur;