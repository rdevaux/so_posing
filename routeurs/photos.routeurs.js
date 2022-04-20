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
routeur.get('/:id/:id_filtre', photosController.affichage_photos)

// Gestion des favoris
routeur.post('/:id/:id_filtre', photosController.gestion_favori)

// Affichage de la page d'ajout de photo
routeur.get('/:id/ajout/photo', photosController.affichage_ajout_photo)

// Ajout d'une photo
routeur.post('/:id/ajout/photo', upload.single("photo"), photosController.ajout_photo)

/***********************
 *        EXPORTS      *
************************/

module.exports = routeur;