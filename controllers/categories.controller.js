/***********************
 * IMPORT DES MODULES *
************************/

const config = require('../public/config.json');
const twig = require('twig');
const bdd = require('../connexion_sql');

/***********************
 *  EXPORT FONCTIONS   *
************************/

exports.affichage_categories = async (requete, reponse) => {
    bdd.connexion.then(async db => {
        console.log('Connected')

        let Categories = require('../models/categories.model')(db, config);
        let listeCategories = await Categories.getCategories();
    
        reponse.render('categories/categories.html.twig', {listeCategories})
    })
    .catch(error => {
        console.log(error);
        console.log('Error during connection database');
    })
}