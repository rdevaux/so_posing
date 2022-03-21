let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Categories
}

let Categories = class {

    // Requête récupérant la liste des catégories

    static getCategories() {
        return new Promise(next => {
            db.query('SELECT * FROM `categorie`')
                .then(result => next(result))
                .catch(error => next(error))
        })
    }

    // Requête récupérant la liste des sous-catégories en fonction d'un ID catégorie

    static getSousCategories(id) {
        return new Promise(next => {
            db.query('SELECT * FROM `sous_categorie` WHERE `id_categorie` = ?',[id])
                .then(result => {  if (result[0] != undefined) next(result)})
                .catch(error => next(error))
        })
    }

    // Requête récupérant le nom de la catégorie en fonction d'un ID catégorie

    static getNomCategorie(id) {
        return new Promise(next => {
            db.query('SELECT `nom_categorie` FROM `categorie` WHERE `id_categorie` = ?',[id])
            .then(result => next(result))
            .catch(error => next(error))
        })
    }

}
