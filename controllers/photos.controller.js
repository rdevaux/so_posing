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
        let idCategorie = await Categories.getIdCategorie(requete.params.id);

        let Photos = require('../models/photos.model')(db, config);
        let listePhotosBD = await Photos.getPhotosByFilter(requete.params.id_filtre);

        let listeBuff = [];

        for (let i = 0; i < listePhotosBD.length; i++) {
            let id_pose = listePhotosBD[i].id_pose;
            let img = Buffer.from(listePhotosBD[i].photo_pose).toString('base64');
            let fav = listePhotosBD[i].favori;
            listeBuff.push([id_pose, img, fav]);
        }

        reponse.render('photos/photos.pug', { listeFiltre, nomSousCategorie: nomSousCategorie[0].nom_sous_categorie, idSousCategorie: requete.params.id, idFiltre: requete.params.id_filtre, listeBuff, idCategorie: idCategorie[0].id_categorie })
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
        let idFirstFiltre = await Filtres.getFirstFiltre(requete.params.id);

        reponse.render('photos/ajout_photo.pug', { listeFiltre, idSousCategorie: requete.params.id, idFiltre: idFirstFiltre[0].id_filtre })
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
        Photos.addPhoto(img, commentaires, filtre);

        reponse.redirect(`/photos/${requete.params.id}/${requete.body.filtre}`)
    })
        .catch(error => {
            console.log(error);
            console.log('Error during connection database');
        })
}

exports.gestion_favori = async (requete, reponse) => {

    let favori = false;

    if (requete.body.favori == 0) {
        favori = true
    } else if (requete.body.favori == 1) {
        favori = false
    }

    bdd.connexion.then(async db => {
        console.log('Connected')

        let Filtres = require('../models/filtres.model')(db, config);
        let listeFiltre = await Filtres.getFiltre(requete.params.id);

        let Categories = require('../models/categories.model')(db, config);
        let nomSousCategorie = await Categories.getNomSousCategorie(requete.params.id);
        let idCategorie = await Categories.getIdCategorie(requete.params.id);

        let Photos = require('../models/photos.model')(db, config);
        let updateFav = await Photos.updateFav(favori, requete.body.id_pose);
        let listePhotosBD = await Photos.getPhotosByFilter(requete.params.id_filtre);

        let listeBuff = [];

        for (let i = 0; i < listePhotosBD.length; i++) {
            let id_pose = listePhotosBD[i].id_pose;
            let img = Buffer.from(listePhotosBD[i].photo_pose).toString('base64');
            let fav = listePhotosBD[i].favori;
            listeBuff.push([id_pose, img, fav]);
        }

        reponse.render('photos/photos.pug', { listeFiltre, nomSousCategorie: nomSousCategorie[0].nom_sous_categorie, idSousCategorie: requete.params.id, idFiltre: requete.params.id_filtre, listeBuff, idCategorie: idCategorie[0].id_categorie })
    })
}

exports.affichage_favori = async (requete, reponse) => {
    bdd.connexion.then(async db => {
        console.log('Connected')

        let Filtres = require('../models/filtres.model')(db, config);
        let listeFiltre = await Filtres.getFiltre(requete.params.id);

        let Categories = require('../models/categories.model')(db, config);
        let nomSousCategorie = await Categories.getNomSousCategorie(requete.params.id);
        let idCategorie = await Categories.getIdCategorie(requete.params.id);

        let Photos = require('../models/photos.model')(db, config);
        let listePhotosBD = await Photos.getPhotosFav(requete.params.id_filtre);

        let listeBuff = [];

        for (let i = 0; i < listePhotosBD.length; i++) {
            let id_pose = listePhotosBD[i].id_pose;
            let img = Buffer.from(listePhotosBD[i].photo_pose).toString('base64');
            let fav = listePhotosBD[i].favori;
            listeBuff.push([id_pose, img, fav]);
        }

        reponse.render('photos/photos_fav.pug', { listeFiltre, nomSousCategorie: nomSousCategorie[0].nom_sous_categorie, idSousCategorie: requete.params.id, idFiltre: requete.params.id_filtre, listeBuff, idCategorie: idCategorie[0].id_categorie })
    })
        .catch(error => {
            console.log(error);
            console.log('Error during connection database');
        })
}