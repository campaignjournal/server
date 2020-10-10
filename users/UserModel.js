const db = require('../database/dbconfig')

module.exports = {
    find,
    findById,
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

function create(user) {
    return db('users')
        .insert(user)
}

function remove(id) {
    return db('users')
        .where('id', id)
        .del()
}

function update(id, changes) {
    return db('users')
        .where('id', id)
        .update(changes)
}