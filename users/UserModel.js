const db = require("../database/dbconfig")

module.exports = {
    find,
    findById,
    findByUsername,
    create,
    remove,
    update,
}

function find() {
    return db("users")
}

function findById(id) {
    return db("users")
        .where({ id })
        .first()
}

function findByUsername(username) {
    return db("users")
        .where({ username: username })
        .first()
}

function create(user) {
    return db("users")
        .insert(user)
}

function remove(id) {
    return db("users")
        .where("id", id)
        .del()
}

function update(id, changes) {
    return db("users")
        .where("id", id)
        .update(changes)
}