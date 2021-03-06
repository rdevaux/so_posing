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

        let Categories = require('../models/categories.model')(db, config);
        let nomSousCategorie = await Categories.getNomSousCategorie(requete.params.id);
        let idCategorie = await Categories.getIdCategorie(requete.params.id);

        reponse.render('photos/photos.pug', { listeFiltre, nomSousCategorie: nomSousCategorie[0].nom_sous_categorie, idSousCategorie: requete.params.id, idCategorie: idCategorie[0].id_categorie })
    })
        .catch(error => {
            console.log(error);
            console.log('Error during connection database');
        })
}