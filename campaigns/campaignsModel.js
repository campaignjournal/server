const db = require('../database/dbconfig')

module.exports = {
    findCampaigns,
    findById,
    findByUserId,
    create,
    remove,
    update,
}

// CAMPAIGN GENERAL ROUTING HELPERS

function findCampaigns() {
    return db("campaigns")
}

function findById(id) {
    return db("campaigns")
        .where({ id })
        .first()
}

function findByUserId(id) {
    return db("campaigns")
    .where({ user_id: id })
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
    return db('campaigns')
        .where('id', id)
        .update(changes)
}