let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Photos
}

let Photos = class {

    static getAll() {
        return new Promise(next => {
            db.query('SELECT * FROM `pose`')
                .then(result => next(result))
                .catch(error => next(error))
        })
    }

    static getPhotosByFilter(id) {
        return new Promise(next => {
            db.query('SELECT `id_pose`, `photo_pose`, `commentaire`, `favori` FROM `pose` WHERE `id_filtre` = ?', [id])
                .then(result => next(result))
                .catch(error => next(error))
        })
    }

    static addPhoto(pose, commentaire, id_filtre) {
        return new Promise(next => {
            db.query("INSERT INTO `pose`(`photo_pose`, `commentaire`, `id_filtre`) VALUES (?,?,?)", [pose, commentaire, id_filtre])
                .then(result => next(result))
                .catch(error => {
                    console.log(error);
                    next(error)
                })
        })
    }

    static updateFav(value, id_pose) {
        return new Promise(next => {
            db.query("UPDATE `pose` SET `favori`= ? WHERE `id_pose` = ?", [value, id_pose])
                .then(result => next(result))
                .catch(error => {
                    console.log(error);
                    next(error)
                })
        })
    }

    static getPhotosFav(id_filtre) {
        return new Promise(next => {
            db.query("SELECT `id_pose`, `photo_pose`, `commentaire`, `favori` FROM `pose` WHERE favori = 1 AND id_filtre = ?", [id_filtre])
                .then(result => next(result))
                .catch(error => {
                    console.log(error);
                    next(error)
                })
        })
    }
}