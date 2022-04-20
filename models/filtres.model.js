let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Filtres
}

let Filtres = class {

    static getAll() {
        return new Promise(next => {
            db.query('SELECT * FROM `filtre`')
                .then(result => next(result))
                .catch(error => next(error))
        })
    }

    static getFiltre(id) {
        return new Promise(next => {
            db.query('SELECT * FROM `filtre` WHERE `id_sous_categorie`= ?', [id])
                .then(result => next(result))
                .catch(error => next(error))
        })
    }

    static getFirstFiltre(id) {
        return new Promise(next => {
            db.query('SELECT `id_filtre` FROM `filtre` WHERE `id_sous_categorie`= ? LIMIT 1', [id])
                .then(result => next(result))
                .catch(error => next(error))
        })
    }
}