/***********************
 * IMPORT DES MODULES *
************************/

const config = require('../config.json');
const bdd = require('../connexion_sql');

/***********************
 *  EXPORT FONCTIONS   *
************************/

// Affichage Categorie

exports.affichage_categories = async (requete, reponse) => {
    bdd.connexion.then(async db => {
        console.log('Connected')

        let Categories = require('../models/categories.model')(db, config);
        let listeCategories = await Categories.getCategories();
    
        reponse.render('categories/categories.pug', {listeCategories})
    })
    .catch(error => {
        console.log(error);
        console.log('Error during connection database');
    })
}

// Affichage Sous-Categorie

exports.affichage_sous_categories = async (requete, reponse) => {
    bdd.connexion.then(async db => {
        console.log('Connected')

        let Categories = require('../models/categories.model')(db, config);
        let listeSousCategories = await Categories.getSousCategoriesById(requete.params.id);
        let nomCategorie = await Categories.getNomCategorie(requete.params.id)

        let Filtres = require('../models/filtres.model')(db, config);

        let listeFiltreSousCategories = [];
        
        for (let i = 0; i < listeSousCategories.length; i++) {
            listeFiltreSousCategories.push([listeSousCategories[i], JSON.parse(JSON.stringify(await Filtres.getFirstFiltre(listeSousCategories[i].id_sous_categorie)))[0]])
        }
        
        reponse.render('categories/sous-categories.pug', {listeFiltreSousCategories, nomCategorie: nomCategorie[0].nom_categorie})
    })
    .catch(error => {
        console.log(error);
        console.log('Error during connection database');
    })
}