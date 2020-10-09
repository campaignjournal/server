const db = require('../database/dbconfig')

module.exports = {
    find,
    findById,
    create,
    remove,
    update,
}

function find() {
    return db("campaigns")
}

function findById(id) {
    return db("campaigns")
        .where({ id })
        .first()
}

function create(campaign) {
    return db('campaigns')
        .insert(campaign)
}

function remove(id) {
    return db('campaigns')
        .where('id', id)
        .del()
}

function update(id, changes) {
    return db('campaign')
        .where('id', id)
        .update(changes)
}