let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Categories
}

let Categories = class {

    static getCategories() {
        return new Promise(next => {
            db.query('')
        })
    }
}