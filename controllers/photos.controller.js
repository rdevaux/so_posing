/***********************
 * IMPORT DES MODULES *
************************/

const config = require('../config.json');
const bdd = require('../connexion_sql');

/***********************
 *  EXPORT FONCTIONS   *
************************/

exports.affichage_photos = async (requete, reponse) => {
    bdd.connexion.then(async db => {
        console.log('Connected')

        let Filtres = require('../models/filtres.model')(db, config);
        let listeFiltre = await Filtres.getFiltre(requete.params.id);

        let Categories = require('../models/categories.model')(db, config);
        let nomSousCategorie = await Categories.getNomSousCategorie(requete.params.id);

        let Photos = require('../models/photos.model')(db, config);
        let listePhotos = await Photos.getPhotosByFilter(requete.body.id);

        console.log(listePhotos[0].photo_pose)
        let img = Buffer.from(listePhotos[0].photo_pose).toString('base64');
        reponse.render('photos/photos.pug', { listePhotos, listeFiltre, nomSousCategorie: nomSousCategorie[0].nom_sous_categorie, img })
    })
        .catch(error => {
            console.log(error);
            console.log('Error during connection database');
        })
}