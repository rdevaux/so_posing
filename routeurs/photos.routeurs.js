/***********************
 * IMPORT DES MODULES *
************************/

const express = require('express');
const multer = require('multer');
const photosController = require('../controllers/photos.controller')
const filtreController = require('../controllers/filtres.controller')

/***********************
 * VARIABLES GLOBALES  *
************************/

const routeur = express.Router();
const upload = multer();

/***********************
 *       ROUTAGE       *
************************/

// Affichage des filtres
routeur.get('/:id', filtreController.affichage_filtres)

// Affichage des photos
routeur.post('/:id', photosController.affichage_photos)

// Affichage de la page d'ajout de photo
routeur.get('/:id/ajout_photo', photosController.affichage_ajout_photo)

// Ajout d'une photo
routeur.post('/:id/ajout_photo', upload.single("pose"), photosController.ajout_photo)

/***********************
 *        EXPORTS      *
************************/

module.exports = routeur;