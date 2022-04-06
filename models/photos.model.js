let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Photos
}

let Photos = class {

    static getAll() {
        return new Promise (next => {
            db.query('SELECT * FROM `pose`')
            .then(result => next(result))
            .catch(error => next(error))
        })
    }

    static getPhotosByFilter(id) {
        return new Promise(next => {
            db.query('SELECT `photo_pose`, `commentaire`, `favori` FROM `pose` WHERE `id_filtre` = ?', [id])
                .then(result => next(result))
                .catch(error => next(error))
        })
    }

}