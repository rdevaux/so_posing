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
        let listePhotosBD = await Photos.getPhotosByFilter(requete.body.id);
        let listeBuff = [];

        for (let i = 0; i < listePhotosBD.length; i++) {
            let img = Buffer.from(listePhotosBD[i].photo_pose).toString('base64');
            listeBuff.push(img);
        }

        reponse.render('photos/photos.pug', { listeFiltre, nomSousCategorie: nomSousCategorie[0].nom_sous_categorie, idSousCategorie: requete.params.id, listeBuff })
    })
        .catch(error => {
            console.log(error);
            console.log('Error during connection database');
        })
}

exports.affichage_ajout_photo = async (requete, reponse) => {
    bdd.connexion.then(async db => {
        console.log('Connected');

        let Filtres = require('../models/filtres.model')(db, config);
        let listeFiltre = await Filtres.getFiltre(requete.params.id);

        reponse.render('photos/ajout_photo.pug', { listeFiltre })
    })
        .catch(error => {
            console.log(error);
            console.log('Error during connection database');
        })
}

exports.ajout_photo = async (requete, reponse) => {
    const img = requete.file.buffer
    const filtre = requete.body.filtre
    const commentaires = requete.body.comments

    bdd.connexion.then(async db => {
        console.log('Connected')

        let Photos = require('../models/photos.model')(db, config);
        Photos.addPhoto(img, commentaires, filtre[0]);

        reponse.redirect('/')
    })
        .catch(error => {
            console.log(error);
            console.log('Error during connection database');
        })
}