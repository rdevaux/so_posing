let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Filtres
}

let Filtres = class {

    static getFiltre(id){
        return new Promise (next =>{
            db.query('SELECT * FROM `filtre` WHERE `id_sous_categorie`= ?', [id])
            .then(result => next(result))
            .catch(error => next(error))
        })
    }
}