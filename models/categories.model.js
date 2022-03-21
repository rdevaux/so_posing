let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Categories
}

let Categories = class {

    static getCategories() {
        return new Promise(next => {
            db.query('SELECT * FROM `categorie`')
                .then(result => next(result))
                .catch(error => next(error))
        })
    }

    //requete permettant d'acceder aux sous categories

    static getSousCategories(id) {
        return new Promise(next => {
            db.query('SELECT * FROM `sous_categorie` WHERE `id_categorie`= ?',[id])
                .then(result => {  if (result[0] != undefined) next(result)})
                .catch(error => next(error))
        })
    }
    static getNomCategorie(id){
        return new Promise(next => {
            db.query('SELECT `nom_categorie` FROM `categorie` WHERE `id_categorie`=?',[id])
            .then(result => next(result))
            .catch(error => next(error))
        })
    }

}
