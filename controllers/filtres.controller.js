/***********************
 * IMPORT DES MODULES *
************************/

const config = require('../config.json');
const bdd = require('../connexion_sql');

/***********************
 *  EXPORT FONCTIONS   *
************************/

exports.affichage_filtres = async (requete, reponse) => {
    bdd.connexion.then(async db => {
        console.log('Connected')

        let Filtres = require('../models/filtres.model')(db, config);
        let listeFiltre = await Filtres.getFiltre(requete.params.id);

        reponse.render('photos/photos.pug', { listeFiltre })
    })
        .catch(error => {
            console.log(error);
            console.log('Error during connection database');
        })
}