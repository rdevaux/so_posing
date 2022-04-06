/***********************
 * IMPORT DES MODULES *
************************/

const config = require('../config.json');
const bdd = require('../connexion_sql');

/***********************
 *  EXPORT FONCTIONS   *
************************/

exports.synchronisation_bdd = async (requete, reponse) => {
    bdd.connexion.then(async db => {
        console.log('Connected')

        let Categories = require('../models/categories.model')(db, config);
        let Filtres = require('../models/filtres.model')(db, config);
        let Photos = require('../models/photos.model')(db, config);

        const listeCategories = Object.values(JSON.parse(JSON.stringify(await Categories.getCategories())));
        const listeSousCategories = Object.values(JSON.parse(JSON.stringify(await Categories.getSousCategories())));
        const listeFiltres = Object.values(JSON.parse(JSON.stringify(await Filtres.getAll())));
        const listePhotos = Object.values(JSON.parse(JSON.stringify(await Photos.getAll())));

        console.log(listeCategories);
        console.log(listeCategories[0].photo_categorie.data);
        console.log(listeSousCategories);
        console.log(listeFiltres);
        console.log(listePhotos);
        console.log('test')

        reponse.render('synchronisation/synchronisation.pug')
    })
        .catch(error => {
            console.log(error);
            console.log('Error during connection database');
        })
}