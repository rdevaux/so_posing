/***********************
 * IMPORT DES MODULES *
************************/

const config = require('../config.json');
const twig = require('twig');
const bdd = require('../connexion_sql');

/***********************
 *  EXPORT FONCTIONS   *
************************/


exports.affichage_filtres = async (requete, reponse) => {
    bdd.connexion.then(async db => {
        console.log('Connected')

        let Filtres = require('../models/filtres.model')(db, config);
        let listeFiltre = await Filtres.getFiltre(requete.params.id);
        console.log(listeFiltre)
        reponse.render('photos/photos.html.twig', { listeFiltre })
    })
        .catch(error => {
            console.log(error);
            console.log('Error during connection database');
        })
}